import React, { useState } from "react";

const CreateProjectModal = ({
  isOpen,
  onClose,
  onCreateProject,
  availablePositions,
}) => {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    positions: [],
  });
  const [currentPosition, setCurrentPosition] = useState({
    positionId: "",
    name: "",
    hours: "",
  });

  const handleNextStep = () => {
    if (projectData.name.trim() && projectData.description.trim()) {
      setStep(2);
    }
  };

  const handleAddPosition = () => {
    if (currentPosition.name && currentPosition.hours) {
      setProjectData((prev) => ({
        ...prev,
        positions: [
          ...prev.positions,
          { ...currentPosition, hours: parseInt(currentPosition.hours) },
        ],
      }));
      setCurrentPosition({ name: "", hours: "" });
    }
  };

  const handleRemovePosition = (index) => {
    setProjectData((prev) => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== index),
    }));
  };

  const handleCreateProject = () => {
    onCreateProject(projectData);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setProjectData({ name: "", description: "", positions: [] });
    setCurrentPosition({ name: "", hours: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "30px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <h2 style={{ color: "black", marginBottom: "20px" }}>
          Create New Project - Step {step} of 2
        </h2>

        {step === 1 ? (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "black",
                }}
              >
                Project Name:
              </label>
              <input
                type="text"
                value={projectData.name}
                onChange={(e) =>
                  setProjectData((prev) => ({ ...prev, name: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  fontSize: "1em",
                }}
                placeholder="Enter project name"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "black",
                }}
              >
                Project Description:
              </label>
              <textarea
                value={projectData.description}
                onChange={(e) =>
                  setProjectData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  fontSize: "1em",
                  minHeight: "100px",
                  resize: "vertical",
                }}
                placeholder="Enter project description"
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleNextStep}
                disabled={
                  !projectData.name.trim() || !projectData.description.trim()
                }
                style={{
                  backgroundColor:
                    projectData.name.trim() && projectData.description.trim()
                      ? "#0d6efd"
                      : "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor:
                    projectData.name.trim() && projectData.description.trim()
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "black", marginBottom: "10px" }}>
                Project: {projectData.name}
              </h3>
              <p style={{ color: "#666", marginBottom: "20px" }}>
                {projectData.description}
              </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ color: "black", marginBottom: "10px" }}>
                Add Positions:
              </h4>
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <select
                  value={currentPosition.positionId}
                  onChange={(e) => {
                    const selectedId = parseInt(e.target.value);
                    const selectedPosition = availablePositions.find(
                      (pos) => pos.positionId == selectedId
                    );

                    setCurrentPosition((prev) => ({
                      ...prev,
                      positionId: selectedPosition.positionId,
                      name: selectedPosition.positionName,
                    }));
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "1px solid #dee2e6",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select Position</option>
                  {availablePositions.map((position, index) => (
                    <option key={index} value={position.positionId}>
                      {position.positionName}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={currentPosition.hours}
                  onChange={(e) =>
                    setCurrentPosition((prev) => ({
                      ...prev,
                      hours: e.target.value,
                    }))
                  }
                  placeholder="Hours"
                  style={{
                    width: "100px",
                    padding: "8px",
                    border: "1px solid #dee2e6",
                    borderRadius: "4px",
                  }}
                />
                <button
                  onClick={handleAddPosition}
                  style={{
                    backgroundColor: "#198754",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {projectData.positions.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "black", marginBottom: "10px" }}>
                  Assigned Positions:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {projectData.positions.map((position, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        borderRadius: "20px",
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "black" }}>
                        {position.name} ({position.hours}h)
                      </span>
                      <button
                        onClick={() => handleRemovePosition(index)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          fontSize: "0.8em",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setStep(1)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
              <button
                onClick={handleClose}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Create Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectModal;
