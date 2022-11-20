package com.nicolas.gateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LogInResponseDTO {

    private long id;
    private String email;
    private String token;
}
