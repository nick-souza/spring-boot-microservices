package com.nicolas.authentication.dto.outgoing;

import lombok.Data;

@Data
public class UserValidatedDTO extends UserDTO{
    private String token;
}
