package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Result;

import java.util.List;

public interface ResultService {
    public Result saveResult(Result r);
    public List<Result> getResults();
    public Result updateResult(Result r, Long id);
    public void deleteResultById(Long id);
}
