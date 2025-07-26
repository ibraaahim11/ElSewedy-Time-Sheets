package com.example.elsewedybackend.timesheets.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "WEEK_DAYS")
public class WeekDay {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "DAY_DATE")
	private LocalDate dayDate;

	@Column(name = "HOURS")
	private Double hours;



	@Column(name = "DAY_NAME")
	private String dayName;


	@ManyToOne
	@JoinColumn(name = "project_ts_id")  // FK to ProjectTimeSheet
	@JsonBackReference
	private ProjectTimeSheet projectTimeSheet;
}
