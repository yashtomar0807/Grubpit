import './users.css';

function Users() {
  const dummyUsers = [
    { id: 1, name: 'You (Developer)', role: 'Host', isOnline: true, avatarBg: 'indigo-bg' },
    { id: 2, name: 'Rahul Sharma', role: 'Member', isOnline: true, avatarBg: 'cyan-bg' },
    { id: 3, name: 'Aman Verma', role: 'Member', isOnline: false, avatarBg: 'purple-bg' }
  ];

  return (
    <div className="users-container">
      <div className="users-header">
        <h3>Participants</h3>
        <span className="user-count">{dummyUsers.length}</span>
      </div>

      <div className="users-list">
        {dummyUsers.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-avatar-wrap">
              <div className={`user-avatar-circle ${user.avatarBg}`}>
                {user.name.charAt(0)}
              </div>
              <span className={`online-status-dot ${user.isOnline ? 'online' : 'offline'}`}></span>
            </div>

            <div className="user-info">
              <span className="user-display-name">{user.name}</span>
              <span className={`role-badge ${user.role === 'Host' ? 'host-badge' : 'member-badge'}`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;