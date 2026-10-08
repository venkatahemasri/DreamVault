import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderHeart, Sparkles } from 'lucide-react';
import { useDreams } from '../context/DreamContext';
import FilterBar from '../components/FilterBar';
import DreamGrid from '../components/DreamGrid';

export default function MyDreams() {
  const { dreams } = useDreams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setSortBy('newest');
  };

  // Filter and sort dreams
  const filteredDreams = useMemo(() => {
    let result = [...dreams];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        d =>
          d.title.toLowerCase().includes(q) ||
          (d.description && d.description.toLowerCase().includes(q)) ||
          (d.category && d.category.toLowerCase().includes(q)) ||
          (d.why && d.why.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(d => d.category === selectedCategory);
    }

    // Priority filter
    if (selectedPriority !== 'All') {
      result = result.filter(d => d.priority === selectedPriority);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      result = result.filter(d => d.status === selectedStatus);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'progress-desc') {
        return (b.progress || 0) - (a.progress || 0);
      }
      if (sortBy === 'progress-asc') {
        return (a.progress || 0) - (b.progress || 0);
      }
      if (sortBy === 'target-date') {
        if (!a.targetDate) return 1;
        if (!b.targetDate) return -1;
        return new Date(a.targetDate) - new Date(b.targetDate);
      }
      return 0;
    });

    return result;
  }, [dreams, searchQuery, selectedCategory, selectedPriority, selectedStatus, sortBy]);

  return (
    <div className="page-container fade-in">
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderHeart size={26} color="#00D9C0" />
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--primary-text)'
              }}
            >
              My Dreams
            </h1>
          </div>
          <p style={{ color: 'var(--secondary-text)', fontSize: '0.95rem', marginTop: '4px' }}>
            Browse, filter, and track all your active and achieved aspirations ({filteredDreams.length} of {dreams.length})
          </p>
        </div>

        <Link to="/add" className="btn btn-primary">
          <Plus size={18} />
          <span>+ Add New Dream</span>
        </Link>
      </div>

      {/* Filter and Search Controls */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleResetFilters}
      />

      {/* Dreams Grid */}
      <DreamGrid
        dreams={filteredDreams}
        emptyTitle={dreams.length === 0 ? 'No Dreams in Vault' : 'No Matching Dreams'}
        emptyDescription={
          dreams.length === 0
            ? 'Your vault is completely empty. Create your very first dream to begin mapping your future!'
            : 'No dreams match your selected filters. Try broadening your search or resetting filters.'
        }
        emptyActionLabel="Add New Dream"
        emptyActionTo="/add"
        onResetFilters={dreams.length > 0 ? handleResetFilters : undefined}
      />
    </div>
  );
}
