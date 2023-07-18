package com.nro.footballmanager.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.nro.footballmanager.entity.Game;
import com.nro.footballmanager.entity.dto.GameDTO;
import com.nro.footballmanager.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;


import java.util.List;
import java.util.Optional;

@RestController
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping("/games")
    public ResponseEntity<GameDTO> saveGame(@RequestBody GameDTO game) {
        return new ResponseEntity<>(gameService.saveGame(game), HttpStatus.OK);
    }

    @GetMapping("/games")
    public ResponseEntity<List<GameDTO>> getGames() {
        return new ResponseEntity<>(gameService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/games/{id}")
    public ResponseEntity<GameDTO> getGameById(@PathVariable("id") Long id) {
        Optional<Game> g = gameService.findGameById(id);
        if(g.isPresent()) {
            return new ResponseEntity<>(GameDTO.EntityToDTO(g.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<GameDTO> updateGame(@RequestBody GameDTO game, @PathVariable("id") Long id) {
        Optional<Game> g = gameService.findGameById(id);
        if(g.isPresent()) {
            GameDTO persistedGame = gameService.updateGame(GameDTO.EntityFromDTO(game), id);
            return new ResponseEntity<>(persistedGame, HttpStatus.OK);
        }
        return new ResponseEntity<>(gameService.saveGame(game), HttpStatus.OK);
    }

    @DeleteMapping("/games/{id}")
    public ResponseEntity<HttpStatus> deleteGameById(@PathVariable("id") Long id) {
        Optional<Game> g = gameService.findGameById(id);
        if(g.isPresent()) {
            gameService.deleteGameById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
