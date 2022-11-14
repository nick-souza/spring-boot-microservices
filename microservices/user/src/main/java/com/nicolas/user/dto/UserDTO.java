package com.nicolas.user.dto;

import com.nicolas.user.model.Enums.Role;
import com.nicolas.user.model.Enums.Status;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)
    protected DateTimeFormatter DateTimeFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm");

    private Long id;
    private String name;
    private String lastName;
    private String email;

    @Getter(AccessLevel.NONE)
    private Status status;

    @Getter(AccessLevel.NONE)
    private String statusDesc;

    @Getter(AccessLevel.NONE)
    private Role role;

    @Getter(AccessLevel.NONE)
    private String roleDesc;

    @Getter(AccessLevel.NONE)
    private LocalDateTime CreationDate;

    @Getter(AccessLevel.NONE)
    private LocalDateTime LastUpdate;

    public int getStatus() {
        return status.ordinal();
    }

    public Status getStatusDesc() {
        return status;
    }

    public int getRole() {
        return role.ordinal();
    }

    public Role getRoleDesc() {
        return role;
    }

    public String getCreationDate() {
        return CreationDate.format(DateTimeFormat);
    }

    public String getLastUpdate() {
        return LastUpdate.format(DateTimeFormat);
    }
}
