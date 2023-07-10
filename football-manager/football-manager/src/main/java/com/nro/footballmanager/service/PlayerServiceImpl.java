package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.repository.PlayerRepository;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public Player savePlayer(Player p) {
        return playerRepository.save(p);
    }

    @Override
    public List<Player> getPlayers() {
        return (List<Player>) playerRepository.findAll();
    }

    @Override
    public Player updatePlayer(Player p, Long pid) {
        Player player = playerRepository.findById(pid).get();
        if(Objects.nonNull(p.getName()) && !"".equalsIgnoreCase(p.getName())) {
            player.setName(p.getName());
        }
        if(Objects.nonNull(p.getGoalsScored()) && p.getGoalsScored() >= 0) {
            player.setGoalsScored(p.getGoalsScored());
        }
        if(Objects.nonNull(p.getRole()) && !"".equalsIgnoreCase(String.valueOf(p.getRole()))) {
            player.setRole(p.getRole());
        }
        if(Objects.nonNull(p.getTeam())) {
            player.setTeam(p.getTeam());
        }
        return player;
    }

    @Override
    public void deletePlayerById(Long pid) {
        playerRepository.deleteById(pid);
    }

}

