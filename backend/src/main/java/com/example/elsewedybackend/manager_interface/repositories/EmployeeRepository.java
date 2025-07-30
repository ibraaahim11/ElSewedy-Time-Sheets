package com.example.elsewedybackend.manager_interface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.elsewedybackend.manager_interface.entity.Employee;



@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
  Employee findByUsernameAndPassword(String username, String password);
}