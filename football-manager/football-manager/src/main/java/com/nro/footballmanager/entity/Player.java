package com.nro.footballmanager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nro.footballmanager.entity.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;
    @Column
    private String name;

    @Column
    private int goalsScored;

    @Column
    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @ManyToOne()
    @JoinColumn(name = "team_id")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Team team;


}
