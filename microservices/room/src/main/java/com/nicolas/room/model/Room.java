package com.nicolas.room.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "tb_rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(name = "room_name")
    private String name;

    @Column(name = "room_size")
    private Integer size;

    @Column(name = "room_created_at")
    private LocalDateTime createdAt;

    @Column(name = "room_last_update_at")
    private LocalDateTime lastUpdateAt;
}
