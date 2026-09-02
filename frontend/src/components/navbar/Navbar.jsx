import './Navbar.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    alert("Profile Details:\nUsername: Developer\nEmail: yashtomar0807@gmail.com\nRole: Grubpit Pro Member");
    setIsProfileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate('/dashboard')}>
        <span className="logo-icon">⚡</span>
        <span className="logo-text">GRUBPIT</span>
        <span className="logo-badge">PRO</span>
      </div>

      <div className="search-bar">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Search active rooms, DSA topics, or problems..." />
      </div>

      <div className="user-profile-wrapper" ref={profileRef}>
        <div 
          className={`user-profile ${isProfileOpen ? 'active' : ''}`}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="user-avatar">
            <span>Y</span>
            <span className="status-dot"></span>
          </div>
          <span className="user-name">Developer</span>
          <span className="dropdown-arrow">{isProfileOpen ? '▲' : '▼'}</span>
        </div>

        {isProfileOpen && (
          <div className="profile-dropdown-menu">
            <div className="dropdown-user-info">
              <div className="dropdown-avatar">Y</div>
              <div className="dropdown-user-details">
                <span className="dropdown-name">Developer</span>
                <span className="dropdown-email">yashtomar0807@gmail.com</span>
                <span className="dropdown-status">● Online</span>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <button className="dropdown-item" onClick={handleProfileClick}>
              <span className="item-icon">👤</span>
              <span>My Profile</span>
            </button>

            <button className="dropdown-item logout-item" onClick={handleLogout}>
              <span className="item-icon">🚪</span>
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;