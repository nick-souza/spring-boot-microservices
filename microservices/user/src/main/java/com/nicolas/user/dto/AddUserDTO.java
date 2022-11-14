package com.nicolas.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.NonNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddUserDTO {

    @NotNull(message = "Name can't be null")
    private String name;

    private String lastName;

    @NotNull(message = "Email can't be null")
    @Email
    private String email;

    // TODO: Add password and password confirmation:
}
