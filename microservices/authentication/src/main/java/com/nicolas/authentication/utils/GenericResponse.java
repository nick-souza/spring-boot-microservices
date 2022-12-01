package com.nicolas.authentication.utils;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
public class GenericResponse<T> {
    private boolean success;
    private int statusCode;
    private String errorMessage;
    private Object data;

    public GenericResponse(boolean success, int statusCode, String errorMessage, T data) {
        this.success = success;
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
        this.data = data;
    }

    public GenericResponse(boolean success, int statusCode, T data) {
        this.success = success;
        this.statusCode = statusCode;
        this.data = data;
    }

    public GenericResponse(int statusCode, String errorMessage) {
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}
