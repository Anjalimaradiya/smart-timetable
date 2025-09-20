import React, { useState, useEffect } from 'react';

const ExportShare = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [shareMethod, setShareMethod] = useState('email');
  const [customization, setCustomization] = useState({
    includeDetails: true,
    includeFaculty: true,
    includeRooms: true,
    includeTimings: true,
    colorScheme: 'default',
    layout: 'landscape',
    watermark: false,
    pageNumbers: true
  });
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('Please find attached the timetable for your reference.');
  const [exportHistory, setExportHistory] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const exportFormats = [
    { id: 'pdf', label: 'PDF Document', icon: '📄', description: 'High-quality printable format' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: '📊', description: 'Editable data format' },
    { id: 'csv', label: 'CSV File', icon: '📝', description: 'Simple data exchange format' },
    { id: 'image', label: 'PNG Image', icon: '🖼️', description: 'Image format for sharing' },
    { id: 'html', label: 'Web Page', icon: '🌐', description: 'Interactive web format' }
  ];

  const shareMethods = [
    { id: 'email', label: 'Email', icon: '📧', description: 'Send via email' },
    { id: 'link', label: 'Shareable Link', icon: '🔗', description: 'Generate shareable URL' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', description: 'Share via WhatsApp' },
    { id: 'drive', label: 'Google Drive', icon: '☁️', description: 'Save to Google Drive' },
    { id: 'print', label: 'Print', icon: '🖨️', description: 'Print directly' }
  ];

  const colorSchemes = [
    { id: 'default', label: 'Default', colors: ['#4a6fa5', '#6e9cd2'] },
    { id: 'professional', label: 'Professional', colors: ['#2c3e50', '#34495e'] },
    { id: 'vibrant', label: 'Vibrant', colors: ['#e74c3c', '#3498db'] },
    { id: 'pastel', label: 'Pastel', colors: ['#a8e6cf', '#dcedc1'] },
    { id: 'monochrome', label: 'Monochrome', colors: ['#333', '#666'] }
  ];

  useEffect(() => {
    // Load export history from localStorage
    const savedHistory = localStorage.getItem('exportHistory');
    if (savedHistory) {
      setExportHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const simulateExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newExport = {
      id: Date.now(),
      format: exportFormat,
      timestamp: new Date().toLocaleString(),
      size: `${Math.floor(Math.random() * 500) + 100}KB`,
      status: 'success'
    };
    
    const updatedHistory = [newExport, ...exportHistory.slice(0, 4)];
    setExportHistory(updatedHistory);
    localStorage.setItem('exportHistory', JSON.stringify(updatedHistory));
    
    setIsExporting(false);
    alert(`✅ Timetable exported as ${exportFormat.toUpperCase()} successfully!`);
  };

  const simulateShare = async () => {
    setIsSharing(true);
    
    // Simulate sharing process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSharing(false);
    
    switch (shareMethod) {
      case 'email':
        alert(`📧 Email sent to ${recipients || 'selected recipients'} successfully!`);
        break;
      case 'link':
        alert('🔗 Shareable link generated: https://timetable.uni/share/abc123');
        navigator.clipboard.writeText('https://timetable.uni/share/abc123');
        break;
      case 'whatsapp':
        alert('💬 WhatsApp sharing initiated!');
        break;
      case 'drive':
        alert('☁️ Timetable saved to Google Drive successfully!');
        break;
      case 'print':
        window.print();
        break;
      default:
        alert('Sharing completed successfully!');
    }
  };

  const handleQuickExport = (format) => {
    setExportFormat(format);
    setTimeout(() => simulateExport(), 100);
  };

  const handleQuickShare = (method) => {
    setShareMethod(method);
    setTimeout(() => simulateShare(), 100);
  };

  const renderFormatOptions = () => {
    return exportFormats.map(format => (
      <div
        key={format.id}
        className={`format-option ${exportFormat === format.id ? 'active' : ''}`}
        onClick={() => setExportFormat(format.id)}
      >
        <span className="format-icon">{format.icon}</span>
        <div className="format-info">
          <h4>{format.label}</h4>
          <p>{format.description}</p>
        </div>
        <div className="format-check">
          {exportFormat === format.id && '✓'}
        </div>
      </div>
    ));
  };

  const renderShareOptions = () => {
    return shareMethods.map(method => (
      <div
        key={method.id}
        className={`share-option ${shareMethod === method.id ? 'active' : ''}`}
        onClick={() => setShareMethod(method.id)}
      >
        <span className="share-icon">{method.icon}</span>
        <div className="share-info">
          <h4>{method.label}</h4>
          <p>{method.description}</p>
        </div>
        <div className="share-check">
          {shareMethod === method.id && '✓'}
        </div>
      </div>
    ));
  };

  const renderCustomizationOptions = () => {
    return (
      <div className="customization-grid">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customization.includeDetails}
            onChange={(e) => handleCustomizationChange('includeDetails', e.target.checked)}
          />
          <span className="checkmark"></span>
          Include Course Details
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customization.includeFaculty}
            onChange={(e) => handleCustomizationChange('includeFaculty', e.target.checked)}
          />
          <span className="checkmark"></span>
          Include Faculty Information
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customization.includeRooms}
            onChange={(e) => handleCustomizationChange('includeRooms', e.target.checked)}
          />
          <span className="checkmark"></span>
          Include Room Numbers
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customization.includeTimings}
            onChange={(e) => handleCustomizationChange('includeTimings', e.target.checked)}
          />
          <span className="checkmark"></span>
          Include Time Slots
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customization.watermark}
            onChange={(e) => handleCustomizationChange('watermark', e.target.checked)}
          />
          <span className="checkmark"></span>
          Add Watermark
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={customization.pageNumbers}
            onChange={(e) => handleCustomizationChange('pageNumbers', e.target.checked)}
          />
          <span className="checkmark"></span>
          Page Numbers
        </label>

        <div className="select-group">
          <label>Color Scheme:</label>
          <select
            value={customization.colorScheme}
            onChange={(e) => handleCustomizationChange('colorScheme', e.target.value)}
            className="form-control"
          >
            {colorSchemes.map(scheme => (
              <option key={scheme.id} value={scheme.id}>{scheme.label}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Layout:</label>
          <select
            value={customization.layout}
            onChange={(e) => handleCustomizationChange('layout', e.target.value)}
            className="form-control"
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </div>
      </div>
    );
  };

  const renderRecipientInput = () => {
    if (shareMethod !== 'email') return null;

    return (
      <div className="input-group">
        <label>Recipient Email Addresses:</label>
        <input
          type="text"
          placeholder="Enter email addresses (comma-separated)"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          className="form-control"
        />
        <small>Separate multiple emails with commas</small>
      </div>
    );
  };

  const renderMessageInput = () => {
    if (shareMethod !== 'email') return null;

    return (
      <div className="input-group">
        <label>Message:</label>
        <textarea
          placeholder="Add a custom message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-control"
          rows="3"
        />
      </div>
    );
  };

  return (
    <div className="export-share-container">
      <div className="export-share-header">
        <h1>Export & Share Timetable</h1>
        <p>Export in multiple formats and share with students, faculty, and staff</p>
      </div>

      <div className="export-share-content">
        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3>Quick Export</h3>
          <div className="quick-action-buttons">
            {exportFormats.slice(0, 3).map(format => (
              <button
                key={format.id}
                className="btn btn-outline quick-action-btn"
                onClick={() => handleQuickExport(format.id)}
                disabled={isExporting}
              >
                <span className="action-icon">{format.icon}</span>
                {format.label}
              </button>
            ))}
          </div>

          <h3>Quick Share</h3>
          <div className="quick-action-buttons">
            {shareMethods.slice(0, 3).map(method => (
              <button
                key={method.id}
                className="btn btn-outline quick-action-btn"
                onClick={() => handleQuickShare(method.id)}
                disabled={isSharing}
              >
                <span className="action-icon">{method.icon}</span>
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Export Section */}
          <div className="card">
            <h2>Export Timetable</h2>
            <div className="format-selection">
              {renderFormatOptions()}
            </div>

            <div className="customization-section">
              <h4>Customization Options</h4>
              {renderCustomizationOptions()}
            </div>

            <button
              className="btn btn-primary export-btn"
              onClick={simulateExport}
              disabled={isExporting}
            >
              {isExporting ? '⏳ Exporting...' : `💾 Export as ${exportFormat.toUpperCase()}`}
            </button>
          </div>

          {/* Share Section */}
          <div className="card">
            <h2>Share Timetable</h2>
            <div className="share-selection">
              {renderShareOptions()}
            </div>

            {renderRecipientInput()}
            {renderMessageInput()}

            <button
              className="btn btn-success share-btn"
              onClick={simulateShare}
              disabled={isSharing}
            >
              {isSharing ? '⏳ Sharing...' : `📤 Share via ${shareMethod}`}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <div className="card">
            <h2>Live Preview</h2>
            <div className="preview-content">
              <div className="preview-timetable">
                <div className="preview-header">
                  <h4>Computer Science Timetable - Week 1</h4>
                  <span className="preview-format">{exportFormat.toUpperCase()} Preview</span>
                </div>
                <div className="preview-grid">
                  <div className="preview-time">09:00-10:00</div>
                  <div className="preview-class lecture">
                    <strong>CS101</strong>
                    <span>Dr. Sharma</span>
                    <span>Room 101</span>
                  </div>
                  <div className="preview-time">10:00-11:00</div>
                  <div className="preview-class">
                    <strong>MATH201</strong>
                    <span>Prof. Gupta</span>
                    <span>Room 102</span>
                  </div>
                  <div className="preview-time">11:00-12:00</div>
                  <div className="preview-class lab">
                    <strong>PHYS301 Lab</strong>
                    <span>Dr. Singh</span>
                    <span>LAB1</span>
                  </div>
                </div>
                <div className="preview-footer">
                  <span>Generated on {new Date().toLocaleDateString()}</span>
                  {customization.watermark && <span className="watermark">CONFIDENTIAL</span>}
                </div>
              </div>
            </div>
            <div className="preview-actions">
              <button className="btn btn-sm btn-outline">
                🔄 Refresh Preview
              </button>
              <button className="btn btn-sm btn-outline">
                📏 Adjust Layout
              </button>
            </div>
          </div>

          {/* Export History */}
          <div className="card">
            <h2>Recent Exports</h2>
            <div className="export-history">
              {exportHistory.length === 0 ? (
                <p className="no-history">No recent exports</p>
              ) : (
                exportHistory.map(item => (
                  <div key={item.id} className="history-item">
                    <span className="history-icon">
                      {exportFormats.find(f => f.id === item.format)?.icon || '📄'}
                    </span>
                    <div className="history-info">
                      <strong>{item.format.toUpperCase()} Export</strong>
                      <span>{item.timestamp}</span>
                    </div>
                    <span className="history-size">{item.size}</span>
                    <button className="btn btn-sm btn-outline">
                      ↻ Re-export
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <h3>{exportHistory.length}</h3>
            <p>Total Exports</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <h3>150+</h3>
            <p>Potential Recipients</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💾</span>
          <div className="stat-info">
            <h3>5</h3>
            <p>Export Formats</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🕒</span>
          <div className="stat-info">
            <h3>{"<30s"}</h3>
            <p>Average Export Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportShare;