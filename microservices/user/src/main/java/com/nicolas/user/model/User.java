package com.nicolas.user.model;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "tb_users")
public class User {

    protected static final DateTimeFormatter FORMATO_DATA = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_birth_date")
    private LocalDate birthDate;

    @Column(name = "user_created_at")
    private LocalDateTime createdAt;

    @Column(name = "user_last_update_at")
    private LocalDateTime lastUpdateAt;
}
