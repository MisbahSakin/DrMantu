import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface CategoryLabelProps {
  category: string;
  categoryBn?: string;
  year?: string | number;
  readTime?: string;
  className?: string;
  accent?: boolean;
}

const CATEGORY_MAP: Record<string, { bn: string; en: string }> = {
  'Poetry': { bn: 'কবিতা', en: 'Poetry' },
  "Children's Literature": { bn: 'শিশু-কিশোর সাহিত্য', en: "Children's Literature" },
  'Research Books': { bn: 'গবেষণা গ্রন্থ', en: 'Research Books' },
  'Edited and Memorial Books': { bn: 'সম্পাদিত ও স্মারক গ্রন্থ', en: 'Edited & Memorial Books' },
  'Other Publications': { bn: 'অন্যান্য প্রকাশনা', en: 'Other Publications' },
  'Historical Monograph': { bn: 'ঐতিহাসিক গবেষণা', en: 'Historical Monograph' },
  'National Liberation Studies': { bn: 'মুক্তিযুদ্ধ গবেষণা', en: 'National Liberation Studies' },
  'Rangpur History': { bn: 'রংপুরের ইতিহাস', en: 'Rangpur History' },
  'The Liberation War': { bn: 'বাঙালির মুক্তিযুদ্ধ', en: 'The Liberation War' },
  'Language & Culture': { bn: 'ভাষা ও সংস্কৃতি', en: 'Language & Culture' },
  'Biographies of Notable Personalities': { bn: 'গুণীজন পরিচিতি', en: 'Biographies' },
  'Liberation War': { bn: 'মুক্তিযুদ্ধ', en: 'Liberation War' },
  'Rabindranath & Nazrul': { bn: 'রবীন্দ্র-নজরুল চর্চা', en: 'Rabindranath & Nazrul' },
  'Music': { bn: 'সঙ্গীত সাধনা', en: 'Music & Culture' },
  'Biographies': { bn: 'জীবনী ও গুণীজন', en: 'Biographies' },
  'Medical Science': { bn: 'চিকিৎসাবিজ্ঞান', en: 'Medical Science' },
  'Satire & Humour': { bn: 'রম্য ও ব্যঙ্গ', en: 'Satire & Humour' },
  'Travel Writing': { bn: 'ভ্রমণকাহিনী', en: 'Travel Writing' },
  'Other Essays': { bn: 'অন্যান্য প্রবন্ধ', en: 'Other Essays' },
  'Award': { bn: 'পদক ও সম্মাননা', en: 'Award' },
  'Life Membership': { bn: 'আজীবন সদস্যপদ', en: 'Life Membership' },
  'Former Position': { bn: 'সাবেক পদ', en: 'Former Position' },
  'Founding Member': { bn: 'প্রতিষ্ঠাতা সদস্য', en: 'Founding Member' },
  'Advisory Affiliation': { bn: 'উপদেষ্টা সম্পৃক্ততা', en: 'Advisory Affiliation' },
  'Manuscripts': { bn: 'পাণ্ডুলিপি', en: 'Manuscripts' },
  'Medical Memorabilia': { bn: 'চিকিৎসা স্মারক', en: 'Medical Memorabilia' },
  'Musical Memorabilia': { bn: 'সঙ্গীত স্মারক', en: 'Musical Memorabilia' },
  'Awards & Plaquettes': { bn: 'পদক ও স্মারক ফলক', en: 'Awards & Plaquettes' },
};

export const CategoryLabel: React.FC<CategoryLabelProps> = ({
  category,
  categoryBn,
  year,
  readTime,
  className = '',
  accent = false,
}) => {
  const { isBn, formatNumber } = useLanguage();

  const mapped = CATEGORY_MAP[category];
  const displayCategory = isBn
    ? (categoryBn || (mapped ? mapped.bn : category))
    : (mapped ? mapped.en : category);

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase ${
        accent ? 'text-[#A84E36]' : 'text-[#625D52]'
      } ${className}`}
    >
      <span className={isBn ? 'font-bengali-sans tracking-normal' : 'font-sans'}>
        {displayCategory}
      </span>
      {year && (
        <>
          <span className="text-[#8A8375]/60" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums text-[#8A8375] font-sans">
            {formatNumber(year)}
          </span>
        </>
      )}
      {readTime && (
        <>
          <span className="text-[#8A8375]/60" aria-hidden="true">
            ·
          </span>
          <span className="text-[#8A8375] lowercase tracking-normal font-sans">
            {readTime}
          </span>
        </>
      )}
    </div>
  );
};
