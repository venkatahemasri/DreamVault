import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Trophy,
  ExternalLink,
  Edit3,
  Trash2,
  Clock,
  Sparkles,
  Flag
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import { formatDate, getDaysRemainingLabel } from '../utils/helpers';
import { useDreams } from '../context/DreamContext';
import './DreamCard.css';

export default function DreamCard({ dream }) {
  const navigate = useNavigate();
  const { deleteDream } = useDreams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!dream) return null;

  const completedCount = (dream.milestones || []).filter(m => m.completed).length;
  const totalMilestones = (dream.milestones || []).length;
  const isAchieved = dream.status === 'Achieved' || dream.progress === 100;

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteDream(dream.id);
    setShowDeleteModal(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/dreams/${dream.id}/edit`);
  };

  const handleCardClick = () => {
    navigate(`/dreams/${dream.id}`);
  };

  // Image / gradient styling
  const isGradient = dream.image && (dream.image.startsWith('linear-gradient') || dream.image.startsWith('radial-gradient'));

  return (
    <>
      <div className={`dream-card glass-panel ${isAchieved ? 'dream-achieved-glow' : ''}`} onClick={handleCardClick}>
        {/* Banner Media / Header */}
        <div
          className="dream-card-banner"
          style={
            isGradient
              ? { background: dream.image }
              : dream.image
              ? { backgroundImage: `url(${dream.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: 'linear-gradient(135deg, #061826 0%, #0B2638 50%, #00D9C0 100%)' }
          }
        >
          <div className="card-banner-overlay" />

          {/* Top Badges */}
          <div className="card-banner-top">
            <span className="badge badge-neutral card-cat-badge">
              {dream.category || 'General'}
            </span>

            <span
              className={`badge ${
                dream.priority === 'High'
                  ? 'badge-error'
                  : dream.priority === 'Medium'
                  ? 'badge-gold'
                  : 'badge-teal'
              }`}
            >
              <Flag size={11} />
              {dream.priority || 'Medium'}
            </span>
          </div>

          {/* Achievement ribbon if achieved */}
          {isAchieved && (
            <div className="card-achievement-ribbon">
              <Trophy size={13} />
              <span>ACHIEVED</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="dream-card-content">
          <div className="dream-card-header">
            <h3 className="dream-card-title">{dream.title}</h3>
            <span
              className={`status-pill ${
                isAchieved ? 'status-pill-achieved' : 'status-pill-progress'
              }`}
            >
              {isAchieved ? (
                <>
                  <CheckCircle2 size={13} /> Achieved
                </>
              ) : (
                <>
                  <Clock size={13} /> In Progress
                </>
              )}
            </span>
          </div>

          {dream.description && (
            <p className="dream-card-desc">{dream.description}</p>
          )}

          {/* Target Date Details */}
          <div className="dream-card-meta">
            <div className="meta-item">
              <Calendar size={14} className="meta-icon" />
              <span>{formatDate(dream.targetDate)}</span>
            </div>
            {dream.targetDate && (
              <span className="days-left-pill">
                {getDaysRemainingLabel(dream.targetDate)}
              </span>
            )}
          </div>

          {/* Progress Section */}
          <div className="dream-card-progress-section">
            <ProgressBar progress={dream.progress} isAchieved={isAchieved} size="sm" />
            <div className="milestone-ratio-text">
              <span className="ratio-count">
                <strong>{completedCount}</strong> of <strong>{totalMilestones}</strong> milestones completed
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="dream-card-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className="card-action-btn view-action"
              onClick={handleCardClick}
              title="View Dream Details"
            >
              <ExternalLink size={15} />
              <span>View</span>
            </button>

            <button
              className="card-action-btn edit-action"
              onClick={handleEdit}
              title="Edit Dream"
            >
              <Edit3 size={15} />
              <span>Edit</span>
            </button>

            <button
              className="card-action-btn delete-action"
              onClick={handleDelete}
              title="Delete Dream"
            >
              <Trash2 size={15} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Dream?"
        confirmText="Yes, Delete Dream"
        confirmVariant="danger"
        isDanger={true}
        onConfirm={confirmDelete}
      >
        <p>
          Are you sure you want to permanently delete <strong>"{dream.title}"</strong>?
        </p>
        <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--muted-text)' }}>
          This will remove all associated milestones and progress data from your vault. This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
