package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Game;
import com.nro.footballmanager.entity.dto.GameDTO;

import java.util.List;
import java.util.Optional;

public interface GameService {
    GameDTO saveGame (GameDTO g);
    List<GameDTO> findAll();
    Optional<Game> findGameById(Long id);
    GameDTO updateGame (Game g, Long id);
    void deleteGameById (Long id);
}
