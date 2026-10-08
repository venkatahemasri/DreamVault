import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  FolderHeart,
  Plus,
  Sparkles,
  User
} from 'lucide-react';
import './MobileNav.css';

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        className={({ isActive }) => `mob-item ${isActive ? 'active' : ''}`}
        end
      >
        <Compass size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/dreams"
        className={({ isActive }) => `mob-item ${isActive ? 'active' : ''}`}
      >
        <FolderHeart size={20} />
        <span>Dreams</span>
      </NavLink>

      <NavLink
        to="/add"
        className={({ isActive }) => `mob-item mob-add-btn ${isActive ? 'active' : ''}`}
        aria-label="Add New Dream"
      >
        <div className="mob-add-circle">
          <Plus size={24} />
        </div>
        <span>Add</span>
      </NavLink>

      <NavLink
        to="/vision-board"
        className={({ isActive }) => `mob-item ${isActive ? 'active' : ''}`}
      >
        <Sparkles size={20} />
        <span>Board</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => `mob-item ${isActive ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
