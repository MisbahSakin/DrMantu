import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { AFFILIATION_RECORDS, AWARDS_DATA } from '../data/archiveData';
import { Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const AwardsAffiliationsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const { isBn, t, formatNumber } = useLanguage();
  const { getPublishedSectionImage } = useAdmin();

  // Retrieve published awards section image if assigned & published by administrator
  const publishedAwardsImage = getPublishedSectionImage('awards');

  const filterTabs: { id: string; label: string }[] = [
    { id: 'all', label: isBn ? 'সকল স্বীকৃতি ও ভূমিকা' : 'All Honors & Roles' },
    { id: 'Award', label: isBn ? 'পদক ও সম্মাননা' : 'Conferred Awards' },
    { id: 'Life Membership', label: isBn ? 'আজীবন সদস্যপদ' : 'Life Memberships' },
    { id: 'Former Position', label: isBn ? 'সাবেক দায়িত্ব' : 'Former Positions' },
    { id: 'Founding Member', label: isBn ? 'প্রতিষ্ঠাতা সদস্য' : 'Founding Roles' },
    { id: 'Advisory Affiliation', label: isBn ? 'উপদেষ্টা সম্পৃক্ততা' : 'Advisory Affiliations' },
  ];

  const filteredRecords = AFFILIATION_RECORDS.filter(
    (r) => filterType === 'all' || r.type === filterType
  );

  return (
    <Layout>
      <PageHeader
        kicker={t('awards.kicker')}
        title={t('awards.title')}
        titleBn="স্বীকৃতি, সম্মাননা ও প্রাতিষ্ঠানিক সম্পৃক্ততা"
        description={t('awards.desc')}
        breadcrumbs={[{ label: t('nav.awards') }]}
      />

      {/* Primary Award Highlights */}
      <section className="mb-12">
        <div className={`grid grid-cols-1 ${publishedAwardsImage ? 'lg:grid-cols-12 gap-8' : ''} mb-6 items-start`}>
          <div className={publishedAwardsImage ? 'lg:col-span-7 space-y-1' : 'space-y-1'}>
            <span className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold block mb-1 font-sans">
              {t('awards.primaryKicker')}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('awards.primaryTitle')}
            </h2>
            <p className="text-sm text-[#625D52] mt-0.5 font-sans">
              {t('awards.primarySub')}
            </p>
          </div>

          {publishedAwardsImage && (
            <div className="lg:col-span-5 p-3.5 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-2 shadow-2xs">
              <div className="relative aspect-[16/10] bg-[#EAE4D8]/50 rounded-2xs overflow-hidden border border-[#211F1C]/10">
                <img
                  src={publishedAwardsImage.url}
                  alt={isBn ? publishedAwardsImage.altTextBn || publishedAwardsImage.altText : publishedAwardsImage.altText}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-2 border border-white/30 rounded-3xs pointer-events-none" />
              </div>
              <div className="text-[11px] text-[#625D52] font-serif italic text-center px-1">
                {isBn ? publishedAwardsImage.captionBn || publishedAwardsImage.caption : publishedAwardsImage.caption}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AWARDS_DATA.map((award) => {
            const mainTitle = isBn ? (award.titleBn || award.title) : award.title;
            const subTitle = isBn
              ? (award.titleBn && award.title !== award.titleBn ? award.title : undefined)
              : award.titleBn;
            const displayOrg = isBn ? (award.organizationBn || award.organization) : award.organization;

            return (
              <div
                key={award.id}
                className="p-6 bg-white/80 border border-[#211F1C]/15 rounded-xs flex flex-col justify-between hover:border-[#211F1C]/35 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8A8375] mb-2 font-sans">
                    <span className="font-mono text-sm font-bold text-[#A84E36] tabular-nums">
                      {formatNumber(award.year)}
                    </span>
                    <Award className="w-4 h-4 text-[#B38F44]" />
                  </div>

                  <h3 className={`text-xl font-semibold text-[#211F1C] leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                    {mainTitle}
                  </h3>
                  {subTitle && (
                    <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                      {subTitle}
                    </p>
                  )}

                  <div className="text-xs text-[#8A8375] font-sans mt-2">
                    {t('awards.conferredBy')}{' '}
                    <strong className="font-medium text-[#211F1C]">{displayOrg}</strong>
                  </div>

                  <p className="text-xs text-[#625D52] leading-relaxed font-sans pt-3 mt-3 border-t border-[#211F1C]/10">
                    {award.citation}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#211F1C]/10 flex items-center justify-between text-[11px] text-[#8A8375] font-sans">
                  <span>{award.category}</span>
                  <span className="text-[#A84E36] font-semibold">{t('awards.distinctionBadge')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comprehensive Categorized Affiliations Section */}
      <section className="pt-8 border-t border-[#211F1C]/15 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold block mb-1 font-sans">
              {t('awards.registryKicker')}
            </span>
            <h3 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('awards.registryTitle')}
            </h3>
            <p className="text-xs text-[#8A8375] font-sans mt-0.5">
              {t('awards.registrySub')}
            </p>
          </div>

          <span className="text-xs text-[#8A8375] font-sans">
            {t('search.showing')} <strong className="text-[#211F1C] font-semibold">{formatNumber(filteredRecords.length)}</strong> {t('awards.showingRecords')}
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs font-sans border-b border-[#211F1C]/10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap shrink-0 font-medium ${
                  isActive
                    ? 'bg-[#211F1C] text-white'
                    : 'bg-white/60 text-[#625D52] hover:bg-white hover:text-[#211F1C] border border-[#211F1C]/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Affiliation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecords.map((item) => {
            const mainTitle = isBn ? (item.titleBn || item.title) : item.title;
            const subTitle = isBn
              ? (item.titleBn && item.title !== item.titleBn ? item.title : undefined)
              : item.titleBn;
            const displayOrg = isBn ? (item.organizationBn || item.organization) : item.organization;

            return (
              <div
                key={item.id}
                className="p-6 bg-white/70 border border-[#211F1C]/12 rounded-xs flex flex-col justify-between hover:border-[#211F1C]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8A8375] mb-2 font-sans">
                    <span className="font-semibold uppercase tracking-wider text-[#A84E36]">
                      {item.type}
                    </span>
                    <span className="font-mono text-[#8A8375]">{item.yearOrPeriod}</span>
                  </div>

                  <h4 className={`text-xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                    {mainTitle}
                  </h4>
                  {subTitle && (
                    <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                      {subTitle}
                    </p>
                  )}

                  <div className="text-xs text-[#211F1C] font-medium font-sans mt-2">
                    {displayOrg}
                  </div>

                  <p className="text-xs text-[#625D52] leading-relaxed font-sans mt-3 pt-3 border-t border-[#211F1C]/10">
                    {item.citationOrRole}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#211F1C]/10 text-[11px] text-[#8A8375] font-sans flex items-center justify-between">
                  <span>{item.category}</span>
                  <span className="text-[#8A8375]">{isBn ? 'প্রাতিষ্ঠানিক রেকর্ড' : 'Institutional Record'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};
