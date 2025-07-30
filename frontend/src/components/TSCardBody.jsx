import TSCardWeekDays from "./TSCardWeekDays";
import { useEffect, useState } from "react";
import timeSheetService from "../services/timeSheetService";
import ProjectRow from "./projectRow";

const TSCardBody = ({
  startDate,
  projectRows,
  addProjectRow,
  deleteProjectRow,
  updateProjectHours,
  updateProject,
  empId,
  projectsBudget,
  setProjectRows,
}) => {
  const [assignedProjects, setAssignedProjects] = useState([]);

  // get assigned projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (empId) {
          const projects = await timeSheetService.getEmployeeProjects(empId);
          setAssignedProjects(projects);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, [empId]);

  // each row i get the remaining projects -> return projects that are not selected & return on project so that i can mark as selected
  const getRemainingProjects = (currentRowId) => {
    const selectedProjectIds = projectRows
      .filter((row) => currentRowId !== row.id && row.project.id != "")
      .map((row) => row.project.id.toString());

    return assignedProjects.filter(
      (project) => !selectedProjectIds.includes(project.id.toString())
    );
  };




  return (
    <div className="card-body">
      <TSCardWeekDays startDate={startDate} />

      {projectRows.map((row, index) => (
        <ProjectRow
          getRemainingProjects={getRemainingProjects}
          updateProject={updateProject}
          updateProjectHours={updateProjectHours}
          deleteProjectRow={deleteProjectRow}
          row={row}
          key={index}
          budget={projectsBudget.find((b) => b.projectId == row.project.id)}
        />
      ))}

      {/* add row button */}
      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-sm btn-dark rounded-circle d-flex align-items-center justify-content-center"
          onClick={() => addProjectRow(startDate)}
          style={{ width: "32px", height: "32px" }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TSCardBody;
