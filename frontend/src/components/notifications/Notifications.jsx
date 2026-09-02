import './Notifications.css';

function Notifications() {
  return (
    <section className="notifications">
      <div className="notifications-header">
        <h2>Activity & Alerts</h2>
        <span className="live-dot"></span>
      </div>

      <div className="notification-list">
        <div className="notification-card">
          <div className="notif-avatar indigo-avatar">RS</div>
          <div className="notif-content">
            <div className="notif-top">
              <h3>Rahul Sharma</h3>
              <span className="notif-time">2 min ago</span>
            </div>
            <p>Invited you to join <strong>"React Project Room"</strong></p>
          </div>
        </div>

        <div className="notification-card">
          <div className="notif-avatar cyan-avatar">AV</div>
          <div className="notif-content">
            <div className="notif-top">
              <h3>Aman Verma</h3>
              <span className="notif-time">10 min ago</span>
            </div>
            <p>Pushed new C++ solution in <strong>"Binary Tree Practice"</strong></p>
          </div>
        </div>

        <div className="notification-card">
          <div className="notif-avatar purple-avatar">DSA</div>
          <div className="notif-content">
            <div className="notif-top">
              <h3>Interview Session</h3>
              <span className="notif-time">15 min ago</span>
            </div>
            <p>Group contest session starts in 15 minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notifications;