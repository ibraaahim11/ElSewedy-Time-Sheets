package com.example.elsewedybackend.manager_interface.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeProjectTimeSheet {

	String firstName;
	String lastName;
	String positionName;
	String tsName;
	BigDecimal hoursWorked;

}
