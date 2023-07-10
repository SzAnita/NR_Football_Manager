package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;

import java.util.List;

public interface PlayerService {

    Player savePlayer(Player p);

    List<Player> getPlayers();

    Player updatePlayer (Player p, Long pid);

    void deletePlayerById(Long pid);
}
