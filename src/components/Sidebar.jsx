import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  FolderHeart,
  PlusCircle,
  Sparkles,
  Trophy,
  User,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import './Sidebar.css';

export default function Sidebar() {
  const { dreams, activeDreams, achievedDreams } = useDreams();

  const navItems = [
    { to: '/', label: 'Home / Dashboard', shortLabel: 'Home', icon: Compass },
    { to: '/dreams', label: 'My Dreams', shortLabel: 'My Dreams', icon: FolderHeart, badge: dreams.length },
    { to: '/add', label: '+ Add Dream', shortLabel: 'Add Dream', icon: PlusCircle, isSpecial: true },
    { to: '/vision-board', label: 'Vision Board', shortLabel: 'Vision Board', icon: Sparkles },
    { to: '/achieved', label: 'Achieved Dreams', shortLabel: 'Achieved', icon: Trophy, badge: achievedDreams.length, badgeType: 'gold' },
    { to: '/profile', label: 'Profile & Settings', shortLabel: 'Profile', icon: User }
  ];

  return (
    <aside className="sidebar-container" aria-label="Main Navigation">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <Link to="/" className="brand-link">
          <div className="brand-logo-hex">
            <Layers className="brand-icon" size={24} />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">DREAMVAULT</span>
            <span className="brand-tagline">TURN DREAMS TO REALITY</span>
          </div>
        </Link>
      </div>

      {/* Main Nav Links */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-section-title">NAVIGATION</div>
        <ul className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            if (item.isSpecial) {
              return (
                <li key={item.to} className="nav-item special-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link-special ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon size={20} className="special-icon" />
                    <span className="nav-label">{item.label}</span>
                    <ChevronRight size={16} className="arrow-indicator" />
                  </NavLink>
                </li>
              );
            }

            return (
              <li key={item.to} className="nav-item">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  end={item.to === '/'}
                >
                  <Icon size={19} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`nav-badge ${
                        item.badgeType === 'gold' ? 'badge-gold-style' : ''
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Vault Summary Card */}
      <div className="sidebar-footer">
        <div className="sidebar-stats-card">
          <div className="stats-header">
            <span className="stats-label">VAULT STATUS</span>
            <span className="stats-indicator-dot" />
          </div>
          <div className="stats-row">
            <div>
              <div className="stat-number">{activeDreams.length}</div>
              <div className="stat-desc">Active</div>
            </div>
            <div className="stats-divider" />
            <div>
              <div className="stat-number gold-num">{achievedDreams.length}</div>
              <div className="stat-desc">Achieved</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
