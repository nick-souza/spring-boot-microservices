package com.nicolas.schedule.repository;

import com.nicolas.schedule.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<List<Schedule>> findByRoomIdOrderByBookingStart(Long roomId);
    Optional<List<Schedule>> findByResponsibleIdOrderByBookingStart(Long responsibleId);
    Optional<Schedule> findByRoomIdAndBookingStartAndBookingEnd(Long roomId, LocalDateTime bookingStart, LocalDateTime bookingEnd);
}
