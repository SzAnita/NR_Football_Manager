package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Result;
import com.nro.footballmanager.entity.dto.ResultDTO;

import java.util.List;
import java.util.Optional;

public interface ResultService {
    ResultDTO saveResult(ResultDTO r);
    List<ResultDTO> findAll();
    Optional<Result> findResultById(Long id);
    ResultDTO updateResult(Result r, Long id);
    void deleteResultById(Long id);
}
