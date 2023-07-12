package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.dto.PlayerDTO;
import com.nro.footballmanager.repository.PlayerRepository;
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
    public Player savePlayer(Player p) {
        return playerRepository.save(p);
    }

    @Override
    public List<Player> findAll() {
        return playerRepository.findAll();
    }

    @Override
    public PlayerDTO updatePlayer(PlayerDTO p, Long id) {
        Player new_ = PlayerDTO.EntityFromPlayerDTO(p);
        new_.setId(id);
        playerRepository.save(new_);
        return p;
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

    @Override
    public boolean exists(Long id) {
        return playerRepository.existsById(id);
    }

}

