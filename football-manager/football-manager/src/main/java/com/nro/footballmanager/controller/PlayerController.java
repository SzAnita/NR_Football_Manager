package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @PostMapping("/players")
    public Player savePlayer(@RequestBody Player player) {
        return playerService.savePlayer(player);
    }

    @GetMapping("/players")
    public List<Player> getPlayer() {
        return playerService.getPlayers();
    }

    @PutMapping("/players/{id}")
    public Player updatePlayer(@RequestBody Player player, @PathVariable("id") Long player_id) {
        return playerService.updatePlayer(player, player_id);
    }

    @DeleteMapping("/players/{id}")
    public String deletePlayerById(@PathVariable("id") Long player_id) {
        playerService.deletePlayerById(player_id);
        return "Deleted successfully";
    }
}
