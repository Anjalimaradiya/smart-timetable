import React, { useState, useEffect } from 'react';

const GenerateTimetable = () => {
  const [generationSettings, setGenerationSettings] = useState({
    semester: 'Spring 2024',
    batch: 'Computer Science 2021',
    maxClassesPerDay: 6,
    totalClassesPerWeek: 32,
    semesterStartDate: '2025-09-17',
    semesterEndDate: '2025-12-16',
    lunchBreakStart: '12:00',
    lunchBreakEnd: '13:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    optimizationSettings: {
      prioritizeCoreCourses: true,
      avoidBackToBackLabs: true,
      distributeFacultyLoad: true,
      optimizeRoomUsage: true,
      considerFacultyPreferences: true
    }
  });

  const [generationStatus, setGenerationStatus] = useState('idle'); // idle, generating, success, error
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [stats, setStats] = useState({
    students: 150,
    courses: 12,
    faculty: 8,
    rooms: 6
  });

  const workingDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const batchOptions = ['Computer Science 2021', 'Electrical Engineering 2021', 'Mechanical Engineering 2021', 'Civil Engineering 2021'];
  const semesterOptions = ['Spring 2024', 'Fall 2024', 'Winter 2024', 'Summer 2024'];

  const sampleTimetable = {
    Monday: [
      { time: '09:00-10:00', course: 'CS101', faculty: 'Dr. Sharma', room: '101' },
      { time: '10:00-11:00', course: 'MATH201', faculty: 'Prof. Gupta', room: '102' },
      { time: '11:00-12:00', course: 'PHYS301', faculty: 'Dr. Singh', room: 'LAB1' },
      { time: '14:00-15:00', course: 'CS102', faculty: 'Dr. Sharma', room: '101' }
    ],
    Tuesday: [
      { time: '09:00-10:00', course: 'MATH201', faculty: 'Prof. Gupta', room: '102' },
      { time: '10:00-11:00', course: 'CS101', faculty: 'Dr. Sharma', room: '101' },
      { time: '14:00-16:00', course: 'PHYS301 Lab', faculty: 'Dr. Singh', room: 'LAB1' }
    ],
    Wednesday: [
      { time: '09:00-10:00', course: 'CS102', faculty: 'Dr. Sharma', room: '101' },
      { time: '10:00-11:00', course: 'MATH201', faculty: 'Prof. Gupta', room: '102' },
      { time: '11:00-12:00', course: 'ELEC201', faculty: 'Dr. Kumar', room: '103' }
    ],
    Thursday: [
      { time: '09:00-11:00', course: 'CS101 Lab', faculty: 'Dr. Sharma', room: 'LAB2' },
      { time: '14:00-15:00', course: 'MATH201', faculty: 'Prof. Gupta', room: '102' }
    ],
    Friday: [
      { time: '09:00-10:00', course: 'ELEC201', faculty: 'Dr. Kumar', room: '103' },
      { time: '10:00-11:00', course: 'CS102', faculty: 'Dr. Sharma', room: '101' },
      { time: '11:00-12:00', course: 'PHYS301', faculty: 'Dr. Singh', room: 'LAB1' }
    ]
  };

  const sampleConflicts = [
    { type: 'Room Conflict', message: 'Room 101 double-booked on Monday 09:00', severity: 'high' },
    { type: 'Faculty Conflict', message: 'Dr. Sharma scheduled in two places simultaneously', severity: 'high' },
    { type: 'Optimization', message: 'Consider moving CS101 to better time slot', severity: 'low' }
  ];

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        students: 150 + Math.floor(Math.random() * 20),
        courses: 12 + Math.floor(Math.random() * 3),
        faculty: 8 + Math.floor(Math.random() * 2),
        rooms: 6
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSettingChange = (key, value) => {
    setGenerationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleOptimizationToggle = (setting) => {
    setGenerationSettings(prev => ({
      ...prev,
      optimizationSettings: {
        ...prev.optimizationSettings,
        [setting]: !prev.optimizationSettings[setting]
      }
    }));
  };

  const handleWorkingDayToggle = (day) => {
    const currentDays = [...generationSettings.workingDays];
    if (currentDays.includes(day)) {
      handleSettingChange('workingDays', currentDays.filter(d => d !== day));
    } else {
      handleSettingChange('workingDays', [...currentDays, day]);
    }
  };

  const simulateAIGeneration = async () => {
    setGenerationStatus('generating');
    setGenerationProgress(0);
    setGeneratedTimetable(null);
    setConflicts([]);

    // Simulate AI processing with progress updates
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setGenerationProgress(i);
      
      // Simulate conflicts detection at 50%
      if (i === 50) {
        setConflicts(sampleConflicts);
      }
    }

    // Simulate completion
    await new Promise(resolve => setTimeout(resolve, 500));
    setGeneratedTimetable(sampleTimetable);
    setGenerationStatus('success');
    
    // Auto-resolve conflicts after 2 seconds
    setTimeout(() => {
      setConflicts(prev => prev.filter(conflict => conflict.severity === 'low'));
    }, 2000);
  };

  const handleGenerateTimetable = () => {
    if (generationSettings.workingDays.length === 0) {
      alert('Please select at least one working day');
      return;
    }

    simulateAIGeneration();
  };

  const handleSaveTimetable = () => {
    alert('Timetable saved successfully!');
    // Here you would typically send the timetable to your backend
  };

  const handleExportTimetable = (format) => {
    alert(`Timetable exported as ${format} successfully!`);
  };

  const handleRegenerate = () => {
    setGenerationStatus('idle');
    setGeneratedTimetable(null);
    setConflicts([]);
  };

  const resolveConflict = (index) => {
    setConflicts(prev => prev.filter((_, i) => i !== index));
  };

  const renderGenerationStatus = () => {
    switch (generationStatus) {
      case 'generating':
        return (
          <div className="generation-status">
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
              <span className="progress-text">{generationProgress}%</span>
            </div>
            <div className="status-message">
              <span className="ai-thinking">🤖 AI is generating your timetable...</span>
              <ul className="ai-process">
                <li>Analyzing course constraints</li>
                <li>Optimizing faculty schedules</li>
                <li>Allocating rooms efficiently</li>
                <li>Resolving conflicts</li>
              </ul>
            </div>
          </div>
        );
      
      case 'success':
        return (
          <div className="generation-success">
            <div className="success-header">
              <span className="success-icon">🎉</span>
              <h3>Timetable Generated Successfully!</h3>
            </div>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={handleSaveTimetable}>
                💾 Save Timetable
              </button>
              <button className="btn btn-secondary" onClick={() => handleExportTimetable('PDF')}>
                📄 Export PDF
              </button>
              <button className="btn btn-secondary" onClick={() => handleExportTimetable('Excel')}>
                📊 Export Excel
              </button>
              <button className="btn btn-outline" onClick={handleRegenerate}>
                🔄 Regenerate
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <button 
            className="btn btn-primary generate-btn"
            onClick={handleGenerateTimetable}
            disabled={generationSettings.workingDays.length === 0}
          >
            ⚡ Generate Timetable
          </button>
        );
    }
  };

  const renderTimetablePreview = () => {
    if (!generatedTimetable) return null;

    return (
      <div className="timetable-preview">
        <h3>Generated Timetable Preview</h3>
        <div className="timetable-grid">
          {Object.entries(generatedTimetable).map(([day, classes]) => (
            <div key={day} className="timetable-day">
              <h4 className="day-header">{day}</h4>
              <div className="classes-list">
                {classes.map((classItem, index) => (
                  <div key={index} className="class-item">
                    <span className="class-time">{classItem.time}</span>
                    <span className="class-course">{classItem.course}</span>
                    <span className="class-faculty">{classItem.faculty}</span>
                    <span className="class-room">{classItem.room}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderConflicts = () => {
    if (conflicts.length === 0) return null;

    return (
      <div className="conflicts-section">
        <h3>⚠️ Detected Conflicts</h3>
        <div className="conflicts-list">
          {conflicts.map((conflict, index) => (
            <div key={index} className={`conflict-item ${conflict.severity}`}>
              <span className="conflict-type">{conflict.type}</span>
              <span className="conflict-message">{conflict.message}</span>
              {conflict.severity === 'high' && (
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => resolveConflict(index)}
                >
                  Resolve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="generate-timetable-container">
      <h1>Generate Timetable</h1>
      <p>Create AI optimized schedules with intelligent conflict resolution</p>

      <div className="generation-content">
        {/* Configuration Panel */}
        <div className="config-panel">
          <div className="card">
            <h2>Basic Configuration</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Semester</label>
                <select
                  value={generationSettings.semester}
                  onChange={(e) => handleSettingChange('semester', e.target.value)}
                  className="form-control"
                >
                  {semesterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Batch/Department</label>
                <select
                  value={generationSettings.batch}
                  onChange={(e) => handleSettingChange('batch', e.target.value)}
                  className="form-control"
                >
                  {batchOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Max Classes Per Day</label>
                <input
                  type="number"
                  value={generationSettings.maxClassesPerDay}
                  onChange={(e) => handleSettingChange('maxClassesPerDay', parseInt(e.target.value))}
                  className="form-control"
                  min="1"
                  max="8"
                />
              </div>

              <div className="form-group">
                <label>Total Classes Per Week</label>
                <input
                  type="number"
                  value={generationSettings.totalClassesPerWeek}
                  onChange={(e) => handleSettingChange('totalClassesPerWeek', parseInt(e.target.value))}
                  className="form-control"
                  min="1"
                  max="40"
                />
              </div>

              <div className="form-group">
                <label>Semester Start Date</label>
                <input
                  type="date"
                  value={generationSettings.semesterStartDate}
                  onChange={(e) => handleSettingChange('semesterStartDate', e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Semester End Date</label>
                <input
                  type="date"
                  value={generationSettings.semesterEndDate}
                  onChange={(e) => handleSettingChange('semesterEndDate', e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Lunch Break Start</label>
                <input
                  type="time"
                  value={generationSettings.lunchBreakStart}
                  onChange={(e) => handleSettingChange('lunchBreakStart', e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Lunch Break End</label>
                <input
                  type="time"
                  value={generationSettings.lunchBreakEnd}
                  onChange={(e) => handleSettingChange('lunchBreakEnd', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="working-days-section">
              <label>Working Days</label>
              <div className="days-grid">
                {workingDaysOptions.map(day => (
                  <button
                    key={day}
                    type="button"
                    className={`day-toggle ${generationSettings.workingDays.includes(day) ? 'active' : ''}`}
                    onClick={() => handleWorkingDayToggle(day)}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2>AI Optimization Settings</h2>
            <div className="optimization-settings">
              {Object.entries(generationSettings.optimizationSettings).map(([key, value]) => (
                <label key={key} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleOptimizationToggle(key)}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Generation Panel */}
        <div className="generation-panel">
          <div className="card">
            <h2>AI Timetable Generator</h2>
            
            <div className="quick-stats">
              <h4>Quick Stats</h4>
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-icon">👨‍🎓</span>
                  <span className="stat-value">{stats.students}</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">📚</span>
                  <span className="stat-value">{stats.courses}</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">👨‍🏫</span>
                  <span className="stat-value">{stats.faculty}</span>
                  <span className="stat-label">Faculty</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🏫</span>
                  <span className="stat-value">{stats.rooms}</span>
                  <span className="stat-label">Rooms</span>
                </div>
              </div>
            </div>

            <div className="generation-controls">
              {renderGenerationStatus()}
            </div>

            {renderConflicts()}
          </div>

          {renderTimetablePreview()}
        </div>
      </div>
    </div>
  );
};

export default GenerateTimetable;