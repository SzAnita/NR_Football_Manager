package com.nro.footballmanager.controller;

import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.repository.StadiumRepository;
import com.nro.footballmanager.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StadiumController {
    @Autowired
    private StadiumService stadiumService;

    @PostMapping("/stadiums")
    public Stadium saveStadium(@RequestBody Stadium s) {
        return stadiumService.saveStadium(s);
    }

    @GetMapping("/stadiums")
    public List<Stadium> getStadiums() {
        return stadiumService.getStadiums();
    }

    @PutMapping("/stadiums/{id}")
    public Stadium updateStadium(@RequestBody Stadium s, @PathVariable("id") Long id) {
        return stadiumService.updateStadium(s, id);
    }

    @DeleteMapping("/stadiums/{id}")
    public String deleteStadium(@PathVariable("id") Long id) {
        stadiumService.deleteStadium(id);
        return "Deleted successfully";
    }
}
