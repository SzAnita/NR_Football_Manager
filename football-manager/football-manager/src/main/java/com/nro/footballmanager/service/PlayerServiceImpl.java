package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.dto.PlayerDTO;
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
    public PlayerDTO savePlayer(Player p) {
        return PlayerDTO.EntityToPlayerDTO(playerRepository.save(p));
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
        PlayerDTO new_ = PlayerDTO.EntityToPlayerDTO(p);
        new_.setId(id);
        return PlayerDTO.EntityToPlayerDTO(playerRepository.save(PlayerDTO.EntityFromPlayerDTO(new_)));
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
    public void deletePlayerById(Long pid) {
        playerRepository.deleteById(pid);
    }


}

