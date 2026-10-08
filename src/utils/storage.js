import { generateId, PRESET_THEMES } from './helpers.js';

const STORAGE_KEYS = {
  DREAMS: 'dreamvault_dreams_v1',
  SETTINGS: 'dreamvault_settings_v1',
  PROFILE: 'dreamvault_profile_v1'
};

export const INITIAL_DEMO_DREAMS = [
  {
    id: 'demo-dream-1',
    title: 'Become an AI Engineer',
    description: 'Master deep learning architectures, agentic pipelines, and production inference systems to build high-impact autonomous intelligence.',
    category: 'Career & Skills',
    targetDate: '2026-11-30',
    priority: 'High',
    image: PRESET_THEMES[0].previewGradient,
    imageTheme: 'ai-cyber',
    why: 'AI is fundamentally transforming computing. Mastering agentic reasoning and neural architectures enables building tools that amplify human potential.',
    milestones: [
      { id: 'm1-1', title: 'Complete Advanced Python & Algorithms Track', completed: true },
      { id: 'm1-2', title: 'Master SQL, Vector Embeddings & pgvector', completed: true },
      { id: 'm1-3', title: 'Build Neural Networks & PyTorch Fundamentals', completed: true },
      { id: 'm1-4', title: 'Architect & Deploy Multi-Agent LLM Systems', completed: false },
      { id: 'm1-5', title: 'Contribute to Open Source AI Frameworks', completed: false },
      { id: 'm1-6', title: 'Land High-Impact AI Engineer Role', completed: false }
    ],
    progress: 50,
    status: 'In Progress',
    createdAt: '2026-01-15T09:00:00.000Z',
    achievedAt: null
  },
  {
    id: 'demo-dream-2',
    title: 'Travel to Japan',
    description: 'Experience Tokyo neon skylines, Kyoto historic shrines, Mount Fuji sunrise, and local culinary culture across a 3-week expedition.',
    category: 'Travel & Adventure',
    targetDate: '2026-10-15',
    priority: 'Medium',
    image: PRESET_THEMES[1].previewGradient,
    imageTheme: 'tokyo-night',
    why: 'Experiencing Japan has been a life goal to immerse in ancient Zen aesthetics, futuristic engineering, and serene cultural tradition.',
    milestones: [
      { id: 'm2-1', title: 'Save $4,500 dedicated travel fund', completed: true },
      { id: 'm2-2', title: 'Learn conversational Japanese phrases (N5 level basics)', completed: true },
      { id: 'm2-3', title: 'Book international flights to Tokyo Haneda', completed: false },
      { id: 'm2-4', title: 'Reserve JR Pass & Shinkansen routes', completed: false },
      { id: 'm2-5', title: 'Finalize ryokan stays in Kyoto & Hakone', completed: false }
    ],
    progress: 40,
    status: 'In Progress',
    createdAt: '2026-02-01T12:00:00.000Z',
    achievedAt: null
  },
  {
    id: 'demo-dream-3',
    title: 'Build My Own Startup',
    description: 'Design, validate, and launch a bootstrapped developer micro-SaaS with automated recurring revenue and real customer love.',
    category: 'Entrepreneurship & Business',
    targetDate: '2027-03-31',
    priority: 'High',
    image: PRESET_THEMES[2].previewGradient,
    imageTheme: 'startup-gold',
    why: 'Creating an independent enterprise delivers creative freedom, deep engineering agency, and scalable impact.',
    milestones: [
      { id: 'm3-1', title: 'Conduct 25 customer discovery interviews', completed: true },
      { id: 'm3-2', title: 'Ship clickable interactive prototype', completed: true },
      { id: 'm3-3', title: 'Build production MVP with Stripe billing', completed: false },
      { id: 'm3-4', title: 'Acquire first 10 paying customers', completed: false },
      { id: 'm3-5', title: 'Achieve $5,000 Monthly Recurring Revenue', completed: false }
    ],
    progress: 40,
    status: 'In Progress',
    createdAt: '2026-02-14T14:30:00.000Z',
    achievedAt: null
  },
  {
    id: 'demo-dream-4',
    title: 'Buy My Dream Laptop',
    description: 'Procure a maxed-out M-series MacBook Pro 64GB Unified Memory setup for fast local LLM experiments and high-throughput dev work.',
    category: 'Lifestyle & Possessions',
    targetDate: '2026-06-30',
    priority: 'Medium',
    image: PRESET_THEMES[3].previewGradient,
    imageTheme: 'minimal-vault',
    why: 'Reliable high-performance workstation hardware removes development friction and accelerates every project iteration.',
    milestones: [
      { id: 'm4-1', title: 'Research optimal specs & thermal benchmarks', completed: true },
      { id: 'm4-2', title: 'Establish automatic bi-weekly savings transfer', completed: true },
      { id: 'm4-3', title: 'Order custom configuration from store', completed: false },
      { id: 'm4-4', title: 'Configure dotfiles, development environment, & local models', completed: false }
    ],
    progress: 50,
    status: 'In Progress',
    createdAt: '2026-03-01T10:00:00.000Z',
    achievedAt: null
  },
  {
    id: 'demo-dream-5',
    title: 'Run a 10K Marathon',
    description: 'Consistent cardiovascular endurance training, progressive pace building, and finishing a competitive 10-kilometer road race.',
    category: 'Health & Fitness',
    targetDate: '2026-05-20',
    priority: 'Low',
    image: PRESET_THEMES[4].previewGradient,
    imageTheme: 'celestial-mind',
    why: 'Building peak physical endurance fosters mental discipline, longevity, and relentless energy.',
    milestones: [
      { id: 'm5-1', title: 'Establish baseline 3-day weekly running cadence', completed: true },
      { id: 'm5-2', title: 'Complete first uninterrupted 5K in under 28 mins', completed: true },
      { id: 'm5-3', title: 'Complete 8K distance milestone run', completed: true },
      { id: 'm5-4', title: 'Cross official 10K marathon finish line', completed: true }
    ],
    progress: 100,
    status: 'Achieved',
    createdAt: '2025-11-10T08:00:00.000Z',
    achievedAt: '2026-04-18T11:45:00.000Z'
  }
];

