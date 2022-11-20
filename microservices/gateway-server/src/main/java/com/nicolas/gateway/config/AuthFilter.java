package com.nicolas.gateway.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicolas.gateway.dto.LogInResponseDTO;
import com.nicolas.gateway.exception.BadRequestException;
import com.nicolas.gateway.exception.GenericResponse;
import com.nicolas.gateway.exception.RecordNotFoundException;
import com.nicolas.gateway.exception.UnauthorizedRequestException;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.io.IOException;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final WebClient.Builder webClientBuilder;

    public AuthFilter(WebClient.Builder webClientBuilder) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION))
                throw new UnauthorizedRequestException("Missing authorization information");

            var authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

            String[] parts = authHeader.split(" ");

            // TODO: Add unauthorized response:
            if (parts.length != 2 || !"Bearer".equals(parts[0]))
                throw new UnauthorizedRequestException("Unauthorized");

            return webClientBuilder.build()
                    .post()
                    .uri("http://AUTHENTICATION/auth/validateToken?token=" + parts[1])
                    .retrieve()
                    .bodyToMono(LogInResponseDTO.class)
                    .map(logInResponseDto -> {
                        exchange.getRequest()
                                .mutate()
                                .header("X-auth-user-id", String.valueOf(logInResponseDto.getId()));
                        return exchange;
                    }).flatMap(chain::filter)
                    .onErrorMap(WebClientException.class, this::handleHttpClientException);
        };
    }

    private Throwable handleHttpClientException(Throwable ex) {
        if (!(ex instanceof WebClientResponseException))
            return ex;

        var responseException = (WebClientResponseException)ex;

        switch (responseException.getStatusCode()) {
            case NOT_FOUND -> throw new RecordNotFoundException(getErrorMessage(responseException));
            case BAD_REQUEST -> throw new BadRequestException(getErrorMessage(responseException));
            case UNAUTHORIZED -> throw new UnauthorizedRequestException(getErrorMessage(responseException));

            default -> {
                return ex;
            }
        }
    }

    private String getErrorMessage(WebClientResponseException ex) {
        try {
            return new ObjectMapper().readValue(ex.getResponseBodyAsString(), GenericResponse.class).getErrorMessage();
        } catch (IOException ioe) {
            return ex.getMessage();
        }
    }

    public static class Config {
        // empty class as I don't need any particular configuration
    }
}

