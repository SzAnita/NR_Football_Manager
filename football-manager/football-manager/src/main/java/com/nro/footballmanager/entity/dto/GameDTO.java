package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Game;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

@Data
public class GameDTO {
    private Long teamOneId;
    private Long teamTwoId;
    private Long stadiumId;
    private LocalTime startHour;
    private LocalDate date;
    private Long ResultId;

    public static GameDTO EntityToGameDTO(Game g) {
        GameDTO gameDTO = new GameDTO();
        if(Objects.nonNull(g.getTeam_one())) {
            gameDTO.setTeamOneId(g.getTeam_one().getId());
        } else {
            gameDTO.setTeamOneId(0L);
        }
        if(Objects.nonNull(g.getTeam_two())) {
            gameDTO.setTeamTwoId(g.getTeam_two().getId());
        } else {
            gameDTO.setTeamTwoId(0L);
        }
        if (Objects.nonNull(g.getStadium())) {
            gameDTO.setStadiumId(g.getStadium().getId());
        } else {
            gameDTO.setStadiumId(0L);
        }
        gameDTO.setStartHour(g.getStart_hour());
        gameDTO.setDate(g.getDate());
        if(Objects.nonNull(g.getResult())) {
            gameDTO.setResultId(g.getResult().getId());
        } else {
            gameDTO.setResultId(0L);
        }
        return gameDTO;
    }

    public static Game EntityFromGameDTO(GameDTO gameDTO) {
        Game game = new Game();
        game.setStart_hour(gameDTO.getStartHour());
        game.setDate(gameDTO.getDate());
        return game;
    }
}

