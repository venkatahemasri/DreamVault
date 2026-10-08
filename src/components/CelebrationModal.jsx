import React from 'react';
import { Trophy, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDreams } from '../context/DreamContext';
import Modal from './Modal';

export default function CelebrationModal() {
  const { celebrationDream, closeCelebration } = useDreams();
  const navigate = useNavigate();

  if (!celebrationDream) return null;

  const handleGoToAchieved = () => {
    closeCelebration();
    navigate('/achieved');
  };

  return (
    <Modal
      isOpen={Boolean(celebrationDream)}
      onClose={closeCelebration}
      title="Dream Achieved!"
      showActions={false}
    >
      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 200, 87, 0.25) 0%, rgba(255, 200, 87, 0.08) 100%)',
            border: '2px solid var(--warm-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 30px rgba(255, 200, 87, 0.4)'
          }}
        >
          <Trophy size={36} color="#FFC857" />
        </div>

        <span
          className="badge badge-gold"
          style={{ marginBottom: '14px', fontSize: '0.8rem' }}
        >
          <Sparkles size={14} /> 100% Milestone Completion
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--primary-text)',
            marginBottom: '10px'
          }}
        >
          {celebrationDream.title}
        </h2>

        <p
          style={{
            color: 'var(--warm-gold)',
            fontSize: '1.05rem',
            fontWeight: 600,
            margin: '16px 0',
            fontStyle: 'italic',
            lineHeight: 1.5
          }}
        >
          “You dreamed it. You worked for it. You achieved it.”
        </p>

        <p style={{ color: 'var(--secondary-text)', fontSize: '0.9rem', marginBottom: '28px' }}>
          All milestones have been conquered. Your accomplishment has been safely vaulted into the Hall of Achieved Dreams.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={closeCelebration}>
            Keep Exploring
          </button>
          <button className="btn btn-gold" onClick={handleGoToAchieved}>
            <span>View in Achieved Vault</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
