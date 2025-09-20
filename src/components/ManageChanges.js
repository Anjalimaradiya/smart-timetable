// components/ManageChanges.js
import React, { useState } from 'react';

const ManageChanges = () => {
  const [changeType, setChangeType] = useState('Seminar/Event');
  const [formData, setFormData] = useState({
    title: '',
    date: '2025-09-17',
    time: '09:00-10:00',
    room: '',
    speaker: '',
    description: ''
  });

  const changes = [
    {
      type: 'seminar',
      title: 'AI in Education Seminar',
      date: 'Jan 15, 2024',
      time: '14:00-16:00',
      location: 'Auditorium',
      details: 'Guest lecture on artificial intelligence applications in modern education',
      speaker: 'Dr. Sarah Wilson',
      affected: ['CS101', 'MATH301'],
      notified: false
    },
    {
      type: 'holiday',
      title: 'Republic Day',
      date: 'Jun 26, 2024',
      time: 'All Day',
      details: 'National Holiday - All classes suspended',
      affected: ['All'],
      notified: false
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Change added successfully!');
  };

  return (
    <div>
      <h1>Manage Changes</h1>
      <p>Handle schedule modifications, events, and notifications</p>
      
      <div className="row">
        <div className="col">
          <div className="card">
            <h2>Statistics</h2>
            <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
              <div>
                <h3>12</h3>
                <p>Pending</p>
              </div>
              <div>
                <h3>8</h3>
                <p>Confirmed</p>
              </div>
              <div>
                <h3>5</h3>
                <p>This Week</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col">
          <div className="card">
            <h2>Add New Change</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Change Type</label>
                <select 
                  className="form-control"
                  value={changeType}
                  onChange={(e) => setChangeType(e.target.value)}
                >
                  <option>Seminar/Event</option>
                  <option>Holiday</option>
                  <option>Reschedule</option>
                  <option>Cancellation</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter title..."
                />
              </div>
              
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label>Time</label>
                <input
                  type="text"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 09:00-10:00"
                />
              </div>
              
              {changeType === 'Seminar/Event' && (
                <>
                  <div className="form-group">
                    <label>Room</label>
                    <input
                      type="text"
                      className="form-control"
                      name="room"
                      value={formData.room}
                      onChange={handleInputChange}
                      placeholder="Select room"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Speaker</label>
                    <input
                      type="text"
                      className="form-control"
                      name="speaker"
                      value={formData.speaker}
                      onChange={handleInputChange}
                      placeholder="Speaker name..."
                    />
                  </div>
                </>
              )}
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional details..."
                  rows="3"
                />
              </div>
              
              <button type="submit" className="btn btn-primary">Add Change</button>
              <button type="button" className="btn btn-secondary" style={{marginLeft: '0.5rem'}}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2>All Changes</h2>
        <div style={{marginBottom: '1rem'}}>
          <button className="btn btn-primary" style={{marginRight: '0.5rem'}}>Seminars</button>
          <button className="btn btn-secondary" style={{marginRight: '0.5rem'}}>Holidays</button>
          <button className="btn btn-secondary" style={{marginRight: '0.5rem'}}>Reschedules</button>
          <button className="btn btn-secondary">Cancellations</button>
        </div>
        
        <div>
          {changes.map((change, index) => (
            <div key={index} className="card" style={{marginBottom: '1rem'}}>
              <h3>{change.title}</h3>
              <p><strong>Date:</strong> {change.date} | <strong>Time:</strong> {change.time}</p>
              {change.location && <p><strong>Location:</strong> {change.location}</p>}
              <p>{change.details}</p>
              {change.speaker && <p><strong>Speaker:</strong> {change.speaker}</p>}
              <p><strong>Affected:</strong> {change.affected.join(', ')}</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>Notified: {change.notified ? '✓' : '○'}</span>
                <div>
                  <button className="btn btn-success" style={{marginRight: '0.5rem'}}>Confirm</button>
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageChanges;