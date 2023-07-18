package com.nro.footballmanager.repository;

import com.nro.footballmanager.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StadiumRepository extends JpaRepository<Stadium, Long> {
    List<Optional<Stadium>> findStadiumByName(String name);
}
