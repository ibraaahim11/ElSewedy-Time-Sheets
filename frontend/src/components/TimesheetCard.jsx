import TSCardHeader from "./TSCardHeader";
import TSCardBody from "./TSCardBody";
import dateUtils from "../utils/dateUtils";
import { useState, useEffect } from "react";
import { useProjectRows } from "../hooks/useProjectRows";
import timeSheetService from "../services/timeSheetService";

const TimesheetCard = ({ deleteTs, newTS, tsId, empId }) => {
  // take custom hook
  const {
    projectRows,
    addProjectRow,
    deleteProjectRow,
    updateProjectHours,
    updateProject,
    setProjectRows,
  } = useProjectRows();

  const [actualEmpId, setActualEmpId] = useState(empId);

  const [tsData, setTsData] = useState({});

  // initally today
  const [startDate, setStartDate] = useState(
    dateUtils.getNextSundayString(dateUtils.getTodayDateString())
  );

  const [endDate, setEndDate] = useState("");
  const [tsName, setTsName] = useState("");

  useEffect(() => {
    // This runs only once when the component is mounted to fetch ts data or set default data
    const fetchData = async () => {
      try {
        console.log("newTs",newTS)
        if (!newTS) {
          const data = await timeSheetService.getTimeSheet(tsId);

          setTsData(data);
          setActualEmpId(data.empId);

          // update start date -> automatically end & name will be updated
          setStartDate(data.startDate);
          // update project rows to be shown
          setProjectRows(data.projectTimeSheets);
        } else {
          setTsData({
            startDate: "",
            endDate: "",
            name: "",
            projectTimeSheets: [],
          });
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };
    
    fetchData();
  }, []);

  // when start date changes -> update endDate, tsName, and tsData
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const endString = dateUtils.getDateString(end);
    setEndDate(endString);
    const tsNameString = `'${startDate} --> ${endString}'`;
    setTsName(tsNameString);
  }, [startDate]);

  useEffect(() => console.log("projectRows ", projectRows), [projectRows]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", width: "100%" }}>
      <div className="card position-relative" style={{ minWidth: "1100px", maxWidth: "98vw", margin: "40px 0" }}>

        <TSCardHeader
          tsName={tsName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
         deleteTs={deleteTs} // Remove from header
        />
        <TSCardBody
          startDate={startDate}
          projectRows={projectRows}
          addProjectRow={addProjectRow}
          deleteProjectRow={deleteProjectRow}
          updateProjectHours={updateProjectHours}
          updateProject={updateProject}
          setProjectRows={setProjectRows}
          empId={actualEmpId}
        />
      </div>
    </div>
  );
};

export default TimesheetCard;
