package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Game;

import java.util.List;

public interface GameService {
    Game save (Game g);
    List<Game> getGames();
    Game update (Game g, Long id);
    void delete (Long id);
}
