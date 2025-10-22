package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Game;
import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.entity.dto.GameDTO;
import com.nro.footballmanager.entity.dto.ResultDTO;
import com.nro.footballmanager.entity.dto.StadiumDTO;
import com.nro.footballmanager.entity.dto.TeamDTO;
import com.nro.footballmanager.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {
    @Autowired
    private GameRepository gameRepository;

    @Override
    public GameDTO saveGame(GameDTO g) {
        Game new_game = GameDTO.EntityFromDTO(g);
        Game saved_game = gameRepository.save(new_game);
        return GameDTO.EntityToDTO(saved_game);
    }

    @Override
    public List<GameDTO> findAll() {
        List<GameDTO> gameDTOs = new ArrayList<GameDTO>();
        List<Game> games = gameRepository.findAll();
        for(int i = 0; i<games.size(); i++) {
            gameDTOs.add(GameDTO.EntityToDTO(games.get(i)));
        }
        return gameDTOs;
    }

    @Override
    public Optional<Game> findGameById(Long id) {
        return gameRepository.findById(id);
    }

    @Override
    public GameDTO updateGame(Game g, Long id) {
        GameDTO old = GameDTO.EntityToDTO(gameRepository.findById(id).get());
        old.setTeamOne(TeamDTO.EntityToTeamDTO(g.getTeam_one()));
        old.setTeamTwo(TeamDTO.EntityToTeamDTO(g.getTeam_two()));
        old.setStadium(StadiumDTO.EntityToDTO(g.getStadium()));
        old.setDate(g.getDate());
        old.setResult(ResultDTO.ResultToResultDTO(g.getResult()));
        Game new_game = GameDTO.EntityFromDTO(old);
        new_game.setId(id);
        Game saved = gameRepository.save(new_game);
        return old;
    }

    @Override
    public void deleteGameById(Long id) {
        gameRepository.deleteById(id);
    }
}
