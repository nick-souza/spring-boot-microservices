package com.nicolas.user.utils;

import lombok.Getter;

@Getter
public class GenericResponse<T> {
    private boolean success;
    private int statusCode;
    private String errorMessage;
    private T data;

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
