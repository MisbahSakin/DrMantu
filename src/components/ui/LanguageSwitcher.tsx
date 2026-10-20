import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'header' | 'drawer' | 'minimal';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'header',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'drawer') {
    return (
      <div className={`flex items-center gap-2 p-1 bg-[#EAE4D8]/80 border border-[#211F1C]/15 rounded-xs ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('bn')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-2xs transition-colors font-bengali-heading text-center ${
            language === 'bn'
              ? 'bg-[#211F1C] text-white shadow-xs font-semibold'
              : 'text-[#625D52] hover:text-[#211F1C]'
          }`}
          aria-label="বাংলা ভাষায় দেখুন"
          aria-pressed={language === 'bn'}
        >
          বাংলা
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-2xs transition-colors font-sans text-center ${
            language === 'en'
              ? 'bg-[#211F1C] text-white shadow-xs font-semibold'
              : 'text-[#625D52] hover:text-[#211F1C]'
          }`}
          aria-label="View in English"
          aria-pressed={language === 'en'}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection / ভাষা নির্বাচন"
      className={`inline-flex items-center border border-[#211F1C]/20 bg-white/80 rounded-xs text-xs font-medium overflow-hidden shadow-2xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`px-3 py-1.5 transition-all font-bengali-heading focus-visible:outline-2 focus-visible:outline-[#A84E36] ${
          language === 'bn'
            ? 'bg-[#211F1C] text-white font-semibold'
            : 'text-[#625D52] hover:text-[#211F1C] hover:bg-[#EAE4D8]/50'
        }`}
        aria-label="বাংলা ভাষায় দেখুন"
        aria-pressed={language === 'bn'}
      >
        বাংলা
      </button>
      <span className="text-[#211F1C]/20 select-none font-mono" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 transition-all font-sans focus-visible:outline-2 focus-visible:outline-[#A84E36] ${
          language === 'en'
            ? 'bg-[#211F1C] text-white font-semibold'
            : 'text-[#625D52] hover:text-[#211F1C] hover:bg-[#EAE4D8]/50'
        }`}
        aria-label="View in English"
        aria-pressed={language === 'en'}
      >
        English
      </button>
    </div>
  );
};
