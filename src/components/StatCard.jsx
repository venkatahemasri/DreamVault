import React from 'react';
import './StatCard.css';

export default function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'teal', // 'teal', 'gold', 'ocean'
  onClick
}) {
  return (
    <div
      className={`stat-card glass-panel variant-${variant} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        {Icon && (
          <div className="stat-card-icon-wrap">
            <Icon size={20} className="stat-icon" />
          </div>
        )}
      </div>

      <div className="stat-card-middle">
        <span className="stat-card-value">{value}</span>
      </div>

      {subtext && (
        <div className="stat-card-bottom">
          <span className="stat-card-subtext">{subtext}</span>
        </div>
      )}
    </div>
  );
}
