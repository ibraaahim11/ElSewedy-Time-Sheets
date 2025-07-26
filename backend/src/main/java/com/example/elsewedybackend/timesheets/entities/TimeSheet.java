package com.example.elsewedybackend.timesheets.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "TIME_SHEET")
public class TimeSheet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TS_ID")
	private Integer id;

	@Column(name = "START_DATE")
	private LocalDate startDate;

	@Column(name = "END_DATE")
	private LocalDate endDate;

	@Column(name = "TS_NAME")
	private String name;



//	@ManyToOne
//	@JoinColumn(name="EMP_ID")
//	private Employee CreatorEmployee;

	@OneToMany(mappedBy = "timeSheet", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<ProjectTimeSheet> projectTimeSheets;

}
