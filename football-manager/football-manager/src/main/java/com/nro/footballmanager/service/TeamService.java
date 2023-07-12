package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Team;
import com.nro.footballmanager.entity.dto.TeamDTO;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    TeamDTO saveTeam(Team t);
    List<TeamDTO> findAll();
    Optional<Team> getTeamById(Long id);
    TeamDTO updateTeam(Team t, Long id);
    void deleteTeamById(Long id);
}
