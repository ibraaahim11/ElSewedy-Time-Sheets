package com.example.elsewedybackend.employee.service;


import com.example.elsewedybackend.employee.repository.TimesheetRepository;
import com.example.elsewedybackend.timesheets.entities.ProjectTimeSheet;
import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import com.example.elsewedybackend.timesheets.entities.WeekDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TimeSheetService {

    @Autowired
    private TimesheetRepository timeSheetRepository;

    public List<TimeSheet> getTimeSheetsWithinDateRange(LocalDate start, LocalDate end) {
        return timeSheetRepository.findByStartDateGreaterThanEqualAndEndDateLessThanEqual(start, end);
    }

    public List<TimeSheet> getTimeSheetsFromStartDate(LocalDate start) {
        return timeSheetRepository.findByStartDateGreaterThanEqual(start);
    }

    public List<TimeSheet> getTimeSheetsUntilEndDate(LocalDate end) {
        return timeSheetRepository.findByEndDateLessThanEqual(end);
    }

    public List<TimeSheet> getTimeSheetsByEmployeeId(Long empId) {
        return timeSheetRepository.findByEmpId(empId);
    }

    public void setParentReferences(TimeSheet ts) {
        if (ts.getProjectTimeSheets() != null) {
            for (ProjectTimeSheet pts : ts.getProjectTimeSheets()) {
                pts.setTimeSheet(ts);
                if (pts.getWeekDays() != null) {
                    for (WeekDay wd : pts.getWeekDays()) {
                        wd.setProjectTimeSheet(pts);
                    }
                }
            }
        }
    }

}
