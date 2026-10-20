import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { BookCoverCard } from '../components/cards/BookCoverCard';
import {
  ARCHIVE_META,
  BOOKS_DATA,
  TIMELINE_DATA,
} from '../data/archiveData';
import {
  BookOpen,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { isBn, t, formatNumber } = useLanguage();
  const { getPublishedHeroPortrait } = useAdmin();

  // Retrieve portrait published by administrator from admin media repository
  const publishedPortrait = getPublishedHeroPortrait();

  const filteredBooks = BOOKS_DATA.filter((b) => {
    if (activeCategory === 'all') return true;
    return b.category === activeCategory;
  }).slice(0, 4);

  const categoryTabs = [
    { id: 'all', label: isBn ? 'সকল গ্রন্থ' : 'All Titles' },
    { id: 'Poetry', label: isBn ? 'কবিতা' : 'Poetry' },
    { id: 'Research Books', label: isBn ? 'ইতিহাস ও গবেষণা' : 'History & Research' },
    { id: "Children's Literature", label: isBn ? 'শিশুসাহিত্য' : "Children's Rhymes" },
  ];

  return (
    <Layout>
      {/* =========================================================================
          SECTION 1: HERO (Asymmetrical Editorial Composition)
         ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 border-b border-[#211F1C]/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Hero Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84E36] font-semibold font-sans">
              <span>{t('hero.kicker')}</span>
            </div>

            {/* Bilingual Name */}
            <div>
              {isBn ? (
                <>
                  <h1 className="font-bengali-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#211F1C] tracking-tight leading-[1.15]">
                    {ARCHIVE_META.nameBn}
                  </h1>
                  <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#211F1C]/90 font-medium mt-3 tracking-tight">
                    {ARCHIVE_META.nameEn}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#211F1C] tracking-tight leading-[1.15]">
                    {ARCHIVE_META.nameEn}
                  </h1>
                  <p className="font-bengali-heading text-2xl sm:text-3xl lg:text-4xl text-[#211F1C]/90 font-medium mt-3 tracking-tight">
                    {ARCHIVE_META.nameBn}
                  </p>
                </>
              )}
            </div>

            {/* Tagline */}
            <div className="border-l-2 border-[#A84E36] pl-4 py-1 space-y-1">
              <p className={`text-lg sm:text-xl text-[#A84E36] leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif italic'}`}>
                "{isBn ? ARCHIVE_META.taglineBn : ARCHIVE_META.taglineEn}"
              </p>
              <p className={`text-sm sm:text-base text-[#625D52] ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                {isBn ? ARCHIVE_META.taglineEn : ARCHIVE_META.taglineBn}
              </p>
            </div>

            {/* Concise Curatorial Introduction */}
            <p className="text-base sm:text-lg text-[#625D52] leading-relaxed font-sans max-w-xl">
              {t('hero.summary')}
            </p>

            {/* Two Clear Hero Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button to="/biography" variant="primary" size="lg">
                {t('nav.exploreLife')}
              </Button>
              <Button to="/books" variant="secondary" size="lg" icon={<BookOpen className="w-4 h-4" />}>
                {t('nav.exploreWorks')}
              </Button>
            </div>

            <div className="pt-2 text-[11px] text-[#8A8375] font-sans flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A84E36]" />
              <span>{t('hero.archivalNote')}</span>
            </div>
          </div>

          {/* Hero Portrait & Archival Presentation Area (5 cols on lg, responsive vertical on mobile) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none w-full">
              <div className="p-3 sm:p-4 bg-white/90 border border-[#211F1C]/20 rounded-xs shadow-xs">
                {publishedPortrait ? (
                  /* =========================================================
                     PUBLISHED PHOTOGRAPHIC PORTRAIT (DR. MD. MOFIZUL ISLAM MANTU)
                     - Managed & published exclusively through the Admin Panel
                     - Natural lighting, subtle contrast, object-top face preservation
                     ========================================================= */
                  <div className="relative aspect-[4/5] bg-[#EAE4D8]/50 border border-[#211F1C]/15 rounded-2xs overflow-hidden group">
                    <img
                      src={publishedPortrait.url}
                      alt={
                        isBn
                          ? publishedPortrait.altTextBn || publishedPortrait.altText || 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি'
                          : publishedPortrait.altText || 'Archival photographic portrait of Dr. Md. Mofizul Islam Mantu'
                      }
                      className="w-full h-full object-cover object-top contrast-[1.02] brightness-[1.01] transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="eager"
                      decoding="async"
                    />

                    {/* Archival inner framing line */}
                    <div className="absolute inset-2 sm:inset-2.5 border border-white/30 rounded-3xs pointer-events-none" />

                    {/* Archival Authenticity Provenance Badge */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#211F1C]/80 backdrop-blur-xs text-[10px] font-mono uppercase tracking-widest text-[#F7F4ED] rounded-3xs flex items-center gap-1.5 shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-[#A84E36]" />
                      <span>{isBn ? 'মূল আলোকচিত্র' : 'Archival Portrait'}</span>
                    </div>

                    {/* Bottom Vignette with Archival Identification */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#211F1C]/85 via-[#211F1C]/45 to-transparent p-3.5 pt-7 text-white text-left">
                      <p className={`text-sm sm:text-base font-semibold tracking-wide ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                        {isBn ? ARCHIVE_META.nameBn : ARCHIVE_META.nameEn}
                      </p>
                      <p className="text-[11px] text-[#EAE4D8] font-sans tracking-wide mt-0.5">
                        {isBn
                          ? publishedPortrait.captionBn || 'ঐতিহাসিক প্রতিকৃতি · রংপুর মহাফেজখানা'
                          : publishedPortrait.caption || 'Authentic Archival Portrait · Rangpur Legacy'}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* =========================================================
                     CURATORIAL ARCHIVAL FOLIO FALLBACK (INTENTIONAL & DIGNIFIED)
                     - Displayed when no portrait has been published by administrator
                     - No upload buttons, no prompts, no visitor file management
                     ========================================================= */
                  <div className="relative aspect-[4/5] bg-[#EAE4D8]/70 border border-[#211F1C]/15 rounded-2xs flex flex-col items-center justify-between p-6 text-center overflow-hidden">
                    <div className="absolute inset-3 border border-[#211F1C]/10 rounded-3xs pointer-events-none" />

                    {/* Top Folio Header */}
                    <div className="w-full flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#8A8375]">
                      <span>{t('hero.plate')}</span>
                      <span>{isBn ? 'ঐতিহাসিক মহাফেজখানা' : 'Rangpur Archive'}</span>
                    </div>

                    {/* Center: Medallion & Archival Identity */}
                    <div className="my-auto flex flex-col items-center space-y-4 py-4">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#211F1C] text-[#F7F4ED] flex flex-col items-center justify-center p-3 shadow-inner relative">
                        <div className="font-bengali-heading text-3xl sm:text-4xl font-bold tracking-tight">
                          ম
                        </div>
                        <span className="text-[9px] uppercase tracking-widest font-sans text-white/70 mt-0.5">
                          {isBn ? 'রংপুর' : 'RANGPUR'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h2 className={`text-xl sm:text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                          {isBn ? ARCHIVE_META.nameBn : ARCHIVE_META.nameEn}
                        </h2>
                        <p className={`text-sm text-[#625D52] ${isBn ? 'font-serif' : 'font-bengali-text'}`}>
                          {isBn ? ARCHIVE_META.nameEn : ARCHIVE_META.nameBn}
                        </p>
                        <p className="text-xs text-[#8A8375] font-sans">
                          {t('hero.roles')}
                        </p>
                      </div>
                    </div>

                    {/* Archival Footnote */}
                    <div className="w-full pt-3 border-t border-[#211F1C]/10 text-[11px] text-[#625D52] font-sans">
                      <span className="font-semibold text-[#211F1C]">{t('hero.heritageSeat')}</span>
                    </div>
                  </div>
                )}

                {/* Archival Caption (Public View - Read Only) */}
                <div className="mt-3 text-center">
                  <p className="text-[11px] text-[#8A8375] font-serif italic">
                    {publishedPortrait
                      ? isBn
                        ? publishedPortrait.captionBn || t('hero.caption')
                        : publishedPortrait.caption || t('hero.caption')
                      : t('hero.caption')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="mt-12 hidden md:flex items-center justify-center">
          <a
            href="#biography-summary"
            className="group inline-flex flex-col items-center gap-1.5 text-xs text-[#8A8375] hover:text-[#A84E36] transition-colors"
            aria-label={t('nav.readChronicle')}
          >
            <span className="uppercase tracking-widest text-[10px] font-sans">
              {isBn ? 'অন্বেষণ' : 'Explore'}
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#A84E36]" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTRODUCTION (Short Concise Biography)
         ========================================================================= */}
      <section id="biography-summary" className="py-16 lg:py-20 border-b border-[#211F1C]/15 scroll-mt-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84E36] font-semibold font-sans">
            <span>{t('home.bioKicker')}</span>
            <span aria-hidden="true" className="text-[#8A8375]/60">·</span>
            <span>{isBn ? 'রংপুর' : 'Rangpur'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {t('home.bioTitle')}
          </h2>

          <p className="text-xl text-[#625D52]">
            {t('home.bioSub')}
          </p>

          <div className="text-base sm:text-lg text-[#625D52] leading-relaxed font-sans space-y-4 pt-2">
            <p className="editorial-drop-cap">
              {t('home.bioP1')}
            </p>
            <p>
              {t('home.bioP2')}
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/biography"
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A84E36] hover:text-[#8F3E28] inline-flex items-center gap-2 group"
            >
              <span>{t('home.readFullBio')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SELECTED BOOKS (Prioritizing Covers, Titles, Years, Categories)
         ========================================================================= */}
      <section className="py-16 lg:py-20 border-b border-[#211F1C]/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold block mb-1 font-sans">
              {t('home.booksKicker')}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('home.booksTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#625D52] mt-0.5 font-sans">
              {t('home.booksSub')}
            </p>
          </div>

          <Link
            to="/books"
            className="text-xs font-semibold uppercase tracking-wider text-[#A84E36] hover:text-[#8F3E28] inline-flex items-center gap-1.5 shrink-0"
          >
            <span>{t('home.viewAllBooks')} ({formatNumber(BOOKS_DATA.length)})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs font-sans border-b border-[#211F1C]/10 no-scrollbar">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xs transition-colors whitespace-nowrap shrink-0 font-medium ${
                activeCategory === tab.id
                  ? 'bg-[#211F1C] text-white'
                  : 'bg-white/60 text-[#625D52] hover:bg-white hover:text-[#211F1C] border border-[#211F1C]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Selected Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCoverCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LIFE IN MILESTONES (Concise Timeline)
         ========================================================================= */}
      <section className="py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold block mb-1 font-sans">
              {t('home.milestonesKicker')}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('home.milestonesTitle')}
            </h2>
            <p className="text-xs text-[#8A8375] font-sans mt-1">
              {t('home.milestonesSub')}
            </p>
          </div>

          <Link
            to="/biography"
            className="text-xs font-semibold uppercase tracking-wider text-[#A84E36] hover:underline shrink-0"
          >
            {t('home.viewFullTimeline')}
          </Link>
        </div>

        {/* Concise Timeline */}
        <div className="relative border-l border-[#211F1C]/20 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {TIMELINE_DATA.map((milestone) => (
            <div key={milestone.id} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#F7F4ED] border-2 border-[#A84E36] group-hover:bg-[#A84E36] transition-colors" />

              <div className="flex items-baseline gap-3">
                <span className={`text-xl font-bold text-[#211F1C] tabular-nums group-hover:text-[#A84E36] transition-colors ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {isBn ? (milestone.periodBn || formatNumber(milestone.year)) : milestone.year}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A8375] font-sans">
                  {isBn ? (milestone.locationBn || milestone.location) : milestone.location}
                </span>
              </div>

              <h3 className={`text-lg font-semibold text-[#211F1C] mt-0.5 leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                {isBn ? (milestone.titleBn || milestone.title) : milestone.title}
              </h3>
              {isBn ? (
                milestone.title && milestone.title !== milestone.titleBn && (
                  <p className="font-serif italic text-xs text-[#625D52]">
                    {milestone.title}
                  </p>
                )
              ) : (
                milestone.titleBn && (
                  <p className="font-bengali-text text-sm text-[#625D52]">
                    {milestone.titleBn}
                  </p>
                )
              )}

              <p className="text-xs sm:text-sm text-[#625D52] mt-1.5 leading-relaxed font-sans max-w-2xl">
                {isBn ? (milestone.descriptionBn || milestone.description) : milestone.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};
