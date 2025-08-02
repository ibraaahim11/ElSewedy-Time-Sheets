package com.example.elsewedybackend.manager_interface.repositories;

import com.example.elsewedybackend.manager_interface.dtos.EmployeeProjectTimeSheet;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.elsewedybackend.timesheets.entities.ProjectTimeSheet;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ManagerProjectTimeSheetRepository extends JpaRepository<ProjectTimeSheet, Integer> {
	void deleteByProject_Id(Integer project_Id);


	@Query(value = """
			select emp.first_name,emp.last_name, p.position_name, ts.ts_name, sum(hours) as hours_worked
			from project_time_sheets pts
			join time_sheet ts on ts.ts_id = pts.ts_id
			join employee emp on ts.emp_id = emp.emp_id
			join position p on p.position_id = emp.position_id
			join week_days wd on wd.project_ts_id = pts.id
			
			
			
			where pts.project_id = :project_id
			group by emp.first_name,emp.last_name, p.position_name, ts.ts_name
			""", nativeQuery = true)
	List<EmployeeProjectTimeSheet> findEmployeeProjectTimesheet(Integer project_id);
}

