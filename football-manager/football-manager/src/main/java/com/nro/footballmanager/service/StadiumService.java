package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Stadium;
import com.nro.footballmanager.entity.dto.StadiumDTO;

import java.util.List;
import java.util.Optional;

public interface StadiumService {
    StadiumDTO saveStadium(Stadium s);
    List<StadiumDTO> findAll();
    Optional<Stadium> findStadiumById(Long id);
    StadiumDTO updateStadium(Stadium s, Long id);
    void deleteStadiumById(Long id);
}
