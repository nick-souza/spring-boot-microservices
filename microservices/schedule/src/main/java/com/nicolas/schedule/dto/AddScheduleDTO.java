package com.nicolas.schedule.dto;

import lombok.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddScheduleDTO {

    @Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)
    private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm", Locale.US);

    @NotNull(message = "A booking must contain the room id")
    private Long roomId;

    @NotNull(message = "A booking must contain the name")
    private String name;

    @NotNull(message = "A booking must contain the responsible id")
    private Long responsibleId;

    // TODO: Add how many people will attend the meeting; Maybe add all participants? Will maybe add unnecessary complexity

    @NotNull(message = "A booking must contain the start date time")
    @Getter(AccessLevel.NONE)
    private String bookingStart;

    @NotNull(message = "A booking must contain the end date time")
    @Getter(AccessLevel.NONE)
    private String bookingEnd;

    public LocalDateTime getBookingStart() {
        return LocalDateTime.parse(bookingStart, dateFormat);
    }

    public LocalDateTime getBookingEnd() {
        return LocalDateTime.parse(bookingEnd, dateFormat);
    }
}
