import './QuickActions.css';

function QuickActions({ onCreateRoomClick, onJoinRoomClick }) {
  return (
    <section className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="btn-container">
        <div className="action-card create-card">
          <div className="action-header">
            <div className="action-icon indigo-icon">🚀</div>
            <div>
              <h3>Create Room</h3>
              <p>Spin up a new workspace for project collaboration or DSA</p>
            </div>
          </div>
          <button className="action-btn create-btn" onClick={onCreateRoomClick}>
            <span>+ Create Room</span>
          </button>
        </div>

        <div className="action-card join-card">
          <div className="action-header">
            <div className="action-icon cyan-icon">🔑</div>
            <div>
              <h3>Join Room</h3>
              <p>Enter an existing session using room code & password</p>
            </div>
          </div>
          <button className="action-btn join-btn" onClick={onJoinRoomClick}>
            <span>→ Join Room</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuickActions;