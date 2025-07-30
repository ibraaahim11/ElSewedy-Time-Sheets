// src/EmployeeProjects.jsx
import React, { useEffect, useState } from 'react';

const EmployeeProjects = () => {
  const empId = 2; // Static for now, can be dynamic
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9090/api/projects/employee/${empId}`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, [empId]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1><strong>Employee Project Viewer</strong></h1>
      <h2>Projects for Employee ID: {empId}</h2>
      <ul>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <li key={project.projectId} style={{ marginBottom: '1rem' }}>
              <h3>{project.projectName}</h3>
              <p>{project.projectDescription}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EmployeeProjects;
