import React from 'react';
import DreamCard from './DreamCard';
import EmptyState from './EmptyState';

export default function DreamGrid({
  dreams = [],
  emptyTitle = 'No Dreams Found',
  emptyDescription = 'There are no dreams matching your current filter criteria.',
  emptyActionLabel = 'Add New Dream',
  emptyActionTo = '/add',
  onResetFilters
}) {
  if (!dreams || dreams.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
        actionTo={emptyActionTo}
        secondaryActionLabel={onResetFilters ? 'Clear Filters' : undefined}
        onSecondaryAction={onResetFilters}
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        width: '100%'
      }}
    >
      {dreams.map((dream) => (
        <DreamCard key={dream.id} dream={dream} />
      ))}
    </div>
  );
}
