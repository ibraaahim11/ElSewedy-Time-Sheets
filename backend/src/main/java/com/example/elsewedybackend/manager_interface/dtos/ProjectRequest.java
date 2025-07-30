package com.example.elsewedybackend.manager_interface.dtos;


public class ProjectRequest {
    private String projectName;
    private String projectDescription;
    private Integer empId;

    // Default constructor (required for Jackson deserialization)
    public ProjectRequest() {}

    // Parameterized constructor (optional, for convenience)
    public ProjectRequest(String projectName, String projectDescription, Integer empId) {
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.empId = empId;
    }

    // Getters and Setters
    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }
}