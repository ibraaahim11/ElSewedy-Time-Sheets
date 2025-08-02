package com.example.elsewedybackend.manager_interface.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPositionBudget {
	public BigDecimal id;
	public String name;
	public BigDecimal hours;
}
