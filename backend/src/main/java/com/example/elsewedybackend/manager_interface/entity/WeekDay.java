package com.example.elsewedybackend.manager_interface.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "WEEK_DAYS")
public class WeekDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "DAY_DATE")
    private LocalDate dayDate;

    @Column(name = "HOURS")
    private Integer hours;

    @Column(name = "DAY_NAME")
    private String dayName;

    @ManyToOne
    @JoinColumn(name = "PROJECT_TS_ID")
    private ProjectTimeSheet projectTimeSheet;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDayDate() {
        return dayDate;
    }

    public void setDayDate(LocalDate dayDate) {
        this.dayDate = dayDate;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public ProjectTimeSheet getProjectTimeSheet() {
        return projectTimeSheet;
    }

    public void setProjectTimeSheet(ProjectTimeSheet projectTimeSheet) {
        this.projectTimeSheet = projectTimeSheet;
    }
}

