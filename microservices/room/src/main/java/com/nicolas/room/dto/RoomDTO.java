package com.nicolas.room.dto;

import lombok.*;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
    @Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)
    protected DateTimeFormatter DateTimeFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    @NonNull
    private Long id;
    @NonNull
    private String name;
    @NonNull
    private Long capacity;

    @Getter(AccessLevel.NONE)
    private LocalDateTime CreationDate;

    @Getter(AccessLevel.NONE)
    private LocalDateTime LastUpdate;
    public String getCreationDate() {
        return CreationDate.format(DateTimeFormat);
    }

    public String getLastUpdate() {
        return LastUpdate.format(DateTimeFormat);
    }
}
