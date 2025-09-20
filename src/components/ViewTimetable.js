import React, { useState, useEffect } from 'react';

const ViewTimetable = () => {
  const [activeView, setActiveView] = useState('weekly'); // weekly, daily, faculty, room
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTimetable, setFilteredTimetable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data
  const sampleTimetable = {
    Monday: [
      { id: 1, time: '09:00-10:00', course: 'CS101 - Introduction to Programming', faculty: 'Dr. Sharma', room: '101', batch: 'CS 2021', type: 'Lecture' },
      { id: 2, time: '10:00-11:00', course: 'MATH201 - Advanced Calculus', faculty: 'Prof. Gupta', room: '102', batch: 'CS 2021', type: 'Lecture' },
      { id: 3, time: '11:00-12:00', course: 'PHYS301 - Physics Lab', faculty: 'Dr. Singh', room: 'LAB1', batch: 'CS 2021', type: 'Lab' },
      { id: 4, time: '14:00-15:00', course: 'CS102 - Data Structures', faculty: 'Dr. Sharma', room: '101', batch: 'CS 2021', type: 'Lecture' }
    ],
    Tuesday: [
      { id: 5, time: '09:00-10:00', course: 'MATH201 - Advanced Calculus', faculty: 'Prof. Gupta', room: '102', batch: 'CS 2021', type: 'Lecture' },
      { id: 6, time: '10:00-11:00', course: 'CS101 - Introduction to Programming', faculty: 'Dr. Sharma', room: '101', batch: 'CS 2021', type: 'Lecture' },
      { id: 7, time: '14:00-16:00', course: 'PHYS301 - Physics Lab', faculty: 'Dr. Singh', room: 'LAB1', batch: 'CS 2021', type: 'Lab' }
    ],
    Wednesday: [
      { id: 8, time: '09:00-10:00', course: 'CS102 - Data Structures', faculty: 'Dr. Sharma', room: '101', batch: 'CS 2021', type: 'Lecture' },
      { id: 9, time: '10:00-11:00', course: 'MATH201 - Advanced Calculus', faculty: 'Prof. Gupta', room: '102', batch: 'CS 2021', type: 'Lecture' },
      { id: 10, time: '11:00-12:00', course: 'ELEC201 - Electronics', faculty: 'Dr. Kumar', room: '103', batch: 'EE 2021', type: 'Lecture' }
    ],
    Thursday: [
      { id: 11, time: '09:00-11:00', course: 'CS101 - Programming Lab', faculty: 'Dr. Sharma', room: 'LAB2', batch: 'CS 2021', type: 'Lab' },
      { id: 12, time: '14:00-15:00', course: 'MATH201 - Advanced Calculus', faculty: 'Prof. Gupta', room: '102', batch: 'CS 2021', type: 'Tutorial' }
    ],
    Friday: [
      { id: 13, time: '09:00-10:00', course: 'ELEC201 - Electronics', faculty: 'Dr. Kumar', room: '103', batch: 'EE 2021', type: 'Lecture' },
      { id: 14, time: '10:00-11:00', course: 'CS102 - Data Structures', faculty: 'Dr. Sharma', room: '101', batch: 'CS 2021', type: 'Lecture' },
      { id: 15, time: '11:00-12:00', course: 'PHYS301 - Physics', faculty: 'Dr. Singh', room: 'LAB1', batch: 'CS 2021', type: 'Lecture' }
    ]
  };

  const facultyList = ['All', 'Dr. Sharma', 'Prof. Gupta', 'Dr. Singh', 'Dr. Kumar'];
  const roomList = ['All', '101', '102', '103', 'LAB1', 'LAB2'];
  const batchList = ['All', 'CS 2021', 'EE 2021', 'ME 2021', 'CE 2021'];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      filterTimetable();
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeView, selectedDate, selectedFaculty, selectedRoom, searchTerm]);

  const filterTimetable = () => {
    let filtered = [];

    if (activeView === 'weekly') {
      Object.entries(sampleTimetable).forEach(([day, classes]) => {
        classes.forEach(classItem => {
          if (
            (selectedFaculty === 'all' || classItem.faculty === selectedFaculty) &&
            (selectedRoom === 'all' || classItem.room === selectedRoom) &&
            (searchTerm === '' || 
             classItem.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
             classItem.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
             classItem.room.toLowerCase().includes(searchTerm.toLowerCase()))
          ) {
            filtered.push({ ...classItem, day });
          }
        });
      });
    }

    setFilteredTimetable(filtered);
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleExport = (format) => {
    alert(`Timetable exported as ${format.toUpperCase()} successfully!`);
    // Actual export functionality would go here
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClassClick = (classItem) => {
    alert(`Class Details:\nCourse: ${classItem.course}\nFaculty: ${classItem.faculty}\nRoom: ${classItem.room}\nTime: ${classItem.time}\nBatch: ${classItem.batch}`);
  };

  const renderWeeklyView = () => {
    if (isLoading) {
      return <div className="loading">Loading timetable data...</div>;
    }

    return (
      <div className="weekly-timetable">
        <div className="timetable-header">
          {['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(header => (
            <div key={header} className="header-cell">{header}</div>
          ))}
        </div>
        
        {['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'].map(timeSlot => (
          <div key={timeSlot} className="time-row">
            <div className="time-cell">{timeSlot}</div>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
              const classItem = sampleTimetable[day]?.find(cls => cls.time === timeSlot);
              return (
                <div key={day} className="class-cell">
                  {classItem ? (
                    <div 
                      className={`class-card ${classItem.type.toLowerCase()}`}
                      onClick={() => handleClassClick(classItem)}
                    >
                      <div className="class-course">{classItem.course.split(' - ')[0]}</div>
                      <div className="class-faculty">{classItem.faculty}</div>
                      <div className="class-room">{classItem.room}</div>
                      <div className="class-type">{classItem.type}</div>
                    </div>
                  ) : (
                    <div className="empty-slot">-</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const renderDailyView = () => {
    const day = getDayName(selectedDate);
    const dailyClasses = sampleTimetable[day] || [];

    return (
      <div className="daily-view">
        <h3>Schedule for {day}, {selectedDate}</h3>
        <div className="daily-classes">
          {dailyClasses.length === 0 ? (
            <div className="no-classes">No classes scheduled for this day</div>
          ) : (
            dailyClasses.map(classItem => (
              <div key={classItem.id} className="daily-class-card">
                <div className="class-time">{classItem.time}</div>
                <div className="class-info">
                  <h4>{classItem.course}</h4>
                  <p>{classItem.faculty} • {classItem.room} • {classItem.type}</p>
                  <span className="batch-tag">{classItem.batch}</span>
                </div>
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => handleClassClick(classItem)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderFacultyView = () => {
    const facultyClasses = filteredTimetable.filter(cls => 
      selectedFaculty === 'all' || cls.faculty === selectedFaculty
    );

    return (
      <div className="faculty-view">
        <h3>{selectedFaculty === 'all' ? 'All Faculty' : selectedFaculty}'s Schedule</h3>
        <div className="faculty-classes">
          {facultyClasses.length === 0 ? (
            <div className="no-classes">No classes found</div>
          ) : (
            facultyClasses.map(classItem => (
              <div key={classItem.id} className="faculty-class-card">
                <div className="class-day">{classItem.day}</div>
                <div className="class-time">{classItem.time}</div>
                <div className="class-info">
                  <h4>{classItem.course}</h4>
                  <p>{classItem.room} • {classItem.type}</p>
                  <span className="batch-tag">{classItem.batch}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderRoomView = () => {
    const roomClasses = filteredTimetable.filter(cls => 
      selectedRoom === 'all' || cls.room === selectedRoom
    );

    return (
      <div className="room-view">
        <h3>{selectedRoom === 'all' ? 'All Rooms' : `Room ${selectedRoom}`} Schedule</h3>
        <div className="room-classes">
          {roomClasses.length === 0 ? (
            <div className="no-classes">No classes found</div>
          ) : (
            roomClasses.map(classItem => (
              <div key={classItem.id} className="room-class-card">
                <div className="class-day">{classItem.day}</div>
                <div className="class-time">{classItem.time}</div>
                <div className="class-info">
                  <h4>{classItem.course}</h4>
                  <p>{classItem.faculty} • {classItem.type}</p>
                  <span className="batch-tag">{classItem.batch}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (activeView) {
      case 'weekly':
        return renderWeeklyView();
      case 'daily':
        return renderDailyView();
      case 'faculty':
        return renderFacultyView();
      case 'room':
        return renderRoomView();
      default:
        return renderWeeklyView();
    }
  };

  return (
    <div className="view-timetable-container">
      <div className="view-header">
        <h1>View Timetable</h1>
        <p>Browse and analyze generated timetables with advanced filters</p>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="view-toggles">
          <button 
            className={`view-toggle ${activeView === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveView('weekly')}
          >
            📅 Weekly View
          </button>
          <button 
            className={`view-toggle ${activeView === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveView('daily')}
          >
            📆 Daily View
          </button>
          <button 
            className={`view-toggle ${activeView === 'faculty' ? 'active' : ''}`}
            onClick={() => setActiveView('faculty')}
          >
            👨‍🏫 Faculty View
          </button>
          <button 
            className={`view-toggle ${activeView === 'room' ? 'active' : ''}`}
            onClick={() => setActiveView('room')}
          >
            🏫 Room View
          </button>
        </div>

        <div className="filter-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses, faculty, rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {activeView === 'daily' && (
            <div className="filter-group">
              <label>Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-picker"
              />
            </div>
          )}

          {activeView === 'faculty' && (
            <div className="filter-group">
              <label>Faculty:</label>
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="filter-select"
              >
                {facultyList.map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>
          )}

          {activeView === 'room' && (
            <div className="filter-group">
              <label>Room:</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="filter-select"
              >
                {roomList.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => handleExport('pdf')}>
            📄 Export PDF
          </button>
          <button className="btn btn-secondary" onClick={() => handleExport('excel')}>
            📊 Export Excel
          </button>
          <button className="btn btn-outline" onClick={handlePrint}>
            🖨️ Print
          </button>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">{filteredTimetable.length}</span>
          <span className="stat-label">Total Classes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{new Set(filteredTimetable.map(c => c.faculty)).size}</span>
          <span className="stat-label">Faculty</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{new Set(filteredTimetable.map(c => c.room)).size}</span>
          <span className="stat-label">Rooms</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{new Set(filteredTimetable.map(c => c.batch)).size}</span>
          <span className="stat-label">Batches</span>
        </div>
      </div>

      {/* Timetable Content */}
      <div className="timetable-content">
        {renderCurrentView()}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons-grid">
          <button className="btn btn-sm btn-outline">
            📋 Copy to Clipboard
          </button>
          <button className="btn btn-sm btn-outline">
            📧 Email Timetable
          </button>
          <button className="btn btn-sm btn-outline">
            🔔 Set Reminders
          </button>
          <button className="btn btn-sm btn-outline">
            📱 Mobile View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTimetable;