package com.nicolas.schedule.repository;

import com.nicolas.schedule.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<List<Schedule>> findByRoomIdOrderByBookingStart(Long roomId);
    Optional<List<Schedule>> findByResponsibleIdOrderByBookingStart(Long responsibleId);
    List<Schedule> findByRoomIdAndBookingStartAndBookingEnd(Long roomId, LocalDateTime bookingStart, LocalDateTime bookingEnd);
    List<Schedule> findAllByOrderByBookingStartAsc();

    @Query(value = "FROM Schedule WHERE roomId = :roomId AND bookingStart = :bookingStart AND bookingEnd = :bookingEnd AND NOT id = :exclude")
    List<Schedule> validateConflicts(@Param("roomId") Long roomId, @Param("bookingStart") LocalDateTime bookingStart,
                                     @Param("bookingEnd") LocalDateTime bookingEnd, @Param("exclude") Long exclude);
}
