import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import UploadData from './components/UploadData';
import GenerateTimetable from './components/GenerateTimetable';
import ViewTimetable from './components/ViewTimetable';
import ManageChanges from './components/ManageChanges';
import ExportShare from './components/ExportShare';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [theme, setTheme] = useState('light');

  // Apply theme to body element for better consistency
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'upload': return <UploadData />;
      case 'generate': return <GenerateTimetable />;
      case 'view': return <ViewTimetable />;
      case 'manage': return <ManageChanges />;
      case 'export': return <ExportShare />;
      default: return <Dashboard />;
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>AI Timetable Generator</h1>
        <nav className="main-nav">
          <button 
            className={currentPage === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentPage === 'upload' ? 'active' : ''}
            onClick={() => setCurrentPage('upload')}
          >
            Upload Data
          </button>
          <button 
            className={currentPage === 'generate' ? 'active' : ''}
            onClick={() => setCurrentPage('generate')}
          >
            Generate Timetable
          </button>
          <button 
            className={currentPage === 'view' ? 'active' : ''}
            onClick={() => setCurrentPage('view')}
          >
            View Timetable
          </button>
          <button 
            className={currentPage === 'manage' ? 'active' : ''}
            onClick={() => setCurrentPage('manage')}
          >
            Manage Changes
          </button>
          <button 
            className={currentPage === 'export' ? 'active' : ''}
            onClick={() => setCurrentPage('export')}
          >
            Export & Share
          </button>
        </nav>
        <div className="theme-toggle">
          <span>Theme: </span>
          <button onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </header>
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;