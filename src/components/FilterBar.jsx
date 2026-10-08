import React from 'react';
import { Search, Filter, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../utils/helpers';
import './FilterBar.css';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onReset
}) {
  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== 'All' ||
    selectedPriority !== 'All' ||
    selectedStatus !== 'All' ||
    sortBy !== 'newest';

  return (
    <div className="filter-bar-container glass-panel">
      {/* Search Bar */}
      <div className="filter-search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search by title, description, or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search dreams"
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter Selectors Row */}
      <div className="filter-selectors-row">
        {/* Category Filter */}
        <div className="filter-select-group">
          <label className="select-label">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-select-group">
          <label className="select-label">Priority</label>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by priority"
          >
            <option value="All">All Priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-select-group">
          <label className="select-label">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by status"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Achieved">Achieved (100%)</option>
          </select>
        </div>

        {/* Sort Selector */}
        <div className="filter-select-group">
          <label className="select-label">Sort By</label>
          <div className="sort-select-wrapper">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select sort-select"
              aria-label="Sort dreams"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="progress-desc">Progress (High to Low)</option>
              <option value="progress-asc">Progress (Low to High)</option>
              <option value="target-date">Target Date (Soonest)</option>
            </select>
          </div>
        </div>

        {/* Reset Filter Button */}
        {hasActiveFilters && (
          <button
            className="btn btn-secondary btn-sm reset-filter-btn"
            onClick={onReset}
            title="Reset All Filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
