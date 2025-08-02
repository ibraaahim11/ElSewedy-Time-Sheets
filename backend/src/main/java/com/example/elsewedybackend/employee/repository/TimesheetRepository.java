package com.example.elsewedybackend.employee.repository;


import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TimesheetRepository extends JpaRepository<TimeSheet, Long> {

    List<TimeSheet> findByStartDateGreaterThanEqualAndEndDateLessThanEqual(LocalDate start, LocalDate end);

    List<TimeSheet> findByStartDateGreaterThanEqual(LocalDate start);

    List<TimeSheet> findByEndDateLessThanEqual(LocalDate end);

    List<TimeSheet> findByEmpId(Long empId);



}
