import { useState } from "react";
import dateUtils from "../utils/dateUtils";

const generateWeekDays = (startDate) => {
  let weekDays = [];
  // get array of week day dates from startDate (assume util returns Sunday-Thursday)
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const weekDates = dateUtils.getArrayWeekDays(startDate); // should return 5 dates
  for (let i = 0; i < 5; i++) {
    weekDays.push({
      dayDate: weekDates[i],
      hours: 0,
      dayName: days[i],
    });
  }
  return weekDays;
};

const rows_example = [
  {
    id: 1,
    project: {
      id: 1,
      name: "Apollo CRM",
      description: "Customer Relationship Management system",
    },
    weekDays: [
      {
        id: 1,
        dayDate: "2025-01-05",
        hours: 7.0,
        dayName: "Sunday",
      },
      {
        id: 2,
        dayDate: "2025-01-06",
        hours: 8.0,
        dayName: "Monday",
      },
      {
        id: 3,
        dayDate: "2025-01-07",
        hours: 8.0,
        dayName: "Tuesday",
      },
      {
        id: 4,
        dayDate: "2025-01-08",
        hours: 6.0,
        dayName: "Wednesday",
      },
      {
        id: 5,
        dayDate: "2025-01-09",
        hours: 8.0,
        dayName: "Thursday",
      },
    ],
  },
  {
    id: 2,
    project: {
      id: 6,
      name: "Aurora Reports",
      description: "Business analytics and dashboard system",
    },
    weekDays: [
      {
        id: 6,
        dayDate: "2025-01-05",
        hours: 3.0,
        dayName: "Sunday",
      },
      {
        id: 7,
        dayDate: "2025-01-06",
        hours: 4.0,
        dayName: "Monday",
      },
      {
        id: 8,
        dayDate: "2025-01-07",
        hours: 5.0,
        dayName: "Tuesday",
      },
      {
        id: 9,
        dayDate: "2025-01-08",
        hours: 4.0,
        dayName: "Wednesday",
      },
      {
        id: 10,
        dayDate: "2025-01-09",
        hours: 3.0,
        dayName: "Thursday",
      },
    ],
  },
  {
    id: 3,
    project: {
      id: 2,
      name: "Orion UI Revamp",
      description: "Redesigning web application frontend",
    },
    weekDays: [
      {
        id: 11,
        dayDate: "2025-01-05",
        hours: 2.0,
        dayName: "Sunday",
      },
      {
        id: 12,
        dayDate: "2025-01-06",
        hours: 3.0,
        dayName: "Monday",
      },
      {
        id: 13,
        dayDate: "2025-01-07",
        hours: 2.0,
        dayName: "Tuesday",
      },
      {
        id: 14,
        dayDate: "2025-01-08",
        hours: 4.0,
        dayName: "Wednesday",
      },
      {
        id: 15,
        dayDate: "2025-01-09",
        hours: 3.0,
        dayName: "Thursday",
      },
    ],
  },
];
// custom hook to manager project rows
export function useProjectRows(initial = [], startDate = null) {
  const [projectRows, setProjectRows] = useState(initial);

  const addProjectRow = (customStartDate) => {
    const effectiveStartDate = customStartDate || startDate || dateUtils.getTodayDateString();
    const newRow = {
      id: Date.now(),
      project: { id: "", name: "", description: "" },
      weekDays: generateWeekDays(effectiveStartDate),
      new: true
    };
    setProjectRows((prev) => [...prev, newRow]);
  };

  const deleteProjectRow = (rowId) => {
    setProjectRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  const updateProjectHours = (rowId, dayIndex, hours) => {
    setProjectRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
            ...row,
            weekDays: row.weekDays.map((day, i) =>
              i === dayIndex ? { ...day, hours } : day
            ),
          }
          : row
      )
    );
  };

  const updateProject = (rowId, id, name) => {
    setProjectRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? { ...row, project: { ...row.project, id, name } }
          : row
      )
    );
  };

  return {
    projectRows,
    addProjectRow,
    deleteProjectRow,
    updateProjectHours,
    updateProject,
    setProjectRows,
  };
}
