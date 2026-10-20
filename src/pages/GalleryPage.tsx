import React, { useState, useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { GalleryItem } from '../components/cards/GalleryItem';
import { EmptyState } from '../components/ui/StateFeedback';
import { GALLERY_ITEMS } from '../data/archiveData';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const GalleryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { isBn, t, formatNumber } = useLanguage();
  const { getPublishedGalleryItems } = useAdmin();

  // Retrieve published exhibits from admin media repository
  const publishedExhibits = getPublishedGalleryItems();
  const sourceItems = publishedExhibits.length > 0 ? (publishedExhibits as any) : GALLERY_ITEMS;

  const categories = [
    { id: 'all', label: isBn ? 'সকল স্মারক' : 'All Artifacts' },
    { id: 'Photographic Portrait', label: isBn ? 'আলোকচিত্র প্রতিকৃতি' : 'Portraits' },
    { id: 'Manuscripts', label: isBn ? 'পাণ্ডুলিপি' : 'Manuscripts' },
    { id: 'Medical Memorabilia', label: isBn ? 'চিকিৎসা স্মারক' : 'Medical Memorabilia' },
    { id: 'Musical Memorabilia', label: isBn ? 'সঙ্গীত স্মারক' : 'Musical Memorabilia' },
    { id: 'Awards & Plaquettes', label: isBn ? 'পদক ও সম্মাননা' : 'Awards & Medals' },
  ];

  const filteredItems = useMemo(() => {
    return sourceItems.filter((item: any) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleBn && item.titleBn.toLowerCase().includes(q)) ||
        item.caption.toLowerCase().includes(q) ||
        (item.captionBn && item.captionBn.toLowerCase().includes(q)) ||
        item.accessionNo.toLowerCase().includes(q) ||
        item.medium.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [sourceItems, searchQuery, selectedCategory]);

  return (
    <Layout>
      <PageHeader
        kicker={t('gallery.kicker')}
        title="Archival Documents & Manuscripts"
        titleBn="ডা. মোঃ মফিজুল ইসলাম মান্টু — ঐতিহাসিক চিত্রশালা ও দলিল"
        description={t('gallery.desc')}
        breadcrumbs={[{ label: t('nav.gallery') }]}
      />

      {/* Search & Category Filter Controls */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('gallery.searchPlaceholder')}
              className="w-full pl-9 pr-9 py-2 text-sm bg-white/80 border border-[#211F1C]/20 rounded-xs text-[#211F1C] placeholder:text-[#8A8375]/70 focus:bg-white focus:border-[#A84E36] focus-visible:outline-2 focus-visible:outline-[#A84E36] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8375] hover:text-[#211F1C] p-0.5"
                aria-label={t('search.clear')}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#8A8375] font-sans">
            {t('search.showing')}{' '}
            <strong className="text-[#211F1C] tabular-nums font-semibold">{formatNumber(filteredItems.length)}</strong>{' '}
            {t('search.of')}{' '}
            <span className="tabular-nums font-semibold">{formatNumber(sourceItems.length)}</span>{' '}
            {t('gallery.exhibitsCount')}
          </div>
        </div>

        {/* Categories Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#211F1C]/10 text-xs font-sans no-scrollbar">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? sourceItems.length
                : sourceItems.filter((i: any) => i.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xs transition-colors whitespace-nowrap shrink-0 font-medium ${
                  isActive
                    ? 'bg-[#211F1C] text-white'
                    : 'bg-white/60 text-[#625D52] hover:bg-white hover:text-[#211F1C] border border-[#211F1C]/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 tabular-nums ${isActive ? 'text-white/80' : 'text-[#8A8375]'}`}>
                  ({formatNumber(count)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Items Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title={t('gallery.noResults')}
          message={
            searchQuery
              ? isBn
                ? `"${searchQuery}" এর সাথে মিলে এমন কোনো স্মারক বা নথি পাওয়া যায়নি।`
                : `No archival items match your query "${searchQuery}".`
              : t('state.emptyDesc')
          }
          resetLabel={t('state.resetFilters')}
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredItems.map((item: any) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Layout>
  );
};
