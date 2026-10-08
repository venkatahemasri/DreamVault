import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Layers,
  Sparkles,
  Calendar,
  Search
} from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import './Navbar.css';

export default function Navbar() {
  const { profile } = useDreams();
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="navbar-container">
      {/* Mobile brand indicator */}
      <div className="navbar-left">
        <Link to="/" className="mobile-brand-link">
          <div className="mobile-logo-hex">
            <Layers size={18} color="#00D9C0" />
          </div>
          <span className="mobile-brand-text">DREAMVAULT</span>
        </Link>

        {/* Current Date Widget */}
        <div className="date-badge">
          <Calendar size={14} className="date-icon" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="navbar-right">
        {/* Quick Search Shortcut */}
        <button
          className="quick-search-btn"
          onClick={() => navigate('/dreams')}
          title="Browse & Search Dreams"
          aria-label="Search Dreams"
        >
          <Search size={15} />
          <span className="search-text">Search dreams...</span>
          <span className="shortcut-kbd">/</span>
        </button>

        {/* Prominent Add Dream button */}
        <Link to="/add" className="btn btn-primary btn-sm top-add-btn">
          <Plus size={16} />
          <span>Add Dream</span>
        </Link>

        {/* User Profile Pill */}
        <Link to="/profile" className="user-profile-pill" title="View Profile & Settings">
          <div className="user-avatar-circle">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="user-name-snippet">{profile.name || 'Dreamer'}</span>
        </Link>
      </div>
    </header>
  );
}
