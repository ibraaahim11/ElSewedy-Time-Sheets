import { useState } from "react";
import timeSheetService from "../services/timeSheetService";
import { useNavigate } from "react-router-dom";
export default function TimesheetSearchPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timesheets, setTimesheets] = useState([]);
  const empId = localStorage.getItem("empId");

  const navigate = useNavigate();

  // 🔎 Single search function
  const handleSearch = async () => {
    try {
      if (startDate && endDate) {
        // ✅ Both dates → Search by range
        const data = await timeSheetService.getByDateRange(startDate, endDate);
        setTimesheets(data);
      } else if (startDate) {
        // ✅ Only start date → Search by start date
        const formattedDate = new Date(startDate).toISOString().split("T")[0];
        const data = await timeSheetService.getByStartDate(formattedDate);
        setTimesheets(data);
      } else if (endDate) {
        // ✅ Only end date → Search by end date
        const data = await timeSheetService.getByEndDate(endDate);
        setTimesheets(data);
      } else {
        alert("Please enter at least a start date or an end date.");
      }
    } catch (err) {
      console.error("❌ Error fetching timesheets:", err);
    }
  };

  // 🧹 Clear the table
  const handleClear = () => {
    setTimesheets([]); // ✅ Clears the table data
    setStartDate(""); // ✅ Clears the start date field
    setEndDate(""); // ✅ Clears the end date field
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
          {" "}
          <h1>Timesheet Search</h1>
          <div style={{ marginBottom: "20px" }}>
            <label>Start Date: </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label style={{ marginLeft: "10px" }}>End Date: </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <div style={{ marginTop: "10px" }}>
              {/* 🔍 Search button */}
              <button onClick={handleSearch}>Search</button>

              {/* 🧹 New Clear button */}
              <button
                onClick={handleClear}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Clear
              </button>
            </div>
          </div>
          {/* 📊 Results Table */}
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Timesheet Name</th>
                <th>Employee ID</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.length === 0 ? (
                <tr>
                  <td colSpan="5">No results found</td>
                </tr>
              ) : (
                timesheets
                  .filter((ts) => ts.empId == empId)
                  .map((ts) => (
                    <tr
                      key={ts.id}
                      onClick={() => navigate(`/timesheet/${ts.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{ts.id}</td>
                      <td>{ts.startDate}</td>
                      <td>{ts.endDate}</td>
                      <td>{ts.name}</td>
                      <td>{ts.empId}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          <br></br>
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={() => navigate("/employee-home")}
          >
            <i className="bi bi-house-door-fill"></i>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
