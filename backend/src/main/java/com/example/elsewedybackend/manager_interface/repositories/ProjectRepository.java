package com.example.elsewedybackend.manager_interface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.elsewedybackend.manager_interface.entity.Project;

@Repository

public interface ProjectRepository extends JpaRepository<Project, Integer> {
     List<Project> findByEmployeeEmpId(Integer empId);
}
