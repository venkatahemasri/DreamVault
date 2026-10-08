import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './Modal.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary', // 'primary', 'danger', 'gold'
  isDanger = false,
  showActions = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        className="modal-container glass-panel fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            {isDanger && (
              <div className="modal-warning-icon">
                <AlertTriangle size={18} />
              </div>
            )}
            <h3 id="modal-title" className="modal-title">{title}</h3>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        {showActions && (
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
            {onConfirm && (
              <button
                className={`btn ${
                  confirmVariant === 'danger' || isDanger
                    ? 'btn-danger'
                    : confirmVariant === 'gold'
                    ? 'btn-gold'
                    : 'btn-primary'
                }`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
