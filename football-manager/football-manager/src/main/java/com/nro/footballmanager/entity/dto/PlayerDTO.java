package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.entity.enums.RoleEnum;
import com.nro.footballmanager.repository.TeamRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

@Data
public class PlayerDTO {
    private String name;
    private int goalsScored;
    private RoleEnum role;
    private Long teamId;

    public static PlayerDTO EntityToPlayerDTO(Player p) {
        PlayerDTO playerDTO = new PlayerDTO();
        playerDTO.setName(p.getName());
        playerDTO.setGoalsScored(p.getGoalsScored());
        playerDTO.setRole(p.getRole());
        if(Objects.nonNull(p.getTeam()) && p.getTeam().getId()>0) {
            playerDTO.setTeamId(p.getTeam().getId());
        } else {
            playerDTO.setTeamId(0L);
        }
        return playerDTO;
    }
    public static Player EntityFromPlayerDTO(PlayerDTO playerDTO) {
        Player player = new Player();
        player.setName(playerDTO.getName());
        player.setGoalsScored(playerDTO.getGoalsScored());
        player.setRole(playerDTO.getRole());
        return player;
    }
}
