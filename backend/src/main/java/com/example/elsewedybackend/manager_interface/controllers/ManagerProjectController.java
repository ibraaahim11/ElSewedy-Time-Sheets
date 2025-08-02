package com.example.elsewedybackend.manager_interface.controllers;

import java.util.List;

import com.example.elsewedybackend.manager_interface.dtos.ProjectPositionBudget;
import com.example.elsewedybackend.manager_interface.repositories.ManagerPositionRepository;
import com.example.elsewedybackend.manager_interface.repositories.ManagerProjectPositionRepository;
import com.example.elsewedybackend.timesheets.entities.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.elsewedybackend.manager_interface.dtos.ProjectPositionAssignmentRequest;

import com.example.elsewedybackend.manager_interface.dtos.ProjectRequest;
import com.example.elsewedybackend.manager_interface.dtos.ProjectUpdateRequest;
import com.example.elsewedybackend.timesheets.entities.Project;
import com.example.elsewedybackend.manager_interface.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")

public class ManagerProjectController {

	@Autowired
	private ProjectService projectService;
	@Autowired
	private ManagerProjectPositionRepository managerProjectPositionRepository;
	@Autowired
	private ManagerPositionRepository managerPositionRepository;

	@PostMapping("")
	public ResponseEntity<Project> createProject(@RequestBody ProjectRequest projectRequest) {
		Project project = projectService.createProject(projectRequest);
		return ResponseEntity.ok(project);
	}


	@PostMapping("/assign-position")
	public ResponseEntity<String> assignProjectPosition(@RequestBody ProjectPositionAssignmentRequest request) {
		projectService.assignProjectPosition(request);
		return ResponseEntity.ok("Positions assigned successfully.");
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProject(@PathVariable Integer id) {
		try {
			projectService.deleteProjectById(id);
			return ResponseEntity.ok("Project deleted successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting project: " + e.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateProject(@PathVariable Integer id, @RequestBody ProjectUpdateRequest updateRequest) {
		try {
			Project updatedProject = projectService.updateProject(id, updateRequest);
			return ResponseEntity.ok(updatedProject);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error updating project: " + e.getMessage());
		}
	}


	@DeleteMapping("/{projectId}/positions/{positionId}")
	public ResponseEntity<?> deleteProjectPosition(@PathVariable Integer projectId, @PathVariable Integer positionId) {
		try {
			projectService.deleteProjectPosition(projectId, positionId);
			return ResponseEntity.ok("Position deleted successfully from project.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting position: " + e.getMessage());
		}
	}

	@GetMapping("/employee/{empId}")
	public List<Project> getProjectsByEmployeeId(@PathVariable Integer empId) {
		return projectService.getProjectsByEmployeeId(empId);
	}

	;

	@GetMapping("/{projectId}/positions")
	public List<ProjectPositionBudget> getProjectPositions(@PathVariable Integer projectId) {

		return managerProjectPositionRepository.findPositionsByProjectId(projectId);

	}
	@GetMapping("/positions")
			public List<Position> getAllPositions()
	{
return managerPositionRepository.findAll();
	}
}


     
  
   
   

    
