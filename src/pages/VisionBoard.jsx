import React, { useState } from 'react';
import { Sparkles, Quote, Compass, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDreams } from '../context/DreamContext';
import VisionCard from '../components/VisionCard';
import EmptyState from '../components/EmptyState';
import { INSPIRATIONAL_QUOTES, CATEGORIES } from '../utils/helpers';
import './VisionBoard.css';

export default function VisionBoard() {
  const { dreams } = useDreams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDreams = selectedCategory === 'All'
    ? dreams
    : dreams.filter(d => d.category === selectedCategory);

  return (
    <div className="page-container vision-board-page fade-in">
      {/* Vision Board Header */}
      <div className="vision-board-header">
        <div>
          <div className="vision-title-badge-row">
            <Sparkles size={24} color="#00D9C0" />
            <h1 className="vision-main-title">Vision Board</h1>
          </div>
          <p className="vision-main-subtitle">
            An immersive visual canvas of your future reality. Keep your horizon vivid, clear, and actionable.
          </p>
        </div>

        <Link to="/add" className="btn btn-primary">
          <Plus size={16} />
          <span>Pin New Vision</span>
        </Link>
      </div>

      {/* Featured Inspirational Quote Banner */}
      <div className="vision-quote-banner glass-panel">
        <Quote size={28} className="quote-icon-decor" />
        <div className="banner-quote-content">
          <p className="banner-quote-text">
            “{INSPIRATIONAL_QUOTES[0].text}”
          </p>
          <span className="banner-quote-author">— {INSPIRATIONAL_QUOTES[0].author}</span>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="vision-category-pills">
        <button
          className={`cat-pill ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All Visions ({dreams.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = dreams.filter(d => d.category === cat).length;
          if (count === 0 && selectedCategory !== cat) return null;
          return (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Masonry-Style Vision Cards Grid */}
      {filteredDreams.length > 0 ? (
        <div className="vision-masonry-grid">
          {filteredDreams.map((dream, idx) => {
            const quote = INSPIRATIONAL_QUOTES[(idx + 1) % INSPIRATIONAL_QUOTES.length];
            return (
              <VisionCard
                key={dream.id}
                dream={dream}
                quote={quote}
              />
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Sparkles}
          title={dreams.length === 0 ? 'Your Vision Board is Empty' : `No Visions in ${selectedCategory}`}
          description={
            dreams.length === 0
              ? 'Your vision board is waiting for your ambitions. Add your first dream to manifest your goals visually.'
              : 'No dreams match this category. Select another filter or create a new vision.'
          }
          actionLabel="Add a Vision"
          actionTo="/add"
          secondaryActionLabel={selectedCategory !== 'All' ? 'View All Categories' : undefined}
          onSecondaryAction={() => setSelectedCategory('All')}
        />
      )}
    </div>
  );
}
