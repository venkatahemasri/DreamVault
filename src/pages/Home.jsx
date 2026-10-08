import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Plus,
  Layers,
  Sparkles,
  Trophy,
  ArrowRight,
  TrendingUp,
  Target,
  CheckCircle2,
  Calendar,
  Flame,
  CheckCheck
} from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import DreamCard from '../components/DreamCard';
import EmptyState from '../components/EmptyState';
import { formatDate } from '../utils/helpers';
import './Home.css';

export default function Home() {
  const {
    dreams,
    activeDreams,
    achievedDreams,
    overallProgress,
    profile
  } = useDreams();
  const navigate = useNavigate();

  // Find most active dream to continue
  const mostActiveDream = activeDreams.length > 0
    ? [...activeDreams].sort((a, b) => (b.progress || 0) - (a.progress || 0))[0]
    : null;

  // Recent 3 dreams
  const recentDreams = [...dreams]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);

  // Today formatted date
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="page-container home-page fade-in">
      {/* Welcome Hero Banner */}
      <section className="dashboard-hero glass-panel">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-date-badge">
              <Calendar size={13} className="hero-date-icon" />
              {todayStr}
            </span>
            <span className="badge badge-teal">
              <Sparkles size={12} />
              Vault Active
            </span>
          </div>

          <h1 className="hero-title">
            Welcome back, <span className="hero-gradient-name">{profile.name || 'Dreamer'}</span>
          </h1>

          <p className="hero-subtitle">
            Turn your moonshot ambitions into structured milestones, mathematical progress, and verified achievements.
          </p>

          <div className="hero-cta-group">
            <Link to="/add" className="btn btn-primary btn-lg hero-add-btn">
              <Plus size={18} />
              <span>+ Add New Dream</span>
            </Link>
            <Link to="/dreams" className="btn btn-secondary btn-lg">
              <span>View All Dreams</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="hero-visual-decor">
          <div className="hero-glow-orb" />
          <div className="hero-progress-ring-card glass-panel">
            <div className="ring-header">
              <TrendingUp size={16} className="text-teal" />
              <span>OVERALL VAULT PROGRESS</span>
            </div>
            <div className="ring-value">{overallProgress}%</div>
            <ProgressBar progress={overallProgress} size="md" showLabel={false} />
            <div className="ring-subtext">
              Across {dreams.length} total vaulted dreams
            </div>
          </div>
        </div>
      </section>

      {/* 4 Stat Cards */}
      <section className="stats-grid">
        <StatCard
          label="Total Dreams"
          value={dreams.length}
          subtext="Recorded aspirations"
          icon={Layers}
          variant="teal"
          onClick={() => navigate('/dreams')}
        />
        <StatCard
          label="Active Dreams"
          value={activeDreams.length}
          subtext="Currently progressing"
          icon={Target}
          variant="ocean"
          onClick={() => navigate('/dreams')}
        />
        <StatCard
          label="Achieved Dreams"
          value={achievedDreams.length}
          subtext="100% completed goals"
          icon={Trophy}
          variant="gold"
          onClick={() => navigate('/achieved')}
        />
        <StatCard
          label="Overall Progress"
          value={`${overallProgress}%`}
          subtext="Vault completion rate"
          icon={TrendingUp}
          variant="teal"
        />
      </section>

      {/* Journey Visualization */}
      <section className="journey-section glass-panel">
        <div className="journey-header">
          <div className="journey-title-wrap">
            <Flame size={18} className="text-teal" />
            <h2 className="journey-section-title">THE DREAM JOURNEY ARCHITECTURE</h2>
          </div>
          <span className="journey-badge">DREAMVAULT METHODOLOGY</span>
        </div>

        <p className="journey-desc">
          How DreamVault systematically converts your highest ambitions into tangible reality:
        </p>

        <div className="journey-timeline">
          <div className="journey-step">
            <div className="step-circle step-circle-1">01</div>
            <div className="step-content">
              <span className="step-name">Dream Created</span>
              <p className="step-info">Capture raw aspiration & choose visual theme</p>
            </div>
          </div>
          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <div className="step-circle step-circle-2">02</div>
            <div className="step-content">
              <span className="step-name">Goal Defined</span>
              <p className="step-info">Establish core 'Why' & clear target deadline</p>
            </div>
          </div>
          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <div className="step-circle step-circle-3">03</div>
            <div className="step-content">
              <span className="step-name">Milestones</span>
              <p className="step-info">Break into bite-sized actionable steps</p>
            </div>
          </div>
          <div className="journey-arrow">→</div>

          <div className="journey-step">
            <div className="step-circle step-circle-4">04</div>
            <div className="step-content">
              <span className="step-name">Progress</span>
              <p className="step-info">Execute milestones & watch progress surge</p>
            </div>
          </div>
          <div className="journey-arrow">→</div>

          <div className="journey-step journey-step-gold">
            <div className="step-circle step-circle-5">05</div>
            <div className="step-content">
              <span className="step-name">Achieved</span>
              <p className="step-info">100% completion & permanent vaulting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Your Journey & Recent Dreams */}
      <div className="dashboard-columns">
        {/* Continue Your Journey Card */}
        <section className="continue-journey-card glass-panel">
          <div className="section-title-row">
            <h3 className="sub-section-title">Continue Your Journey</h3>
            {mostActiveDream && (
              <span className="badge badge-teal">Highest Velocity</span>
            )}
          </div>

          {mostActiveDream ? (
            <div className="active-focus-content">
              <div className="focus-header">
                <div>
                  <span className="badge badge-neutral">{mostActiveDream.category}</span>
                  <h4 className="focus-title">{mostActiveDream.title}</h4>
                </div>
                <span className="focus-percentage">{mostActiveDream.progress}%</span>
              </div>

              {mostActiveDream.why && (
                <p className="focus-why">
                  <strong>Why it matters:</strong> {mostActiveDream.why}
                </p>
              )}

              <div className="focus-progress-bar">
                <ProgressBar progress={mostActiveDream.progress} size="md" />
              </div>

              {/* Next Milestone */}
              {mostActiveDream.milestones && mostActiveDream.milestones.some(m => !m.completed) && (
                <div className="next-milestone-box">
                  <span className="next-tag">NEXT UNFINISHED MILESTONE:</span>
                  <div className="next-milestone-title">
                    <CheckCheck size={16} className="text-teal" />
                    <span>
                      {mostActiveDream.milestones.find(m => !m.completed)?.title}
                    </span>
                  </div>
                </div>
              )}

              <div className="focus-action-row">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/dreams/${mostActiveDream.id}`)}
                >
                  <span>Continue Dream</span>
                  <ArrowRight size={16} />
                </button>
                <span className="focus-date">
                  Due: {formatDate(mostActiveDream.targetDate)}
                </span>
              </div>
            </div>
          ) : (
            <div className="no-active-focus">
              <p>All active dreams are currently cleared or none have been logged yet.</p>
              <Link to="/add" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                <Plus size={15} />
                <span>Start a Dream</span>
              </Link>
            </div>
          )}
        </section>

        {/* Vision Snapshot */}
        <section className="vision-snapshot-card glass-panel">
          <div className="section-title-row">
            <h3 className="sub-section-title">Inspirational Horizon</h3>
            <Link to="/vision-board" className="view-more-link">
              <span>Vision Board</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="vision-quote-display">
            <p className="vision-hero-quote">
              “The distance between your dreams and reality is called discipline and structured action.”
            </p>
            <span className="vision-quote-sub">— DreamVault Philosophy</span>
          </div>

          <div className="vision-quick-metrics">
            <div className="quick-metric-tile">
              <span className="q-label">Total Milestones</span>
              <span className="q-val">
                {dreams.reduce((acc, d) => acc + (d.milestones?.length || 0), 0)}
              </span>
            </div>
            <div className="quick-metric-tile">
              <span className="q-label">Milestones Cleared</span>
              <span className="q-val text-teal">
                {dreams.reduce((acc, d) => acc + (d.milestones?.filter(m => m.completed).length || 0), 0)}
              </span>
            </div>
            <div className="quick-metric-tile">
              <span className="q-label">Triumphs Locked</span>
              <span className="q-val text-gold">
                {achievedDreams.length}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Dreams List */}
      <section className="recent-dreams-section">
        <div className="section-title-row">
          <div>
            <h2 className="recent-heading">Recent Vault Additions</h2>
            <p className="recent-subheading">Your latest dreams and goals currently in motion</p>
          </div>
          <Link to="/dreams" className="btn btn-secondary btn-sm">
            <span>Browse All ({dreams.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentDreams.length > 0 ? (
          <div className="recent-dreams-grid">
            {recentDreams.map((dream) => (
              <DreamCard key={dream.id} dream={dream} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your Vault is Empty"
            description="Take the first step toward your aspirations. Create a dream and map its milestones."
            actionLabel="Add Your First Dream"
            actionTo="/add"
          />
        )}
      </section>
    </div>
  );
}
