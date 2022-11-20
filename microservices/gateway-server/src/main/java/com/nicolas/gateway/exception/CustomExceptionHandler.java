package com.nicolas.gateway.exception;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.DefaultErrorAttributes;
import org.springframework.core.annotation.MergedAnnotation;
import org.springframework.core.annotation.MergedAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Component
public class CustomExceptionHandler extends DefaultErrorAttributes {

    public CustomExceptionHandler() {
    }

    public CustomExceptionHandler(boolean includeException) {
        super();
    }

    @Override
    public Map<String, Object> getErrorAttributes(ServerRequest request, ErrorAttributeOptions options) {
        Throwable error = this.getError(request);

        Map<String, Object> map = super.getErrorAttributes(request, options);

        map.remove("timestamp");
        map.remove("path");
        map.remove("error");
        map.remove("requestId");

        map.put("success", false);
        map.put("errorMessage", error.getMessage());
        map.put("data", null);

        return map;
    }
}
