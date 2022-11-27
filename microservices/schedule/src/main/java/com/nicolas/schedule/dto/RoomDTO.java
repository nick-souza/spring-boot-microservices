package com.nicolas.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {

    private Long id;
    private String name;
    private Long capacity;
    private String creationDate;
    private String lastUpdate;
}
