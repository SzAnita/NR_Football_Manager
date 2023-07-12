package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Stadium;
import lombok.Data;

import javax.swing.text.html.parser.Entity;

@Data
public class StadiumDTO {
    private Long id;
    private String location;
    private String name;

    public static StadiumDTO EntityToDTO(Stadium s) {
        StadiumDTO stadiumDTO = new StadiumDTO();
        stadiumDTO.setId(s.getId());
        stadiumDTO.setLocation(s.getLocation());
        stadiumDTO.setName(s.getName());
        return stadiumDTO;
    }

    public static Stadium EntityFromDTO(StadiumDTO stadiumDTO) {
        Stadium s = new Stadium();
        s.setId(stadiumDTO.getId());
        s.setLocation(stadiumDTO.getLocation());
        s.setName(stadiumDTO.getName());
        return s;
    }
}
