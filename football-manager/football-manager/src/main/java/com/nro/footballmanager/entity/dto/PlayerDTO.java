package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.enums.RoleEnum;
import lombok.Data;

import java.util.Objects;

@Data
public class PlayerDTO {
    private Long id;
    private String name;
    private int goalsScored;
    private RoleEnum role;
    private TeamDTO team;

    public static PlayerDTO EntityToPlayerDTO(Player p) {
        PlayerDTO playerDTO = new PlayerDTO();
        playerDTO.setId(p.getId());
        playerDTO.setName(p.getName());
        playerDTO.setGoalsScored(p.getGoalsScored());
        playerDTO.setRole(p.getRole());
        playerDTO.setTeam(TeamDTO.EntityToTeamDTO(p.getTeam()));
        return playerDTO;
    }
    public static Player EntityFromPlayerDTO(PlayerDTO playerDTO) {
        Player player = new Player();
        player.setName(playerDTO.getName());
        player.setGoalsScored(playerDTO.getGoalsScored());
        player.setRole(playerDTO.getRole());
        player.setTeam(TeamDTO.EntityFromTeamDTO(playerDTO.getTeam()));
        return player;
    }
}
