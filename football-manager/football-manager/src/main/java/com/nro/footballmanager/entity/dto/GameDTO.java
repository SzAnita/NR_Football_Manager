package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Game;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Data
public class GameDTO {
    private Long id;
    private TeamDTO teamOne;
    private TeamDTO teamTwo;
    private StadiumDTO stadium;
    private LocalDateTime date;
    private ResultDTO result;
    private Boolean over;

    public static GameDTO EntityToDTO(Game g) {
        GameDTO gameDTO = new GameDTO();
        gameDTO.setId(g.getId());
        gameDTO.setTeamOne(TeamDTO.EntityToTeamDTO(g.getTeam_one()));
        gameDTO.setTeamTwo(TeamDTO.EntityToTeamDTO(g.getTeam_two()));
        gameDTO.setDate(g.getDate());
        gameDTO.setStadium(StadiumDTO.EntityToDTO(g.getStadium()));
        if(Objects.nonNull(g.getResult())) {
            gameDTO.setResult(ResultDTO.ResultToResultDTO(g.getResult()));
        } else {
            gameDTO.setResult(null);
        }
        gameDTO.setOver(g.getOver());
        return gameDTO;
    }
    public static Game EntityFromDTO(GameDTO gameDTO) {
        Game g = new Game();
        g.setId(gameDTO.getId());
        g.setTeam_one(TeamDTO.EntityFromTeamDTO(gameDTO.getTeamOne()));
        g.setTeam_two(TeamDTO.EntityFromTeamDTO(gameDTO.getTeamTwo()));
        g.setStadium(StadiumDTO.EntityFromDTO(gameDTO.getStadium()));
        g.setDate(gameDTO.getDate());
        if(Objects.nonNull(gameDTO.getResult())) {
            g.setResult(ResultDTO.ResultFromResultDTO(gameDTO.getResult()));
        } else {
            g.setResult(null);
        }
        return g;
    }
}
