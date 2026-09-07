import React, { useState } from 'react';
import './VeewoHero.css';

function VeewoHero({ onCreateRoomClick, onJoinRoomClick }) {
  const [activeTab, setActiveTab] = useState(0);

  const heroDescriptions = [
    "Grubpit powers real-time collaborative coding and DSA problem solving. Create instant room workspaces, sync code live with peers, and conquer top 100 LeetCode challenges.",
    "Practice C++, Python, Java, and JavaScript solutions with integrated test cases, live execution output, and instant socket synchronization across room members.",
    "Integrated group chat, room access security, problem filter lists, and multi-language support designed to make peer code interviews and study sessions effortless."
  ];

  return (
    <section className="veewo-hero-container">
      {/* Background Radial Glow Spotlights */}
      <div className="hero-radial-spotlight"></div>
      <div className="hero-cyan-glow-flare"></div>

      {/* Main Title Section */}
      <div className="hero-header-content">
        <h1 className="hero-headline">
          Real-Time Collaborative Coding &<br />
          DSA Problem Solving Workspace
        </h1>
      </div>

      {/* Main Hero Visual Area: Left Card + Center Node Graphic + Right Metric Cards */}
      <div className="hero-visual-grid">
        
        {/* Left Side Feature Text Box */}
        <div className="hero-left-card">
          <div className="indicator-tabs">
            <span 
              className={`indicator-bar ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => setActiveTab(0)}
            ></span>
            <span 
              className={`indicator-bar ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setActiveTab(1)}
            ></span>
            <span 
              className={`indicator-bar ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setActiveTab(2)}
            ></span>
          </div>

          <p className="hero-description-text">
            {heroDescriptions[activeTab]}
          </p>

          <div className="guide-pill-btn" onClick={onCreateRoomClick}>
            <div className="guide-pill-text">
              <span className="pill-title">Start Practice</span>
              <span className="pill-subtitle">Create or join room</span>
            </div>
            <div className="guide-circle-play">
              <svg width="12" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Center Glowing 3D 4-Node Emblem */}
        <div className="hero-center-emblem-wrapper">
          {/* Intense Radiant Central Light Flare */}
          <div className="emblem-core-light"></div>
          <div className="emblem-outer-aura"></div>

          {/* 4-Node Organic Silhouette Shape */}
          <div className="veewo-emblem-shape">
            <svg viewBox="0 0 300 300" className="emblem-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="centralLightGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="35%" stopColor="#67e8f9" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="emblemBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#181c2e" />
                  <stop offset="50%" stopColor="#0d101c" />
                  <stop offset="100%" stopColor="#121626" />
                </linearGradient>
                <filter id="emblemGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing Ambient Core Ring */}
              <circle cx="150" cy="150" r="70" fill="url(#centralLightGrad)" />

              {/* 4 Interconnected Node Bulbs (Top, Right, Bottom, Left) */}
              <g className="nodes-group">
                <path 
                  d="M150,45 
                     A42,42 0 1,1 150,129 
                     A42,42 0 1,1 234,150 
                     A42,42 0 1,1 150,234 
                     A42,42 0 1,1 66,150 
                     A42,42 0 1,1 150,45 Z"
                  fill="url(#emblemBodyGrad)" 
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="2"
                />

                <circle cx="150" cy="72" r="42" fill="url(#emblemBodyGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <circle cx="228" cy="150" r="42" fill="url(#emblemBodyGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <circle cx="150" cy="228" r="42" fill="url(#emblemBodyGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
                <circle cx="72" cy="150" r="42" fill="url(#emblemBodyGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

                <circle cx="150" cy="150" r="32" fill="#ffffff" filter="drop-shadow(0px 0px 18px #38bdf8)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Side Stacked Glass Metric Cards */}
        <div className="hero-right-cards">
          {/* Card 1: 100+ */}
          <div className="metric-card" onClick={onCreateRoomClick}>
            <div className="metric-card-header">
              <span className="metric-value">100+</span>
              <button className="metric-arrow-btn" aria-label="Details">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </div>
            <span className="metric-label">LeetCode Questions</span>
          </div>

          {/* Card 2: 100% */}
          <div className="metric-card" onClick={onJoinRoomClick}>
            <div className="metric-card-header">
              <span className="metric-value">Live</span>
              <button className="metric-arrow-btn" aria-label="Details">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </button>
            </div>
            <span className="metric-label">Socket Collaboration</span>
          </div>
        </div>

      </div>

      {/* Bottom Integration Tech Stack & Features Strip */}
      <div className="hero-partners-strip">
        <div className="partner-logo">
          <span className="partner-icon">🎯</span>
          <span className="partner-name">LeetCode DSA</span>
        </div>

        <div className="partner-logo">
          <span className="partner-icon">⚡</span>
          <span className="partner-name">Socket.IO Sync</span>
        </div>

        <div className="partner-logo">
          <span className="partner-icon">💻</span>
          <span className="partner-name">C++ / Python / JS</span>
        </div>

        <div className="partner-logo">
          <span className="partner-icon">💬</span>
          <span className="partner-name">Group Chat</span>
        </div>

        <div className="partner-logo">
          <span className="partner-icon">🔒</span>
          <span className="partner-name">Secured Rooms</span>
        </div>
      </div>
    </section>
  );
}

export default VeewoHero;
