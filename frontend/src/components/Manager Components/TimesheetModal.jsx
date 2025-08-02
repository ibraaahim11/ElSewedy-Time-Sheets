import React from 'react';

const TimesheetModal = ({ isOpen, onClose, project, timesheets }) => {

  console.log(timesheets)


  if (!isOpen || !project) return null;


  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: 'black', margin: 0 }}>
            Timesheets for {project.name}
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>

        {timesheets.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
            No timesheets found for this project.
          </p>
        ) : (
          <div>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '20px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    color: 'black'
                  }}>
                    Employee
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    color: 'black'
                  }}>
                    Position
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    color: 'black'
                  }}>
                    Range
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    color: 'black'
                  }}>
                    Hours Worked
                  </th>
             
                </tr>
              </thead>
              <tbody>
                {timesheets.map((timesheet, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', color: 'black' }}>
                      {timesheet.firstName} {timesheet.lastName}
                    </td>
                    <td style={{ padding: '12px', color: 'black' }}>
                      {timesheet.positionName}
                    </td>
                    <td style={{ padding: '12px', color: 'black' }}>
                      {timesheet.tsName}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: 'black' }}>
                      {timesheet.hoursWorked}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '4px' 
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>
                  {timesheets.reduce((sum, ts) => sum + ts.hoursWorked, 0)}
                </div>
                <div style={{ fontSize: '0.9em', color: '#666' }}>Total Hours</div>
              </div>
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimesheetModal;