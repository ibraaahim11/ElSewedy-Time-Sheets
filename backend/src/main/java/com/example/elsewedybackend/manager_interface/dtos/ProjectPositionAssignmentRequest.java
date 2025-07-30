package com.example.elsewedybackend.manager_interface.dtos;

public class ProjectPositionAssignmentRequest {
    private Integer projectId;
    private Integer positionId;
    private Integer hoursBudget;

    // Default Constructor
    public ProjectPositionAssignmentRequest() {
    }

    // Parameterized Constructor
    public ProjectPositionAssignmentRequest(Integer projectId, Integer positionId, Integer hoursBudget) {
        this.projectId = projectId;
        this.positionId = positionId;
        this.hoursBudget = hoursBudget;
    }

    // Getters
    public Integer getProjectId() {
        return projectId;
    }

    public Integer getPositionId() {
        return positionId;
    }

    public Integer getHoursBudget() {
        return hoursBudget;
    }

    // Setters
    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public void setPositionId(Integer positionId) {
        this.positionId = positionId;
    }

    public void setHoursBudget(Integer hoursBudget) {
        this.hoursBudget = hoursBudget;
    }
}