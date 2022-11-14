package com.nicolas.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRoomDTO {

    @NotNull(message = "Room ID is required")
    private Long id;
    private String name;
    private Long capacity;
}
