package com.example.elsewedybackend.timesheets.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "EMPLOYEE")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EMP_ID")
	private Integer empId;

	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
	private String role;
	private String status;
	private Integer positionId;


}
