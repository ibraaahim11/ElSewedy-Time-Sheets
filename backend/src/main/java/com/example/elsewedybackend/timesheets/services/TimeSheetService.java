package com.example.elsewedybackend.timesheets.services;

import com.example.elsewedybackend.timesheets.entities.ProjectTimeSheet;
import com.example.elsewedybackend.timesheets.entities.TimeSheet;
import com.example.elsewedybackend.timesheets.entities.WeekDay;
import org.springframework.stereotype.Service;

@Service
public class TimeSheetService {
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