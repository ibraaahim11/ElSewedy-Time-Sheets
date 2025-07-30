package com.example.elsewedybackend.manager_interface.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "Project_positions", uniqueConstraints = @UniqueConstraint(columnNames = {"Project_id", "Position_id"}))

public class ProjectPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Position_id", nullable = false)
    private Position position;

    @Column(name = "hours_budget", nullable = false)
    private Integer hoursBudget;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public Position getPosition() { return position; }
    public void setPosition(Position position) { this.position = position; }
    public Integer getHoursBudget() { return hoursBudget; }
    public void setHoursBudget(Integer hoursBudget) { this.hoursBudget = hoursBudget; }
}