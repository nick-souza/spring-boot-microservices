package com.nicolas.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {

    @NonNull
    private Long id;
    @NonNull
    private Long roomId;
    @NonNull
    private Long responsibleId;
//    private Object responsible;

    @NonNull
    private LocalDateTime bookingDate;
}
