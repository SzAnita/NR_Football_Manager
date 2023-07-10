package com.nro.footballmanager.service;

import com.nro.footballmanager.entity.Stadium;

import java.util.List;

public interface StadiumService {
    Stadium saveStadium(Stadium s);
    List<Stadium> getStadiums();
    Stadium updateStadium(Stadium s, Long id);
    void deleteStadium(Long id);
}
