package com.example.elsewedybackend.manager_interface.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.elsewedybackend.manager_interface.entity.Position;
import com.example.elsewedybackend.manager_interface.entity.Project;
import com.example.elsewedybackend.manager_interface.entity.ProjectPosition;


@Repository
public interface ProjectPositionRepository extends JpaRepository<ProjectPosition, Integer> {


Optional<ProjectPosition> findByProjectAndPosition(Project project, Position position);

void deleteByProject_ProjectId(Integer projectId);
  void deleteByProject_ProjectIdAndPosition_PositionId(Integer projectId, Integer positionId);
  
@Query("SELECT pp FROM ProjectPosition pp WHERE pp.project.projectId = :projectId AND pp.position.positionId = :positionId")
    Optional<ProjectPosition> findByProjectIdAndPositionId(Integer projectId, Integer positionId);



}