package com.nro.footballmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nro.footballmanager.entity.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}
