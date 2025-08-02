package com.example.elsewedybackend.timesheets.repositories;

import com.example.elsewedybackend.timesheets.dto.ProjectHoursBudgetDTO;
import com.example.elsewedybackend.timesheets.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

	List<Project> findByEmployeeEmpId(Integer empId);

	// Get all projects assigned to employee (based on their position)
	@Query(value = """
        SELECT DISTINCT proj.*
        FROM EMPLOYEE emp
        JOIN PROJECT_POSITIONS proj_pos ON emp.position_id = proj_pos.position_id
        JOIN PROJECT proj ON proj.project_id = proj_pos.project_id
        WHERE emp.emp_id = :employeeId
    """, nativeQuery = true)
	List<Project> getAssignedProjects(@Param("employeeId") Integer employeeId);

	// Get assigned projects with total remaining hours (excluding timesheet)
	@Query(value = """
        SELECT
            proj.project_id,
            proj_pos.hours_budget,
            COALESCE(proj_pos.hours_budget - SUM(wd.hours), proj_pos.hours_budget) AS remaining_hours,
            0 AS ts_hours
        FROM EMPLOYEE e
        JOIN PROJECT_POSITIONS proj_pos ON e.position_id = proj_pos.position_id
        JOIN PROJECT proj ON proj.project_id = proj_pos.project_id
        LEFT JOIN (
            SELECT pts.id, pts.ts_id, pts.project_id
            FROM PROJECT_TIME_SHEETS pts
            JOIN TIME_SHEET ts ON ts.ts_id = pts.ts_id
            WHERE ts.emp_id = :employeeId
        ) pts ON pts.project_id = proj.project_id
        LEFT JOIN TIME_SHEET ts ON ts.ts_id = pts.ts_id
        LEFT JOIN WEEK_DAYS wd ON wd.project_ts_id = pts.id
        WHERE e.emp_id = :employeeId
        GROUP BY proj.project_id, proj_pos.hours_budget
    """, nativeQuery = true)
	List<ProjectHoursBudgetDTO> getProjectsHoursBudget(@Param("employeeId") Integer employeeId);

	// Get assigned projects with remaining hours + ts_hours from a specific timesheet
	@Query(value = """
        WITH project_ts_hours AS (
            SELECT
                proj_pos.project_id,
                COALESCE(SUM(wd.hours), 0) AS ts_hours
            FROM EMPLOYEE e
            JOIN PROJECT_POSITIONS proj_pos ON e.position_id = proj_pos.position_id
            LEFT JOIN PROJECT_TIME_SHEETS pts
                ON pts.project_id = proj_pos.project_id AND pts.ts_id = :tsId
            LEFT JOIN WEEK_DAYS wd ON wd.project_ts_id = pts.id
            WHERE e.emp_id = :employeeId
            GROUP BY proj_pos.project_id
        )
        SELECT
            proj.project_id,
            proj_pos.hours_budget,
            COALESCE(proj_pos.hours_budget - SUM(wd.hours), proj_pos.hours_budget) AS remaining_hours,
            ptsh.ts_hours
        FROM EMPLOYEE e
        JOIN PROJECT_POSITIONS proj_pos ON e.position_id = proj_pos.position_id
        JOIN PROJECT proj ON proj.project_id = proj_pos.project_id
        LEFT JOIN (
            SELECT pts.*
            FROM PROJECT_TIME_SHEETS pts
            JOIN TIME_SHEET ts ON ts.ts_id = pts.ts_id
            WHERE ts.emp_id = :employeeId
        ) pts ON pts.project_id = proj.project_id
        LEFT JOIN TIME_SHEET ts ON ts.ts_id = pts.ts_id
        LEFT JOIN WEEK_DAYS wd ON wd.project_ts_id = pts.id
        JOIN project_ts_hours ptsh ON ptsh.project_id = proj.project_id
        WHERE e.emp_id = :employeeId
        GROUP BY proj.project_id, proj_pos.hours_budget, ptsh.ts_hours
    """, nativeQuery = true)
	List<ProjectHoursBudgetDTO> getProjectsHoursBudgetAndTS(
			@Param("employeeId") Integer employeeId,
			@Param("tsId") Integer tsId
	);
}
