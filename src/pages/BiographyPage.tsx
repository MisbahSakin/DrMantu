import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { TimelineItem } from '../components/cards/TimelineItem';
import { TIMELINE_DATA } from '../data/archiveData';
import {
  ArrowRight,
  BookOpen,
  Stethoscope,
  Music,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const BiographyPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'timeline' | 'chapters'>('timeline');
  const { isBn, t, formatNumber } = useLanguage();
  const { getPublishedSectionImage } = useAdmin();

  // Retrieve published biography portrait if published by administrator
  const publishedBioImage = getPublishedSectionImage('biography');

  const biographicalLedger = [
    {
      label: isBn ? 'জন্ম রেকর্ড' : 'Birth Record',
      value: isBn ? '১৯৫৩ সালে রংপুরে জন্ম' : 'Born in Rangpur, 1953',
    },
    {
      label: isBn ? 'মাধ্যমিক শিক্ষা' : 'Secondary Education',
      value: isBn
        ? 'রংপুর উচ্চ বিদ্যালয় (ঐতিহাসিক রংপুর জিলা স্কুল)'
        : 'Rangpur High School (Rangpur Zilla School)',
    },
    {
      label: isBn ? 'উচ্চ মাধ্যমিক' : 'Higher Secondary',
      value: isBn ? 'কারমাইকেল কলেজ, রংপুর' : 'Carmichael College, Rangpur',
    },
    {
      label: isBn ? 'চিকিৎসাবিজ্ঞান পাঠ' : 'Medical Degree',
      value: isBn
        ? 'রংপুর মেডিকেল কলেজ (এমবিবিএস ১৯৭১–১৯৭৬)'
        : 'Rangpur Medical College (MBBS 1971–1976)',
    },
    {
      label: isBn ? 'সঙ্গীত সাধনা' : 'Musical Discipleship',
      value: isBn
        ? 'রংপুর সঙ্গীত একাডেমি (১৯৬৮–১৯৭৬, মার্গ কণ্ঠসঙ্গীত ও হারমোনিয়াম)'
        : 'Rangpur Sangeet Academy (1968–1976, Classical Vocal & Harmonium)',
    },
    {
      label: isBn ? 'চিকিৎসা কর্মজীবন' : 'Clinical Service',
      value: isBn
        ? 'বাংলাদেশ (১৯৭৮ থেকে), ইরান প্রবাস (১৯৮৪–১৯৯২), রংপুরে পারিবারিক চিকিৎসা (১৯৯২ থেকে)'
        : 'Bangladesh (from 1978), Iran hospital practice (1984–1992), Rangpur private practice (from 1992)',
    },
    {
      label: isBn ? 'উপদেষ্টা ও শিক্ষকতা' : 'Advisory & Teaching',
      value: isBn
        ? 'স্বাস্থ্যসেবা উপদেষ্টা (২০০৪–২০০৯), তরুণ চিকিৎসকদের শিক্ষকতা (২০১০–২০২০)'
        : 'Healthcare Advisor (2004–2009), Medical Faculty & Mentorship (2010–2020)',
    },
    {
      label: isBn ? 'সাহিত্য ও ইতিহাস' : 'Literary Scope',
      value: isBn
        ? 'কবিতা, শিশুতোষ ছড়া, সমাজভাবনার প্রবন্ধ এবং রংপুর ও মুক্তিযুদ্ধের ইতিহাস গবেষণা'
        : 'Poetry, rhymes, research monographs, Liberation War cultural history',
    },
  ];

  const compactChapters = [
    {
      number: '01',
      title: 'Origins & Early Life',
      titleBn: 'জন্ম ও পারিবারিক প্রেক্ষাপট',
      text: 'Born in Rangpur in 1953, Dr. Mantu grew up in a respected household surrounded by the riverine landscapes and cultural heritage of northern East Bengal.',
      textBn: '১৯৫৩ সালে রংপুরে জন্ম। নদীমাতৃক উত্তরবঙ্গের উদার প্রকৃতি ও সংস্কৃতিমনা ঐতিহ্যবাহী পরিবারে তাঁর শৈশব ও মনন গঠিত হয়।',
    },
    {
      number: '02',
      title: 'Education & Medical School',
      titleBn: 'শিক্ষা ও চিকিৎসাবিজ্ঞান পাঠ',
      text: 'Educated at Rangpur High School and Carmichael College, he entered Rangpur Medical College in 1971, graduating with an MBBS degree in 1976.',
      textBn: 'রংপুর উচ্চ বিদ্যালয় ও কারমাইকেল কলেজে পাঠ সমাপনান্তে ১৯৭১ সালে রংপুর মেডিকেল কলেজে ভর্তি হন এবং ১৯৭৬ সালে এমবিবিএস সম্পন্ন করেন।',
    },
    {
      number: '03',
      title: 'Musical Discipleship',
      titleBn: 'সঙ্গীত শিক্ষা ও সুরসাধনা',
      text: 'Completed eight years of formal training at Rangpur Sangeet Academy (1968–1976), mastering classical vocal khayal, ragas, and harmonium accompaniment.',
      textBn: 'রংপুর সঙ্গীত একাডেমিতে আট বছর (১৯৬৮–১৯৭৬) বিশিষ্ট ওস্তাদদের কাছে শাস্ত্রীয় খেয়াল, রাগসঙ্গীত ও হারমোনিয়ামের নিবিড় তালিম গ্রহণ করেন।',
    },
    {
      number: '04',
      title: 'Clinical Practice in BD & Iran',
      titleBn: 'চিকিৎসা জীবন: বাংলাদেশ ও ইরান',
      text: 'Commenced medical duties in Bangladesh in 1978 before serving eight years as a physician in Iranian regional hospitals from 1984 to 1992.',
      textBn: '১৯৭৮ সালে বাংলাদেশে চিকিৎসাসেবার সূচনা এবং ১৯৮৪ থেকে ১৯৯২ পর্যন্ত আট বছর ইরানে আন্তর্জাতিক হাসপাতাল চিকিৎসক হিসেবে দায়িত্ব পালন করেন।',
    },
    {
      number: '05',
      title: 'Family Medicine in Rangpur',
      titleBn: 'রংপুরে পারিবারিক চিকিৎসা সাধনা',
      text: 'Returned to Rangpur in 1992 to establish his private family medicine chamber in Radhaballabh, providing attentive bedside care for multiple generations.',
      textBn: '১৯৯২ সালে রংপুরে ফিরে রাধাবল্লভে ব্যক্তিগত চেম্বার স্থাপন করেন এবং তিন দশক ধরে পরম মমতায় রোগীদের নিরাময় সেবা দিয়ে চলেছেন।',
    },
    {
      number: '06',
      title: 'Advisory & Teaching Roles',
      titleBn: 'স্বাস্থ্যসেবা উপদেষ্টা ও শিক্ষকতা',
      text: 'Served as Rangpur healthcare advisor (2004–2009) and dedicated a decade (2010–2020) to instructing medical students and interns.',
      textBn: '২০০৪ থেকে ২০০৯ সাল পর্যন্ত স্বাস্থ্যসেবা উপদেষ্টা হিসেবে এবং ২০১০ থেকে ২০২০ পর্যন্ত মেডিকেল শিক্ষার্থীদের শিক্ষকতায় যুক্ত ছিলেন।',
    },
    {
      number: '07',
      title: 'Literary & Historical Works',
      titleBn: 'সাহিত্য ও ইতিহাস গবেষণা',
      text: 'Authored eight published volumes spanning lyric poetry, children’s rhymes, and foundational research monographs on regional healthcare and the Liberation War.',
      textBn: 'আটটি প্রকাশিত গ্রন্থের রচয়িতা — যার মধ্যে রয়েছে নিসর্গের কবিতা, শিশুতোষ ছড়া এবং আঞ্চলিক চিকিৎসা ও মুক্তিযুদ্ধের প্রামাণ্য ইতিহাস।',
    },
    {
      number: '08',
      title: 'Honors & Public Service',
      titleBn: 'স্বীকৃতি ও সমাজকল্যাণ',
      text: 'Awarded the Rangpur Sahitya-Sanskriti Medal (2012), Rotary Honour (2012), and Best Organizer Distinction by Shilpakala Academy (2022).',
      textBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ পদক (২০১২), রোটারি সম্মাননা (২০১২) এবং শিল্পকলা একাডেমি কর্তৃক শ্রেষ্ঠ সংগঠক সম্মাননায় (২০২২) ভূষিত।',
    },
  ];

  return (
    <Layout>
      <PageHeader
        kicker={t('bio.kicker')}
        title="Dr. Md. Mofizul Islam Mantu"
        titleBn="ডা. মোঃ মফিজুল ইসলাম মান্টু — জীবনালেখ্য"
        description={t('bio.desc')}
        breadcrumbs={[{ label: t('nav.biography') }]}
        actions={
          <div className="flex items-center gap-1.5 p-1 bg-[#EAE4D8] rounded-xs border border-[#211F1C]/10 text-xs">
            <button
              onClick={() => setActiveView('timeline')}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors ${
                activeView === 'timeline'
                  ? 'bg-white text-[#211F1C] shadow-xs'
                  : 'text-[#625D52] hover:text-[#211F1C]'
              }`}
            >
              {t('bio.tabTimeline')}
            </button>
            <button
              onClick={() => setActiveView('chapters')}
              className={`px-3 py-1.5 font-medium rounded-2xs transition-colors ${
                activeView === 'chapters'
                  ? 'bg-white text-[#211F1C] shadow-xs'
                  : 'text-[#625D52] hover:text-[#211F1C]'
              }`}
            >
              {t('bio.tabChapters')}
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Main Content Area: Concise Timeline or Compact Chapters (8 cols) */}
        <div className="lg:col-span-8">
          {activeView === 'timeline' ? (
            <div className="space-y-4">
              <div className="border-b border-[#211F1C]/10 pb-3 mb-8">
                <h2 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {t('bio.timelineHeading')}
                </h2>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  {t('bio.timelineSub')}
                </p>
              </div>

              <div className="space-y-1">
                {TIMELINE_DATA.map((event, idx) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    isLast={idx === TIMELINE_DATA.length - 1}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b border-[#211F1C]/10 pb-3 mb-6">
                <h2 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {t('bio.chaptersHeading')}
                </h2>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  {t('bio.chaptersSub')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {compactChapters.map((ch) => (
                  <div
                    key={ch.number}
                    className="p-5 bg-white/70 border border-[#211F1C]/12 rounded-xs space-y-2 hover:border-[#211F1C]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#A84E36]">
                      <span>{isBn ? `অধ্যায় ${formatNumber(ch.number)}` : `Chapter ${ch.number}`}</span>
                    </div>
                    <h3 className={`text-lg font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                      {isBn ? ch.titleBn : ch.title}
                    </h3>
                    <p className={`text-xs text-[#625D52] ${isBn ? 'font-serif' : 'font-bengali-text'}`}>
                      {isBn ? ch.title : ch.titleBn}
                    </p>
                    <p className="text-xs text-[#625D52] font-sans leading-relaxed pt-1">
                      {isBn ? ch.textBn : ch.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Biographical Ledger & Direct Links (4 cols) */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          {publishedBioImage && (
            <div className="p-3.5 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-2.5 shadow-2xs">
              <div className="relative aspect-[4/5] bg-[#EAE4D8]/50 rounded-2xs overflow-hidden border border-[#211F1C]/10">
                <img
                  src={publishedBioImage.url}
                  alt={isBn ? publishedBioImage.altTextBn || publishedBioImage.altText : publishedBioImage.altText}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-2 border border-white/30 rounded-3xs pointer-events-none" />
              </div>
              <div className="text-[11px] text-[#625D52] font-serif italic text-center px-1">
                {isBn ? publishedBioImage.captionBn || publishedBioImage.caption : publishedBioImage.caption}
              </div>
            </div>
          )}

          <div className="p-6 bg-white/70 border border-[#211F1C]/15 rounded-xs space-y-4 text-xs font-sans">
            <h3 className={`text-lg font-semibold text-[#211F1C] border-b border-[#211F1C]/10 pb-2 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('bio.ledgerTitle')}
            </h3>
            <dl className="space-y-3">
              {biographicalLedger.map((item, idx) => (
                <div key={idx}>
                  <dt className="text-[#8A8375] uppercase tracking-wider font-semibold text-[10px]">
                    {item.label}
                  </dt>
                  <dd className="text-[#211F1C] font-medium mt-0.5">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Quick Exploration Pillars */}
          <div className="p-5 bg-[#EAE4D8]/50 border border-[#211F1C]/12 rounded-xs space-y-3 text-xs font-sans">
            <span className="font-semibold text-[#211F1C] block">{t('bio.exploreTitle')}</span>
            <div className="space-y-2">
              <Link
                to="/medical-career"
                className="flex items-center justify-between text-[#625D52] hover:text-[#A84E36] py-1 border-b border-[#211F1C]/10"
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-[#A84E36]" />
                  {t('bio.exploreMedical')}
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/music-culture"
                className="flex items-center justify-between text-[#625D52] hover:text-[#A84E36] py-1 border-b border-[#211F1C]/10"
              >
                <span className="flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-[#A84E36]" />
                  {t('bio.exploreMusic')}
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/books"
                className="flex items-center justify-between text-[#625D52] hover:text-[#A84E36] py-1 border-b border-[#211F1C]/10"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#A84E36]" />
                  {t('bio.exploreBooks')}
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                to="/awards-affiliations"
                className="flex items-center justify-between text-[#625D52] hover:text-[#A84E36] py-1"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#A84E36]" />
                  {t('bio.exploreAwards')}
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
};
