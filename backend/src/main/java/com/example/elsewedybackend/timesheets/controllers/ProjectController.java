package com.example.elsewedybackend.timesheets.controllers;

import com.example.elsewedybackend.timesheets.entities.Project;
import com.example.elsewedybackend.timesheets.repositories.ProjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

	private final ProjectRepository projectRepository;

	public ProjectController(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}


	// GET /projects/assigned?employeeId=5
	@GetMapping("/assigned")
	public List<Project> getAssignedProjects(@RequestParam Integer employeeId) {
		return projectRepository.getAssignedProjects(employeeId);
	}
}