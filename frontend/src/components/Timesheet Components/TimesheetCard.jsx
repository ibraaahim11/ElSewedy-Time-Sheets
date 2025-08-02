import TSCardHeader from "./TSCardHeader";
import TSCardBody from "./TSCardBody";
import dateUtils from "../../utils/dateUtils";
import { useState, useEffect } from "react";
import { useProjectRows } from "../../hooks/useProjectRows";
import timeSheetService from "../../services/timeSheetService";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [actualEmpId, setActualEmpId] = useState(empId);

  const [tsData, setTsData] = useState({});
  const [projectsBudget, setProjectsBudget] = useState({});

  // initally today
  const [startDate, setStartDate] = useState(
    dateUtils.getNextSundayString(dateUtils.getTodayDateString())
  );

  const [endDate, setEndDate] = useState("");
  const [tsName, setTsName] = useState("");
  const [loading, setLoading] = useState(true);

  const saveTS = async () => {
    // get what the dates of the days should be
    const arrayWeekDays = dateUtils.getArrayWeekDaysYYYYMMDD(startDate);
    // update the dates of the days according to the start date
    let projectTimeSheets = projectRows
      .map((row) => {
        const updatedRow = {
          ...row,
          weekDays: row.weekDays.map((day, index) => ({
            ...day,
            dayDate: arrayWeekDays[index],
          })),
        };

        // Remove id and new from new rows
        if (row.new) {
          delete updatedRow.id;
          delete updatedRow.new;
        }

        return updatedRow;
      })
      .filter(
        (row) =>
          row.project.id !== undefined &&
          row.project.id !== null &&
          row.project.id !== ""
      );

    let ts = {
      startDate: startDate,
      endDate: endDate,
      name: tsName,
      empId: actualEmpId,
      projectTimeSheets,
    };

    for (let i = 0; i < ts.projectTimeSheets.length; i++) {
      const row = ts.projectTimeSheets[i];
      const budgetRow = projectsBudget.find(
        (b) => b.projectId == row.project.id
      );
      let currentTsHours = 0;

      for (let j = 0; j < row.weekDays.length; j++) {
        currentTsHours += row.weekDays[j].hours;
      }

      if (currentTsHours > budgetRow.remainingHours + budgetRow.tsHours) {
        window.alert(
          `Error: You can not exceed the budget for Project '${row.project.name}'. Only ${budgetRow.remainingHours} hours remain.`
        );
        return;
      }
    }

    if (newTS) {
      try {
        const resTs = await timeSheetService.createTimeSheet(ts);
        navigate(`/timesheet/${resTs.id}`);
        navigate(0);
      } catch (error) {
        window.alert(`Error: You already have a timesheet from ${ts.name}.`);
      }
    } else {
      await timeSheetService.updateTimeSheet(tsId, ts);
      navigate(0);
    }
  };

  useEffect(() => {
    // This runs only once when the component is mounted to fetch ts data or set default data
    const fetchData = async () => {
      try {
        if (!newTS) {
          const data = await timeSheetService.getTimeSheet(tsId);
          setTsData(data);
          setActualEmpId(data.empId);
          setStartDate(data.startDate);
          setProjectRows(data.projectTimeSheets);

          setProjectsBudget(
            await timeSheetService.getProjectHoursBudget(data.empId, tsId)
          );
          setLoading(false);
        } else {
          setTsData({
            startDate: "",
            endDate: "",
            name: "",
            projectTimeSheets: [],
          });
          setProjectsBudget(
            await timeSheetService.getProjectHoursBudget(actualEmpId, tsId)
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const endString = dateUtils.getDateString(end);
    setEndDate(endString);
    const tsNameString = `'${startDate} --> ${endString}'`;
    setTsName(tsNameString);
  }, [startDate]);


  if (loading) return <>loading...</>;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        className="card position-relative"
        style={{ minWidth: "1100px", maxWidth: "98vw", margin: "40px 0" }}
      >
        <TSCardHeader
          tsName={tsName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          deleteTs={deleteTs}
          saveTs={saveTS}
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
          projectsBudget={projectsBudget}
        />
      </div>
    </div>
  );
};
export default TimesheetCard;
