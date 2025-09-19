import React, { useState, useEffect } from 'react';
import {
  FileText,
  Shield,
  Info,
  Phone,
  ChevronRight,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  Edit3
} from 'lucide-react';
import EditDialog from '../components/EditDialog';
import { ContentManager } from '../data/contentManager';
import '../Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [content, setContent] = useState(ContentManager.getContent());
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    type: null,
    title: ''
  });

  useEffect(() => {
    setContent(ContentManager.getContent());
  }, []);

  const handleOpenEdit = (type, title) => {
    setEditDialog({
      isOpen: true,
      type,
      title
    });
  };

  const handleSaveContent = (type, newContent) => {
    const updatedContent = { ...content };
    updatedContent[type] = newContent;
    setContent(updatedContent);
    ContentManager.saveContent(updatedContent);
  };

  const renderMainSettings = () => (
    <div className="settings-main">
      <div className="page-header">
        <h2 className="page-titlees">
          Dashboard <span className="sub-titlees">› Settings</span>
        </h2>
      </div>

      <div className="settings-grid">
        <div className="setting-card" onClick={() => setActiveSection('terms')}>
          <div className="setting-icon">
            <FileText />
          </div>
          <div className="setting-content">
            <h3>Terms & Conditions</h3>
            <p>View our terms of service and user agreements</p>
          </div>
          <ChevronRight className="chevron" />
        </div>

        <div className="setting-card" onClick={() => setActiveSection('privacy')}>
          <div className="setting-icon">
            <Shield />
          </div>
          <div className="setting-content">
            <h3>Privacy Policy</h3>
            <p>Learn how we protect and handle your data</p>
          </div>
          <ChevronRight className="chevron" />
        </div>

        <div className="setting-card" onClick={() => setActiveSection('about')}>
          <div className="setting-icon">
            <Info />
          </div>
          <div className="setting-content">
            <h3>About Details</h3>
            <p>Information about Turtle Trades platform</p>
          </div>
          <ChevronRight className="chevron" />
        </div>

        <div className="setting-card" onClick={() => setActiveSection('contact')}>
          <div className="setting-icon">
            <Phone />
          </div>
          <div className="setting-content">
            <h3>Contact Details</h3>
            <p>Get in touch with our support team</p>
          </div>
          <ChevronRight className="chevron" />
        </div>
      </div>
    </div>
  );

  const renderTermsConditions = () => (
    <div className="settings-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setActiveSection('main')}>
          <ArrowLeft /> Back to Settings
        </button>
        <div className="header-actions">
          <h2 className='heading-h2'>Terms & Conditions</h2>
          <button
            className="edit-btn"
            onClick={() => handleOpenEdit('terms', 'Terms & Conditions')}
          >
            <Edit3 /> Edit
          </button>
        </div>
      </div>

      <div className="detail-content">
        {content.terms.sections.map((section, index) => (
          <div key={index} className="content-section">
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}

        <div className="update-info">
          <p><strong>Last updated:</strong> {content.terms.lastUpdated}</p>
        </div>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="settings-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setActiveSection('main')}>
          <ArrowLeft /> Back to Settings
        </button>
        <div className="header-actions">
          <h2 className='heading-h2'>Privacy Policy</h2>
          <button
            className="edit-btn"
            onClick={() => handleOpenEdit('privacy', 'Privacy Policy')}
          >
            <Edit3 /> Edit
          </button>
        </div>
      </div>

      <div className="detail-content">
        {content.privacy.sections.map((section, index) => (
          <div key={index} className="content-section">
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}

        <div className="update-info">
          <p><strong>Last updated:</strong> {content.privacy.lastUpdated}</p>
        </div>
      </div>
    </div>
  );

  const renderAboutDetails = () => (
    <div className="settings-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setActiveSection('main')}>
          <ArrowLeft /> Back to Settings
        </button>
        <div className="header-actions">
          <h2 className='heading-h2'>About Turtle Trades</h2>
          <button
            className="edit-btn"
            onClick={() => handleOpenEdit('about', 'About Details')}
          >
            <Edit3 /> Edit
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="about-hero">
          <h3>About Turtle Trades Platform</h3>
          <p>{content.about.description}</p>
        </div>

        <div className="content-section">
          <h3>Our Mission</h3>
          <p>{content.about.mission}</p>
        </div>

        <div className="content-section">
          <h3>Key Features</h3>
          <ul>
            {content.about.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="stats-section">
          <h3>Platform Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{content.about.stats.activeTraders}</div>
              <div className="stat-label">Active Traders</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{content.about.stats.aum}</div>
              <div className="stat-label">Assets Under Management</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{content.about.stats.uptime}</div>
              <div className="stat-label">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactDetails = () => (
    <div className="settings-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => setActiveSection('main')}>
          <ArrowLeft /> Back to Settings
        </button>
        <div className="header-actions">
          <h2 className='heading-h2'>Contact Details</h2>
          <button
            className="edit-btn"
            onClick={() => handleOpenEdit('contact', 'Contact Details')}
          >
            <Edit3 /> Edit
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">
              <Mail />
            </div>
            <h4>Email Support</h4>
            <p>{content.contact.email}</p>
            <span className="contact-sub">Response time: {content.contact.emailResponseTime}</span>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Phone />
            </div>
            <h4>Phone Support</h4>
            <p>{content.contact.phone}</p>
            <span className="contact-sub">24/7 Trading Support</span>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <MapPin />
            </div>
            <h4>Headquarters</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{content.contact.address}</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Clock />
            </div>
            <h4>Business Hours</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{content.contact.businessHours}</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h3 className='heading-h3'>Send us a Message</h3>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Account Issues</option>
                <option>Trading Questions</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows={4} placeholder="Describe your inquiry or issue..."></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      {activeSection === 'main' && renderMainSettings()}
      {activeSection === 'terms' && renderTermsConditions()}
      {activeSection === 'privacy' && renderPrivacyPolicy()}
      {activeSection === 'about' && renderAboutDetails()}
      {activeSection === 'contact' && renderContactDetails()}

      {editDialog.isOpen && (
        <EditDialog
          isOpen={editDialog.isOpen}
          onClose={() => setEditDialog({ isOpen: false, type: null, title: '' })}
          title={editDialog.title}
          content={editDialog.type ? content[editDialog.type] : null}
          onSave={(newContent) => {
            if (editDialog.type) {
              handleSaveContent(editDialog.type, newContent);
            }
          }}
          type={editDialog.type}
        />
      )}
    </div>
  );
};

export default Settings;
