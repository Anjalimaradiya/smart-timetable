import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const UploadData = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [uploadedFiles, setUploadedFiles] = useState({
    students: null,
    faculty: null,
    courses: null,
    rooms: null
  });
  const [previewData, setPreviewData] = useState(null);
  const [validationResults, setValidationResults] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  
  // Create separate refs for each file input
  const fileInputRefs = {
    students: useRef(null),
    faculty: useRef(null),
    courses: useRef(null),
    rooms: useRef(null)
  };

  const dataTypes = [
    { id: 'students', label: 'Students Data', icon: '👨‍🎓' },
    { id: 'faculty', label: 'Faculty Data', icon: '👨‍🏫' },
    { id: 'courses', label: 'Courses Data', icon: '📚' },
    { id: 'rooms', label: 'Rooms Data', icon: '🏫' }
  ];

  const sampleFormats = {
    students: [
      ['Roll No', 'Name', 'Email', 'Batch', 'Branch', 'Semester'],
      ['CS2021001', 'John Doe', 'john@email.com', '2021', 'Computer Science', '4'],
      ['CS2021002', 'Jane Smith', 'jane@email.com', '2021', 'Computer Science', '4']
    ],
    faculty: [
      ['Employee ID', 'Name', 'Email', 'Department', 'Specialization', 'Phone'],
      ['FAC001', 'Dr. Sharma', 'sharma@college.edu', 'Computer Science', 'AI', '9876543210'],
      ['FAC002', 'Prof. Gupta', 'gupta@college.edu', 'Mathematics', 'Calculus', '9876543211']
    ],
    courses: [
      ['Course Code', 'Course Name', 'Credits', 'Department', 'Prerequisites', 'Faculty ID'],
      ['CS101', 'Introduction to Programming', '4', 'Computer Science', 'None', 'FAC001'],
      ['MATH201', 'Advanced Calculus', '3', 'Mathematics', 'MATH101', 'FAC002']
    ],
    rooms: [
      ['Room No', 'Building', 'Capacity', 'Room Type', 'Equipment', 'Availability'],
      ['101', 'Main Building', '60', 'Lecture Hall', 'Projector, AC', 'Available'],
      ['LAB1', 'Science Block', '30', 'Laboratory', 'Computers, Projector', 'Available']
    ]
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return lines.map(line => {
      // Handle quoted fields and commas within quotes
      const result = [];
      let inQuotes = false;
      let currentField = '';
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(currentField.trim());
          currentField = '';
        } else {
          currentField += char;
        }
      }
      
      result.push(currentField.trim());
      return result;
    });
  };

  const parseExcel = (data) => {
    try {
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      return jsonData;
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      throw new Error('Failed to parse Excel file');
    }
  };

  const handleFileUpload = (event, dataType) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fileName = file.name.toLowerCase();
        let csvData;

        if (fileName.endsWith('.csv')) {
          // Handle CSV file
          const text = e.target.result;
          csvData = parseCSV(text);
        } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
          // Handle Excel file
          const data = new Uint8Array(e.target.result);
          csvData = parseExcel(data);
        } else {
          alert('Please upload a CSV or Excel file (.csv, .xlsx, .xls)');
          return;
        }

        console.log(`Uploaded ${dataType} data:`, csvData);
        
        setUploadedFiles(prev => ({
          ...prev,
          [dataType]: {
            file,
            data: csvData,
            fileName: file.name,
            uploadTime: new Date().toLocaleTimeString(),
            recordCount: csvData.length - 1 // Exclude header
          }
        }));

        setPreviewData({
          type: dataType,
          data: csvData.slice(0, 6), // Show first 6 rows for preview
          headers: csvData[0]
        });

        // Validate data
        validateData(csvData, dataType);
        
        alert(`✅ ${dataType} data uploaded successfully! ${csvData.length - 1} records found.`);
      } catch (error) {
        alert(`❌ Error reading file: ${error.message}`);
        console.error('File reading error:', error);
      }
    };

    reader.onerror = () => {
      alert('❌ Error reading the file. Please try again.');
    };

    if (file.name.toLowerCase().endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const validateData = (data, dataType) => {
    const errors = [];
    
    if (!data || data.length < 2) {
      errors.push('File must contain at least one data row');
    }

    if (data.length > 0) {
      // Check for empty rows
      const emptyRows = data.filter((row, index) => index > 0 && row.every(cell => !cell));
      if (emptyRows.length > 0) {
        errors.push(`Found ${emptyRows.length} empty rows`);
      }
    }

    setValidationResults(prev => ({
      ...prev,
      [dataType]: {
        isValid: errors.length === 0,
        errors,
        rowCount: data.length - 1
      }
    }));

    return errors.length === 0;
  };

  const handleProcessData = async () => {
    if (!uploadedFiles[activeTab]) {
      alert('Please upload a file first');
      return;
    }

    setIsUploading(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Log the processed data to console
    console.log('Processed data:', uploadedFiles[activeTab]);
    
    // Simulate successful processing
    const processedData = {
      ...uploadedFiles[activeTab],
      processedAt: new Date().toLocaleString(),
      status: 'processed'
    };
    
    setIsUploading(false);
    alert('🎉 Data processed successfully! Ready for timetable generation.');
  };

  const handleManualEntry = () => {
    alert('Manual entry feature would open a form here. For now, please use file upload.');
  };

  const removeFile = (dataType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [dataType]: null
    }));
    setPreviewData(null);
    setValidationResults(prev => ({
      ...prev,
      [dataType]: null
    }));
    
    // Reset file input
    if (fileInputRefs[dataType].current) {
      fileInputRefs[dataType].current.value = '';
    }
  };

  const exportSampleCSV = (dataType) => {
    const csvContent = sampleFormats[dataType].map(row => 
      row.map(field => `"${field}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataType}_sample.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const triggerFileInput = (dataType) => {
    if (fileInputRefs[dataType].current) {
      fileInputRefs[dataType].current.click();
    }
  };

  const renderUploadSection = (dataType) => {
    const file = uploadedFiles[dataType];
    const validation = validationResults[dataType];

    return (
      <div className="upload-section">
        <div className="upload-area">
          <div className="drop-zone">
            <input
              ref={fileInputRefs[dataType]}
              type="file"
              id={`file-upload-${dataType}`}
              accept=".csv,.xlsx,.xls"
              onChange={(e) => handleFileUpload(e, dataType)}
              style={{ display: 'none' }}
            />
            <div className="file-upload-content">
              <div className="upload-icon">📤</div>
              <h4>Upload {dataType} Data</h4>
              <p>CSV or Excel files (.csv, .xlsx, .xls)</p>
              <button 
                className="btn btn-primary"
                onClick={() => triggerFileInput(dataType)}
                type="button"
              >
                Choose File
              </button>
            </div>
          </div>

          {file && (
            <div className="file-info">
              <h4>Uploaded File:</h4>
              <div className="file-details">
                <span className="file-name">{file.fileName}</span>
                <span className="file-time">{file.uploadTime}</span>
                <span className="file-records">{file.recordCount} records</span>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFile(dataType)}
                  type="button"
                >
                  Remove
                </button>
              </div>
              
              {validation && (
                <div className={`validation-result ${validation.isValid ? 'valid' : 'invalid'}`}>
                  <strong>{validation.isValid ? '✅ Valid Format' : '❌ Validation Issues'}</strong>
                  {validation.errors.map((error, index) => (
                    <div key={index} className="error-message">• {error}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sample-section">
          <h4>Required Format:</h4>
          <div className="sample-table">
            <table>
              <thead>
                <tr>
                  {sampleFormats[dataType][0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleFormats[dataType].slice(1, 3).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sample-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => exportSampleCSV(dataType)}
              type="button"
            >
              Download Sample CSV
            </button>
            <button 
              className="btn btn-outline"
              onClick={handleManualEntry}
              type="button"
            >
              Enter Manually
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="upload-data-container">
      <h1>Upload Data</h1>
      <p>Import CSV or Excel files for student, faculty, course, and room data</p>

      {/* Tabs Navigation */}
      <div className="tabs">
        {dataTypes.map((type) => (
          <button
            key={type.id}
            className={`tab ${activeTab === type.id ? 'active' : ''}`}
            onClick={() => setActiveTab(type.id)}
            type="button"
          >
            <span className="tab-icon">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="tab-content">
        {renderUploadSection(activeTab)}
      </div>

      {/* Data Preview */}
      {previewData && previewData.type === activeTab && (
        <div className="card">
          <h3>Data Preview (First 5 rows)</h3>
          <div className="preview-table">
            <table>
              <thead>
                <tr>
                  {previewData.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.data.slice(1, 6).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="preview-note">
            Showing {Math.min(previewData.data.length - 1, 5)} of {previewData.data.length - 1} records
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="btn btn-primary"
          onClick={handleProcessData}
          disabled={!uploadedFiles[activeTab] || isUploading}
          type="button"
        >
          {isUploading ? '⏳ Processing...' : '⚡ Process Data'}
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => uploadedFiles[activeTab] && validateData(uploadedFiles[activeTab].data, activeTab)}
          disabled={!uploadedFiles[activeTab]}
          type="button"
        >
          🔍 Validate Again
        </button>
        <button 
          className="btn btn-success"
          disabled={!uploadedFiles[activeTab] || !validationResults[activeTab]?.isValid}
          type="button"
        >
          💾 Save to System
        </button>
      </div>

      {/* Upload Summary */}
      <div className="upload-summary">
        <h3>Upload Status</h3>
        <div className="summary-grid">
          {dataTypes.map((type) => {
            const file = uploadedFiles[type.id];
            const validation = validationResults[type.id];
            
            return (
              <div key={type.id} className="summary-item">
                <span className="summary-icon">{type.icon}</span>
                <div className="summary-info">
                  <strong>{type.label}</strong>
                  <span>
                    {file 
                      ? `${file.recordCount} records` 
                      : 'No file uploaded'
                    }
                  </span>
                  {validation && !validation.isValid && (
                    <span className="error-text">Validation needed</span>
                  )}
                </div>
                <div className={`status ${file ? (validation?.isValid ? 'valid' : 'warning') : 'pending'}`}>
                  {file ? (validation?.isValid ? '✅' : '⚠️') : '⏳'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instructions */}
      <div className="card instructions">
        <h3>📋 Instructions</h3>
        <ol>
          <li>Select the data type you want to upload</li>
          <li>Download the sample CSV format for reference</li>
          <li>Prepare your data in the same format</li>
          <li>Upload the CSV or Excel file using the upload button</li>
          <li>Review the preview and validation results</li>
          <li>Process and save the data when ready</li>
        </ol>
        <p><strong>Supported formats:</strong> CSV (.csv), Excel (.xlsx, .xls)</p>
      </div>
    </div>
  );
};

export default UploadData;