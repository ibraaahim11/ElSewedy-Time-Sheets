package com.example.elsewedybackend.manager_interface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.elsewedybackend.manager_interface.entity.WeekDay;

public interface WeekDayRepository extends JpaRepository<WeekDay, Integer> {
}
