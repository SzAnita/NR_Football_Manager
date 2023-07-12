package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class StadiumController {
    @Autowired
    private StadiumService stadiumService;

    @PostMapping("/stadiums")
    public ResponseEntity<Stadium> saveStadium(@RequestBody Stadium s) {
        return new ResponseEntity<>(stadiumService.saveStadium(s), HttpStatus.OK);
    }

    @GetMapping("/stadiums")
    public ResponseEntity<List<Stadium>> getStadiums() {
        return new ResponseEntity<>(stadiumService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/stadiums/{id}")
    public ResponseEntity<Stadium> getStadiumById(@PathVariable("id") Long id) {
        Optional<Stadium> s = stadiumService.findStadiumById(id);
        if(s.isPresent()) {
            return new ResponseEntity<>(s.get(),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/stadiums/{id}")
    public ResponseEntity<Stadium> updateStadium(@RequestBody Stadium s, @PathVariable("id") Long id) {
        Optional<Stadium> old = stadiumService.findStadiumById(id);
        if (old.isPresent()) {
            Stadium persistedStadium = stadiumService.updateStadium(s, id);
            return new ResponseEntity<>(persistedStadium, HttpStatus.OK);
        }
        return new ResponseEntity<>(stadiumService.saveStadium(s), HttpStatus.OK);
    }

    @DeleteMapping("/stadiums/{id}")
    public ResponseEntity<HttpStatus> deleteStadiumById(@PathVariable("id") Long id) {
        Optional<Stadium> s = stadiumService.findStadiumById(id);
        if(s.isPresent()) {
            stadiumService.deleteStadiumById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
