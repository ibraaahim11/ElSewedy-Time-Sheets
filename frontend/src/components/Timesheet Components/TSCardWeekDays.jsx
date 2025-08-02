import dateUtils from "../../utils/dateUtils";
const TSCardWeekDays = ({ startDate }) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const days_dates = dateUtils.getArrayWeekDays(startDate).slice(0, 5);
  return (
    <div className="row mx-1">
      {/* Project column header */}
      <div
        className="col-auto border p-3 bg-light fw-bold"
        style={{ minWidth: "80px" }}
      ></div>
      <div
        className="col border p-3 bg-light fw-bold text-center"
        style={{ minWidth: "220px", maxWidth: "350px" }}
      >
        Project
      </div>
      <div
        className="col border p-3 bg-light fw-bold text-center"
        style={{ minWidth: "120px" }}
      >
        Hours Budget
      </div>
      <div
        className="col border p-3 bg-light fw-bold text-center"
        style={{ minWidth: "120px" }}
      >
        Remaining Hours
      </div>
      {days.map((day, index) => (
        <div
          key={day}
          className="col border bg-light text-center"
          style={{ minWidth: "100px", maxWidth: "100px", padding: "0.5rem" }}
        >
          <div>{day}</div>
          <div className="text-muted fs-6">{days_dates[index]}</div>
        </div>
      ))}
    </div>
  );
};
export default TSCardWeekDays;
