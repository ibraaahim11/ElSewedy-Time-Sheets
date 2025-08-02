import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeHome() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const empId = localStorage.getItem("empId");

  const [timesheets, setTimesheets] = useState([]);
  const navigate = useNavigate();

  //  Fetch timesheets when the page loads
  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/timesheets/employee/${empId}`
        );

        if (!response.ok) {
          console.error("Failed to fetch timesheets");
          return;
        }

        const data = await response.json();
        setTimesheets(data);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      }
    };

    if (empId) {
      fetchTimesheets();
    }
  }, [empId]);

  const goToSearchPage = () => {
    window.location.href = "http://localhost:5173/timesheets/search";
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="p-4 text-white rounded"
        style={{
          backgroundColor: "rgb(33, 37, 41)",
          border: "1px solid #555",
          width: "fit-content",
        }}
      >
        <div
          style={{
            padding: "20px",
            fontFamily: "Arial",

            color: "white",
            minHeight: "100vh",
          }}
        >
          <h1>
            Welcome, {firstName} {lastName}!
          </h1>
          <hr></hr>
          <h2>Your Timesheets</h2>
          <br></br>

          <table border="1" cellPadding="5" style={{ marginTop: "15px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Timesheet Name</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.length === 0 ? (
                <tr>
                  <td colSpan="4">No timesheets found</td>
                </tr>
              ) : (
                timesheets.map((ts) => (
                  <tr
                    key={ts.tsId}
                    onClick={() => navigate(`/timesheet/${ts.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{ts.id}</td>
                    <td>{ts.startDate}</td>
                    <td>{ts.endDate}</td>
                    <td>{ts.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <br></br>

          {/* Navigation button */}

          <button
            className="btn btn-primary fw-bold mt-3"
            onClick={() => navigate(`/timesheet/search`)}
          >
            Search Timesheets
          </button>

          {"                          "}

          {/* Create New Timesheet Button */}
          <button
            className="btn btn-primary fw-bold mt-3"
            onClick={() => navigate(`/timesheet/new/${empId}`)}
          >
            + Create New Timesheet
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
