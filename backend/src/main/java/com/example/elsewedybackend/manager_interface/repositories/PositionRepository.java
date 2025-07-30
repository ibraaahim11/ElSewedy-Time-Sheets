package com.example.elsewedybackend.manager_interface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.elsewedybackend.manager_interface.entity.Position;

@Repository
public interface PositionRepository extends JpaRepository<Position, Integer> {
}