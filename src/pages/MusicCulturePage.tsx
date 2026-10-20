import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Music, Disc, Award, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const MusicCulturePage: React.FC = () => {
  const { isBn, t } = useLanguage();
  const { getPublishedSectionImage } = useAdmin();

  // Retrieve published music section image if assigned & published by administrator
  const publishedMusicImage = getPublishedSectionImage('music');

  const musicalTraditions = [
    {
      title: 'North Indian Classical Vocal',
      titleBn: 'উচ্চাঙ্গ মার্গ সঙ্গীত ও রাগাশ্রয়ী সাধনা',
      desc: 'Eight years of training at Rangpur Sangeet Academy (1968–1976), mastering classical khayal and harmonium accompaniment.',
      descBn: 'রংপুর সঙ্গীত একাডেমিতে আট বছর (১৯৬৮–১৯৭৬) বিশিষ্ট ওস্তাদদের কাছে শাস্ত্রীয় খেয়াল, বন্দিশ ও হারমোনিয়াম সাধনা।',
      badge: 'Khayal & Harmonium',
      badgeBn: 'খেয়াল ও হারমোনিয়াম',
    },
    {
      title: 'Nazrul Sangeet',
      titleBn: 'নজরুল সঙ্গীত ও রাগভিত্তিক গীতিচর্চা',
      desc: 'Vocal performance and scholarly study of Kazi Nazrul Islam’s classical raga-based and devotional songs.',
      descBn: 'কাজী নজরুল ইসলামের রাগভিত্তিক ক্লাসিক্যাল গান ও ভক্তিমূলক রচনার সুরতাত্ত্বিক বিশ্লেষণ ও পরিবেশন।',
      badge: 'Raga-based Compositions',
      badgeBn: 'রাগভিত্তিক নজরুলগীতি',
    },
    {
      title: 'Rabindra Sangeet',
      titleBn: 'রবীন্দ্রসঙ্গীত ও নদীভাবনা',
      desc: 'Interpretations of Rabindranath Tagore’s compositions connected to the rivers, solitude, and monsoon atmosphere of Bengal.',
      descBn: 'পদ্মা ও তিস্তা অববাহিকার নিসর্গ, নদীমাতৃক নির্জনতা এবং বর্ষার ভাবনার সাথে জড়িত রবীন্দ্রগানের সুরসাধনা।',
      badge: 'Riverine & Monsoon Songs',
      badgeBn: 'নদী ও নিসর্গের গান',
    },
    {
      title: 'Bhawaiya & Folk Roots',
      titleBn: 'ভাওয়াইয়া ও আঞ্চলিক সুরধারা',
      desc: 'Ethnomusicological writing investigating modal bridges between indigenous Bhawaiya melodies and classical ragas.',
      descBn: 'উত্তর জনপদের প্রাণস্পন্দন ভাওয়াইয়া সুরের অন্তর্নিহিত রাগকাঠামো ও লোকায়ত দার্শনিক ভিত্তির অনুসন্ধান।',
      badge: 'Teesta Folk Heritage',
      badgeBn: 'তিস্তা লোকঐতিহ্য',
    },
  ];

  return (
    <Layout>
      <PageHeader
        kicker={t('music.kicker')}
        title={t('music.title')}
        titleBn="সঙ্গীত সাধনা ও সাংস্কৃতিক উত্তরাধিকার"
        description={t('music.desc')}
        breadcrumbs={[{ label: t('nav.music') }]}
        actions={
          <Button to="/gallery" variant="secondary" size="sm" icon={<Landmark className="w-3.5 h-3.5" />}>
            {t('music.viewMemorabilia')}
          </Button>
        }
      />

      {/* Brief Overview & Published Archival Image (if published by admin) */}
      <div className={`grid grid-cols-1 ${publishedMusicImage ? 'lg:grid-cols-12 gap-8' : ''} mb-12 items-start`}>
        <div className={publishedMusicImage ? 'lg:col-span-7 space-y-3' : 'max-w-3xl space-y-3'}>
          <h2 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {t('music.introTitle')}
          </h2>
          <p className="text-base text-[#625D52] leading-relaxed font-sans">
            {t('music.introText')}
          </p>
        </div>

        {publishedMusicImage && (
          <div className="lg:col-span-5 p-3.5 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-2 shadow-2xs">
            <div className="relative aspect-[16/10] bg-[#EAE4D8]/50 rounded-2xs overflow-hidden border border-[#211F1C]/10">
              <img
                src={publishedMusicImage.url}
                alt={isBn ? publishedMusicImage.altTextBn || publishedMusicImage.altText : publishedMusicImage.altText}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-2 border border-white/30 rounded-3xs pointer-events-none" />
            </div>
            <div className="text-[11px] text-[#625D52] font-serif italic text-center px-1">
              {isBn ? publishedMusicImage.captionBn || publishedMusicImage.caption : publishedMusicImage.caption}
            </div>
          </div>
        )}
      </div>

      {/* Four Visual Tradition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {musicalTraditions.map((trad, i) => {
          const mainTitle = isBn ? trad.titleBn : trad.title;
          const subTitle = isBn ? trad.title : trad.titleBn;
          const badge = isBn ? trad.badgeBn : trad.badge;
          const desc = isBn ? trad.descBn : trad.desc;

          return (
            <div
              key={i}
              className="p-6 bg-white/70 border border-[#211F1C]/12 rounded-xs hover:border-[#211F1C]/30 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded-2xs bg-[#EAE4D8] text-[#A84E36] font-mono text-[10px] uppercase tracking-wider font-semibold">
                    {badge}
                  </span>
                  <Music className="w-4 h-4 text-[#8A8375]" />
                </div>
                <h3 className={`text-xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {mainTitle}
                </h3>
                <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                  {subTitle}
                </p>
                <p className="text-xs text-[#625D52] leading-relaxed font-sans mt-2.5">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cultural Leadership Honor Card & Audio Notice in 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Leadership Distinction */}
        <div className="p-6 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#EAE4D8] text-[#B38F44] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#A84E36] font-semibold">
              {t('music.awardBadge')}
            </span>
          </div>
          <h3 className={`text-lg font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {t('music.awardTitle')}
          </h3>
          <p className="font-bengali-text text-xs text-[#625D52]">
            {t('music.awardOrg')}
          </p>
          <p className="text-xs text-[#625D52] leading-relaxed font-sans">
            {t('music.awardDesc')}
          </p>
        </div>

        {/* Audio Archive Status */}
        <div className="p-6 bg-[#EAE4D8]/40 border border-[#211F1C]/12 rounded-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white text-[#A84E36] flex items-center justify-center">
              <Disc className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A8375] font-semibold">
              {t('music.audioBadge')}
            </span>
          </div>
          <h3 className={`text-lg font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {t('music.audioTitle')}
          </h3>
          <p className="text-xs text-[#625D52] leading-relaxed font-sans">
            {t('music.audioDesc')}
          </p>
        </div>
      </div>
    </Layout>
  );
};
