package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController {
    @Autowired
    private TeamService teamService;

    @PostMapping("/teams")
    public Team saveTeam(@RequestBody Team team) {
        return teamService.saveTeam(team);
    }

    @GetMapping("/teams")
    public List<Team> getTeam() {
        return teamService.getTeams();
    }

    @PutMapping("/teams/{id}")
    public Team updateTeam(@RequestBody Team team, @PathVariable("id") Long team_id) {
        return teamService.updateTeam(team, team_id);
    }

    @DeleteMapping("/teams/{id}")
    public String deleteTeamById(@PathVariable("id") Long team_id) {
        teamService.deleteTeam(team_id);
        return "Deleted successfully";
    }
}
