package com.example.elsewedybackend.timesheets.controllers;


import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import com.example.elsewedybackend.timesheets.repositories.TimesheetRepository;
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
		public Optional<TimeSheet> findFullTimeSheet(@PathVariable Integer tsId)
	 {
return timesheetRepository.findById(tsId);
	 }




}