import React, { useState } from 'react';
import {
  User,
  Shield,
  Layers,
  Trophy,
  Target,
  Sparkles,
  Settings,
  RotateCcw,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Eye,
  Activity
} from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import './Profile.css';

export default function Profile() {
  const {
    profile,
    updateProfile,
    settings,
    updateSettings,
    totalDreams,
    activeDreams,
    achievedDreams,
    overallProgress,
    resetToDemoData,
    clearAllData
  } = useDreams();

  // Profile form state
  const [name, setName] = useState(profile.name || '');
  const [title, setTitle] = useState(profile.title || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [quote, setQuote] = useState(profile.quote || '');

  // Modals state
  const [showResetModal, setShowResetModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      ...profile,
      name: name.trim(),
      title: title.trim(),
      bio: bio.trim(),
      quote: quote.trim()
    });
  };

  const handleToggleReducedMotion = () => {
    updateSettings({
      ...settings,
      reducedMotion: !settings.reducedMotion
    });
  };

  const handleThemeModeChange = (mode) => {
    updateSettings({
      ...settings,
      themeMode: mode
    });
  };

  const handleConfirmReset = () => {
    resetToDemoData();
    setShowResetModal(false);
  };

  const handleConfirmClear = () => {
    clearAllData();
    setShowClearModal(false);
  };

  return (
    <div className="page-container profile-page fade-in">
      {/* Top Banner */}
      <div className="profile-banner glass-panel">
        <div className="profile-banner-left">
          <div className="profile-avatar-large">
            <span className="avatar-initials">
              {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'DV'}
            </span>
            <div className="avatar-status-pip" />
          </div>

          <div className="profile-text-block">
            <h1 className="profile-name">{profile.name || 'Visionary Dreamer'}</h1>
            <p className="profile-role">{profile.title || 'Architect of Ambition'}</p>
            <p className="profile-bio-snippet">{profile.bio}</p>
          </div>
        </div>

        <div className="profile-banner-stats">
          <div className="mini-stat-card">
            <span className="mini-num text-teal">{totalDreams}</span>
            <span className="mini-lbl">Total Dreams</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-num text-gold">{achievedDreams.length}</span>
            <span className="mini-lbl">Achieved</span>
          </div>
          <div className="mini-stat-card">
            <span className="mini-num">{activeDreams.length}</span>
            <span className="mini-lbl">Active</span>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="stats-grid">
        <StatCard
          label="Total Dreams"
          value={totalDreams}
          subtext="Vaulted life goals"
          icon={Layers}
          variant="teal"
        />
        <StatCard
          label="Active Dreams"
          value={activeDreams.length}
          subtext="In execution mode"
          icon={Target}
          variant="ocean"
        />
        <StatCard
          label="Achieved Dreams"
          value={achievedDreams.length}
          subtext="100% completed goals"
          icon={Trophy}
          variant="gold"
        />
        <StatCard
          label="Vault Velocity"
          value={`${overallProgress}%`}
          subtext="Average goal progress"
          icon={Activity}
          variant="teal"
        />
      </div>

      <div className="profile-sections-grid">
        {/* Left Column: Edit Profile */}
        <div className="profile-card glass-panel">
          <div className="card-section-header">
            <User size={18} className="text-teal" />
            <h3 className="section-title">PROFILE INFORMATION</h3>
          </div>

          <form onSubmit={handleProfileSubmit} className="profile-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Alex Mercer"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Title / Role</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="AI Engineer & Founder"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Personal Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-textarea"
                placeholder="Describe your current quest and life philosophy..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Core Motivational Quote</label>
              <input
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="form-input"
                placeholder="Discipline turns dreams into mathematical inevitability."
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              <Save size={16} />
              <span>Save Profile Changes</span>
            </button>
          </form>
        </div>

        {/* Right Column: App Settings & Danger Zone */}
        <div className="settings-col">
          {/* Settings Panel */}
          <div className="profile-card glass-panel">
            <div className="card-section-header">
              <Sliders size={18} className="text-teal" />
              <h3 className="section-title">APPLICATION PREFERENCES</h3>
            </div>

            <div className="settings-list">
              {/* Reduced Motion Toggle */}
              <div className="setting-row">
                <div className="setting-info">
                  <span className="setting-name">Reduced Motion</span>
                  <span className="setting-desc">
                    Disables canvas background particle animations & transitions for accessibility.
                  </span>
                </div>
                <button
                  type="button"
                  className={`toggle-switch ${settings?.reducedMotion ? 'active' : ''}`}
                  onClick={handleToggleReducedMotion}
                  role="switch"
                  aria-checked={settings?.reducedMotion}
                  aria-label="Toggle Reduced Motion"
                >
                  <span className="toggle-thumb" />
                </button>
              </div>

              {/* Theme Selector */}
              <div className="setting-row">
                <div className="setting-info">
                  <span className="setting-name">Visual Theme Mode</span>
                  <span className="setting-desc">
                    Midnight Navy & Deep Ocean color balance with Electric Teal and Warm Gold accents.
                  </span>
                </div>
                <select
                  value={settings?.themeMode || 'deep-ocean'}
                  onChange={(e) => handleThemeModeChange(e.target.value)}
                  className="filter-select"
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="deep-ocean">Deep Ocean (Default)</option>
                  <option value="midnight-stealth">Midnight Stealth</option>
                  <option value="cyber-electric">Electric Cyber</option>
                </select>
              </div>

              {/* Data Persistence Info */}
              <div className="setting-row">
                <div className="setting-info">
                  <span className="setting-name">Local Storage Status</span>
                  <span className="setting-desc">
                    All DreamVault data is encrypted locally within your browser sandbox. No external APIs or servers used.
                  </span>
                </div>
                <span className="badge badge-teal">Encrypted Local</span>
              </div>
            </div>
          </div>

          {/* Data Reset & Danger Zone */}
          <div className="profile-card glass-panel danger-card">
            <div className="card-section-header">
              <Shield size={18} className="text-gold" />
              <h3 className="section-title text-gold">DATA MANAGEMENT</h3>
            </div>

            <p className="danger-info-text">
              Manage your local storage data. You can restore realistic starter demo dreams or completely wipe all data.
            </p>

            <div className="danger-actions-row">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowResetModal(true)}
              >
                <RotateCcw size={14} />
                <span>Reset to Demo Dreams</span>
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => setShowClearModal(true)}
              >
                <Trash2 size={14} />
                <span>Clear All Vault Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset to Demo Dreams?"
        confirmText="Yes, Load Demo Dreams"
        confirmVariant="gold"
        onConfirm={handleConfirmReset}
      >
        <p>
          This will populate your vault with realistic starter dreams: <strong>"Become an AI Engineer"</strong>, <strong>"Travel to Japan"</strong>, <strong>"Build My Own Startup"</strong>, <strong>"Buy My Dream Laptop"</strong>, and <strong>"Run a 10K Marathon"</strong>.
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--muted-text)' }}>
          Any custom dreams you created will be replaced with the demo catalog.
        </p>
      </Modal>

      {/* Clear All Data Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear All Application Data?"
        confirmText="Yes, Wipe All Data"
        confirmVariant="danger"
        isDanger={true}
        onConfirm={handleConfirmClear}
      >
        <p>
          Are you sure you want to permanently delete all dreams and milestones from localStorage?
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--error-color)' }}>
          Your vault will be completely empty. This action cannot be reversed.
        </p>
      </Modal>
    </div>
  );
}
