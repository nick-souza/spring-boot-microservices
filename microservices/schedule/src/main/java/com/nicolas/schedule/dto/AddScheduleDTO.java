package com.nicolas.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddScheduleDTO {

    @NonNull
    private Long roomId;

    @NonNull
    private Long responsibleId;

    @NonNull
    private LocalDateTime bookingDate;
}
