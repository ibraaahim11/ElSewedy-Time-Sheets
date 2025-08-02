package com.example.elsewedybackend.timesheets.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "PROJECT")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROJECT_ID")
	private Integer id;

	@Column(name = "PROJECT_NAME")
	private String name;

	@Column(name = "PROJECT_DESCRIPTION")
	private String description;

	@OneToMany(mappedBy = "project")
	@JsonBackReference
	private List<ProjectTimeSheet> projectTimeSheets;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "Emp_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonIgnore
	private Employee employee;


}
