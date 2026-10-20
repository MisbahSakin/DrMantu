import React, { useState, useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { BookCoverCard } from '../components/cards/BookCoverCard';
import { EmptyState } from '../components/ui/StateFeedback';
import { BOOKS_DATA } from '../data/archiveData';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BooksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const { isBn, t, formatNumber } = useLanguage();

  const categories = [
    { id: 'all', label: 'All Publications', labelBn: 'সকল গ্রন্থ' },
    { id: 'Poetry', label: 'Poetry', labelBn: 'কবিতা' },
    { id: "Children's Literature", label: "Children's Literature", labelBn: 'শিশু-কিশোর সাহিত্য' },
    { id: 'Research Books', label: 'Research Books', labelBn: 'গবেষণা গ্রন্থ' },
    { id: 'Edited and Memorial Books', label: 'Edited & Memorial Books', labelBn: 'সম্পাদিত ও স্মারক গ্রন্থ' },
    { id: 'Other Publications', label: 'Other Publications', labelBn: 'অন্যান্য প্রকাশনা' },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    BOOKS_DATA.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredAndSortedBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      const matchesCategory =
        selectedCategory === 'all' || book.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.titleBn.includes(q) ||
        book.summary.toLowerCase().includes(q) ||
        (book.publisher && book.publisher.toLowerCase().includes(q)) ||
        (book.subtitle && book.subtitle.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      return sortOrder === 'desc' ? b.year - a.year : a.year - b.year;
    });
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <Layout>
      <PageHeader
        kicker={t('books.kicker')}
        title="Published Books & Monographs"
        titleBn="ডা. মোঃ মফিজুল ইসলাম মান্টু — প্রকাশিত গ্রন্থ ও সংকলন"
        description={t('books.desc')}
        breadcrumbs={[{ label: t('nav.books') }]}
      />

      {/* Control Bar: Search, Category Filter Tabs & Sort Order */}
      <div className="space-y-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('books.searchPlaceholder')}
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

          {/* Sort Controls & Counter */}
          <div className="flex items-center gap-4 text-xs font-sans shrink-0">
            <div className="text-[#8A8375]">
              {t('books.showing')}{' '}
              <strong className="text-[#211F1C] tabular-nums font-semibold">
                {formatNumber(filteredAndSortedBooks.length)}
              </strong>{' '}
              {t('books.of')}{' '}
              <span className="tabular-nums font-semibold">{formatNumber(BOOKS_DATA.length)}</span>{' '}
              {t('books.titles')}
            </div>

            {/* Sort Toggle Button */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-[#211F1C]/20 rounded-xs text-[#211F1C] hover:bg-white transition-colors"
              title="Toggle order"
            >
              <ArrowUpDown className="w-3 h-3 text-[#A84E36]" />
              <span>{sortOrder === 'desc' ? t('books.sortNewest') : t('books.sortOldest')}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#211F1C]/10 text-xs font-sans no-scrollbar">
          {categories.map((cat) => {
            const count = cat.id === 'all' ? BOOKS_DATA.length : categoryCounts[cat.id] || 0;
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
                <span>{isBn ? cat.labelBn : cat.label}</span>
                <span className={`ml-1.5 tabular-nums ${isActive ? 'text-white/80' : 'text-[#8A8375]'}`}>
                  ({formatNumber(count)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Books Grid */}
      {filteredAndSortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAndSortedBooks.map((book) => (
            <BookCoverCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t('books.noResults')}
          message={t('books.noResultsDesc')}
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
          resetLabel={t('books.resetFilter')}
        />
      )}

      {/* Archival Footnote */}
      <div className="mt-16 p-4 bg-[#EAE4D8]/30 border border-[#211F1C]/10 rounded-xs text-xs text-[#8A8375] font-sans flex items-center justify-between flex-wrap gap-2">
        <span>
          {isBn
            ? '* মুদ্রিত সংস্করণ ও প্রকাশিত মনোগ্রাফ থেকে গ্রন্থ বিবরণী লিপিবদ্ধ। সকল জ্যাকেট ডিজাইন মহাফেজখানা রেফারেন্স হিসেবে উপস্থাপিত।'
            : '* Bibliographic data cataloged from printed editions and published monographs. Jacket designs represent archival references.'}
        </span>
      </div>
    </Layout>
  );
};
