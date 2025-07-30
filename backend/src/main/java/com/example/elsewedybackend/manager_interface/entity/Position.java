package com.example.elsewedybackend.manager_interface.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "Position")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Position_id")
    private Integer positionId;

    @Column(name = "Position_name", nullable = false, unique = true)
    private String positionName;

    // Getters and Setters
    public Integer getPositionId() { return positionId; }
    public void setPositionId(Integer positionId) { this.positionId = positionId; }
    public String getPositionName() { return positionName; }
    public void setPositionName(String positionName) { this.positionName = positionName; }
}