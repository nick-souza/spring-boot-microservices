package com.nicolas.schedule.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicolas.schedule.utils.GenericResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;
import java.io.InputStream;
import java.util.Scanner;

import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR;

@Component
public class RestTemplateErrorHandler implements ResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse httpResponse) throws IOException {
        return (httpResponse.getStatusCode().series() == CLIENT_ERROR || httpResponse.getStatusCode().series() == SERVER_ERROR);
    }

    @Override
    public void handleError(ClientHttpResponse httpResponse) throws IOException {
        // Usando o Jackson Library para converter o ClientHttpResponse body para GenericResponse.class:
        var response = new ObjectMapper().readValue(toString(httpResponse.getBody()), GenericResponse.class);

        if (httpResponse.getStatusCode().series() == HttpStatus.Series.SERVER_ERROR) {
            if (httpResponse.getStatusCode() == HttpStatus.BAD_REQUEST)
                throw new BadRequestException(response.getErrorMessage());

        } else if (httpResponse.getStatusCode().series() == HttpStatus.Series.CLIENT_ERROR) {
            if (httpResponse.getStatusCode() == HttpStatus.NOT_FOUND)
                throw new RecordNotFoundException(response.getErrorMessage());
            if (httpResponse.getStatusCode() == HttpStatus.BAD_REQUEST)
                throw new BadRequestException(response.getErrorMessage());
        }
    }

    // Convertendo o InputStream do ClientHttpResponse para String:
    String toString(InputStream inputStream) {
        Scanner s = new Scanner(inputStream).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}