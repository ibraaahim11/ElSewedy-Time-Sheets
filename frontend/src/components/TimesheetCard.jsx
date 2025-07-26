const TimesheetCard = () => {
  return (
    <div
      className="card text-center shadow position-relative"
      style={{ backgroundColor: "#EEEEEE", color: "#000000" }}
    >
      <div
        className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2"
        style={{ backgroundColor: "#000000", color: "#EEEEEE" }}
      >
        <span className="fw-bold">Timesheet</span>
        <div className="d-flex gap-2 align-items-center flex-wrap">
          <input
            type="date"
            className="form-control form-control-sm"
            style={{
              backgroundColor: "#EEEEEE",
              color: "#000000",
              border: "1px solid #DC5F00",
            }}
            title="Start Date"
          />
          <input
            type="date"
            className="form-control form-control-sm"
            style={{
              backgroundColor: "#EEEEEE",
              color: "#000000",
              border: "1px solid #DC5F00",
            }}
            title="End Date"
          />
          <button
            className="btn"
            style={{
              bottom: "15px",
              right: "15px",
              backgroundColor: "grey",
              color: "#EEEEEE",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              fontSize: "28px",
              lineHeight: "1",
              padding: "0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
            title="Add"
          >
            +
          </button>
          <button className="btn btn-outline-secondary btn-sm" title="Edit">
            <i className="bi bi-pencil-fill"></i>
          </button>
          <button className="btn btn-outline-success btn-sm" title="Save">
            <i className="bi bi-save-fill"></i>
          </button>
          <button className="btn btn-outline-danger btn-sm" title="Delete">
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div
              key={day}
              className="col border p-2"
              style={{ backgroundColor: "#EEEEEE", borderColor: "#000000" }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimesheetCard;
