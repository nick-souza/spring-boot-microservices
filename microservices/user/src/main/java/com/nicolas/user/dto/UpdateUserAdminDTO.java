package com.nicolas.user.dto;

import com.nicolas.user.model.Enums.Role;
import com.nicolas.user.model.Enums.Status;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateUserAdminDTO {
    @NotNull(message = "Id can't be null")
    private Long id;
    private Status status;
    private Role role;
}
