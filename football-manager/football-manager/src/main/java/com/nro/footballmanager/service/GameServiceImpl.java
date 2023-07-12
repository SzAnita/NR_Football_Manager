package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Game;
import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.entity.dto.GameDTO;
import com.nro.footballmanager.entity.dto.StadiumDTO;
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
    public GameDTO saveGame(Game g) {
        return GameDTO.EntityToDTO(gameRepository.save(g));
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
        GameDTO new_ = GameDTO.EntityToDTO(g);
        new_.setId(id);
        gameRepository.save(GameDTO.EntityFromDTO(new_));
        return new_;
        /*Game game = gameRepository.findById(id).get();
        if(Objects.nonNull(g.getTeam_one())) {
            game.setTeam_one(g.getTeam_one());
        }
        if(Objects.nonNull(g.getTeam_two())) {
            game.setTeam_two(g.getTeam_two());
        }
        if (Objects.nonNull(g.getStadium())) {
            game.setStadium(g.getStadium());
        }
        if(Objects.nonNull(g.getStart_hour())) {
            game.setStart_hour(g.getStart_hour());
        }
        if(Objects.nonNull(g.getDate())) {
            game.setDate(g.getDate());
        }
        if(Objects.nonNull(g.getResult())) {
            game.setResult(g.getResult());
        }
        return gameRepository.save(game);*/
    }

    @Override
    public void deleteGameById(Long id) {
        gameRepository.deleteById(id);
    }
}
