package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Result;

import java.util.List;
import java.util.Optional;

public interface ResultService {
    Result saveResult(Result r);
    List<Result> findAll();
    Optional<Result> findResultById(Long id);
    Result updateResult(Result r, Long id);
    void deleteResultById(Long id);
}
