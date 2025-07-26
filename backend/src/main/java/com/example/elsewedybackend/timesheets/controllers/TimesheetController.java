package com.example.elsewedybackend.timesheets.controllers;


import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import com.example.elsewedybackend.timesheets.repositories.TimesheetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/timesheets")
public class TimesheetController {

	private final TimesheetRepository timesheetRepository;

	public TimesheetController(TimesheetRepository timesheetRepository) {
		this.timesheetRepository = timesheetRepository;
	}


	@GetMapping("/{tsId}")
	public Optional<TimeSheet> findFullTimeSheet(@PathVariable Integer tsId) {
		return timesheetRepository.findById(tsId);
	}

	// fully deletes timesheet with accompanying data in other tables.
	@DeleteMapping("/{tsId}")
	public ResponseEntity<String> deleteTimeSheet(@PathVariable Integer tsId) {
		Optional<TimeSheet> ts = timesheetRepository.findById(tsId);

		if (ts.isPresent()) {
			timesheetRepository.deleteById(tsId);
			return ResponseEntity.ok("Timesheet deleted successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timesheet not found.");
		}
	}


}