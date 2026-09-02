import './RoomHistory.css';
import { useNavigate } from 'react-router-dom';

function RoomHistory({ room = [], onDeleteRoom }) {
  const navigate = useNavigate();

  const handleDelete = (e, roomCode, roomName) => {
    e.stopPropagation(); // Stop card click from navigating to room
    if (window.confirm(`Are you sure you want to delete room "${roomName}" (#${roomCode})?`)) {
      if (onDeleteRoom) {
        onDeleteRoom(roomCode);
      }
    }
  };

  return (
    <div className="room-history">
      <div className="history-header">
        <h2>Recent Rooms</h2>
        <span className="room-count-badge">{room.length} Rooms</span>
      </div>

      {room.length === 0 ? (
        <div className="empty-rooms">
          <span className="empty-icon">📁</span>
          <p>No rooms created yet. Click "Create Room" above to get started!</p>
        </div>
      ) : (
        <div className="rooms-grid">
          {room.map((item) => {
            const roomCode = item.Roomcode || item.roomCode;
            const roomName = item.Roomname || item.roomName || 'Unnamed Room';
            const roomType = item.Roomtype || item.category || 'General';
            const maxPart = item.maxparticipants || item.maxParticipants || 10;
            const isLeetCode = roomType.toLowerCase().includes('leetcode') || roomType.toLowerCase().includes('category2');

            return (
              <div 
                key={item._id || roomCode} 
                className="room-card"
                onClick={() => navigate(`/room/${roomCode}`)}
              >
                <div className="card-top">
                  <span className={`category-tag ${isLeetCode ? 'leetcode-tag' : 'project-tag'}`}>
                    {isLeetCode ? '🎯 LeetCode DSA' : '💻 Project Workspace'}
                  </span>
                  
                  <div className="card-top-right">
                    <span className="code-pill">#{roomCode}</span>
                    <button 
                      className="delete-room-btn" 
                      onClick={(e) => handleDelete(e, roomCode, roomName)}
                      title="Delete Room"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <h3 className="room-title">{roomName}</h3>

                <div className="card-bottom">
                  <span className="capacity-badge">
                    👥 Max {maxPart} users
                  </span>
                  <button className="enter-room-btn">Enter →</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RoomHistory;