import React, { useState, useEffect } from 'react';

const EditProjectModal = ({ isOpen, onClose, onUpdateProject, project }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description
      });
    }
  }, [project]);

  const handleSubmit = () => {
    if (formData.name.trim() && formData.description.trim()) {
      onUpdateProject(project.id, formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '' });
    onClose();
  };

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
        maxWidth: '500px'
      }}>
        <h2 style={{ color: 'black', marginBottom: '20px' }}>
          Edit Project
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>
            Project Name:
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              fontSize: '1em'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>
            Project Description:
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              fontSize: '1em',
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={handleClose}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim() || !formData.description.trim()}
            style={{
              backgroundColor: formData.name.trim() && formData.description.trim() ? '#0d6efd' : '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: formData.name.trim() && formData.description.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Update Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;