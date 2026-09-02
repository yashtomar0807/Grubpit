import './JoinRoomModal.css';
import axios from 'axios';
import { useState } from 'react';

function JoinRoomModal({ isOpen, onClose, onJoin }) {
  const [roomCode, setRoomCode] = useState('');
  const [pass, setpass] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setError('');

    if (!roomCode || !pass) {
      setError('Please enter both room code and password');
      return;
    }

    try {
      const roomData = {
        roomCode,
        password: pass
      };

      if (onJoin) {
        await onJoin(roomData);
      } else {
        const response = await axios.post('http://localhost:5000/api/room/join', roomData);
        if (response.status === 200) {
          onClose();
        }
      }
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.response?.data?.message || 'Failed to join room. Please check credentials.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card join-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span className="modal-icon cyan-icon-bg">🔑</span>
            <div>
              <h2>Join Room</h2>
              <p>Enter workspace with room code & password</p>
            </div>
          </div>
          <button className="modal-close-x" onClick={onClose}>✕</button>
        </div>

        {error && <div className="modal-error-banner">{error}</div>}

        <form onSubmit={handleJoinRoom} className="modal-form">
          <div className="form-group">
            <label>Room Code</label>
            <input 
              type="text" 
              placeholder="e.g. A1B2C3" 
              value={roomCode} 
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())} 
              maxLength={10}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter room password" 
              value={pass} 
              onChange={(e) => setpass(e.target.value)} 
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary join-submit-btn">
              Join Workspace →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinRoomModal;