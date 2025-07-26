package com.example.elsewedybackend.timesheets.repositories;

import com.example.elsewedybackend.timesheets.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

	@Query(value = """
			SELECT DISTINCT proj.*
			FROM EMPLOYEE emp
			JOIN POSITION pos ON emp.emp_id = pos.position_id
			JOIN PROJECT_POSITIONS proj_pos ON proj_pos.position_id = pos.position_id
			JOIN PROJECT proj ON proj.project_id = proj_pos.project_id
			WHERE emp.emp_id = :employeeId""", nativeQuery = true)
	List<Project> getAssignedProjects(@Param("employeeId") Integer employeeId);


}
