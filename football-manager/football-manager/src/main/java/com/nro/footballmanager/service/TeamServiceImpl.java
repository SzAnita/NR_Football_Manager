package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService{
    @Autowired
    private TeamRepository teamRepository;
    @Override
    public Team saveTeam(Team t) {
        return teamRepository.save(t);
    }

    @Override
    public List<Team> findAll() {
        return teamRepository.findAll();
    }

    @Override
    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    @Override
    public Team updateTeam(Team t, Long tid) {
        Team team = teamRepository.findById(tid).get();
        if(Objects.nonNull(t.getName()) && !"".equalsIgnoreCase(t.getName())) {
            team.setName(t.getName());
        }
        team.setGoalsScored(t.getGoalsScored());
        team.setGoalsReceived(t.getGoalsReceived());
        team.setVictories(t.getVictories());
        team.setDraws(t.getDraws());
        team.setDefeats(t.getDefeats());
        if(Objects.nonNull(t.getPlayers())) {
            team.setPlayers(t.getPlayers());
        }
        if(Objects.nonNull(t.getGames_as_one())) {
            team.setGames_as_one(t.getGames_as_one());
        }
        if(Objects.nonNull(t.getGames_as_two())) {
            team.setGames_as_two(t.getGames_as_two());
        }
        return teamRepository.save(team);
    }
    @Override
    public void deleteTeamById(Long tid) {
        teamRepository.deleteById(tid);
    }

    @Override
    public boolean exists(Long teamId) {
        return teamRepository.existsById(teamId);
    }
}
