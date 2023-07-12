package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Game;
import com.nro.footballmanager.entity.dto.GameDTO;

import java.util.List;
import java.util.Optional;

public interface GameService {
    Game saveGame (Game g);
    List<Game> findAll();
    Optional<Game> findGameById(Long id);
    GameDTO updateGame (GameDTO g, Long id);
    void deleteGameById (Long id);
}
