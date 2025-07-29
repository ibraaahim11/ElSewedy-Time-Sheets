package com.example.elsewedybackend.timesheets.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectHoursBudgetDTO {



	private BigDecimal projectId;
	private BigDecimal hoursBudget;
	private BigDecimal remainingHours;
	private BigDecimal tsHours;


}
