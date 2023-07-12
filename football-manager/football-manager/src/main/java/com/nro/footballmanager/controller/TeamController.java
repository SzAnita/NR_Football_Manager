package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.entity.dto.TeamDTO;
import com.nro.footballmanager.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TeamController {
    @Autowired
    private TeamService teamService;

    @PostMapping("/teams")
    public ResponseEntity<TeamDTO> saveTeam(@RequestBody Team team) {
        return new ResponseEntity<>(teamService.saveTeam(team), HttpStatus.OK);
    }
    @GetMapping("/teams")
    public ResponseEntity<List<TeamDTO>> getTeams() {
        return new ResponseEntity<>(teamService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/teams/{id}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable("id") Long id) {
        Optional<Team> team = teamService.getTeamById(id);
        if(team.isPresent()) {
            return new ResponseEntity<>(TeamDTO.EntityToTeamDTO(team.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/teams/{id}")
    public ResponseEntity<TeamDTO> updateTeam(@RequestBody Team team, @PathVariable("id") Long team_id) {
        Optional<Team> old = teamService.getTeamById(team_id);
        if(old.isPresent()) {
            TeamDTO persistedTeam = teamService.updateTeam(team, team_id);
            return new ResponseEntity<>(persistedTeam, HttpStatus.OK);
        }
        return new ResponseEntity<>(teamService.saveTeam(team), HttpStatus.OK);
    }

    @DeleteMapping("/teams/{id}")
    public ResponseEntity<HttpStatus> deleteTeamById(@PathVariable("id") Long id) {
        Optional<Team> t = teamService.getTeamById(id);
        if(t.isPresent()) {
            teamService.deleteTeamById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
