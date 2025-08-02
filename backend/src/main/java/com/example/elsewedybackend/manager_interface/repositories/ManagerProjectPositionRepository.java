package com.example.elsewedybackend.manager_interface.repositories;

import java.util.List;
import java.util.Optional;

import com.example.elsewedybackend.manager_interface.dtos.ProjectPositionBudget;
import com.example.elsewedybackend.manager_interface.entity.ProjectPosition;
import com.example.elsewedybackend.timesheets.entities.Position;
import com.example.elsewedybackend.timesheets.entities.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerProjectPositionRepository extends JpaRepository<ProjectPosition, Integer> {


    Optional<ProjectPosition> findByProjectAndPosition(Project project, Position position);




    void deleteByProject_Id(Integer project_id);
    void deleteByProject_IdAndPosition_PositionId(Integer project_id, Integer position_id);

    @Query("SELECT pp FROM ProjectPosition pp WHERE pp.project.id = :projectId AND pp.position.positionId = :positionId")
    Optional<ProjectPosition> findByProject_IdAndPosition_Id(Integer projectId, Integer positionId);
    @Query(value = """
    select pps.position_id as id, pos.position_name as name, pps.hours_budget as hours
    from project_positions pps
    join position pos on pos.position_id = pps.position_id
    where project_id = :projectId
""",nativeQuery = true)
    List<ProjectPositionBudget> findPositionsByProjectId(Integer projectId);

}
