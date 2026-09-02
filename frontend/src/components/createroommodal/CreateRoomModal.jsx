import './CreateRoomModal.css';
import React, { useState } from 'react';

function CreateRoomModal({ isOpen, onClose, onCreate }) {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('category1');
  const [maxParticipants, setMaxParticipants] = useState('10');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!roomName || !password || !category || !maxParticipants) {
      setError('Please fill in all fields');
      return;
    }
    if (roomName.length < 3 || roomName.length > 20) {
      setError('Room name must be between 3 and 20 characters');
      return;
    }
    if (password.length < 6 || password.length > 20) {
      setError('Password must be between 6 and 20 characters');
      return;
    }
    if (Number(maxParticipants) < 2 || Number(maxParticipants) > 100) {
      setError('Maximum participants must be between 2 and 100');
      return;
    }

    const roomData = {
      roomName,
      password,
      category,
      maxParticipants
    };
    onCreate(roomData);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-icon">🚀</span>
            <div>
              <h2>Create New Room</h2>
              <p>Setup a collaborative coding workspace</p>
            </div>
          </div>
          <button className="modal-close-x" onClick={onClose}>✕</button>
        </div>

        {error && <div className="modal-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Room Name</label>
            <input 
              type="text" 
              placeholder="e.g. Algo-Traders / Binary Tree DSA" 
              value={roomName} 
              onChange={(e) => setRoomName(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Room Password</label>
            <input 
              type="password" 
              placeholder="Set room access password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Room Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="category1">💻 Software Projects</option>
                <option value="category2">🎯 LeetCode & DSA</option>
              </select>
            </div>

            <div className="form-group">
              <label>Max Capacity</label>
              <input 
                type="number" 
                placeholder="10" 
                value={maxParticipants} 
                onChange={(e) => setMaxParticipants(e.target.value)} 
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Room →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomModal;