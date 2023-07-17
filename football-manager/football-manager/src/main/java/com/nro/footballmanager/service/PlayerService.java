package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.dto.PlayerDTO;

import java.util.List;
import java.util.Optional;

public interface PlayerService {

    PlayerDTO savePlayer(PlayerDTO p);
    List<PlayerDTO> findAll();
    Optional<Player> getPlayerById(Long id);
    List<Optional<Player>> getPlayersByName(String name);
    PlayerDTO updatePlayer(Player p, Long id);
    void deletePlayerById(Long pid);
}
