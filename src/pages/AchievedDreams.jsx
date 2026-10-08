import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Sparkles, Plus, Award, CheckCheck, Flame } from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import AchievementCard from '../components/AchievementCard';
import EmptyState from '../components/EmptyState';
import confetti from 'canvas-confetti';
import './AchievedDreams.css';

export default function AchievedDreams() {
  const { achievedDreams, settings } = useDreams();

  const handleGlobalCelebration = () => {
    if (!settings.reducedMotion) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFC857', '#00D9C0', '#19F5D1', '#FFFFFF', '#FFAE00']
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    }
  };

  const totalConqueredMilestones = achievedDreams.reduce(
    (acc, d) => acc + (d.milestones?.length || 0),
    0
  );

  return (
    <div className="page-container achieved-page fade-in">
      {/* Triumphant Header Banner */}
      <div className="achieved-hero-banner glass-panel">
        <div className="achieved-hero-content">
          <div className="triumph-pill">
            <Trophy size={16} className="text-gold" />
            <span>HALL OF CONQUERED DREAMS</span>
          </div>

          <h1 className="achieved-hero-title">
            The Vault of Triumphs
          </h1>

          <div className="achieved-manifesto">
            <p className="manifesto-line">You dreamed it.</p>
            <p className="manifesto-line">You worked for it.</p>
            <p className="manifesto-line highlight">You achieved it.</p>
          </div>

          <p className="achieved-hero-sub">
            Every entry here is irreversible proof of your discipline, focus, and grit. Every milestone was completed to reach 100%.
          </p>

          {achievedDreams.length > 0 && (
            <button
              className="btn btn-gold celebrate-hero-btn"
              onClick={handleGlobalCelebration}
            >
              <Sparkles size={16} />
              <span>Celebrate All Achievements</span>
            </button>
          )}
        </div>

        {/* Achievement Metrics Pill */}
        <div className="achieved-metrics-box glass-panel">
          <div className="metric-item">
            <Award size={24} className="text-gold" />
            <div>
              <span className="m-val text-gold">{achievedDreams.length}</span>
              <span className="m-lbl">Dreams Completed</span>
            </div>
          </div>
          <div className="metrics-sep" />
          <div className="metric-item">
            <CheckCheck size={24} className="text-teal" />
            <div>
              <span className="m-val text-teal">{totalConqueredMilestones}</span>
              <span className="m-lbl">Milestones Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achieved Dreams Grid */}
      {achievedDreams.length > 0 ? (
        <div className="achieved-grid">
          {achievedDreams.map((dream) => (
            <AchievementCard key={dream.id} dream={dream} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Trophy}
          title="No Achieved Dreams Yet"
          description="Your Hall of Triumphs is waiting for its first victory. Complete all milestones of any dream to enshrine it here forever."
          actionLabel="View Active Dreams"
          actionTo="/dreams"
        />
      )}
    </div>
  );
}
