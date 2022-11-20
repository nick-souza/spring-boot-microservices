package com.nicolas.authentication.dto.incoming;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogInDTO {
    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;
}
