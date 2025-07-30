const ProjectRow = ({
  getRemainingProjects,
  updateProject,
  updateProjectHours,
  deleteProjectRow,
  row,
  budget,
  index,
}) => {
  return (
    <div key={row.id} className="row mx-1 mt-2" style={{ minWidth: "900px" }}>
      <div
        className="col-auto border p-3 bg-light fw-bold"
        style={{ minWidth: "80px" }}
      >
        {/* delete button */}
        <button
          className="btn btn-outline-danger btn-sm rounded-circle"
          onClick={() => deleteProjectRow(row.id)}
          title="Delete Row"
          style={{ width: "30px", height: "30px", fontSize: "12px" }}
        >
          ×
        </button>
      </div>
      {/* project select + options */}
      <div
        className="col border bg-light fw-bold d-flex justify-content-center align-items-center"
        style={{ minWidth: "220px", maxWidth: "350px", padding: "0.5rem" }}
      >
        <select
          className="form-select"
          style={{
            minWidth: "200px",
            fontSize: "0.9rem",
            paddingTop: "2px",
            paddingBottom: "2px",
            height: "30px",
          }}
          value={row.project.id}
          onChange={(e) => {
            const selected = e.target.options[e.target.selectedIndex];
            updateProject(row.id, e.target.value, selected.text);
          }}
        >
          <option value="">Select Project</option>
          {getRemainingProjects(row.id).map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* hours budget */}
      <div
        className="col border bg-light d-flex justify-content-center align-items-center"
        style={{ minWidth: "120px" }}
      >
        {budget && budget.hoursBudget !== undefined ? budget.hoursBudget : "-"}
      </div>

      {/* remaining hours */}
      <div
        className="col border bg-light d-flex justify-content-center align-items-center"
        style={{ minWidth: "120px" }}
      >
        {budget && budget.remainingHours !== undefined
          ? budget.remainingHours
          : "-"}
      </div>

      {row.weekDays.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="col border bg-light text-center d-flex justify-content-center align-items-center"
          style={{ minWidth: "100px", maxWidth: "100px", padding: "0.5rem" }}
        >
          <input
            type="number"
            min="0"
            max="8"
            className="form-control form-control-sm text-center mx-auto"
            style={{
              width: "60px",
              height: "30px",
              fontSize: "0.9rem",
              padding: "2px 6px",
            }}
            value={day.hours}
            onChange={(e) =>
              updateProjectHours(
                row.id,
                dayIndex,
                parseInt(e.target.value) || 0
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectRow;
