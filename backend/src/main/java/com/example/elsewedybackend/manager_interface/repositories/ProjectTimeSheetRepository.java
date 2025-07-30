package com.example.elsewedybackend.manager_interface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.elsewedybackend.manager_interface.entity.ProjectTimeSheet;

public interface ProjectTimeSheetRepository extends JpaRepository<ProjectTimeSheet, Integer> {
    void deleteByProject_ProjectId(Integer projectId);
}
