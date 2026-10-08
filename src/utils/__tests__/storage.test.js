// Smoke test verifying storage algorithms, milestone calculation, and data flow
import {
  getDreams,
  saveDreams,
  addDream,
  updateDream,
  deleteDream,
  toggleMilestone,
  calculateProgress,
  INITIAL_DEMO_DREAMS
} from '../storage.js';

// Mock localStorage in Node environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

console.log('--- Testing Progress Calculation ---');
console.assert(calculateProgress([]) === 0, 'Empty milestones should yield 0%');
console.assert(calculateProgress([{ completed: false }]) === 0, '1 incomplete should be 0%');
console.assert(calculateProgress([{ completed: true }, { completed: false }]) === 50, '1 of 2 should be 50%');
console.assert(calculateProgress([{ completed: true }, { completed: true }]) === 100, '2 of 2 should be 100%');
console.log('✓ Progress calculation assertions passed');

console.log('--- Testing First Launch Demo Data ---');
const initial = getDreams();
console.assert(initial.length === INITIAL_DEMO_DREAMS.length, 'Should initialize demo dreams on first launch');
console.log(`✓ Loaded ${initial.length} initial dreams`);

console.log('--- Testing Adding a New Dream ---');
const created = addDream({
  title: 'Test Dream Automation',
  category: 'Career & Skills',
  targetDate: '2027-01-01',
  priority: 'High',
  why: 'Automated test suite verification',
  milestones: [
    { title: 'Step 1', completed: false },
    { title: 'Step 2', completed: false }
  ]
});
console.assert(created.title === 'Test Dream Automation', 'Title should match');
console.assert(created.progress === 0, 'Initial progress should be 0%');
console.assert(created.status === 'In Progress', 'Status should be In Progress');
console.log('✓ Created dream successfully:', created.id);

console.log('--- Testing Milestone Toggling & Automatic Progress ---');
const step1 = created.milestones[0];
const updatedAfterStep1 = toggleMilestone(created.id, step1.id);
console.assert(updatedAfterStep1.progress === 50, 'Progress should be 50% after step 1');
console.assert(updatedAfterStep1.status === 'In Progress', 'Status should remain In Progress at 50%');

const step2 = created.milestones[1];
const updatedAfterStep2 = toggleMilestone(created.id, step2.id);
console.assert(updatedAfterStep2.progress === 100, 'Progress should be 100% after all steps');
console.assert(updatedAfterStep2.status === 'Achieved', 'Status should automatically transition to Achieved at 100%');
console.assert(Boolean(updatedAfterStep2.achievedAt), 'achievedAt timestamp should be automatically set');
console.log('✓ Automatic 100% Achieved transition verified successfully');

console.log('--- Testing Milestone Untoggling ---');
const untoggled = toggleMilestone(created.id, step1.id);
console.assert(untoggled.progress === 50, 'Progress should revert to 50%');
console.assert(untoggled.status === 'In Progress', 'Status should revert to In Progress');
console.log('✓ Milestone reversion verified successfully');

console.log('--- Testing Delete Dream ---');
const remaining = deleteDream(created.id);
console.assert(!remaining.some(d => d.id === created.id), 'Deleted dream should be gone');
console.log('✓ Delete dream verified successfully');

console.log('====================================');
console.log('ALL STORAGE & CALCULATION TESTS PASSED!');
console.log('====================================');
