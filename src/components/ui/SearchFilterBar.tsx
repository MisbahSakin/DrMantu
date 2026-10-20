import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  totalCount?: number;
  filteredCount?: number;
  className?: string;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search by keyword, title, or theme...',
  filters,
  activeFilter,
  onFilterChange,
  totalCount,
  filteredCount,
  className = '',
}) => {
  const { isBn, t, formatNumber } = useLanguage();

  return (
    <div className={`space-y-4 mb-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-9 py-2 text-sm bg-white/80 border border-[#211F1C]/20 rounded-xs text-[#211F1C] placeholder:text-[#8A8375]/70 focus:bg-white focus:border-[#A84E36] focus-visible:outline-2 focus-visible:outline-[#A84E36] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8375] hover:text-[#211F1C] p-0.5"
              aria-label={t('search.clear')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Count indicator */}
        {totalCount !== undefined && (
          <div className="text-xs text-[#8A8375] font-sans shrink-0">
            {filteredCount !== undefined && filteredCount !== totalCount ? (
              <span>
                {t('search.showing')}{' '}
                <strong className="font-semibold text-[#211F1C] tabular-nums">{formatNumber(filteredCount)}</strong>{' '}
                {t('search.of')}{' '}
                <strong className="font-semibold text-[#211F1C] tabular-nums">{formatNumber(totalCount)}</strong>{' '}
                {t('search.records')}
              </span>
            ) : (
              <span>
                <strong className="font-semibold text-[#211F1C] tabular-nums">{formatNumber(totalCount)}</strong>{' '}
                {t('search.archivedRecords')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Filter Tabs / Segmented Buttons */}
      {filters && filters.length > 0 && onFilterChange && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#211F1C]/10 text-xs no-scrollbar">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => onFilterChange(f.id)}
                className={`px-3 py-1.5 font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 -mb-[1px] ${
                  isActive
                    ? 'border-[#A84E36] text-[#A84E36] bg-[#A84E36]/5'
                    : 'border-transparent text-[#625D52] hover:text-[#211F1C] hover:border-[#211F1C]/30'
                }`}
              >
                {f.label}
                {f.count !== undefined && (
                  <span className={`ml-1.5 tabular-nums ${isActive ? 'text-[#A84E36]' : 'text-[#8A8375]'}`}>
                    ({f.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
