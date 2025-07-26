package com.example.elsewedybackend.timesheets.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "PROJECT_TIME_SHEETS")
public class ProjectTimeSheet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "TS_ID")
	@JsonBackReference
	private TimeSheet timeSheet;

	@ManyToOne
	@JoinColumn(name = "PROJECT_ID")
@JsonManagedReference
	private Project project;

	@OneToMany(mappedBy = "projectTimeSheet", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<WeekDay> weekDays;
}
