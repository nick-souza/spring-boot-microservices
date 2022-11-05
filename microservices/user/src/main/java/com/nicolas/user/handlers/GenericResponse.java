package com.nicolas.user.handlers;

import lombok.Getter;

@Getter
public class GenericResponse<T> {
    private boolean success;
    private int statusCode;
    private String message;
    private T data;

    public GenericResponse(boolean success, int statusCode, String message, T data) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    public GenericResponse(boolean success, int statusCode, T data) {
        this.success = success;
        this.statusCode = statusCode;
        this.data = data;
    }

    public GenericResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
