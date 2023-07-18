package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.entity.dto.StadiumDTO;
import com.nro.footballmanager.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StadiumServiceImpl implements StadiumService{
    @Autowired
    private StadiumRepository stadiumRepository;
    @Override
    public StadiumDTO saveStadium(Stadium s) {

        return StadiumDTO.EntityToDTO(stadiumRepository.save(s));
    }

    @Override
    public List<StadiumDTO> findAll() {
        List<StadiumDTO> stadiumDTOs = new ArrayList<StadiumDTO>();
        List<Stadium> stadiums = stadiumRepository.findAll();
        for(int i = 0; i<stadiums.size(); i++) {
            stadiumDTOs.add(StadiumDTO.EntityToDTO(stadiums.get(i)));
        }
        return stadiumDTOs;
    }

    @Override
    public Optional<Stadium> findStadiumById(Long id) {
        return stadiumRepository.findById(id);
    }

    @Override
    public Optional<Stadium> findStadiumByName(String n) {
        ArrayList<Optional<Stadium>> stadiums = (ArrayList<Optional<Stadium>>) stadiumRepository.findStadiumByName(n);
        return stadiums.get(0);
    }
    @Override
    public StadiumDTO updateStadium(Stadium s, Long id) {
        StadiumDTO old = StadiumDTO.EntityToDTO(stadiumRepository.findById(id).get());
        old.setName(s.getName());
        old.setLocation(s.getLocation());
        stadiumRepository.save(StadiumDTO.EntityFromDTO(old));
        return old;
        /*Stadium stadium = stadiumRepository.findById(id).get();
        if(Objects.nonNull(s.getName()) && !"".equalsIgnoreCase(s.getName())) {
            stadium.setName(s.getName());
        }
        if (Objects.nonNull(s.getLocation()) && !"".equalsIgnoreCase(s.getName())) {
            stadium.setName(s.getName());
        }
        if(Objects.nonNull(s.getGames())) {
            stadium.setGames(s.getGames());
        }
        return stadiumRepository.save(stadium);*/
    }

    @Override
    public void deleteStadiumById(Long id) {
        stadiumRepository.deleteById(id);
    }
}
