import React from 'react';

const ProjectCard = ({ project, onEdit, onDelete, onAddPosition, onDeletePosition, onViewTimesheet }) => {


  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '15px'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'black', marginBottom: '8px', fontSize: '1.2em' }}>
            {project.name}
          </h3>
          <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
            {project.description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
          <button
            onClick={() => onEdit(project)}
            style={{
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: 'black', marginBottom: '10px', fontSize: '1em' }}>
          Assigned Positions:
        </h4>
        {project.positions && project.positions.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.positions.map((position, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '20px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9em'
                }}
              >
                <span style={{ color: 'black' }}>
                  {position.name} ({position.hours}h)
                </span>
                <button
                  onClick={() => onDeletePosition(project.id, position.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '0.8em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No positions assigned</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onAddPosition(project)}
          style={{
            backgroundColor: '#198754',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          Add Position
        </button>
        <button
          onClick={() => onViewTimesheet(project)}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em'
          }}
        >
          View Timesheets
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;