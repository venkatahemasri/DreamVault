// Preset visual themes using curated atmospheric gradients & SVG patterns
export const PRESET_THEMES = [
  {
    id: 'ai-cyber',
    name: 'Neural Future',
    previewGradient: 'linear-gradient(135deg, #061826 0%, #0B2638 50%, #00D9C0 100%)',
    bgImage: 'linear-gradient(135deg, rgba(6, 24, 38, 0.95), rgba(11, 38, 56, 0.85)), radial-gradient(circle at 80% 20%, rgba(0, 217, 192, 0.35) 0%, transparent 60%)',
    accent: '#00D9C0',
    category: 'Career & Skills'
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Horizon',
    previewGradient: 'linear-gradient(135deg, #0B2638 0%, #103752 50%, #19F5D1 100%)',
    bgImage: 'linear-gradient(135deg, rgba(11, 38, 56, 0.95), rgba(6, 24, 38, 0.88)), radial-gradient(circle at 20% 80%, rgba(25, 245, 209, 0.3) 0%, transparent 60%)',
    accent: '#19F5D1',
    category: 'Travel & Adventure'
  },
  {
    id: 'startup-gold',
    name: 'Founder Ascent',
    previewGradient: 'linear-gradient(135deg, #061826 0%, #0D3149 60%, #FFC857 100%)',
    bgImage: 'linear-gradient(135deg, rgba(6, 24, 38, 0.94), rgba(13, 49, 73, 0.9)), radial-gradient(circle at 75% 25%, rgba(255, 200, 87, 0.35) 0%, transparent 60%)',
    accent: '#FFC857',
    category: 'Entrepreneurship & Business'
  },
  {
    id: 'minimal-vault',
    name: 'Obsidian Studio',
    previewGradient: 'linear-gradient(135deg, #081d2e 0%, #0B2638 70%, #00D9C0 100%)',
    bgImage: 'linear-gradient(135deg, rgba(8, 29, 46, 0.95), rgba(6, 24, 38, 0.9)), radial-gradient(circle at 50% 50%, rgba(0, 217, 192, 0.25) 0%, transparent 70%)',
    accent: '#00D9C0',
    category: 'Lifestyle & Possessions'
  },
  {
    id: 'celestial-mind',
    name: 'Deep Cosmos',
    previewGradient: 'linear-gradient(135deg, #061826 0%, #123d5c 60%, #19F5D1 100%)',
    bgImage: 'linear-gradient(135deg, rgba(6, 24, 38, 0.95), rgba(18, 61, 92, 0.85)), radial-gradient(circle at 85% 75%, rgba(25, 245, 209, 0.3) 0%, transparent 55%)',
    accent: '#19F5D1',
    category: 'Personal Growth'
  },
  {
    id: 'golden-summit',
    name: 'Golden Summit',
    previewGradient: 'linear-gradient(135deg, #0B2638 0%, #061826 50%, #FFC857 100%)',
    bgImage: 'linear-gradient(135deg, rgba(11, 38, 56, 0.95), rgba(6, 24, 38, 0.9)), radial-gradient(circle at 30% 20%, rgba(255, 200, 87, 0.3) 0%, transparent 60%)',
    accent: '#FFC857',
    category: 'Wealth & Finance'
  }
];

export const CATEGORIES = [
  'Career & Skills',
  'Travel & Adventure',
  'Entrepreneurship & Business',
  'Wealth & Finance',
  'Health & Fitness',
  'Personal Growth',
  'Creative & Arts',
  'Lifestyle & Possessions'
];

export const PRIORITIES = [
  { value: 'High', label: 'High Priority', color: '#FF6B6B' },
  { value: 'Medium', label: 'Medium Priority', color: '#FFC857' },
  { value: 'Low', label: 'Low Priority', color: '#19F5D1' }
];

export const INSPIRATIONAL_QUOTES = [
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "A goal is a dream with a deadline.", author: "Napoleon Hill" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Do not wait; the time will never be 'just right.' Start where you stand.", author: "George Herbert" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" }
];

export function formatDate(dateString) {
  if (!dateString) return 'No target date';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(targetDate) {
  if (!targetDate) return null;
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getDaysRemainingLabel(targetDate) {
  const days = getDaysRemaining(targetDate);
  if (days === null) return 'No deadline';
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return '1 day remaining';
  return `${days} days remaining`;
}

export function generateId() {
  return 'dv-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7);
}
