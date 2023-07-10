package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Result;
import com.nro.footballmanager.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ResultServiceImpl implements ResultService{
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public Result saveResult(Result r) {
        return resultRepository.save(r);
    }

    @Override
    public List<Result> getResults() {
        return resultRepository.findAll();
    }

    @Override
    public Result updateResult(Result r, Long id) {
        Result result = resultRepository.getById(id);
        if(Objects.nonNull(r.getGoals_team_one())) {
            result.setGoals_team_one(r.getGoals_team_one());
        }
        if(Objects.nonNull(r.getGoals_team_two())) {
            result.setGoals_team_two(r.getGoals_team_two());
        }
        if(Objects.nonNull(r.getGame())) {
            result.setGoals_team_two(r.getGoals_team_two());
        }
        return result;
    }

    @Override
    public void deleteResultById(Long id) {
        resultRepository.deleteById(id);
    }
}
