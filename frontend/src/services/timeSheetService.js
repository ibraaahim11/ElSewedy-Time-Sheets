import axios from "axios";
import handleError from "../utils/handleServiceError.js";

const API_BASE_URL = "http://localhost:9090/api";

const timeSheetService = {
  // Single timesheet operations
  getTimeSheet: (tsId) =>
    axios
      .get(`${API_BASE_URL}/timesheets/${tsId}`)
      .then((res) => res.data)
      .catch(handleError),

  deleteTimeSheet: (tsId) =>
    axios
      .delete(`${API_BASE_URL}/timesheets/${tsId}`)
      .then((res) => res.data)
      .catch(handleError),

  createTimeSheet: (timeSheet) =>
    axios
      .post(`${API_BASE_URL}/timesheets`, timeSheet)
      .then((res) => res.data)
      .catch(handleError),

  updateTimeSheet: (tsId, timeSheet) =>
    axios
      .put(`${API_BASE_URL}/timesheets/${tsId}`, timeSheet)
      .then((res) => res.data)
      .catch(handleError),

  // Project-related queries
  getEmployeeProjects: (empId) =>
    axios
      .get(`${API_BASE_URL}/projects/assigned?employeeId=${empId}`)
      .then((res) => res.data)
      .catch(handleError),

  getProjectHoursBudget: (empId, tsId) => {
    let url = `${API_BASE_URL}/projects/assigned/budget?employeeId=${empId}`;
    if (tsId != null && tsId > 0) {
      url += `&tsId=${tsId}`;
    }
    return axios
      .get(url)
      .then((res) => res.data)
      .catch(handleError);
  },

  // Search functions
  getByStartDate: (start) =>
    axios
      .get(`${API_BASE_URL}/timesheets/search-by-start?start=${start}`)
      .then((res) => res.data)
      .catch(handleError),

  getByEndDate: (end) =>
    axios
      .get(`${API_BASE_URL}/timesheets/search-by-end?end=${end}`)
      .then((res) => res.data)
      .catch(handleError),

  getByDateRange: (start, end) =>
    axios
      .get(`${API_BASE_URL}/timesheets/search?start=${start}&end=${end}`)
      .then((res) => res.data)
      .catch(handleError),

  getTimesheetsByEmployeeId: (empId) =>
    axios
      .get(`${API_BASE_URL}/timesheets/employee/${empId}`)
      .then((res) => res.data)
      .catch(handleError),
};

export default timeSheetService;
