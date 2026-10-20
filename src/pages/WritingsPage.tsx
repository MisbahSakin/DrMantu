import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { ArticleCard } from '../components/cards/ArticleCard';
import { EmptyState } from '../components/ui/StateFeedback';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { WRITINGS_DATA } from '../data/archiveData';
import { Search, X, List, LayoutGrid, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WritingsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'row' | 'grid'>('row');
  const { isBn, t, formatNumber } = useLanguage();

  const categories = [
    { id: 'all', label: 'All Writings', labelBn: 'সকল রচনা' },
    { id: 'Liberation War', label: 'Liberation War', labelBn: 'মুক্তিযুদ্ধ' },
    { id: 'Rabindranath & Nazrul', label: 'Tagore & Nazrul', labelBn: 'রবীন্দ্র-নজরুল চর্চা' },
    { id: 'Music', label: 'Music & Culture', labelBn: 'সঙ্গীত সাধনা' },
    { id: 'Biographies', label: 'Biographies', labelBn: 'জীবনী ও গুণীজন' },
    { id: 'Medical Science', label: 'Medical Science', labelBn: 'চিকিৎসাবিজ্ঞান' },
    { id: 'Satire & Humour', label: 'Satire & Humour', labelBn: 'রম্য ও ব্যঙ্গ' },
    { id: 'Travel Writing', label: 'Travel Writing', labelBn: 'ভ্রমণকাহিনী' },
    { id: 'Other Essays', label: 'Other Essays', labelBn: 'অন্যান্য প্রবন্ধ' },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    WRITINGS_DATA.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredWritings = useMemo(() => {
    return WRITINGS_DATA.filter((w) => {
      const matchesCategory =
        selectedCategory === 'all' || w.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        (w.titleBn && w.titleBn.includes(q)) ||
        w.excerpt.toLowerCase().includes(q) ||
        (w.body && w.body.toLowerCase().includes(q)) ||
        w.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <PageHeader
        kicker={t('writings.kicker')}
        title="Writings & Scholarly Articles"
        titleBn="ডা. মোঃ মফিজুল ইসলাম মান্টু — প্রবন্ধ ও নিবন্ধ"
        description={t('writings.desc')}
        breadcrumbs={[{ label: t('nav.writings') }]}
        actions={
          <div className="flex items-center gap-1 bg-[#EAE4D8] p-1 rounded-xs border border-[#211F1C]/10 text-xs">
            <button
              onClick={() => setViewMode('row')}
              className={`p-1.5 rounded-2xs transition-colors ${
                viewMode === 'row' ? 'bg-white text-[#211F1C] shadow-xs' : 'text-[#625D52] hover:text-[#211F1C]'
              }`}
              title="List view"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-2xs transition-colors ${
                viewMode === 'grid' ? 'bg-white text-[#211F1C] shadow-xs' : 'text-[#625D52] hover:text-[#211F1C]'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        }
      />

      {/* Search & Categories Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('writings.searchPlaceholder')}
              className="w-full pl-9 pr-9 py-2 text-sm bg-white/80 border border-[#211F1C]/20 rounded-xs text-[#211F1C] placeholder:text-[#8A8375]/70 focus:bg-white focus:border-[#A84E36] focus-visible:outline-2 focus-visible:outline-[#A84E36] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8375] hover:text-[#211F1C] p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#8A8375] font-sans">
            <strong className="text-[#211F1C] tabular-nums font-semibold">
              {formatNumber(filteredWritings.length)}
            </strong>{' '}
            {t('books.of')}{' '}
            <span className="tabular-nums font-semibold">{formatNumber(WRITINGS_DATA.length)}</span>{' '}
            {t('writings.showing')}
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#211F1C]/10 text-xs font-sans no-scrollbar">
          {categories.map((cat) => {
            const count = cat.id === 'all' ? WRITINGS_DATA.length : categoryCounts[cat.id] || 0;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap shrink-0 font-medium ${
                  isActive
                    ? 'bg-[#211F1C] text-white'
                    : 'bg-white/60 text-[#625D52] hover:bg-white hover:text-[#211F1C] border border-[#211F1C]/10'
                }`}
              >
                <span>{isBn ? cat.labelBn : cat.label}</span>
                <span className={`ml-1.5 tabular-nums ${isActive ? 'text-white/80' : 'text-[#8A8375]'}`}>
                  ({formatNumber(count)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Writings Display */}
      {filteredWritings.length > 0 ? (
        viewMode === 'row' ? (
          <div className="divide-y divide-[#211F1C]/10 border-t border-[#211F1C]/10 mb-16">
            {filteredWritings.map((writing) => (
              <article
                key={writing.id}
                className="group py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-6 transition-colors hover:bg-[#EAE4D8]/20 px-3 -mx-3 rounded-xs"
              >
                <div className="flex-1 max-w-3xl">
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryLabel category={writing.category} categoryBn={writing.categoryBn} />
                    <span className="text-[#8A8375]/60 text-xs" aria-hidden="true">·</span>
                    <span className="text-xs text-[#8A8375] font-sans tabular-nums">{writing.publishedDate}</span>
                    {!writing.hasFullText && (
                      <span className="text-[10px] text-[#A84E36] font-mono tracking-wider uppercase">
                        {t('writings.summaryTag')}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg sm:text-xl font-semibold text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                    <Link to={`/writings/${writing.slug}`} className="inline-flex items-baseline gap-1.5 hover:underline">
                      <span>{isBn ? (writing.titleBn || writing.title) : writing.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#A84E36] shrink-0" />
                    </Link>
                  </h3>

                  {isBn ? (
                    writing.title && writing.title !== writing.titleBn && (
                      <p className="font-serif italic text-xs text-[#625D52] mt-0.5">
                        {writing.title}
                      </p>
                    )
                  ) : (
                    writing.titleBn && (
                      <p className="font-bengali-text text-sm text-[#625D52] mt-0.5">
                        {writing.titleBn}
                      </p>
                    )
                  )}

                  <p className="text-xs text-[#625D52] mt-1 line-clamp-1 font-sans">
                    {writing.excerpt}
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    to={`/writings/${writing.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#A84E36] hover:underline"
                  >
                    {t('writings.read')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredWritings.map((writing) => (
              <ArticleCard key={writing.id} writing={writing} layout="grid" />
            ))}
          </div>
        )
      ) : (
        <EmptyState
          title={t('writings.noResults')}
          message={t('writings.noResultsDesc')}
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
          resetLabel={t('books.resetFilter')}
        />
      )}
    </Layout>
  );
};
