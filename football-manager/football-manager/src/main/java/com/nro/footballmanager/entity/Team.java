package com.nro.footballmanager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

@Entity
@Getter
@Setter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private int goalsScored;

    @Column
    private int goalsReceived;

    @Column
    private int victories;

    @Column
    private int defeats;

    @Column
    private int draws;

    @OneToMany(mappedBy = "team")
    private List<Player> players;

    @OneToMany(mappedBy = "team_one")
    private List<Game> games_as_one;

    @OneToMany(mappedBy = "team_two")
    private List<Game> games_as_two;


    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", goalsScored=" + goalsScored +
                ", goalsReceived=" + goalsReceived +
                ", victories=" + victories +
                ", defeats=" + defeats +
                ", draws=" + draws +
                ", games_as_one=" + games_as_one +
                ", games_as_two=" + games_as_two +
                '}';
    }

}
