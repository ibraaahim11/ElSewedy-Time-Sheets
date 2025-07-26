package com.example.elsewedybackend.timesheets.repositories;


import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimesheetRepository extends JpaRepository<TimeSheet, Integer> {

}
