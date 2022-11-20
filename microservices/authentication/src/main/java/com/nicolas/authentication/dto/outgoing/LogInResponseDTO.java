package com.nicolas.authentication.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogInResponseDTO {
    private long id;
    private String email;
    private String token;
}
