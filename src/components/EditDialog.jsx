import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';


const EditDialog = ({
  isOpen,
  onClose,
  title,
  content,
  onSave,
  type
}) => {
  const [editContent, setEditContent] = useState(content);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditContent(content);
  }, [content]);

  const validateContent = () => {
    const newErrors = {};

    if (type === 'contact') {
      if (!editContent.email || !editContent.email.includes('@')) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!editContent.phone || editContent.phone.length < 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!editContent.address || editContent.address.length < 10) {
        newErrors.address = 'Please enter a complete address';
      }
    } else if (type === 'about') {
      if (!editContent.mission || editContent.mission.length < 20) {
        newErrors.mission = 'Mission statement must be at least 20 characters';
      }
      if (!editContent.description || editContent.description.length < 50) {
        newErrors.description = 'Description must be at least 50 characters';
      }
    } else {
      if (!editContent.sections || editContent.sections.length === 0) {
        newErrors.sections = 'At least one section is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateContent()) {
      onSave(editContent);
      onClose();
    }
  };

  const renderTermsEditor = () => (
    <div className="edit-form">
      <div className="form-group">
        <label>Last Updated Date</label>
        <input
          type="date"
          value={editContent.lastUpdated || '2025-01-15'}
          onChange={(e) => setEditContent({ ...editContent, lastUpdated: e.target.value })}
        />
      </div>
      
      {editContent.sections?.map((section, index) => (
        <div key={index} className="section-editor">
          <div className="form-group">
            <label>Section {index + 1} Title</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => {
                const newSections = [...editContent.sections];
                newSections[index] = { ...section, title: e.target.value };
                setEditContent({ ...editContent, sections: newSections });
              }}
              className={errors[`section${index}Title`] ? 'error' : ''}
            />
          </div>
          
          <div className="form-group">
            <label>Section {index + 1} Content</label>
            <textarea
              rows={4}
              value={section.content}
              onChange={(e) => {
                const newSections = [...editContent.sections];
                newSections[index] = { ...section, content: e.target.value };
                setEditContent({ ...editContent, sections: newSections });
              }}
              className={errors[`section${index}Content`] ? 'error' : ''}
            />
          </div>
        </div>
      ))}
      
      <button
        type="button"
        className="add-section-btn"
        onClick={() => {
          const newSection = { title: '', content: '' };
          setEditContent({
            ...editContent,
            sections: [...(editContent.sections || []), newSection]
          });
        }}
      >
        + Add Section
      </button>
    </div>
  );

  const renderPrivacyEditor = () => renderTermsEditor();

  const renderAboutEditor = () => (
    <div className="edit-form">
      <div className="form-group">
        <label>Platform Description</label>
        <textarea
          rows={3}
          value={editContent.description || ''}
          onChange={(e) => setEditContent({ ...editContent, description: e.target.value })}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>
      
      <div className="form-group">
        <label>Mission Statement</label>
        <textarea
          rows={3}
          value={editContent.mission || ''}
          onChange={(e) => setEditContent({ ...editContent, mission: e.target.value })}
          className={errors.mission ? 'error' : ''}
        />
        {errors.mission && <span className="error-message">{errors.mission}</span>}
      </div>
      
      <div className="form-group">
        <label>Key Features (one per line)</label>
        <textarea
          rows={5}
          value={editContent.features?.join('\n') || ''}
          onChange={(e) => setEditContent({ 
            ...editContent, 
            features: e.target.value.split('\n').filter(f => f.trim()) 
          })}
        />
      </div>
      
      <div className="stats-section">
        <h4>Platform Statistics</h4>
        <div className="stats-editor">
          <div className="form-group">
            <label>Active Traders</label>
            <input
              type="text"
              value={editContent.stats?.activeTraders || '10,000+'}
              onChange={(e) => setEditContent({
                ...editContent,
                stats: { ...editContent.stats, activeTraders: e.target.value }
              })}
            />
          </div>
          
          <div className="form-group">
            <label>Assets Under Management</label>
            <input
              type="text"
              value={editContent.stats?.aum || '$50M+'}
              onChange={(e) => setEditContent({
                ...editContent,
                stats: { ...editContent.stats, aum: e.target.value }
              })}
            />
          </div>
          
          <div className="form-group">
            <label>Uptime Guarantee</label>
            <input
              type="text"
              value={editContent.stats?.uptime || '99.9%'}
              onChange={(e) => setEditContent({
                ...editContent,
                stats: { ...editContent.stats, uptime: e.target.value }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactEditor = () => (
    <div className="edit-form">
      <div className="form-row">
        <div className="form-group">
          <label>Support Email</label>
          <input
            type="email"
            value={editContent.email || ''}
            onChange={(e) => setEditContent({ ...editContent, email: e.target.value })}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Support Phone</label>
          <input
            type="tel"
            value={editContent.phone || ''}
            onChange={(e) => setEditContent({ ...editContent, phone: e.target.value })}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label>Business Address</label>
        <textarea
          rows={3}
          value={editContent.address || ''}
          onChange={(e) => setEditContent({ ...editContent, address: e.target.value })}
          className={errors.address ? 'error' : ''}
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>
      
      <div className="form-group">
        <label>Business Hours</label>
        <textarea
          rows={2}
          value={editContent.businessHours || ''}
          onChange={(e) => setEditContent({ ...editContent, businessHours: e.target.value })}
        />
      </div>
      
      <div className="form-group">
        <label>Email Response Time</label>
        <input
          type="text"
          value={editContent.emailResponseTime || '2-4 hours'}
          onChange={(e) => setEditContent({ ...editContent, emailResponseTime: e.target.value })}
        />
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-backdrop" onClick={onClose} />
      <div className="dialog-container">
        <div className="dialog-header">
          <h3>Edit {title}</h3>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>
        
        <div className="dialog-content">
          {type === 'terms' && renderTermsEditor()}
          {type === 'privacy' && renderPrivacyEditor()}
          {type === 'about' && renderAboutEditor()}
          {type === 'contact' && renderContactEditor()}
        </div>
        
        <div className="dialog-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            <Save />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;