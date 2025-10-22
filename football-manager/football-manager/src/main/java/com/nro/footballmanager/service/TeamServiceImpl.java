package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.entity.dto.TeamDTO;
import com.nro.footballmanager.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService{
    @Autowired
    private TeamRepository teamRepository;
    @Override
    public TeamDTO saveTeam(TeamDTO t) {
        Team savedTeam = teamRepository.save(TeamDTO.EntityFromTeamDTO(t));
        return TeamDTO.EntityToTeamDTO(savedTeam);
    }

    @Override
    public List<TeamDTO> findAll() {
        List<TeamDTO> teamDTOs = new ArrayList<TeamDTO>();
        List<Team> teams = teamRepository.findAll();
        for (Team team : teams) {
            teamDTOs.add(TeamDTO.EntityToTeamDTO(team));
        }
        return teamDTOs;
    }

    @Override
    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    @Override
    public Optional<Team> getTeamByName(String name) {
        return teamRepository.findByName(name);
    }

    @Override
    public TeamDTO updateTeam(Team t, Long id) {
        TeamDTO old = TeamDTO.EntityToTeamDTO(teamRepository.findById(id).get());
        old.setName(t.getName());
        old.setGoalsScored(t.getGoalsScored());
        old.setGoalsReceived(t.getGoalsReceived());
        old.setVictories(t.getVictories());
        old.setDraws(t.getDraws());
        old.setDefeats(t.getDefeats());
        teamRepository.save(TeamDTO.EntityFromTeamDTO(old));
        return old;
    }
    @Override
    public void deleteTeamById(Long tid) {
        teamRepository.deleteById(tid);
    }
}
