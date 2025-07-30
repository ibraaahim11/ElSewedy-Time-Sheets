package com.example.elsewedybackend.manager_interface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.elsewedybackend.manager_interface.entity.TimeSheet;

@Repository
public interface TimeSheetRepository extends JpaRepository<TimeSheet, Integer> {

    // Example custom method: find all time sheets by employee I
    // You can add more methods as needed
}