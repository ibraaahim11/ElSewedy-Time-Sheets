package com.example.elsewedybackend.manager_interface.entity;



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
	@Column(name="EMP_ID")
	private Integer empId;

	@OneToMany(mappedBy = "timeSheet", cascade = CascadeType.ALL, orphanRemoval = true)

	private List<ProjectTimeSheet> projectTimeSheets;

}