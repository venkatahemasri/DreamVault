import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Flag,
  Edit3,
  Trash2,
  Trophy,
  Clock,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers,
  Heart
} from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import ProgressBar from '../components/ProgressBar';
import MilestoneList from '../components/MilestoneList';
import Modal from '../components/Modal';
import { formatDate, getDaysRemainingLabel } from '../utils/helpers';
import confetti from 'canvas-confetti';
import './DreamDetails.css';

export default function DreamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    dreams,
    deleteDream,
    toggleMilestone,
    addMilestone,
    editMilestone,
    deleteMilestone,
    triggerCelebration,
    addToast
  } = useDreams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dream = dreams.find(d => d.id === id);

  if (!dream) {
    return (
      <div className="page-container not-found-dream glass-panel fade-in">
        <AlertTriangle size={48} color="#FF6B6B" />
        <h2>Dream Not Found</h2>
        <p>This dream may have been removed or the link is invalid.</p>
        <Link to="/dreams" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to My Dreams
        </Link>
      </div>
    );
  }

  const isAchieved = dream.status === 'Achieved' || dream.progress === 100;
  const isGradient = dream.image && (dream.image.startsWith('linear-gradient') || dream.image.startsWith('radial-gradient'));
  const completedMilestonesCount = (dream.milestones || []).filter(m => m.completed).length;
  const totalMilestonesCount = (dream.milestones || []).length;

  const handleDeleteDream = () => {
    deleteDream(dream.id);
    navigate('/dreams');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Dream link copied to clipboard!', 'info');
    }
  };

  const handleManualCelebration = () => {
    triggerCelebration(dream);
  };

  return (
    <div className="page-container dream-details-page fade-in">
      {/* Top Nav Breadcrumb / Back button */}
      <div className="details-top-bar">
        <Link to="/dreams" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to All Dreams</span>
        </Link>

        <div className="details-quick-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleShare}
            title="Share dream link"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>

          <Link
            to={`/dreams/${dream.id}/edit`}
            className="btn btn-secondary btn-sm"
            title="Edit Dream"
          >
            <Edit3 size={15} />
            <span>Edit</span>
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => setShowDeleteModal(true)}
            title="Delete Dream"
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className={`details-hero-banner glass-panel ${isAchieved ? 'details-hero-achieved' : ''}`}>
        <div
          className="details-banner-media"
          style={
            isGradient
              ? { background: dream.image }
              : dream.image
              ? { backgroundImage: `url(${dream.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: 'linear-gradient(135deg, #061826 0%, #0B2638 50%, #00D9C0 100%)' }
          }
        >
          <div className="details-banner-vignette" />
        </div>

        <div className="details-hero-content">
          <div className="details-badge-row">
            <span className="badge badge-teal">{dream.category}</span>
            <span
              className={`badge ${
                dream.priority === 'High'
                  ? 'badge-error'
                  : dream.priority === 'Medium'
                  ? 'badge-gold'
                  : 'badge-teal'
              }`}
            >
              <Flag size={12} />
              {dream.priority} Priority
            </span>
            {isAchieved ? (
              <span className="badge badge-gold">
                <Trophy size={13} /> Achieved Triumphant
              </span>
            ) : (
              <span className="badge badge-neutral">
                <Clock size={13} /> Active Quest
              </span>
            )}
          </div>

          <h1 className="details-title">{dream.title}</h1>

          {dream.description && (
            <p className="details-desc">{dream.description}</p>
          )}

          {/* Target Date Details */}
          <div className="details-meta-pill-row">
            <div className="details-meta-pill">
              <Calendar size={15} className="meta-icon" />
              <span>Target: <strong>{formatDate(dream.targetDate)}</strong></span>
            </div>
            {dream.targetDate && (
              <div className="details-meta-pill">
                <Clock size={15} className="meta-icon" />
                <span>{getDaysRemainingLabel(dream.targetDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Details Grid: Why It Matters & Progress / Milestones */}
      <div className="details-main-grid">
        {/* Left Column: Why It Matters & Milestones Checklist */}
        <div className="details-main-col">
          {/* Why It Matters Callout Card */}
          <div className="why-card glass-panel">
            <div className="why-card-header">
              <Heart size={18} className="text-teal" />
              <h3 className="why-card-title">WHY THIS DREAM MATTERS</h3>
            </div>
            <blockquote className="why-quote">
              “{dream.why || 'A personal quest destined for realization through persistent discipline.'}”
            </blockquote>
          </div>

          {/* Interactive Milestone Checklist */}
          <div className="milestones-card glass-panel">
            <MilestoneList
              milestones={dream.milestones || []}
              onToggle={(mId) => toggleMilestone(dream.id, mId)}
              onAdd={(title) => addMilestone(dream.id, title)}
              onEdit={(mId, newTitle) => editMilestone(dream.id, mId, newTitle)}
              onDelete={(mId) => deleteMilestone(dream.id, mId)}
            />
          </div>
        </div>

        {/* Right Column: Progress Card & Completion Status */}
        <div className="details-side-col">
          {/* Progress Card */}
          <div className="details-progress-card glass-panel">
            <div className="details-card-header">
              <Flame size={18} className="text-teal" />
              <h3 className="side-card-title">PROGRESS TELEMETRY</h3>
            </div>

            <div className="big-progress-readout">
              <span className="big-number">{dream.progress}%</span>
              <span className="readout-status">
                {isAchieved ? 'Quest Completed' : 'In Motion'}
              </span>
            </div>

            <ProgressBar progress={dream.progress} isAchieved={isAchieved} size="lg" showLabel={false} />

            <div className="progress-stats-breakdown">
              <div className="stat-sub-row">
                <span className="sub-stat-lbl">Milestones Completed</span>
                <span className="sub-stat-val text-teal">{completedMilestonesCount}</span>
              </div>
              <div className="stat-sub-row">
                <span className="sub-stat-lbl">Remaining Steps</span>
                <span className="sub-stat-val">
                  {Math.max(0, totalMilestonesCount - completedMilestonesCount)}
                </span>
              </div>
              <div className="stat-sub-row">
                <span className="sub-stat-lbl">Total Milestones</span>
                <span className="sub-stat-val">{totalMilestonesCount}</span>
              </div>
            </div>

            {isAchieved ? (
              <div className="achieved-callout-box">
                <Trophy size={28} className="text-gold" />
                <div className="achieved-text-wrap">
                  <h4>Hall of Fame Unlocked</h4>
                  <p>All milestones conquered. This dream is vaulted in your Achieved gallery.</p>
                </div>
                <button
                  className="btn btn-gold btn-sm"
                  onClick={handleManualCelebration}
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Sparkles size={14} />
                  <span>Replay Celebration</span>
                </button>
              </div>
            ) : (
              <div className="in-progress-tip-box">
                <Sparkles size={16} className="text-teal" />
                <span>
                  Check off milestones as you achieve them. Reaching 100% automatically elevates this dream to Achieved status.
                </span>
              </div>
            )}
          </div>

          {/* Quick Edit or Delete options card */}
          <div className="details-actions-card glass-panel">
            <h4 className="side-card-title">DREAM MANAGEMENT</h4>
            <div className="side-actions-list">
              <Link
                to={`/dreams/${dream.id}/edit`}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <Edit3 size={16} />
                <span>Edit Dream & Milestones</span>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => setShowDeleteModal(true)}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <Trash2 size={16} />
                <span>Delete Dream from Vault</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Permanently Delete Dream?"
        confirmText="Yes, Delete Permanently"
        confirmVariant="danger"
        isDanger={true}
        onConfirm={handleDeleteDream}
      >
        <p>
          Are you sure you want to delete <strong>"{dream.title}"</strong>?
        </p>
        <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--muted-text)' }}>
          All recorded milestones, notes, and progress history will be removed from your browser storage.
        </p>
      </Modal>
    </div>
  );
}