export const DEFAULT_USER_PROFILE = {
  name: 'Alex Mercer',
  title: 'Visionary Builder & Creator',
  bio: 'Turning moonshot dreams into structured reality, one milestone at a time. Focused on AI engineering, mindful adventure, and independent ventures.',
  avatarSeed: 'alex-dreamer',
  quote: 'Discipline turns dreams from fragile wishes into mathematical inevitability.'
};

export const DEFAULT_SETTINGS = {
  reducedMotion: false,
  compactView: false,
  soundEffects: false,
  themeMode: 'deep-ocean'
};

/**
 * Calculate progress automatically from milestones
 * completed / total * 100
 */
export function calculateProgress(milestones) {
  if (!Array.isArray(milestones) || milestones.length === 0) {
    return 0;
  }
  const completed = milestones.filter(m => Boolean(m.completed)).length;
  return Math.round((completed / milestones.length) * 100);
}

/**
 * Safely parse JSON from localStorage
 */
function safeGetJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[DreamVault Storage] Error parsing key ${key}:`, err);
    return fallback;
  }
}

/**
 * Safely set JSON to localStorage
 */
function safeSetJSON(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`[DreamVault Storage] Error writing key ${key}:`, err);
    return false;
  }
}

/**
 * Load dreams from localStorage, initializing demo data on first launch
 */
export function getDreams() {
  const raw = localStorage.getItem(STORAGE_KEYS.DREAMS);
  if (!raw) {
    // First launch: initialize demo dreams
    saveDreams(INITIAL_DEMO_DREAMS);
    return INITIAL_DEMO_DREAMS;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      saveDreams(INITIAL_DEMO_DREAMS);
      return INITIAL_DEMO_DREAMS;
    }
    // Re-verify progress calculation on each dream to ensure integrity
    return parsed.map(dream => {
      const computedProgress = calculateProgress(dream.milestones || []);
      const isAchieved = computedProgress === 100 && (dream.milestones || []).length > 0;
      return {
        ...dream,
        progress: computedProgress,
        status: isAchieved ? 'Achieved' : (dream.status === 'Achieved' && computedProgress < 100 ? 'In Progress' : dream.status || 'In Progress'),
        achievedAt: isAchieved ? (dream.achievedAt || new Date().toISOString()) : null
      };
    });
  } catch (err) {
    console.error('[DreamVault Storage] Corrupted dreams in localStorage, resetting:', err);
    saveDreams(INITIAL_DEMO_DREAMS);
    return INITIAL_DEMO_DREAMS;
  }
}

/**
 * Save full dreams array
 */
export function saveDreams(dreams) {
  return safeSetJSON(STORAGE_KEYS.DREAMS, dreams);
}

/**
 * Add a new dream
 */
export function addDream(dreamInput) {
  const dreams = getDreams();
  const milestones = Array.isArray(dreamInput.milestones) ? dreamInput.milestones : [];
  const progress = calculateProgress(milestones);
  const isAchieved = progress === 100 && milestones.length > 0;

  const newDream = {
    id: dreamInput.id || generateId(),
    title: dreamInput.title?.trim() || 'Untitled Dream',
    description: dreamInput.description?.trim() || '',
    category: dreamInput.category || 'Personal Growth',
    targetDate: dreamInput.targetDate || '',
    priority: dreamInput.priority || 'Medium',
    image: dreamInput.image || PRESET_THEMES[0].previewGradient,
    imageTheme: dreamInput.imageTheme || 'ai-cyber',
    why: dreamInput.why?.trim() || '',
    milestones: milestones.map((m, idx) => ({
      id: m.id || `m-${Date.now()}-${idx}`,
      title: m.title?.trim() || `Milestone ${idx + 1}`,
      completed: Boolean(m.completed)
    })),
    progress,
    status: isAchieved ? 'Achieved' : 'In Progress',
    createdAt: new Date().toISOString(),
    achievedAt: isAchieved ? new Date().toISOString() : null
  };

  const updatedDreams = [newDream, ...dreams];
  saveDreams(updatedDreams);
  return newDream;
}

/**
 * Update an existing dream
 */
export function updateDream(id, updateFields) {
  const dreams = getDreams();
  const index = dreams.findIndex(d => d.id === id);
  if (index === -1) return null;

  const existing = dreams[index];
  const milestones = updateFields.milestones !== undefined ? updateFields.milestones : existing.milestones;
  const progress = calculateProgress(milestones);
  const isAchieved = progress === 100 && milestones.length > 0;

  const updatedDream = {
    ...existing,
    ...updateFields,
    id: existing.id, // prevent ID override
    milestones,
    progress,
    status: isAchieved ? 'Achieved' : 'In Progress',
    achievedAt: isAchieved ? (existing.achievedAt || new Date().toISOString()) : null
  };

  dreams[index] = updatedDream;
  saveDreams(dreams);
  return updatedDream;
}

/**
 * Delete a dream
 */
export function deleteDream(id) {
  const dreams = getDreams();
  const filtered = dreams.filter(d => d.id !== id);
  saveDreams(filtered);
  return filtered;
}

/**
 * Toggle a milestone completion status
 */
export function toggleMilestone(dreamId, milestoneId) {
  const dreams = getDreams();
  const dream = dreams.find(d => d.id === dreamId);
  if (!dream) return null;

  const milestones = dream.milestones.map(m => {
    if (m.id === milestoneId) {
      return { ...m, completed: !m.completed };
    }
    return m;
  });

  return updateDream(dreamId, { milestones });
}

/**
 * User Profile & Settings
 */
export function getUserProfile() {
  return safeGetJSON(STORAGE_KEYS.PROFILE, DEFAULT_USER_PROFILE);
}

export function saveUserProfile(profile) {
  return safeSetJSON(STORAGE_KEYS.PROFILE, profile);
}

export function getUserSettings() {
  return safeGetJSON(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function saveUserSettings(settings) {
  return safeSetJSON(STORAGE_KEYS.SETTINGS, settings);
}

export function resetToDemoData() {
  saveDreams(INITIAL_DEMO_DREAMS);
  saveUserProfile(DEFAULT_USER_PROFILE);
  saveUserSettings(DEFAULT_SETTINGS);
  return INITIAL_DEMO_DREAMS;
}

export function clearAllData() {
  saveDreams([]);
  return [];
}
