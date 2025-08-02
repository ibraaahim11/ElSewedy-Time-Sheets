package com.example.elsewedybackend.manager_interface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.elsewedybackend.timesheets.entities.Position;

@Repository
public interface ManagerPositionRepository extends JpaRepository<Position, Integer> {
}