package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TeamServiceImpl implements TeamService{
    @Autowired
    private TeamRepository teamRepository;
    @Override
    public Team saveTeam(Team t) {
        return teamRepository.save(t);
    }

    @Override
    public List<Team> getTeams() {
        return teamRepository.findAll();
    }

    @Override
    public Team updateTeam(Team t, Long tid) {
        Team team = teamRepository.findById(tid).get();
        if(Objects.nonNull(t.getName()) && !"".equalsIgnoreCase(t.getName())) {
            team.setName(t.getName());
        }
        if(Objects.nonNull(t.getGoalsScored())) {
            team.setGoalsScored(t.getGoalsScored());
        }
        if(Objects.nonNull(t.getGoalsReceived())) {
            team.setGoalsReceived(t.getGoalsReceived());
        }
        if(Objects.nonNull(t.getVictories())) {
            team.setVictories(t.getVictories());
        }
        if(Objects.nonNull(t.getDraws())) {
            team.setDraws(t.getDraws());
        }
        if(Objects.nonNull(t.getDefeats())) {
            team.setDefeats(t.getDefeats());
        }
        if(Objects.nonNull(t.getPlayers())) {
            team.setPlayers(t.getPlayers());
        }
        if(Objects.nonNull(t.getGames_as_one())) {
            team.setGames_as_one(t.getGames_as_one());
        }
        if(Objects.nonNull(t.getGames_as_two())) {
            team.setGames_as_two(t.getGames_as_two());
        }
        return team;
    }

    @Override
    public void deleteTeam(Long tid) {
        teamRepository.deleteById(tid);
    }
}
