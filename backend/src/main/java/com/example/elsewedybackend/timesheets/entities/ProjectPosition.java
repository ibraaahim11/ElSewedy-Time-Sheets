package com.example.elsewedybackend.timesheets.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "PROJECT_POSITIONS")
public class ProjectPosition {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "PROJECT_ID")
	private Integer projectId;

	@Column(name = "POSITION_ID")
	private Integer positionId;

	@Column(name = "HOURS_BUDGET")
	private Double hoursBudget;
}
