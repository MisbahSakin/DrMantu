import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { EmptyState } from '../components/ui/StateFeedback';
import { RESEARCH_PAPERS } from '../data/archiveData';
import { Search, MapPin, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ResearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<string>('all');
  const { isBn, t, formatNumber } = useLanguage();

  const fields = [
    { id: 'all', label: isBn ? 'সকল ক্ষেত্র' : 'All Domains' },
    { id: 'Rangpur History', label: isBn ? 'রংপুরের ইতিহাস' : 'Rangpur History' },
    { id: 'The Liberation War', label: isBn ? 'বাঙালির মুক্তিযুদ্ধ' : 'The Liberation War' },
    { id: 'Language & Culture', label: isBn ? 'ভাষা ও সংস্কৃতি' : 'Language & Culture' },
    { id: 'Biographies of Notable Personalities', label: isBn ? 'গুণীজন পরিচিতি' : 'Biographies' },
  ];

  const filteredPapers = useMemo(() => {
    return RESEARCH_PAPERS.filter((p) => {
      const matchesField =
        selectedField === 'all' || p.field === selectedField;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.titleBn && p.titleBn.includes(q)) ||
        p.abstract.toLowerCase().includes(q) ||
        (p.journal && p.journal.toLowerCase().includes(q));

      return matchesField && matchesQuery;
    });
  }, [searchQuery, selectedField]);

  return (
    <Layout>
      <PageHeader
        kicker={t('research.kicker')}
        title="Historical & Cultural Research"
        titleBn="ডা. মোঃ মফিজুল ইসলাম মান্টু — ঐতিহাসিক ও সাংস্কৃতিক গবেষণা"
        description={t('research.desc')}
        breadcrumbs={[{ label: t('nav.research') }]}
      />

      {/* Domain Filters & Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('research.searchPlaceholder')}
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
            <strong className="text-[#211F1C] tabular-nums font-semibold">{formatNumber(filteredPapers.length)}</strong>{' '}
            {t('books.of')}{' '}
            <span className="tabular-nums font-semibold">{formatNumber(RESEARCH_PAPERS.length)}</span>{' '}
            {t('research.papersCount')}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#211F1C]/10 text-xs font-sans no-scrollbar">
          {fields.map((f) => {
            const count =
              f.id === 'all'
                ? RESEARCH_PAPERS.length
                : RESEARCH_PAPERS.filter((p) => p.field === f.id).length;
            const isActive = selectedField === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedField(f.id)}
                className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap shrink-0 font-medium ${
                  isActive
                    ? 'bg-[#211F1C] text-white'
                    : 'bg-white/60 text-[#625D52] hover:bg-white hover:text-[#211F1C] border border-[#211F1C]/10'
                }`}
              >
                <span>{f.label}</span>
                <span className={`ml-1.5 tabular-nums ${isActive ? 'text-white/80' : 'text-[#8A8375]'}`}>
                  ({formatNumber(count)})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Research List */}
      {filteredPapers.length > 0 ? (
        <div className="divide-y divide-[#211F1C]/10 border-t border-[#211F1C]/10 mb-16">
          {filteredPapers.map((paper) => {
            const mainTitle = isBn ? (paper.titleBn || paper.title) : paper.title;
            const subTitle = isBn
              ? (paper.titleBn && paper.title !== paper.titleBn ? paper.title : undefined)
              : paper.titleBn;

            return (
              <article
                key={paper.id}
                className="py-5 px-3 -mx-3 rounded-xs hover:bg-[#EAE4D8]/20 transition-colors space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <CategoryLabel category={paper.field} categoryBn={paper.fieldBn} year={paper.year} />
                    <span className="text-[#8A8375]/60" aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-[#8A8375] font-sans">
                      <MapPin className="w-3 h-3 text-[#A84E36]" />
                      {paper.locationFocus}
                    </span>
                  </div>
                  {paper.citations && (
                    <span className="text-[11px] text-[#8A8375] font-sans">
                      {formatNumber(paper.citations)} {t('research.citations')}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`text-lg sm:text-xl font-semibold text-[#211F1C] leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                    {mainTitle}
                  </h3>
                  {subTitle && (
                    <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                      {subTitle}
                    </p>
                  )}
                </div>

                <p className="text-xs text-[#625D52] leading-relaxed font-sans line-clamp-2 max-w-3xl">
                  {paper.abstract}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8A8375] font-sans">
                  <span>{t('research.venue')} <em className="italic text-[#211F1C]">{paper.journal || (isBn ? 'ঐতিহাসিক গবেষণাপত্র' : 'Archival Research Paper')}</em></span>
                  <div className="flex items-center gap-3">
                    {paper.relatedBookSlug && (
                      <Link
                        to={`/books/${paper.relatedBookSlug}`}
                        className="text-[#A84E36] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>{t('research.viewMonograph')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                    <Link
                      to="/contact"
                      className="hover:text-[#211F1C] hover:underline"
                    >
                      {t('research.inquire')}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={t('research.noResults')}
          message={t('research.noResultsDesc')}
          onReset={() => {
            setSearchQuery('');
            setSelectedField('all');
          }}
          resetLabel={t('books.resetFilter')}
        />
      )}
    </Layout>
  );
};
