import React, { useState } from "react";

const AddPositionModal = ({
  isOpen,
  onClose,
  onAddPosition,
  project,
  availablePositions,
}) => {
  const [position, setPosition] = useState({
    name: "",
    hours: "",
    positionId: "",
  });

  const handleSubmit = () => {
    if (position.name && position.hours) {
      onAddPosition(project.id, {
        ...position,
        hours: parseInt(position.hours),
      });
      setPosition({ name: "", hours: "" });
      onClose();
    }
  };

  const handleClose = () => {
    setPosition({ name: "", hours: "" });
    onClose();
  };

  if (!isOpen || !project) return null;

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
          maxWidth: "400px",
        }}
      >
        <h2 style={{ color: "black", marginBottom: "20px" }}>
          Add Position to {project.name}
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            Position:
          </label>
          <select
            value={position.positionId}
            onChange={(e) => {
              const selectedId = parseInt(e.target.value);
              const selectedPosition = availablePositions.find(
                (pos) => pos.positionId === selectedId
              );

  

              setPosition((prev) => ({
                ...prev,
                positionId: selectedPosition.positionId,
                name: selectedPosition.positionName,
              }));
   
            }}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              fontSize: "1em",
            }}
          >
            <option value="">Select Position</option>
            {availablePositions.map((pos, index) => (
              <option key={pos.positionId} value={pos.positionId}>
                {pos.positionName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "black" }}
          >
            Hours Budget:
          </label>
          <input
            type="number"
            value={position.hours}
            onChange={(e) =>
              setPosition((prev) => ({ ...prev, hours: e.target.value }))
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              fontSize: "1em",
            }}
            placeholder="Enter hours budget"
          />
        </div>

        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
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
            onClick={handleSubmit}
            disabled={!position.name || !position.hours}
            style={{
              backgroundColor:
                position.name && position.hours ? "#198754" : "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor:
                position.name && position.hours ? "pointer" : "not-allowed",
            }}
          >
            Add Position
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPositionModal;
