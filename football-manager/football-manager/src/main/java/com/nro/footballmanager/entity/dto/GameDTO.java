package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Game;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class GameDTO {
    private Long id;
    private TeamDTO teamOne;
    private TeamDTO teamTwo;
    private StadiumDTO stadium;
    private LocalTime start_hour;
    private LocalDate date;
    private ResultDTO result;

    public static GameDTO EntityToDTO(Game g) {
        GameDTO gameDTO = new GameDTO();
        gameDTO.setId(g.getId());
        gameDTO.setTeamOne(TeamDTO.EntityToTeamDTO(g.getTeam_one()));
        gameDTO.setTeamTwo(TeamDTO.EntityToTeamDTO(g.getTeam_two()));
        gameDTO.setStart_hour(g.getStart_hour());
        gameDTO.setDate(g.getDate());
        gameDTO.setStadium(StadiumDTO.EntityToDTO(g.getStadium()));
        return gameDTO;
    }
    public static Game EntityFromDTO(GameDTO gameDTO) {
        Game g = new Game();
        g.setId(gameDTO.getId());
        g.setStart_hour(gameDTO.getStart_hour());
        g.setDate(gameDTO.getDate());
        return g;
    }
}
