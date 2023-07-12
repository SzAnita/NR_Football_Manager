package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.dto.PlayerDTO;

import java.util.List;
import java.util.Optional;

public interface PlayerService {

    Player savePlayer(Player p);
    List<Player> findAll();
    Optional<Player> getPlayerById(Long id);
    PlayerDTO updatePlayer(PlayerDTO p, Long id);
    void deletePlayerById(Long pid);
    boolean exists(Long id);
}
