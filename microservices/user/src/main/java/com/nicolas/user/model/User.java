package com.nicolas.user.model;

import lombok.Data;

import javax.persistence.*;
import java.time.format.DateTimeFormatter;

@Data
@Entity
@Table(name = "tb_user")
public class User {

    protected static final DateTimeFormatter FORMATO_DATA = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_birth_date")
    private String birthDate;
}
