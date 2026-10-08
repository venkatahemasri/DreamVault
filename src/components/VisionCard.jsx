import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Trophy, Sparkles, Calendar } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { formatDate } from '../utils/helpers';
import './VisionCard.css';

export default function VisionCard({ dream, quote }) {
  const navigate = useNavigate();

  if (!dream) return null;

  const isGradient = dream.image && (dream.image.startsWith('linear-gradient') || dream.image.startsWith('radial-gradient'));
  const isAchieved = dream.status === 'Achieved' || dream.progress === 100;

  return (
    <div
      className={`vision-card glass-panel ${isAchieved ? 'vision-achieved' : ''}`}
      onClick={() => navigate(`/dreams/${dream.id}`)}
    >
      {/* Visual Backdrop */}
      <div
        className="vision-card-bg"
        style={
          isGradient
            ? { background: dream.image }
            : dream.image
            ? { backgroundImage: `url(${dream.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: 'linear-gradient(135deg, #061826 0%, #0B2638 50%, #00D9C0 100%)' }
        }
      >
        <div className="vision-bg-overlay" />
      </div>

      {/* Card Content Overlay */}
      <div className="vision-content">
        <div className="vision-top-row">
          <span className="badge badge-teal vision-cat-pill">
            {dream.category}
          </span>
          <button
            className="vision-open-icon"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dreams/${dream.id}`);
            }}
            aria-label="Open dream details"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>

        <h3 className="vision-title">{dream.title}</h3>

        {/* Motivational Why / Quote */}
        {dream.why ? (
          <div className="vision-quote-box">
            <span className="quote-mark">“</span>
            <p className="vision-quote-text">{dream.why}</p>
          </div>
        ) : quote ? (
          <div className="vision-quote-box">
            <span className="quote-mark">“</span>
            <p className="vision-quote-text">{quote.text}</p>
            <span className="quote-author">— {quote.author}</span>
          </div>
        ) : null}

        <div className="vision-bottom-meta">
          <div className="vision-target-date">
            <Calendar size={13} className="vision-cal-icon" />
            <span>{formatDate(dream.targetDate)}</span>
          </div>

          <div className="vision-progress-wrap">
            <ProgressBar progress={dream.progress} isAchieved={isAchieved} size="sm" showLabel={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
