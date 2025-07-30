package com.example.elsewedybackend.login_interface.login_controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.elsewedybackend.login_interface.login_dtos.LoginRequest;
import com.example.elsewedybackend.manager_interface.entity.Employee;
import com.example.elsewedybackend.manager_interface.repositories.EmployeeRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Employee employee = employeeRepository.findByUsernameAndPassword(request.getUsername(), request.getPassword());
        if (employee != null) {
            return ResponseEntity.ok(employee.getEmpId());
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}