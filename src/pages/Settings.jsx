import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Info, 
  Phone, 
  ChevronRight, 
  Mail, 
  MapPin, 
  Clock,
  ArrowLeft
} from 'lucide-react';
import '../Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('main');

  const renderMainSettings = () => (
    <div className="settings-main">
      <div className="page-header">
        <h1>Settings</h1>
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
        <h2>Terms & Conditions</h2>
      </div>
      
      <div className="detail-content">
        <div className="content-section">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using the Turtle Trades platform, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </div>

        <div className="content-section">
          <h3>2. Trading Services</h3>
          <p>Turtle Trades provides algorithmic trading services and market analysis tools. Our platform is designed for experienced traders and investors.</p>
        </div>

        <div className="content-section">
          <h3>3. Risk Disclosure</h3>
          <p>Trading involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results.</p>
        </div>

        <div className="content-section">
          <h3>4. User Responsibilities</h3>
          <p>Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.</p>
        </div>

        <div className="content-section">
          <h3>5. Prohibited Activities</h3>
          <p>Users may not engage in market manipulation, fraudulent activities, or any actions that violate applicable laws and regulations.</p>
        </div>

        <div className="update-info">
          <p><strong>Last updated:</strong> January 15, 2025</p>
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
        <h2>Privacy Policy</h2>
      </div>
      
      <div className="detail-content">
        <div className="content-section">
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, make trades, or contact us for support.</p>
        </div>

        <div className="content-section">
          <h3>How We Use Your Information</h3>
          <ul>
            <li>To provide and maintain our trading services</li>
            <li>To process transactions and send related information</li>
            <li>To send technical notices and security alerts</li>
            <li>To provide customer support</li>
          </ul>
        </div>

        <div className="content-section">
          <h3>Data Security</h3>
          <p>We implement industry-standard security measures to protect your personal and financial information, including encryption and secure data transmission protocols.</p>
        </div>

        <div className="content-section">
          <h3>Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
        </div>

        <div className="update-info">
          <p><strong>Last updated:</strong> January 15, 2025</p>
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
        <h2>About Turtle Trades</h2>
      </div>
      
      <div className="detail-content">
        <div className="about-hero">
          <h3>About Turtle Trades Platform</h3>
          <p>Turtle Trades is a cutting-edge algorithmic trading platform designed for serious traders and investors who demand precision, reliability, and performance.</p>
        </div>

        <div className="content-section">
          <h3>Our Mission</h3>
          <p>To democratize access to sophisticated trading algorithms and provide retail traders with institutional-grade tools and strategies.</p>
        </div>

        <div className="content-section">
          <h3>Key Features</h3>
          <ul>
            <li>Advanced algorithmic trading strategies</li>
            <li>Real-time market analysis and insights</li>
            <li>Comprehensive risk management tools</li>
            <li>Portfolio optimization algorithms</li>
            <li>24/7 automated trading capabilities</li>
          </ul>
        </div>

        <div className="stats-section">
          <h3>Platform Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Traders</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$50M+</div>
              <div className="stat-label">Assets Under Management</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
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
        <h2>Contact Details</h2>
      </div>
      
      <div className="detail-content">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">
              <Mail />
            </div>
            <h4>Email Support</h4>
            <p>support@turtletrades.com</p>
            <span className="contact-sub">Response time: 2-4 hours</span>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Phone />
            </div>
            <h4>Phone Support</h4>
            <p>+1 (555) 123-TRADE</p>
            <span className="contact-sub">24/7 Trading Support</span>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <MapPin />
            </div>
            <h4>Headquarters</h4>
            <p>123 Financial District<br />New York, NY 10004<br />United States</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <Clock />
            </div>
            <h4>Business Hours</h4>
            <p>Monday - Friday: 6AM - 6PM EST<br />Weekend: Emergency Support Only</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h3>Send us a Message</h3>
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
    </div>
  );
};

export default Settings;