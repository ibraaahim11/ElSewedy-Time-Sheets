import { useState } from "react";
import TimesheetCard from "../components/Timesheet Components/TimesheetCard";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import timeSheetService from "../services/timeSheetService";
import { useNavigate } from "react-router-dom";

// full timesheet page
const FullTimesheet = ({ newTS }) => {
  // for now it's 1 -> should be passed from view screen
  const EMP_ID = localStorage.getItem("empId");
  // timesheet id from path param
  const { tsId, empId } = useParams();

  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);

  // deletes component
  const deleteTs = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the timesheet?"
    );
    if (confirmed) {
      if (!newTS) {
        await timeSheetService.deleteTimeSheet(tsId);
      }
      setDeleted(true);
    }
  };

  // handles when user presses create new timesheet
  const handleReset = () => {
    if (!deleted) {
      const confirmed = window.confirm(
        "Are you sure you want to reset the timesheet?"
      );
      if (confirmed) {
        setDeleted(false);
        // triggers component to go to route of new then refresh to reset any data there
        navigate(`/timesheet/new/${EMP_ID}`);
        navigate(0);
      }
    } else {
      // setResetKey(resetKey + 1);
      setDeleted(false);
      // triggers component to go to route of new then refresh to reset any data there

      navigate(`/timesheet/new/${EMP_ID}`);
      navigate(0);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 pt-5">
      <div
        className="w-100 d-flex flex-column align-items-end px-4 mb-3"
        style={{ maxWidth: "900px" }}
      >
        <Button
          variant="primary"
          className="fw-bold px-4 py-2 mb-2"
          onClick={handleReset}
        >
          Start New Timesheet
        </Button>

        <button
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => navigate("/employee-home")}
        >
          <i className="bi bi-house-door-fill"></i>
          Home
        </button>
      </div>

      <div className="w-100" style={{ maxWidth: "900px" }}>
        {!deleted && (
          <TimesheetCard
            deleteTs={deleteTs}
            newTS={newTS}
            tsId={tsId}
            empId={EMP_ID}
          />
        )}
      </div>
    </div>
  );
};

export default FullTimesheet;
