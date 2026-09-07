import React from 'react';
import './VeewoNavbar.css';

function VeewoNavbar({ onIntegrateClick, onCreateRoomClick, onJoinRoomClick }) {
  return (
    <div className="browser-header-wrapper">
      {/* Top Safari/Browser Window Controls Frame */}
      <div className="browser-top-bar">
        <div className="window-dots">
          <span className="dot dot-close"></span>
          <span className="dot dot-minimize"></span>
          <span className="dot dot-expand"></span>
        </div>
        <div className="window-nav-arrows">
          <span className="nav-arrow">&lt;</span>
          <span className="nav-arrow">&gt;</span>
        </div>
        <div className="browser-url-bar">
          <svg className="url-shield-icon" width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span className="url-text">grubpit.dev</span>
          <svg className="url-refresh-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        </div>
        <div className="window-actions">
          <svg className="window-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          <svg className="window-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <svg className="window-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <rect x="9" y="3" width="12" height="18"/>
          </svg>
        </div>
      </div>

      {/* Main Floating Header Navbar */}
      <nav className="veewo-navbar">
        <div className="veewo-logo">
          <div className="logo-icon-nodes">
            <span className="node node-1"></span>
            <span className="node node-2"></span>
            <span className="node node-3"></span>
            <span className="node node-4"></span>
          </div>
          <span className="logo-title">GRUBPIT</span>
        </div>

        <ul className="veewo-nav-menu">
          <li><a href="/dashboard" className="nav-link">Dashboard</a></li>
          <li><a href="#leetcode" className="nav-link" onClick={(e) => { e.preventDefault(); onCreateRoomClick(); }}>LeetCode DSA</a></li>
          <li><a href="#rooms" className="nav-link" onClick={(e) => { e.preventDefault(); onJoinRoomClick(); }}>Join Room</a></li>
          <li>
            <span className="nav-link" style={{ cursor: 'pointer' }} onClick={onCreateRoomClick}>
              Live Rooms<span className="career-count">(100+ DSA)</span>
            </span>
          </li>
          <li><a href="#compiler" className="nav-link">Compiler</a></li>
        </ul>

        <div className="veewo-nav-actions">
          <button className="integrate-btn" onClick={onCreateRoomClick}>
            <span>+ Create Room</span>
            <div className="btn-arrow-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default VeewoNavbar;
