package com.nicolas.schedule.repository;

import com.nicolas.schedule.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByRoomIdOrderByBookingStart(Long roomId);
    List<Schedule> findByResponsibleIdOrderByBookingStart(Long responsibleId);
    List<Schedule> findByRoomIdAndBookingStartAndBookingEnd(Long roomId, LocalDateTime bookingStart, LocalDateTime bookingEnd);
    List<Schedule> findAllByOrderByBookingStartAsc();

    @Query(value = "FROM Schedule WHERE date(bookingStart) = :date")
    List<Schedule> findByDate(@Param("date") Date date);
    @Query(value = "FROM Schedule WHERE roomId = :roomId AND bookingStart = :bookingStart AND bookingEnd = :bookingEnd AND NOT id = :exclude")
    List<Schedule> validateConflicts(@Param("roomId") Long roomId, @Param("bookingStart") LocalDateTime bookingStart,
                                     @Param("bookingEnd") LocalDateTime bookingEnd, @Param("exclude") Long exclude);
}
