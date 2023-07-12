package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.dto.PlayerDTO;
import com.nro.footballmanager.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @PostMapping("/players")
    public ResponseEntity<Player> savePlayer(@RequestBody Player player) {
        return new ResponseEntity<>(playerService.savePlayer(player), HttpStatus.OK);
    }

    @GetMapping("/players")
    public ResponseEntity<List<Player>> findAllPlayers() {
        List<Player> allPlayers = playerService.findAll();
        return new ResponseEntity<>(allPlayers, HttpStatus.OK);
    }

    @GetMapping("/players/{id}")
    public ResponseEntity<Player> findPlayerById(@PathVariable("id") Long id) {
        Optional<Player> p = playerService.getPlayerById(id);
        if (p.isPresent()) {
            return new ResponseEntity<>(p.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PutMapping("/players/{id}")
    public ResponseEntity<PlayerDTO> updatePlayer(@RequestBody PlayerDTO player, @PathVariable("id") Long player_id) {
        Optional<Player> old = playerService.getPlayerById(player_id);
        if(old.isPresent()) {
            PlayerDTO persistedPlayer = playerService.updatePlayer(player, player_id);
            return new ResponseEntity<>(persistedPlayer, HttpStatus.OK);
        }
        Player new_ = playerService.savePlayer(PlayerDTO.EntityFromPlayerDTO(player));
        return new ResponseEntity<>(PlayerDTO.EntityToPlayerDTO(new_), HttpStatus.OK);
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<HttpStatus> deletePlayerById(@PathVariable("id") Long player_id) {
        if(!playerService.exists(player_id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        playerService.deletePlayerById(player_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
