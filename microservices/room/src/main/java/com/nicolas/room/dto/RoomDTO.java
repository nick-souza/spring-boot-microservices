package com.nicolas.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {

    @NonNull
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private Long size;
}
