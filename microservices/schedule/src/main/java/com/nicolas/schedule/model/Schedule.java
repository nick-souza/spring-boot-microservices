package com.nicolas.schedule.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tb_schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sch_id")
    private Long id;

    @Column(name = "user_id")
    private String responsibleId;

    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "sch_booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "sch_created_at")
    private LocalDateTime createdAt;

    @Column(name = "sch_last_update_at")
    private LocalDateTime lastUpdateAt;
}
