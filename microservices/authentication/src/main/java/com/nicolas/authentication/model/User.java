package com.nicolas.authentication.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class User {

    private Long id;
    private String email;
    private String name;
    private String lastName;
    private String password;
    private String status;
    private String role;
    private String verifiedAt;
    private String createdAt;
    private String lastUpdateAt;
}
