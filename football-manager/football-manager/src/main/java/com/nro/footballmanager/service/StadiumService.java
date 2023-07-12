package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Stadium;

import java.util.List;
import java.util.Optional;

public interface StadiumService {
    Stadium saveStadium(Stadium s);
    List<Stadium> findAll();
    Optional<Stadium> findStadiumById(Long id);
    Stadium updateStadium(Stadium s, Long id);
    void deleteStadiumById(Long id);
}
