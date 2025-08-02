package com.example.elsewedybackend.employee.controller;

import com.example.elsewedybackend.employee.service.TimeSheetService;

import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/timesheets")
@CrossOrigin(origins = "http://localhost:5173")

public class TimeSheetController {

    @Autowired
    private TimeSheetService timeSheetService;

    @GetMapping("/search")
    public List<TimeSheet> searchTimeSheets(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return timeSheetService.getTimeSheetsWithinDateRange(start, end);
    }

    @GetMapping("/search-by-start")
    public List<TimeSheet> searchByStartDate(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start) {
        return timeSheetService.getTimeSheetsFromStartDate(start);
    }

    @GetMapping("/search-by-end")
    public List<TimeSheet> searchByEndDate(
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return timeSheetService.getTimeSheetsUntilEndDate(end);
    }

    @GetMapping("/employee/{empId}")
    public List<TimeSheet> getTimeSheetsForEmployee(@PathVariable Long empId) {
        return timeSheetService.getTimeSheetsByEmployeeId(empId);
    }


}
