package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StadiumServiceImpl implements StadiumService{
    @Autowired
    private StadiumRepository stadiumRepository;
    @Override
    public Stadium saveStadium(Stadium s) {
        return stadiumRepository.save(s);
    }

    @Override
    public List<Stadium> findAll() {
        return stadiumRepository.findAll();
    }

    @Override
    public Optional<Stadium> findStadiumById(Long id) {
        return stadiumRepository.findById(id);
    }

    @Override
    public Stadium updateStadium(Stadium s, Long id) {
        Stadium stadium = stadiumRepository.findById(id).get();
        if(Objects.nonNull(s.getName()) && !"".equalsIgnoreCase(s.getName())) {
            stadium.setName(s.getName());
        }
        if (Objects.nonNull(s.getLocation()) && !"".equalsIgnoreCase(s.getName())) {
            stadium.setName(s.getName());
        }
        if(Objects.nonNull(s.getGames())) {
            stadium.setGames(s.getGames());
        }
        return stadiumRepository.save(stadium);
    }

    @Override
    public void deleteStadiumById(Long id) {
        stadiumRepository.deleteById(id);
    }
}
