package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.Result;
import com.nro.footballmanager.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {
    @Autowired
    private ResultService resultService;
    @PostMapping("/results")
    public Result saveResult(@RequestBody Result result) {
        return resultService.saveResult(result);
    }

    @GetMapping("/results")
    public List<Result> getPlayer() {
        return resultService.getResults();
    }

    @PutMapping("/results/{id}")
    public Result updateResult(@RequestBody Result result, @PathVariable("id") Long id) {
        return resultService.updateResult(result, id);
    }

    @DeleteMapping("/results/{id}")
    public String deleteResultById(@PathVariable("id") Long id) {
        resultService.deleteResultById(id);
        return "Deleted successfully";
    }
}
