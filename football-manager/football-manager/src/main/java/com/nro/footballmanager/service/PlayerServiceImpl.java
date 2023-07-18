package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.dto.PlayerDTO;
import com.nro.footballmanager.entity.dto.TeamDTO;
import com.nro.footballmanager.repository.PlayerRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public PlayerDTO savePlayer(PlayerDTO p) {
        Player pl = PlayerDTO.EntityFromPlayerDTO(p);
        Player saved = playerRepository.save(pl);
        return PlayerDTO.EntityToPlayerDTO(saved);
    }

    @Override
    public List<PlayerDTO> findAll() {
        List<PlayerDTO> playerDTOs = new ArrayList<PlayerDTO>();
        List<Player> players = playerRepository.findAll();
        for(int i = 0; i<players.size(); i++) {
            playerDTOs.add(PlayerDTO.EntityToPlayerDTO(players.get(i)));
        }
        return playerDTOs;
    }

    @Override
    public PlayerDTO updatePlayer(Player p, Long id) {
        PlayerDTO old = PlayerDTO.EntityToPlayerDTO(playerRepository.findById(id).get());
        old.setName(p.getName());
        old.setGoalsScored(p.getGoalsScored());
        old.setRole(p.getRole());
        old.setTeam(TeamDTO.EntityToTeamDTO(p.getTeam()));
        Player new_ = PlayerDTO.EntityFromPlayerDTO(old);
        new_.setId(id);
        playerRepository.save(new_);
        return old;
        /*Player old = playerRepository.getById(id);
        if(Objects.nonNull(p.getName()) && !"".equalsIgnoreCase(p.getName())) {
            old.setName(p.getName());
        }
        if(Objects.nonNull(p.getGoalsScored())) {
            old.setGoalsScored(p.getGoalsScored());
        }
        if(Objects.nonNull(p.getRole())) {
            old.setRole(p.getRole());
        }
        if(Objects.nonNull(p.getTeam())) {
            old.setTeam(p.getTeam());
        }
        return playerRepository.save(old);*/
    }
    @Override
    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    @Override
    public List<Optional<Player>> getPlayersByName(String name) {
        return playerRepository.findPlayerByName(name);
    }
    @Override
    public void deletePlayerById(Long pid) {
        playerRepository.deleteById(pid);
    }


}

