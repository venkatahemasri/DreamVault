# 🌌 DREAMVAULT
> *"Turn Your Dreams Into Reality"*

DreamVault is a high-performance, dark-aesthetic, frontend-only React web application designed to help ambitious individuals systematically convert ethereal dreams into actionable milestones, mathematical progress telemetry, and permanently vaulted achievements.

---

## 🎨 Color Palette & Design System

DreamVault implements a focused, premium dark design palette:
- **Midnight Navy**: `#061826` (Primary canvas background)
- **Deep Ocean**: `#0B2638` (Secondary containers, sidebars, cards)
- **Ocean Surface**: `#0E2F46` / `#133D5B` (Interactive states)
- **Electric Teal**: `#00D9C0` (Primary actions, brand highlights)
- **Bright Aqua**: `#19F5D1` (Progress bars, focus accents)
- **Warm Gold**: `#FFC857` (100% Achievements, Hall of Triumphs)
- **Primary Text**: `#F4F8FA`
- **Secondary Text**: `#9FB3BF`
- **Error/Delete**: `#FF6B6B`

*Visual balance: 75% dark navy/deep ocean, 15% teal, 5% gold, 5% semantic.*

---

## 🚀 Key Features

### 1. Home / Dashboard
- Personalized greeting with dynamic real-time date
- 4 telemetry stat cards: **Total Dreams**, **Active Dreams**, **Achieved Dreams**, **Overall Vault Progress**
- Interactive **Dream Journey Architecture**:
  `Dream Created` → `Goal Defined` → `Milestones` → `Progress` → `Achieved`
- **Continue Your Journey**: Quick-action card highlighting the active dream with the highest momentum and its next unfinished milestone
- Visual inspiration horizon and recent additions list

### 2. My Dreams
- Comprehensive dream management and exploration
- Live keyword search across title, description, category, and "Why it matters"
- Dynamic filters:
  - **Category**: Career & Skills, Travel, Startup, Wealth, Fitness, Personal Growth, etc.
  - **Priority**: High, Medium, Low
  - **Status**: All, In Progress, Achieved (100%)
- Multi-criteria sorting: Newest, Oldest, Progress (High-to-Low & Low-to-High), Target Date (Soonest)
- Full CRUD: View details, inline editing, and deletion with confirmation modals

### 3. Add & Edit Dream
- Dual-mode form supporting new dream creation (`/add`) and editing (`/dreams/:id/edit`)
- Required fields validation (title, target date, emotional reason why, at least 1 milestone)
- Real-time card preview showing dynamic changes
- Visual atmosphere selector: 6 curated atmospheric gradients or custom image URL
- Interactive milestone builder: add, reorder, check/uncheck, delete steps

### 4. Dream Details
- Large banner display with gradient/image vignette
- Dedicated **Why This Dream Matters** emotional anchor card
- Interactive milestone checklist:
  - Check/uncheck milestones
  - Inline editing of milestone titles
  - Add new milestones directly
  - Delete milestones
- Real-time progress calculation: `completed milestones / total milestones × 100`
- Automatic celebration trigger when 100% is reached

### 5. Vision Board
- Inspiring mosaic/masonry grid layout
- Curated inspirational quotes interwoven between dream tiles
- Category pill filters
- Quick jump to dream details

### 6. Achieved Dreams (Hall of Triumphs)
- Filtered gallery exclusively showcasing dreams that have conquered 100% of milestones
- Golden triumphal aesthetic with trophy insignia
- Core motto: *"You dreamed it. You worked for it. You achieved it."*
- Interactive celebration effect (confetti & golden glow)

### 7. Profile & Settings
- Editable profile name, title, bio, and favorite personal philosophy
- Milestone and vault velocity telemetry
- Accessibility preference: **Reduced Motion** toggle (disables canvas particles & heavy transitions)
- Visual theme mode preference
- Data management controls: **Reset to Demo Dreams** and **Clear All Vault Data**

---

## 🛠️ Tech Stack & Architecture

- **React 18** + **Vite**
- **React Router v6**
- **Lucide React** (feather-light icons)
- **Canvas Confetti** (celebration effects)
- **Custom HTML5 Canvas Atmosphere** (interactive starry constellation background, reduced-motion aware)
- **Browser localStorage**: safe JSON serializing, corrupted data fallbacks, zero external backend dependencies

---

## 💻 How to Run the Project

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

To create a production build:
```bash
npm run build
```
