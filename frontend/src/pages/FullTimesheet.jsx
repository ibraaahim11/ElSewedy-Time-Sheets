import TimesheetCard from "../components/TimesheetCard";

const FullTimesheet = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{ height: "100vh", paddingTop: "50px" }}
    >
      <div
        className="card p-4 shadow-sm border-0"
        style={{ width: "90%", maxWidth: "900px" }}
      >
        <div className="card-body text-center">
          <TimesheetCard />
        </div>
      </div>
    </div>
  );
};

export default FullTimesheet;
