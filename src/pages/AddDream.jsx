import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Calendar,
  Flag,
  Image as ImageIcon,
  Heart,
  ListPlus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import { CATEGORIES, PRIORITIES, PRESET_THEMES, generateId } from '../utils/helpers';
import ProgressBar from '../components/ProgressBar';
import './AddDream.css';

export default function AddDream() {
  const { id } = useParams(); // If present, edit mode!
  const isEditMode = Boolean(id);

  const { dreams, createDream, updateDream, addToast } = useDreams();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [targetDate, setTargetDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [selectedThemeId, setSelectedThemeId] = useState(PRESET_THEMES[0].id);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [imageMode, setImageMode] = useState('preset'); // 'preset' or 'custom'
  const [why, setWhy] = useState('');

  // Milestones state
  const [milestones, setMilestones] = useState([
    { id: generateId(), title: '', completed: false },
    { id: generateId(), title: '', completed: false }
  ]);
  const [newMilestoneInput, setNewMilestoneInput] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill if edit mode
  useEffect(() => {
    if (isEditMode) {
      const existing = dreams.find(d => d.id === id);
      if (existing) {
        setTitle(existing.title || '');
        setDescription(existing.description || '');
        setCategory(existing.category || CATEGORIES[0]);
        setTargetDate(existing.targetDate || '');
        setPriority(existing.priority || 'Medium');
        setWhy(existing.why || '');
        if (existing.imageTheme) {
          setSelectedThemeId(existing.imageTheme);
          setImageMode('preset');
        } else if (existing.image && !existing.image.startsWith('linear-gradient')) {
          setCustomImageUrl(existing.image);
          setImageMode('custom');
        }
        if (Array.isArray(existing.milestones) && existing.milestones.length > 0) {
          setMilestones(existing.milestones);
        }
      } else {
        addToast('Dream not found in vault.', 'error');
        navigate('/dreams');
      }
    }
  }, [id, isEditMode, dreams, navigate, addToast]);

  // Milestone management
  const handleAddMilestone = (e) => {
    e?.preventDefault();
    if (!newMilestoneInput.trim()) return;
    setMilestones(prev => [
      ...prev,
      { id: generateId(), title: newMilestoneInput.trim(), completed: false }
    ]);
    setNewMilestoneInput('');
  };

  const handleRemoveMilestone = (milestoneId) => {
    setMilestones(prev => prev.filter(m => m.id !== milestoneId));
  };

  const handleUpdateMilestoneTitle = (milestoneId, newTitle) => {
    setMilestones(prev =>
      prev.map(m => (m.id === milestoneId ? { ...m, title: newTitle } : m))
    );
  };

  const handleToggleMilestoneCompleted = (milestoneId) => {
    setMilestones(prev =>
      prev.map(m => (m.id === milestoneId ? { ...m, completed: !m.completed } : m))
    );
  };

  // Live progress estimate
  const validMilestones = milestones.filter(m => m.title.trim() !== '');
  const completedCount = validMilestones.filter(m => m.completed).length;
  const estimatedProgress = validMilestones.length > 0
    ? Math.round((completedCount / validMilestones.length) * 100)
    : 0;

  // Selected visual representation
  const activePreset = PRESET_THEMES.find(t => t.id === selectedThemeId) || PRESET_THEMES[0];
  const finalImage = imageMode === 'custom' && customImageUrl.trim()
    ? customImageUrl.trim()
    : activePreset.previewGradient;

  // Form Validation
  const validateForm = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Dream title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!targetDate) {
      errs.targetDate = 'Target completion date is required';
    }

    if (!why.trim()) {
      errs.why = 'Please provide why this dream matters to you (purpose fuel)';
    }

    const filledMilestones = milestones.filter(m => m.title.trim().length > 0);
    if (filledMilestones.length === 0) {
      errs.milestones = 'Define at least one milestone to turn your dream into reality';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    const cleanedMilestones = milestones
      .filter(m => m.title.trim().length > 0)
      .map(m => ({
        id: m.id,
        title: m.title.trim(),
        completed: Boolean(m.completed)
      }));

    const dreamData = {
      title: title.trim(),
      description: description.trim(),
      category,
      targetDate,
      priority,
      image: finalImage,
      imageTheme: imageMode === 'preset' ? selectedThemeId : null,
      why: why.trim(),
      milestones: cleanedMilestones
    };

    if (isEditMode) {
      const updated = updateDream(id, dreamData);
      setIsSubmitting(false);
      if (updated) {
        navigate(`/dreams/${id}`);
      }
    } else {
      const created = createDream(dreamData);
      setIsSubmitting(false);
      if (created) {
        navigate(`/dreams/${created.id}`);
      }
    }
  };

  return (
    <div className="page-container add-dream-page fade-in">
      {/* Top Header */}
      <div className="add-header">
        <Link to="/dreams" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Dreams</span>
        </Link>
        <h1 className="add-page-title">
          {isEditMode ? 'Edit Vault Dream' : 'Forge a New Dream'}
        </h1>
        <p className="add-page-subtitle">
          Transform your aspiration from an ethereal desire into a structured sequence of milestones.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="add-dream-form" noValidate>
        <div className="form-layout-columns">
          {/* Main Left Column: Inputs */}
          <div className="form-main-col">
            {/* Dream Title */}
            <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
              <label htmlFor="dream-title" className="form-label">
                Dream Title <span className="req">*</span>
              </label>
              <input
                id="dream-title"
                type="text"
                placeholder="e.g. Master Artificial Intelligence, Launch Micro-SaaS..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors(prev => ({ ...prev, title: null }));
                }}
                className="form-input text-lg"
              />
              {errors.title && (
                <div className="error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.title}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="dream-desc" className="form-label">
                Description & Vision
              </label>
              <textarea
                id="dream-desc"
                rows={3}
                placeholder="Describe the end state. How does success look and feel when achieved?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
              />
            </div>

            {/* Why This Matters (Emotional Fuel) */}
            <div className={`form-group ${errors.why ? 'has-error' : ''}`}>
              <label htmlFor="dream-why" className="form-label">
                Why It Matters <span className="req">*</span>
                <span className="field-hint">(The core motivation behind this goal)</span>
              </label>
              <textarea
                id="dream-why"
                rows={2}
                placeholder="Why is this meaningful to you? What keeps you going when progress is difficult?"
                value={why}
                onChange={(e) => {
                  setWhy(e.target.value);
                  if (errors.why) setErrors(prev => ({ ...prev, why: null }));
                }}
                className="form-textarea"
              />
              {errors.why && (
                <div className="error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.why}</span>
                </div>
              )}
            </div>

            {/* Category & Priority Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="dream-cat" className="form-label">
                  Category
                </label>
                <select
                  id="dream-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dream-priority" className="form-label">
                  Priority
                </label>
                <select
                  id="dream-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Date */}
            <div className={`form-group ${errors.targetDate ? 'has-error' : ''}`}>
              <label htmlFor="dream-date" className="form-label">
                Target Achievement Date <span className="req">*</span>
              </label>
              <input
                id="dream-date"
                type="date"
                value={targetDate}
                onChange={(e) => {
                  setTargetDate(e.target.value);
                  if (errors.targetDate) setErrors(prev => ({ ...prev, targetDate: null }));
                }}
                className="form-input"
              />
              {errors.targetDate && (
                <div className="error-msg">
                  <AlertCircle size={14} />
                  <span>{errors.targetDate}</span>
                </div>
              )}
            </div>

            {/* Milestones Builder */}
            <div className={`form-group ${errors.milestones ? 'has-error' : ''}`}>
              <div className="milestones-form-header">
                <div>
                  <label className="form-label" style={{ marginBottom: 2 }}>
                    Milestones <span className="req">*</span>
                  </label>
                  <p className="field-hint">
                    Break down your dream into stepping stones. Progress updates automatically.
                  </p>
                </div>
                <span className="badge badge-teal">
                  {validMilestones.length} Defined
                </span>
              </div>

              {errors.milestones && (
                <div className="error-msg" style={{ marginBottom: 12 }}>
                  <AlertCircle size={14} />
                  <span>{errors.milestones}</span>
                </div>
              )}

              <div className="form-milestones-builder">
                {milestones.map((m, idx) => (
                  <div key={m.id} className="milestone-builder-row">
                    <button
                      type="button"
                      className={`builder-check-btn ${m.completed ? 'checked' : ''}`}
                      onClick={() => handleToggleMilestoneCompleted(m.id)}
                      title={m.completed ? 'Mark incomplete' : 'Mark completed'}
                    >
                      {m.completed && <Check size={14} />}
                    </button>

                    <input
                      type="text"
                      placeholder={`Milestone ${idx + 1} (e.g. Finish online course)...`}
                      value={m.title}
                      onChange={(e) => handleUpdateMilestoneTitle(m.id, e.target.value)}
                      className="builder-m-input"
                    />

                    <button
                      type="button"
                      className="builder-delete-btn"
                      onClick={() => handleRemoveMilestone(m.id)}
                      title="Remove milestone"
                      aria-label="Remove milestone"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}

                {/* Quick Add Row */}
                <div className="builder-add-row">
                  <input
                    type="text"
                    placeholder="Type new milestone & press Add..."
                    value={newMilestoneInput}
                    onChange={(e) => setNewMilestoneInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddMilestone();
                      }
                    }}
                    className="builder-m-input"
                  />
                  <button
                    type="button"
                    onClick={handleAddMilestone}
                    className="btn btn-secondary btn-sm"
                    disabled={!newMilestoneInput.trim()}
                  >
                    <Plus size={15} />
                    <span>Add Step</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right Column: Visual Theme & Live Preview */}
          <div className="form-side-col">
            <div className="theme-selector-card glass-panel">
              <h3 className="card-side-title">Visual Atmosphere</h3>
              <p className="side-hint">Choose a curated dream aesthetic or custom artwork</p>

              <div className="theme-tabs">
                <button
                  type="button"
                  className={`theme-tab-btn ${imageMode === 'preset' ? 'active' : ''}`}
                  onClick={() => setImageMode('preset')}
                >
                  Curated Presets
                </button>
                <button
                  type="button"
                  className={`theme-tab-btn ${imageMode === 'custom' ? 'active' : ''}`}
                  onClick={() => setImageMode('custom')}
                >
                  Custom URL
                </button>
              </div>

              {imageMode === 'preset' ? (
                <div className="preset-grid">
                  {PRESET_THEMES.map((theme) => (
                    <div
                      key={theme.id}
                      className={`preset-tile ${
                        selectedThemeId === theme.id ? 'active-preset' : ''
                      }`}
                      style={{ background: theme.previewGradient }}
                      onClick={() => setSelectedThemeId(theme.id)}
                    >
                      <span className="preset-name">{theme.name}</span>
                      {selectedThemeId === theme.id && (
                        <div className="preset-check">
                          <Check size={14} color="#061826" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="custom-image-input-wrap">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/dream-image.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="form-input"
                  />
                  <span className="field-hint">
                    Direct image link (.jpg, .png, .webp)
                  </span>
                </div>
              )}

              {/* Live Preview Card */}
              <div className="preview-container">
                <span className="preview-label">LIVE CARD PREVIEW</span>
                <div className="live-preview-box glass-panel">
                  <div
                    className="live-preview-banner"
                    style={
                      imageMode === 'custom' && customImageUrl.trim()
                        ? { backgroundImage: `url(${customImageUrl})`, backgroundSize: 'cover' }
                        : { background: activePreset.previewGradient }
                    }
                  >
                    <span className="badge badge-neutral preview-cat-pill">
                      {category}
                    </span>
                  </div>
                  <div className="live-preview-body">
                    <h4 className="live-preview-title">
                      {title.trim() || 'Untitled Dream'}
                    </h4>
                    <div className="live-preview-progress">
                      <ProgressBar progress={estimatedProgress} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="form-actions-card glass-panel">
              <button
                type="submit"
                className="btn btn-primary btn-lg submit-vault-btn"
                disabled={isSubmitting}
              >
                <CheckCircle2 size={18} />
                <span>{isEditMode ? 'Save Vault Changes' : 'Vault This Dream'}</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
