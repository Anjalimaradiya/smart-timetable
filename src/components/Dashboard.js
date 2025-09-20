import React, { useState, useEffect } from 'react';

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    rooms: 0
  });

  const [quickActions] = useState([
    {
      title: 'Generate New Timetable',
      description: 'Create optimized schedules with AI',
      icon: '📅',
      action: () => onNavigate('generate')
    },
    {
      title: 'Upload Student Data',
      description: 'Import student information',
      icon: '📊',
      action: () => onNavigate('upload')
    },
    {
      title: 'View Current Timetable',
      description: 'Check existing schedules',
      icon: '👀',
      action: () => onNavigate('view')
    },
    {
      title: 'Sort',
      description: 'Organize timetable data',
      icon: '🔍',
      action: () => handleSortFilter()
    }
  ]);

  const [activities, setActivities] = useState([
    {
      title: 'Timetable generated for Computer Science Dept.',
      time: '2 hours ago'
    },
    {
      title: 'Room 101 booking conflict resolved',
      time: '4 hours ago'
    },
    {
      title: 'New faculty data uploaded',
      time: '6 hours ago'
    },
    {
      title: 'Holiday schedule updated for festival',
      time: '1 day ago'
    }
  ]);

  const [systemStatus] = useState([
    {
      component: 'AI Engine',
      status: 'Running optimally'
    },
    {
      component: 'Database',
      status: 'Connected'
    },
    {
      component: 'Last Backup',
      status: '2 hours ago'
    }
  ]);

  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        students: 150,
        faculty: 25,
        courses: 42,
        rooms: 18
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGenerateTimetable = () => {
    alert('Starting AI timetable generation...');
    
    // Simulate generation process
    setTimeout(() => {
      alert('Timetable generated successfully!');
      
      // Add new activity
      const newActivity = {
        title: 'New timetable generated from dashboard',
        time: 'Just now'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    }, 2000);
  };

  const handleRefreshData = () => {
    // Reset stats temporarily
    setStats({ students: 0, faculty: 0, courses: 0, rooms: 0 });
    
    // Simulate data refresh
    setTimeout(() => {
      setStats({
        students: 150 + Math.floor(Math.random() * 20),
        faculty: 25 + Math.floor(Math.random() * 5),
        courses: 42 + Math.floor(Math.random() * 3),
        rooms: 18
      });
      alert('Data refreshed successfully!');
    }, 1000);
  };

  const handleSortFilter = () => {
    // Toggle sort order
    const sortedActivities = [...activities].reverse();
    setActivities(sortedActivities);
    alert('Activities sorted!');
  };

  const clearActivities = () => {
    if (window.confirm('Clear all activities?')) {
      setActivities([]);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1>AI Timetable Generator</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleRefreshData}
            style={{ padding: '0.5rem 1rem' }}
          >
            🔄 Refresh Data
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleGenerateTimetable}
            style={{ padding: '0.5rem 1rem' }}
          >
            ⚡ Generate Now
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="card">
        <h2>Overview</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'var(--card-bg)', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <span style={{ fontSize: '2rem' }}>👨‍🎓</span>
            <div>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{stats.students}</h3>
              <p style={{ margin: 0 }}>Students</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'var(--card-bg)', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <span style={{ fontSize: '2rem' }}>👨‍🏫</span>
            <div>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{stats.faculty}</h3>
              <p style={{ margin: 0 }}>Faculty</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'var(--card-bg)', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <span style={{ fontSize: '2rem' }}>📚</span>
            <div>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{stats.courses}</h3>
              <p style={{ margin: 0 }}>Courses</p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'var(--card-bg)', 
            borderRadius: '8px', 
            border: '1px solid var(--border-color)' 
          }}>
            <span style={{ fontSize: '2rem' }}>🏫</span>
            <div>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{stats.rooms}</h3>
              <p style={{ margin: 0 }}>Rooms</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2>Quick Actions</h2>
        
      </div>
      
      <div className="row">
        <div className="col">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Recent System Activities</h2>
              <button 
                className="btn btn-sm btn-secondary"
                onClick={clearActivities}
                disabled={activities.length === 0}
              >
                Clear All
              </button>
            </div>
            {activities.length === 0 ? (
              <p style={{ color: 'var(--text-color)', opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
                No recent activities
              </p>
            ) : (
              <ul style={{listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto'}}>
                {activities.map((activity, index) => (
                  <li key={index} style={{
                    padding: '0.75rem', 
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div><strong>{activity.title}</strong></div>
                      <div style={{fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.7}}>{activity.time}</div>
                    </div>
                    <button 
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'var(--text-color)', 
                        opacity: 0.5, 
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                      }}
                      onClick={() => setActivities(prev => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="col">
          <div className="card">
            <h2>System Status</h2>
            <ul style={{listStyle: 'none', padding: 0, marginBottom: '1.5rem'}}>
              {systemStatus.map((status, index) => (
                <li key={index} style={{
                  padding: '0.75rem', 
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>{status.component}</strong>
                  </div>
                  <div>{status.status}</div>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button className="btn btn-sm btn-primary">
                Run Diagnostics
              </button>
              <button className="btn btn-sm btn-secondary">
                Backup Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;