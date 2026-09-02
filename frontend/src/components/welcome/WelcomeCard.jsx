import './WelcomeCard.css';

function WelcomeCard() { 
  return (
    <div className="welcome-card">
      <div className="welcome-content">
        <span className="welcome-badge">✨ COLLABORATIVE WORKSPACE</span>
        <h1>Collaborate, Code & Conquer DSA</h1>
        <p>
          Build software projects together in real-time or practice LeetCode & Codeforces DSA problems in synchronized team rooms.
        </p>
      </div>

      <div className="welcome-stats">
        <div className="stat-pill">
          <span className="stat-value">⚡ Live</span>
          <span className="stat-label">Real-time Sockets</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">💻 Multi-Lang</span>
          <span className="stat-label">C++, JS, Python, Java</span>
        </div>
        <div className="stat-pill">
          <span className="stat-value">🎯 Group DSA</span>
          <span className="stat-label">LeetCode & Codeforces</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;