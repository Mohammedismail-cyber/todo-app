import React from 'react';
import type { FilterStatus } from '../types/todo';

interface FilterTabsProps {
  currentFilter: FilterStatus;
  onChange: (filter: FilterStatus) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  currentFilter,
  onChange,
  counts,
}) => {
  const tabs: { id: FilterStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex items-center gap-2 pt-5 select-none text-xs font-mono">
      {tabs.map((tab, idx) => {
        const isActive = currentFilter === tab.id;
        return (
          <React.Fragment key={tab.id}>
            <button
              type="button"
              id={`filter-tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`px-2 py-1 transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'text-accent font-semibold border-b border-accent shadow-[0_4px_12px_rgba(57,255,136,0.25)]'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] ${isActive ? 'text-accent' : 'text-text-muted/60'}`}>
                {tab.count}
              </span>
            </button>
            {idx < tabs.length - 1 && (
              <span className="text-[#2A332E] select-none">·</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
