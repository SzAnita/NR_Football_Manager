package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Player;
import com.nro.footballmanager.entity.Result;
import com.nro.footballmanager.entity.dto.ResultDTO;
import com.nro.footballmanager.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ResultController {
    @Autowired
    private ResultService resultService;
    @PostMapping("/results")
    public ResponseEntity<ResultDTO> saveResult(@RequestBody Result result) {
        return new ResponseEntity<>(resultService.saveResult(result), HttpStatus.OK);
    }
    @GetMapping("/results")
    public ResponseEntity<List<ResultDTO>> getResults() {
        return new ResponseEntity<>(resultService.findAll(), HttpStatus.OK);
    }
    @GetMapping("/results/{id}")
    public ResponseEntity<ResultDTO> getResultById(@PathVariable("id") Long id) {
        Optional<Result> r = resultService.findResultById(id);
        if(r.isPresent()) {
            return new ResponseEntity<>(ResultDTO.ResultToResultDTO(r.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/results/{id}")
    public ResponseEntity<ResultDTO> updateResult(@RequestBody Result result, @PathVariable("id") Long id) {
        Optional<Result> old = resultService.findResultById(id);
        if(old.isPresent()) {
            ResultDTO persistedResult = resultService.updateResult(result, id);
            return new ResponseEntity<>(persistedResult, HttpStatus.OK);
        }
        return new ResponseEntity<>(resultService.saveResult(result), HttpStatus.OK);
    }

    @DeleteMapping("/results/{id}")
    public ResponseEntity<HttpStatus> deleteResultById(@PathVariable("id") Long id) {
        Optional<Result> r = resultService.findResultById(id);
        if(r.isPresent()) {
            resultService.deleteResultById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
