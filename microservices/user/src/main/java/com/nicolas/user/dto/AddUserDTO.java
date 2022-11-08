package com.nicolas.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.NonNull;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddUserDTO {

    @NonNull
    private String name;

    @NonNull
    private LocalDate dateOfBirth;
}
