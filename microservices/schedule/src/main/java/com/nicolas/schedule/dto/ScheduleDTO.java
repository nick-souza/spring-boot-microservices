package com.nicolas.schedule.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {
    @Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)
    protected DateTimeFormatter DateTimeFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm", Locale.US);

    private Long id;
    private Long roomId;
    private String room;
    private Long responsibleId;
    private String responsible;
    @Getter(AccessLevel.NONE)
    private LocalDateTime bookingStart;
    @Getter(AccessLevel.NONE)
    private LocalDateTime bookingEnd;

    public String getBookingStart() {
        return bookingStart.format(DateTimeFormat);
    }

    public String getBookingEnd() {
        return bookingEnd.format(DateTimeFormat);
    }
}
