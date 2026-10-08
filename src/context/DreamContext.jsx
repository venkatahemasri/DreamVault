import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  getDreams,
  saveDreams,
  addDream as storageAddDream,
  updateDream as storageUpdateDream,
  deleteDream as storageDeleteDream,
  toggleMilestone as storageToggleMilestone,
  getUserProfile,
  saveUserProfile,
  getUserSettings,
  saveUserSettings,
  resetToDemoData,
  clearAllData,
  calculateProgress
} from '../utils/storage';
import { generateId } from '../utils/helpers';

const DreamContext = createContext(null);

export function DreamProvider({ children }) {
  const [dreams, setDreams] = useState([]);
  const [profile, setProfile] = useState(getUserProfile);
  const [settings, setSettings] = useState(getUserSettings);
  const [toasts, setToasts] = useState([]);
  const [celebrationDream, setCelebrationDream] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    try {
      const initialDreams = getDreams();
      setDreams(initialDreams);
      setProfile(getUserProfile());
      setSettings(getUserSettings());
    } catch (err) {
      console.error('Failed to initialize DreamVault context:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update HTML class for reduced-motion
  useEffect(() => {
    if (settings?.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [settings?.reducedMotion]);

  // Toast notification manager
  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = generateId();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Trigger celebration effect
  const triggerCelebration = useCallback((dream) => {
    setCelebrationDream(dream);
    if (!settings.reducedMotion) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00D9C0', '#19F5D1', '#FFC857', '#F4F8FA']
        });
      } catch (err) {
        console.warn('Confetti animation failed:', err);
      }
    }
  }, [settings.reducedMotion]);

  const closeCelebration = useCallback(() => {
    setCelebrationDream(null);
  }, []);

  // Refresh dreams from storage
  const refreshDreams = useCallback(() => {
    const current = getDreams();
    setDreams(current);
  }, []);

  // Create a dream
  const createDream = useCallback((dreamInput) => {
    try {
      const created = storageAddDream(dreamInput);
      setDreams(getDreams());
      addToast(`Dream "${created.title}" successfully created!`, 'success');
      if (created.progress === 100) {
        triggerCelebration(created);
      }
      return created;
    } catch (err) {
      console.error('Error creating dream:', err);
      addToast('Failed to create dream. Please try again.', 'error');
      return null;
    }
  }, [addToast, triggerCelebration]);

  // Update a dream
  const updateDream = useCallback((id, fields) => {
    try {
      const prevDream = dreams.find(d => d.id === id);
      const updated = storageUpdateDream(id, fields);
      if (updated) {
        setDreams(getDreams());
        addToast(`Changes to "${updated.title}" saved.`, 'success');
        // If newly completed to 100%
        if (prevDream && prevDream.progress < 100 && updated.progress === 100) {
          triggerCelebration(updated);
        }
      }
      return updated;
    } catch (err) {
      console.error('Error updating dream:', err);
      addToast('Failed to save changes.', 'error');
      return null;
    }
  }, [dreams, addToast, triggerCelebration]);

  // Delete a dream
  const deleteDream = useCallback((id) => {
    try {
      const target = dreams.find(d => d.id === id);
      const title = target ? target.title : 'Dream';
      storageDeleteDream(id);
      setDreams(getDreams());
      addToast(`"${title}" has been deleted.`, 'info');
      return true;
    } catch (err) {
      console.error('Error deleting dream:', err);
      addToast('Failed to delete dream.', 'error');
      return false;
    }
  }, [dreams, addToast]);

  // Toggle milestone checkbox
  const toggleMilestone = useCallback((dreamId, milestoneId) => {
    try {
      const currentDream = dreams.find(d => d.id === dreamId);
      if (!currentDream) return null;

      const wasCompleted = currentDream.progress === 100;
      const updated = storageToggleMilestone(dreamId, milestoneId);
      if (updated) {
        setDreams(getDreams());
        if (!wasCompleted && updated.progress === 100) {
          triggerCelebration(updated);
          addToast(`Congratulations! "${updated.title}" is now Achieved!`, 'gold', 5000);
        }
      }
      return updated;
    } catch (err) {
      console.error('Error toggling milestone:', err);
      return null;
    }
  }, [dreams, triggerCelebration, addToast]);

  // Milestone helpers on existing dream
  const addMilestone = useCallback((dreamId, milestoneTitle) => {
    const dream = dreams.find(d => d.id === dreamId);
    if (!dream) return null;
    const newMilestone = {
      id: generateId(),
      title: milestoneTitle.trim(),
      completed: false
    };
    const updatedMilestones = [...dream.milestones, newMilestone];
    return updateDream(dreamId, { milestones: updatedMilestones });
  }, [dreams, updateDream]);

  const editMilestone = useCallback((dreamId, milestoneId, newTitle) => {
    const dream = dreams.find(d => d.id === dreamId);
    if (!dream) return null;
    const updatedMilestones = dream.milestones.map(m =>
      m.id === milestoneId ? { ...m, title: newTitle.trim() } : m
    );
    return updateDream(dreamId, { milestones: updatedMilestones });
  }, [dreams, updateDream]);

  const deleteMilestone = useCallback((dreamId, milestoneId) => {
    const dream = dreams.find(d => d.id === dreamId);
    if (!dream) return null;
    const updatedMilestones = dream.milestones.filter(m => m.id !== milestoneId);
    return updateDream(dreamId, { milestones: updatedMilestones });
  }, [dreams, updateDream]);

  // Profile and settings updates
  const updateProfileData = useCallback((newProfile) => {
    saveUserProfile(newProfile);
    setProfile(newProfile);
    addToast('Profile updated successfully!', 'success');
  }, [addToast]);

  const updateSettingsData = useCallback((newSettings) => {
    saveUserSettings(newSettings);
    setSettings(newSettings);
    addToast('Settings updated.', 'info');
  }, [addToast]);

  const handleResetDemoData = useCallback(() => {
    const demo = resetToDemoData();
    setDreams(demo);
    setProfile(getUserProfile());
    setSettings(getUserSettings());
    addToast('Reset to demo dreams & settings.', 'info');
  }, [addToast]);

  const handleClearAllData = useCallback(() => {
    clearAllData();
    setDreams([]);
    addToast('All dreams have been cleared.', 'info');
  }, [addToast]);

  // Computed summary stats
  const totalDreams = dreams.length;
  const activeDreams = dreams.filter(d => d.status !== 'Achieved');
  const achievedDreams = dreams.filter(d => d.status === 'Achieved');
  const overallProgress = totalDreams === 0 ? 0 : Math.round(
    dreams.reduce((acc, d) => acc + (d.progress || 0), 0) / totalDreams
  );

  const value = {
    dreams,
    profile,
    settings,
    toasts,
    isLoading,
    totalDreams,
    activeDreams,
    achievedDreams,
    overallProgress,
    celebrationDream,
    closeCelebration,
    triggerCelebration,
    addToast,
    removeToast,
    refreshDreams,
    createDream,
    updateDream,
    deleteDream,
    toggleMilestone,
    addMilestone,
    editMilestone,
    deleteMilestone,
    updateProfile: updateProfileData,
    updateSettings: updateSettingsData,
    resetToDemoData: handleResetDemoData,
    clearAllData: handleClearAllData
  };

  return (
    <DreamContext.Provider value={value}>
      {children}
    </DreamContext.Provider>
  );
}

export function useDreams() {
  const context = useContext(DreamContext);
  if (!context) {
    throw new Error('useDreams must be used within a DreamProvider');
  }
  return context;
}
