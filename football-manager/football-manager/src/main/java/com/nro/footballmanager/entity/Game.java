package com.nro.footballmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_one_id")
    private Team team_one;

    @ManyToOne
    @JoinColumn(name = "team_two_id")
    private Team team_two;

    @ManyToOne
    @JoinColumn(name = "stadium_id")
    private Stadium stadium;

    @Column
    private LocalDateTime date;

    @OneToOne
    @JoinColumn(name = "result_id")
    private Result result;
}
