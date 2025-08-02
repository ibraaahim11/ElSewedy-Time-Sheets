package com.example.elsewedybackend.manager_interface.service;

import com.example.elsewedybackend.manager_interface.dtos.ProjectPositionBudget;
import com.example.elsewedybackend.manager_interface.entity.ProjectPosition;
import com.example.elsewedybackend.timesheets.entities.Employee;
import com.example.elsewedybackend.timesheets.entities.Position;
import com.example.elsewedybackend.timesheets.entities.Project;

import com.example.elsewedybackend.manager_interface.repositories.EmployeeRepository;
import com.example.elsewedybackend.manager_interface.repositories.ManagerPositionRepository;
import com.example.elsewedybackend.manager_interface.repositories.ManagerProjectPositionRepository;
import com.example.elsewedybackend.timesheets.repositories.ProjectRepository;
import com.example.elsewedybackend.manager_interface.repositories.ManagerProjectTimeSheetRepository;

import jakarta.transaction.Transactional;

import com.example.elsewedybackend.manager_interface.dtos.ProjectPositionAssignmentRequest;

import com.example.elsewedybackend.manager_interface.dtos.ProjectRequest;
import com.example.elsewedybackend.manager_interface.dtos.ProjectUpdateRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository managerProjectRepository;

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private ManagerProjectPositionRepository projectPositionRepository;

    @Autowired
    private ManagerPositionRepository managerPositionRepository;


    @Autowired
    private ManagerProjectTimeSheetRepository managerProjectTimeSheetRepository;

    public Project createProject(ProjectRequest projectRequest) {
        System.out.println("Fetching employee with ID: " + projectRequest.getEmpId());

        Employee employee = employeeRepository.findById(projectRequest.getEmpId())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + projectRequest.getEmpId()));

        Project project = new Project();
        project.setName(projectRequest.getProjectName());
        project.setDescription(projectRequest.getProjectDescription());
        project.setEmployee(employee);
        return managerProjectRepository.save(project);
    }

    public ProjectPosition assignProjectPosition(ProjectPositionAssignmentRequest request) {
        Project project = managerProjectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + request.getProjectId()));
        Position position = managerPositionRepository.findById(request.getPositionId())
                .orElseThrow(() -> new IllegalArgumentException("Position not found with ID: " + request.getPositionId()));

        ProjectPosition projectPosition = new ProjectPosition();
        projectPosition.setProject(project);
        projectPosition.setPosition(position);
        projectPosition.setHoursBudget(request.getHoursBudget());

        // Check for duplicates
        if (projectPositionRepository.findByProjectAndPosition(project, position).isPresent()) {
            throw new IllegalArgumentException("Project-Position assignment already exists for Project ID: " + request.getProjectId() + " and Position ID: " + request.getPositionId());
        }


      return projectPositionRepository.save(projectPosition);
    }

       @Transactional
    public Project updateProject(Integer projectId, ProjectUpdateRequest updateRequest) {
        Project project = managerProjectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));

        project.setName(updateRequest.getProjectName());
        project.setDescription(updateRequest.getProjectDescription());
        return managerProjectRepository.save(project);
    }
   

    @Transactional
    public void deleteProjectById(Integer id) {
        Project project = managerProjectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));

        // Delete related Project_positions
        projectPositionRepository.deleteByProject_Id(id);

        
        // Delete related Project_time_sheets
        managerProjectTimeSheetRepository.deleteByProject_Id(id);

        // Delete the project
        managerProjectRepository.delete(project);
    }
    @Transactional
    public void deleteProjectPosition(Integer projectId, Integer positionId) {
        Project project = managerProjectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
        Position position = managerPositionRepository.findById(positionId)
                .orElseThrow(() -> new IllegalArgumentException("Position not found with ID: " + positionId));

        if (!projectPositionRepository.findByProjectAndPosition(project, position).isPresent()) {
            throw new IllegalArgumentException("Project-Position assignment does not exist for Project ID: " + projectId + " and Position ID: " + positionId);
        }

        // Delete the specific ProjectPosition
        projectPositionRepository.deleteByProject_IdAndPosition_PositionId(projectId, positionId); // Updated
    }
   public List<Project> getProjectsByEmployeeId(Integer empId) {
        return managerProjectRepository.findByEmployeeEmpId(empId)
        ;
    }




}