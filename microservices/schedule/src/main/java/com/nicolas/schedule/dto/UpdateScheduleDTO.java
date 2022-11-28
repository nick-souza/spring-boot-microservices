package com.nicolas.schedule.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateScheduleDTO {
    @Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)
    private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm", Locale.US);

    @NotNull(message = "Schedule id cannot be empty")
    private Long scheduleId;
    private String name;
    private Long roomId;
    private Long responsibleId;

    @Getter(AccessLevel.NONE)
    private String bookingStart;
    @Getter(AccessLevel.NONE)
    private String bookingEnd;

    public LocalDateTime getBookingStart() {
        if (bookingStart != null)
            return LocalDateTime.parse(bookingStart, dateFormat);
        else
            return  null;
    }
    public LocalDateTime getBookingEnd() {
        if (bookingEnd != null)
            return LocalDateTime.parse(bookingEnd, dateFormat);
        else
            return  null;
    }
}
