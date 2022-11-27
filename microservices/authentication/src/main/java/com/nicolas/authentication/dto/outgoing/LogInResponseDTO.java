package com.nicolas.authentication.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogInResponseDTO extends UserDTO {
//    private long id;
//    private String name;
//    private String lastName;
//    private String email;

    private String token;
}
