import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullTimesheet from "./pages/FullTimesheet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="timesheet/:tsId" element={<FullTimesheet newTS = {false}/>} />
        <Route path="timesheet/new/:empId" element={<FullTimesheet newTS={true}/>} />
        <Route path="*" element={<p>error</p>} />
      </Routes>
    </Router>
  );
}

export default App;
