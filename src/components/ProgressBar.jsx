import React from 'react';

export default function ProgressBar({
  progress = 0,
  showLabel = true,
  size = 'md', // 'sm', 'md', 'lg'
  isAchieved = false
}) {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));
  const completed = clamped === 100 || isAchieved;

  const heights = {
    sm: '6px',
    md: '10px',
    lg: '16px'
  };

  return (
    <div className="progress-bar-wrapper" style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
            fontSize: size === 'sm' ? '0.75rem' : '0.82rem'
          }}
        >
          <span style={{ color: 'var(--secondary-text)', fontWeight: 500 }}>
            {completed ? 'Journey Achieved' : 'Progress'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: completed ? 'var(--warm-gold)' : 'var(--bright-aqua)'
            }}
          >
            {clamped}%
          </span>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          width: '100%',
          height: heights[size] || heights.md,
          background: 'rgba(6, 24, 38, 0.85)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          padding: '2px',
          border: '1px solid rgba(25, 245, 209, 0.12)',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            borderRadius: 'var(--radius-full)',
            background: completed
              ? 'linear-gradient(90deg, #FFC857 0%, #FFE08A 100%)'
              : 'linear-gradient(90deg, var(--electric-teal) 0%, var(--bright-aqua) 100%)',
            boxShadow: completed
              ? '0 0 10px rgba(255, 200, 87, 0.5)'
              : '0 0 10px rgba(0, 217, 192, 0.4)',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>
    </div>
  );
}
