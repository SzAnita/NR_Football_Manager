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
    public ResponseEntity<PlayerDTO> savePlayer(@RequestBody Player player) {
        return new ResponseEntity<>(playerService.savePlayer(player), HttpStatus.OK);
    }

    @GetMapping("/players")
    public ResponseEntity<List<PlayerDTO>> findAllPlayers() {
        List<PlayerDTO> allPlayers = playerService.findAll();
        return new ResponseEntity<>(allPlayers, HttpStatus.OK);
    }

    @GetMapping("/players/{id}")
    public ResponseEntity<PlayerDTO> findPlayerById(@PathVariable("id") Long id) {
        Optional<Player> p = playerService.getPlayerById(id);
        if (p.isPresent()) {
            return new ResponseEntity<>(PlayerDTO.EntityToPlayerDTO(p.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/players/{id}")
    public ResponseEntity<PlayerDTO> updatePlayer(@RequestBody Player player, @PathVariable("id") Long player_id) {
        Optional<Player> old = playerService.getPlayerById(player_id);
        if(old.isPresent()) {
            PlayerDTO persistedPlayer = playerService.updatePlayer(player, player_id);
            return new ResponseEntity<>(persistedPlayer, HttpStatus.OK);
        }
        return new ResponseEntity<>(playerService.savePlayer(player), HttpStatus.OK);
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<HttpStatus> deletePlayerById(@PathVariable("id") Long player_id) {
        Optional<Player> p = playerService.getPlayerById(player_id);
        if(p.isPresent()) {
            playerService.deletePlayerById(player_id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
