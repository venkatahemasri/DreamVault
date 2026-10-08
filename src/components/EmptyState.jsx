import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Plus } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'No Dreams Found',
  description = 'Your vault is ready for your aspirations. Create your first dream to begin mapping your milestones.',
  actionLabel = 'Create Dream',
  actionTo = '/add',
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}) {
  return (
    <div className="empty-state-card glass-panel fade-in">
      <div className="empty-state-icon-hex">
        <Icon size={32} className="empty-icon" />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      
      <div className="empty-state-actions">
        {actionTo ? (
          <Link to={actionTo} className="btn btn-primary">
            <Plus size={16} />
            <span>{actionLabel}</span>
          </Link>
        ) : onAction ? (
          <button onClick={onAction} className="btn btn-primary">
            <Plus size={16} />
            <span>{actionLabel}</span>
          </button>
        ) : null}

        {secondaryActionLabel && onSecondaryAction && (
          <button onClick={onSecondaryAction} className="btn btn-secondary">
            <span>{secondaryActionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
