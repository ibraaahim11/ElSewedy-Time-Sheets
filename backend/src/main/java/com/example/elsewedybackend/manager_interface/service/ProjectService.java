package com.example.elsewedybackend.manager_interface.service;

import com.example.elsewedybackend.manager_interface.entity.Employee;
import com.example.elsewedybackend.manager_interface.entity.Position;
import com.example.elsewedybackend.manager_interface.entity.Project;
import com.example.elsewedybackend.manager_interface.entity.ProjectPosition;
import com.example.elsewedybackend.manager_interface.repositories.EmployeeRepository;
import com.example.elsewedybackend.manager_interface.repositories.PositionRepository; 
import com.example.elsewedybackend.manager_interface.repositories.ProjectPositionRepository;
import com.example.elsewedybackend.manager_interface.repositories.ProjectRepository;
import com.example.elsewedybackend.manager_interface.repositories.ProjectTimeSheetRepository;

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
    private ProjectRepository projectRepository;

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private ProjectPositionRepository projectPositionRepository;

    @Autowired
    private PositionRepository positionRepository; 


    @Autowired
    private ProjectTimeSheetRepository projectTimeSheetRepository;

    public Project createProject(ProjectRequest projectRequest) {
        System.out.println("Fetching employee with ID: " + projectRequest.getEmpId());

        Employee employee = employeeRepository.findById(projectRequest.getEmpId())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + projectRequest.getEmpId()));

        Project project = new Project();
        project.setProjectName(projectRequest.getProjectName());
        project.setProjectDescription(projectRequest.getProjectDescription());
        project.setEmployee(employee);
        return projectRepository.save(project);
    }
    
    public ProjectPosition assignProjectPosition(ProjectPositionAssignmentRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + request.getProjectId()));
        Position position = positionRepository.findById(request.getPositionId())
                .orElseThrow(() -> new IllegalArgumentException("Position not found with ID: " + request.getPositionId()));

        ProjectPosition projectPosition = new ProjectPosition();
        projectPosition.setProject(project);
        projectPosition.setPosition(position);
        projectPosition.setHoursBudget(request.getHoursBudget());
        
        // Check if the project-position combination already exists to avoid duplicates
        if (projectPositionRepository.findByProjectAndPosition(project, position).isPresent()) {
            throw new IllegalArgumentException("Project-Position assignment already exists for Project ID: " + request.getProjectId() + " and Position ID: " + request.getPositionId());
        }
        
        return projectPositionRepository.save(projectPosition);
    }
       @Transactional
    public Project updateProject(Integer projectId, ProjectUpdateRequest updateRequest) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));

        project.setProjectName(updateRequest.getProjectName());
        project.setProjectDescription(updateRequest.getProjectDescription());
        return projectRepository.save(project);
    }
   

    @Transactional
    public void deleteProjectById(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));

        // Delete related Project_positions
        projectPositionRepository.deleteByProject_ProjectId(id);

        
        // Delete related Project_time_sheets
        projectTimeSheetRepository.deleteByProject_ProjectId(id);

        // Delete the project
        projectRepository.delete(project);
    }
    @Transactional
    public void deleteProjectPosition(Integer projectId, Integer positionId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));
        Position position = positionRepository.findById(positionId)
                .orElseThrow(() -> new IllegalArgumentException("Position not found with ID: " + positionId));

        if (!projectPositionRepository.findByProjectAndPosition(project, position).isPresent()) {
            throw new IllegalArgumentException("Project-Position assignment does not exist for Project ID: " + projectId + " and Position ID: " + positionId);
        }

        // Delete the specific ProjectPosition
        projectPositionRepository.deleteByProject_ProjectIdAndPosition_PositionId(projectId, positionId); // Updated
    }
   public List<Project> getProjectsByEmployeeId(Integer empId) {
        return projectRepository.findByEmployeeEmpId(empId)
        ;
    }


}