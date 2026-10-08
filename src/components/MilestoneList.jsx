import React, { useState } from 'react';
import {
  Check,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Circle,
  Save,
  X
} from 'lucide-react';
import './MilestoneList.css';

export default function MilestoneList({
  milestones = [],
  onToggle,
  onAdd,
  onEdit,
  onDelete,
  readOnly = false
}) {
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAdd(newTitle.trim());
    setNewTitle('');
  };

  const startEdit = (m) => {
    setEditingId(m.id);
    setEditTitle(m.title);
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) return;
    onEdit(id, editTitle.trim());
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const completedCount = milestones.filter(m => m.completed).length;

  return (
    <div className="milestones-container">
      {/* Header bar */}
      <div className="milestones-header">
        <div className="milestones-title-group">
          <h4 className="milestones-title">ACTIONABLE MILESTONES</h4>
          <span className="milestones-counter">
            {completedCount} / {milestones.length} Completed
          </span>
        </div>
      </div>

      {/* Milestone items list */}
      <div className="milestone-items-list">
        {milestones.length === 0 ? (
          <div className="no-milestones-prompt">
            <span>No milestones defined yet. Break down your dream into concrete action steps below.</span>
          </div>
        ) : (
          milestones.map((milestone, index) => {
            const isEditing = editingId === milestone.id;

            return (
              <div
                key={milestone.id}
                className={`milestone-item glass-panel ${
                  milestone.completed ? 'milestone-completed' : ''
                }`}
              >
                {/* Index badge */}
                <div className="milestone-number">{index + 1}</div>

                {/* Checkbox trigger */}
                <button
                  type="button"
                  className={`milestone-checkbox ${milestone.completed ? 'checked' : ''}`}
                  onClick={() => onToggle && onToggle(milestone.id)}
                  title={milestone.completed ? 'Mark incomplete' : 'Mark complete'}
                  aria-label={milestone.completed ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                >
                  {milestone.completed ? (
                    <Check size={14} className="check-icon" />
                  ) : null}
                </button>

                {/* Title or edit input */}
                <div className="milestone-text-area">
                  {isEditing ? (
                    <div className="milestone-edit-form">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="milestone-edit-input"
                        autoFocus
                      />
                      <button
                        type="button"
                        className="btn-icon save-btn"
                        onClick={() => saveEdit(milestone.id)}
                        title="Save Changes"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon cancel-btn"
                        onClick={cancelEdit}
                        title="Cancel"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <span
                      className="milestone-title-text"
                      onClick={() => onToggle && onToggle(milestone.id)}
                    >
                      {milestone.title}
                    </span>
                  )}
                </div>

                {/* Actions (if not read-only and not editing) */}
                {!readOnly && !isEditing && (
                  <div className="milestone-item-actions">
                    {onEdit && (
                      <button
                        type="button"
                        className="milestone-action-btn"
                        onClick={() => startEdit(milestone)}
                        title="Edit Milestone"
                      >
                        <Edit2 size={13} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className="milestone-action-btn delete-m-btn"
                        onClick={() => onDelete(milestone.id)}
                        title="Delete Milestone"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add milestone input */}
      {!readOnly && onAdd && (
        <form onSubmit={handleAddSubmit} className="add-milestone-form">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new milestone (e.g., 'Pass AWS Certified Architect exam')..."
            className="add-milestone-input"
          />
          <button
            type="submit"
            className="btn btn-secondary btn-sm add-milestone-btn"
            disabled={!newTitle.trim()}
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </form>
      )}
    </div>
  );
}
