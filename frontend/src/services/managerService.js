import axios from "axios";
import handleError from "../utils/handleServiceError.js";

const API_BASE_URL = "http://localhost:9090/api/projects";

const managerService = {
  // Create Project
  createProject: (project) =>
    axios
      .post(`${API_BASE_URL}`, project)
      .then((res) => res.data)
      .catch(handleError),

  // Update Project Name and Description
  updateProject: (id, updatedProject) =>
    axios
      .put(`${API_BASE_URL}/${id}`, updatedProject)
      .then((res) => res.data)
      .catch(handleError),

  // Assign Position to Project
  addPositionToProject: (position) =>
    axios
      .post(`${API_BASE_URL}/assign-position`, position) // Fixed typo from 'assign-poisiton'
      .then((res) => res.data)
      .catch(handleError),

  // Delete Project
  deleteProject: (id) =>
    axios
      .delete(`${API_BASE_URL}/${id}`)
      .then((res) => res.data)
      .catch(handleError),

  // Delete Position from Project
  deletePositionFromProject: (projectId, positionId) =>
    axios
      .delete(`${API_BASE_URL}/${projectId}/positions/${positionId}`)
      .then((res) => res.data)
      .catch(handleError),

  // Get Projects by Employee ID
  getProjectsByEmployeeId: (employeeId) =>
    axios
      .get(`${API_BASE_URL}/employee/${employeeId}`)
      .then((res) => res.data)
      .catch(handleError),

  // Get positions by project id
  getPositionsByProjectId: (projectId) =>
    axios
      .get(`${API_BASE_URL}/${projectId}/positions`)
      .then((res) => res.data)
      .catch(handleError),

  getAllPositions: () =>
    axios
      .get(`${API_BASE_URL}/positions`)
      .then((res) => res.data)
      .catch(handleError),

  getAllEmployeeTsByProjectId: (projectId) =>
    axios
      .get(`${API_BASE_URL}/${projectId}/employee-timesheets`)
      .then((res) => res.data)
      .catch(handleError),
};

export default managerService;
