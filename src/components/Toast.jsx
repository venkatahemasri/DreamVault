import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import './Toast.css';

export default function Toast() {
  const { toasts, removeToast } = useDreams();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-portal" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = Info;
        let toastClass = 'toast-info';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          toastClass = 'toast-success';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          toastClass = 'toast-error';
        } else if (toast.type === 'gold') {
          Icon = Sparkles;
          toastClass = 'toast-gold';
        }

        return (
          <div key={toast.id} className={`toast-card ${toastClass}`}>
            <Icon size={18} className="toast-icon" />
            <div className="toast-message">{toast.message}</div>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
