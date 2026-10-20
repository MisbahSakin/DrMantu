import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationKey, toBengaliDigits } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isBn: boolean;
  isEn: boolean;
  t: (key: TranslationKey, fallback?: string) => string;
  pick: (bnText?: string | null, enText?: string | null) => string;
  formatNumber: (val: number | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Requirement 1: Default language: Bengali (বাংলা). Must open in Bengali on first visit.
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'bn') {
        return saved;
      }
    } catch {
      // localStorage may fail in private mode
    }
    return 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = 'ltr';
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const t = (key: TranslationKey, fallback?: string): string => {
    const entry = translations[key];
    if (!entry) {
      return fallback || key;
    }
    return entry[language] || fallback || entry.en || key;
  };

  const pick = (bnText?: string | null, enText?: string | null): string => {
    if (language === 'bn') {
      return (bnText && bnText.trim()) || (enText && enText.trim()) || '';
    }
    return (enText && enText.trim()) || (bnText && bnText.trim()) || '';
  };

  const formatNumber = (val: number | string): string => {
    if (language === 'bn') {
      return toBengaliDigits(val);
    }
    return String(val);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isBn: language === 'bn',
        isEn: language === 'en',
        t,
        pick,
        formatNumber,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
