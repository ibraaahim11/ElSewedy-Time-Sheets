import React, { useEffect, useState } from "react";
import ProjectCard from "../components/Manager Components/ProjectCard";
import CreateProjectModal from "../components/Manager Components/CreateProjectModal";
import EditProjectModal from "../components/Manager Components/EditProjectModal";
import AddPositionModal from "../components/Manager Components/AddPositionModal";
import TimesheetModal from "../components/Manager Components/TimesheetModal";
import managerService from "../services/managerService";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddPositionModal, setShowAddPositionModal] = useState(false);
  const [showTimesheetModal, setShowTimesheetModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [availablePositions, setAvailablePositions] = useState([]);
  const [timesheets, setTimesheets] = useState([]);

  const empId = localStorage.getItem("empId");

  const fetchProjects = async () => {
    let fetchedProjects = await managerService.getProjectsByEmployeeId(empId);

    fetchedProjects = await Promise.all(
      fetchedProjects.map(async (project) => {
        const positions = await managerService.getPositionsByProjectId(
          project.id
        );
        return { ...project, positions };
      })
    );

    setProjects(fetchedProjects);
  };

  const fetchAvailablePositions = async () => {
    const fetchedAvailablePositions = await managerService.getAllPositions();

    setAvailablePositions(fetchedAvailablePositions);
  };

  useEffect(() => {
    fetchProjects();
    fetchAvailablePositions();
  }, []);

  const handleCreateProject = async (projectData) => {
    let { positions, ...project } = projectData;

    project = {
      projectName: project.name,
      projectDescription: project.description,
      empId: empId,
    };

    const createdProject = await managerService.createProject(project);

    positions.forEach((position) => {
      handleAddPosition(createdProject.id, position);
    });

    fetchProjects();
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await managerService.deleteProject(projectId);
      fetchProjects();
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleUpdateProject = async (projectId, updateData) => {
    updateData = {
      projectName: updateData.name,
      projectDescription: updateData.description,
    };
    console.log(updateData);
    await managerService.updateProject(projectId, updateData);
    fetchProjects();
  };

  const handleAddPosition = async (projectId, position) => {
    const data = {
      projectId: projectId,
      positionId: position.positionId,
      hoursBudget: position.hours,
    };

    await managerService.addPositionToProject(data);
    fetchProjects();
  };

  const handleDeletePosition = async (projectId, positionId) => {
    if (window.confirm("Are you sure you want to remove this position?")) {
      await managerService.deletePositionFromProject(projectId, positionId);
      fetchProjects();
    }
  };

  const handleViewTimesheet = async (project) => {
    setSelectedProject(project);
    const ts = await managerService.getAllEmployeeTsByProjectId(project.id)
    setTimesheets(ts);
    setShowTimesheetModal(true);
  };

  const handleAddPositionClick = (project) => {
    setSelectedProject(project);
    setShowAddPositionModal(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#0d6efd",
            color: "white",
            padding: "30px",
            borderRadius: "8px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: "0 0 10px 0", fontSize: "2.5em" }}>
            Manager Dashboard
          </h1>
          <p style={{ margin: 0, fontSize: "1.1em", opacity: 0.9 }}>
            Manage your projects, positions, and track employee timesheets
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ color: "black", margin: 0 }}>
            Your Projects ({projects.length})
          </h2>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              backgroundColor: "#198754",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1.1em",
              fontWeight: "bold",
            }}
          >
            + Create New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "60px",
              borderRadius: "8px",
              textAlign: "center",
              border: "2px dashed #dee2e6",
            }}
          >
            <h3 style={{ color: "#666", marginBottom: "10px" }}>
              No projects yet
            </h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Create your first project to get started with time tracking
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1.1em",
              }}
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onAddPosition={handleAddPositionClick}
                onDeletePosition={handleDeletePosition}
                onViewTimesheet={handleViewTimesheet}
              />
            ))}
          </div>
        )}

        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateProject={handleCreateProject}
          availablePositions={availablePositions}
        />

        <EditProjectModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdateProject={handleUpdateProject}
          project={selectedProject}
        />

        <AddPositionModal
          isOpen={showAddPositionModal}
          onClose={() => setShowAddPositionModal(false)}
          onAddPosition={handleAddPosition}
          project={selectedProject}
          availablePositions={availablePositions}
        />

        <TimesheetModal
          isOpen={showTimesheetModal}
          onClose={() => setShowTimesheetModal(false)}
          project={selectedProject}
          timesheets={timesheets}
        />
      </div>
    </div>
  );
};

export default Dashboard;
