package com.example.elsewedybackend.timesheets.controllers;

import com.example.elsewedybackend.employee.service.TimeSheetService;
import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import com.example.elsewedybackend.employee.repository.TimesheetRepository;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import com.example.elsewedybackend.timesheets.repositories.ProjectRepository;

@RestController
@RequestMapping("/api/timesheets")
@CrossOrigin(origins = "http://localhost:5173")

public class TimesheetController {

	private final TimesheetRepository timesheetRepository;
	private final ProjectRepository projectRepository;
	private final TimeSheetService timeSheetService;

	public TimesheetController(TimesheetRepository timesheetRepository, ProjectRepository projectRepository, TimeSheetService timeSheetService) {
		this.timesheetRepository = timesheetRepository;
		this.projectRepository = projectRepository;
		this.timeSheetService = timeSheetService;
	}

	@GetMapping("/{tsId}")
	public ResponseEntity<?> findFullTimeSheet(@PathVariable Integer tsId) {
		Optional<TimeSheet> ts = timesheetRepository.findById(Long.valueOf(tsId));
		if (ts.isPresent())
			return ResponseEntity.ok(ts.get());
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timesheet "+ tsId +" not found.");

	}

	// fully deletes timesheet with accompanying data in other tables.
	@DeleteMapping("/{tsId}")
	public ResponseEntity<String> deleteTimeSheet(@PathVariable Integer tsId) {
		Optional<TimeSheet> ts = timesheetRepository.findById(Long.valueOf(tsId));

		if (ts.isPresent()) {
			timesheetRepository.deleteById(Long.valueOf(tsId));
			return ResponseEntity.ok("Timesheet "+ tsId +" deleted successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timesheet "+ tsId +" not found.");
		}
	}

	@PostMapping("")
	public ResponseEntity<?> insertFullTimeSheet(@RequestBody TimeSheet ts) {
		try {
			if (ts == null) {
				return ResponseEntity.badRequest().body("Request body is missing or invalid.");
			}
			timeSheetService.setParentReferences(ts);
			TimeSheet saved = timesheetRepository.save(ts);


			return ResponseEntity.status(HttpStatus.CREATED).body(saved);
		} catch (Exception e) {
			// Log the error in real code!
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while saving the timesheet: " + e.getMessage());
		}
	}

	@PutMapping("/{tsId}")
	public ResponseEntity<?> updateTimeSheet(@PathVariable Integer tsId, @RequestBody TimeSheet ts) {

		try {
			if (timesheetRepository.findById(Long.valueOf(tsId)).isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timesheet "+ tsId +" not found.");
			}
			ts.setId(tsId);

			// Set parent references for nested objects
			timeSheetService.setParentReferences(ts);

			TimeSheet saved = timesheetRepository.save(ts);

			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			// Log the error in real code!
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while saving the timesheet: " + e.getMessage());
		}

	}

}