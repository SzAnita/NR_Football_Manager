package com.nro.footballmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private int goals_team_one;

    @Column
    private int goals_team_two;

    @Column
    private boolean over;

    @OneToOne(mappedBy = "result")
    private Game game;
}
