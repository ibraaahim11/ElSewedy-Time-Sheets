import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullTimesheet from "./pages/FullTimesheet";
import TimesheetSearchPage from "./pages/TimesheetSearchPage";

import LoginPage from "./pages/LoginPage";

import EmployeeHome from "./pages/EmployeeHome";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/*  Default Page: Login */}
        <Route path="/" element={<LoginPage />} />

        {/*  Manager and Employee Home Pages */}
        <Route path="/manager-home" element={<Dashboard />} />
        <Route path="/employee-home" element={<EmployeeHome />} />

        {/*  Timesheet Pages (available after login) */}
        <Route path="/timesheet/search" element={<TimesheetSearchPage />} />
        <Route
          path="timesheet/:tsId"
          element={<FullTimesheet newTS={false} />}
        />
        <Route
          path="timesheet/new/:empId"
          element={<FullTimesheet newTS={true} />}
        />
        <Route path="*" element={<p>error</p>} />
      </Routes>
    </Router>
  );
}

export default App;
