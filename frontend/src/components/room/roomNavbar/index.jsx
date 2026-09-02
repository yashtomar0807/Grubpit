import './roomnavbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomNavbar({ room = {} }) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const roomData = Array.isArray(room) ? room[0] : room;

  const roomCode = roomData?.Roomcode || roomData?.roomCode || '---';
  const roomName = roomData?.Roomname || roomData?.roomName || 'Collaborative Workspace';
  const roomType = roomData?.Roomtype || roomData?.category || 'General';
  const maxPart = roomData?.maxparticipants || roomData?.maxParticipants || 10;
  const isLeetCode = roomType.toLowerCase().includes('leetcode') || roomType.toLowerCase().includes('category2');

  const handleCopyCode = () => {
    if (roomCode !== '---') {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="room-nav">
      <div className="room-nav-left">
        <div className="room-logo" onClick={() => navigate('/dashboard')}>
          <span>⚡ GRUBPIT</span>
        </div>
        <div className="divider"></div>
        <div className="room-title-section">
          <span className="live-status-dot"></span>
          <h2 className="room-name">{roomName}</h2>
          <span className={`room-category-pill ${isLeetCode ? 'leetcode-pill' : 'project-pill'}`}>
            {isLeetCode ? '🎯 LeetCode DSA' : '💻 Software Project'}
          </span>
        </div>
      </div>

      <div className="room-nav-right">
        <div className="copy-code-badge" onClick={handleCopyCode} title="Click to copy room code">
          <span className="code-label">CODE:</span>
          <span className="code-val">{roomCode}</span>
          <span className="copy-icon">{copied ? '✓ Copied' : '📋'}</span>
        </div>

        <div className="participants-badge">
          <span>👥 Max {maxPart}</span>
        </div>

        <button className="leave-room-btn" onClick={() => navigate('/dashboard')}>
          <span>Leave Room 🚪</span>
        </button>
      </div>
    </header>
  );
}

export default RoomNavbar;