import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import confetti from 'canvas-confetti';
import './AchievementCard.css';

export default function AchievementCard({ dream }) {
  const navigate = useNavigate();

  if (!dream) return null;

  const isGradient = dream.image && (dream.image.startsWith('linear-gradient') || dream.image.startsWith('radial-gradient'));

  const handleCelebrate = (e) => {
    e.stopPropagation();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFC857', '#00D9C0', '#19F5D1', '#FFFFFF']
      });
    } catch (err) {
      console.warn('Confetti error:', err);
    }
  };

  return (
    <div
      className="achievement-card glass-panel fade-in"
      onClick={() => navigate(`/dreams/${dream.id}`)}
    >
      {/* Banner / Visual */}
      <div
        className="achievement-banner"
        style={
          isGradient
            ? { background: dream.image }
            : dream.image
            ? { backgroundImage: `url(${dream.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: 'linear-gradient(135deg, #0B2638 0%, #061826 60%, #FFC857 100%)' }
        }
      >
        <div className="achievement-banner-overlay" />
        <div className="achievement-badge-pill">
          <Trophy size={14} className="trophy-gold" />
          <span>VAULTED TRIUMPH</span>
        </div>
      </div>

      {/* Body */}
      <div className="achievement-body">
        <div className="achievement-cat-row">
          <span className="badge badge-gold">{dream.category}</span>
          <div className="achievement-date">
            <Calendar size={13} />
            <span>Achieved {formatDate(dream.achievedAt || dream.targetDate)}</span>
          </div>
        </div>

        <h3 className="achievement-title">{dream.title}</h3>

        <div className="achievement-motto">
          <Sparkles size={14} className="sparkle-gold" />
          <p className="motto-text">
            “You dreamed it. You worked for it. You achieved it.”
          </p>
        </div>

        {dream.why && (
          <p className="achievement-why">
            <strong>Why it mattered:</strong> {dream.why}
          </p>
        )}

        {/* Milestone Accomplishment Summary */}
        <div className="achievement-stats-pill">
          <CheckCircle2 size={16} className="check-gold" />
          <span>
            All <strong>{(dream.milestones || []).length}</strong> milestones successfully mastered
          </span>
        </div>

        {/* Footer actions */}
        <div className="achievement-footer" onClick={(e) => e.stopPropagation()}>
          <button
            className="btn btn-secondary btn-sm celebrate-btn"
            onClick={handleCelebrate}
            title="Celebrate this achievement again"
          >
            <Sparkles size={14} />
            <span>Celebrate Again</span>
          </button>

          <button
            className="btn btn-gold btn-sm view-achieved-btn"
            onClick={() => navigate(`/dreams/${dream.id}`)}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
