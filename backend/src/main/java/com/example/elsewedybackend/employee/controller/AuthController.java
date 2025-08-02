package com.example.elsewedybackend.employee.controller;



import com.example.elsewedybackend.manager_interface.repositories.EmployeeRepository;
import com.example.elsewedybackend.timesheets.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // ✅ Check if user exists
        Employee employee = employeeRepository.findByUsername(username).orElse(null);
        if (employee == null) {
            return ResponseEntity.status(401).body("❌ Username not found");
        }

        // ✅ Check password
        if (!employee.getPassword().equals(password)) {
            return ResponseEntity.status(401).body("❌ Invalid password");
        }

        // ✅ Prepare response (we don’t send password back)
        Map<String, Object> response = new HashMap<>();
        response.put("empId", employee.getEmpId());
        response.put("username", employee.getUsername());
        response.put("firstName", employee.getFirstName());
        response.put("lastName", employee.getLastName());
        response.put("role", employee.getRole());


        return ResponseEntity.ok(response);
    }
}
