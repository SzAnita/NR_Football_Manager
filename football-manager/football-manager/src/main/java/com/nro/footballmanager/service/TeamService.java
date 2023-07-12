package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Team;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    Team saveTeam(Team t);
    List<Team> findAll();
    Optional<Team> getTeamById(Long id);
    Team updateTeam(Team t, Long id);
    void deleteTeamById(Long id);
    boolean exists(Long teamId);
}
