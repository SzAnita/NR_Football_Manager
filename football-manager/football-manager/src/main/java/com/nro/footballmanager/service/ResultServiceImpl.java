package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.Result;
import com.nro.footballmanager.entity.dto.PlayerDTO;
import com.nro.footballmanager.entity.dto.ResultDTO;
import com.nro.footballmanager.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ResultServiceImpl implements ResultService{
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public ResultDTO saveResult(Result r) {
        return ResultDTO.ResultToResultDTO(resultRepository.save(r));
    }

    @Override
    public List<ResultDTO> findAll() {
        List<ResultDTO> resultDTOs = new ArrayList<ResultDTO>();
        List<Result> results = resultRepository.findAll();
        for(int i = 0; i<results.size(); i++) {
            resultDTOs.add(ResultDTO.ResultToResultDTO(results.get(i)));
        }
        return resultDTOs;
    }

    @Override
    public Optional<Result> findResultById(Long id) {
        return resultRepository.findById(id);
    }

    @Override
    public ResultDTO updateResult(Result r, Long id) {
        ResultDTO new_ = ResultDTO.ResultToResultDTO(r);
        new_.setId(id);
        resultRepository.save(ResultDTO.ResultFromResultDTO(new_));
        return new_;
        /*Result result = resultRepository.getById(id);
        result.setGoals_team_one(r.getGoals_team_one());
        result.setGoals_team_two(r.getGoals_team_two());
        if(Objects.nonNull(r.getGame())) {
            result.setGoals_team_two(r.getGoals_team_two());
        }
        return resultRepository.save(result);*/
    }

    @Override
    public void deleteResultById(Long id) {
        resultRepository.deleteById(id);
    }
}
