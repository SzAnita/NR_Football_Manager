package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Game;
import com.nro.footballmanager.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping("/games")
    public Game saveGame(@RequestBody Game game) {
        return gameService.save(game);
    }

    @GetMapping("/games")
    public List<Game> getGames() {
        return gameService.getGames();
    }

    @PutMapping("/games/{id}")
    public Game updateGame(@RequestBody Game game, @PathVariable("id") Long id) {
        return gameService.update(game, id);
    }

    @DeleteMapping("/games/{id}")
    public String deleteGameById(@PathVariable("id") Long id) {
        gameService.delete(id);
        return "Deleted successfully";
    }
}
