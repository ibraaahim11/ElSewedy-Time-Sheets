import dateUtils from "../../utils/dateUtils";

const TSCardHeader = ({
  tsName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  saveTs,
  deleteTs,
}) => {
  const updateStart = (e) => {
    setStartDate(dateUtils.getNextSundayString(e.target.value));
  };

  return (
    <div className="card-header bg-dark text-light">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-4 pt-2 ps-2">
          Timesheet <span className="text-secondary">{tsName}</span>
        </div>
        {/* Save & Date Buttons */}
        <div className="d-flex gap-2 pe-2 pt-2">
          <button
            className="btn btn-outline-success btn-sm"
            title="Save"
            aria-label="Save"
            onClick={saveTs}
          >
            <i className="bi bi-save-fill"></i>
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            title="Delete"
            aria-label="Delete"
            onClick={deleteTs}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>

      <hr />
      <div className="d-flex mb-2">
        {/* Start Date */}
        <div className="d-flex align-items-center me-4">
          <label htmlFor="start-date" className="form-label me-2 mb-0 small">
            Start Date:
          </label>
          <input
            id="start-date"
            type="date"
            className="form-control form-control-sm bg-light text-dark"
            style={{ width: "150px" }}
            aria-label="Start Date"
            value={startDate}
            onChange={updateStart}
          />
        </div>

        {/* End Date */}
        <div className="d-flex align-items-center">
          <label htmlFor="end-date" className="form-label me-2 mb-0 small">
            End Date:
          </label>
          <input
            id="end-date"
            type="date"
            className="form-control form-control-sm bg-light text-dark"
            style={{ width: "150px" }}
            aria-label="End Date"
            value={endDate}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default TSCardHeader;
