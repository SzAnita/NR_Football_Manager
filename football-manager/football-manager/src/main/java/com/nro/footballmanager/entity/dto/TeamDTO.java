package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Team;
import lombok.Data;

import java.util.Objects;

@Data
public class TeamDTO {
    private Long id;
    private String name;
    private int goalsScored;
    private int goalsReceived;
    private int victories;
    private int defeats;
    private int draws;

    public static TeamDTO EntityToTeamDTO(Team t) {
        TeamDTO teamDTO = new TeamDTO();
        if (Objects.nonNull(t)) {
            teamDTO.setId(t.getId());
            teamDTO.setName(t.getName());
            teamDTO.setGoalsScored(t.getGoalsScored());
            teamDTO.setGoalsReceived(t.getGoalsReceived());
            teamDTO.setVictories(t.getVictories());
            teamDTO.setDefeats(t.getDefeats());
            teamDTO.setDraws(t.getDraws());
        }
        return teamDTO;
    }

    public static Team EntityFromTeamDTO(TeamDTO teamDTO) {
        Team t = new Team();
        t.setId(teamDTO.getId());
        t.setName(teamDTO.getName());
        t.setGoalsScored(teamDTO.getGoalsScored());
        t.setGoalsReceived(teamDTO.getGoalsReceived());
        t.setVictories(teamDTO.getVictories());
        t.setDefeats(teamDTO.getDefeats());
        t.setDraws(teamDTO.getDraws());
        return t;
    }

}
