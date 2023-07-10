package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Team;

import java.util.List;

public interface TeamService {
    public Team saveTeam(Team t);
    public List<Team> getTeams();
    public Team updateTeam(Team t, Long tid);
    public void deleteTeam(Long tid);
}
