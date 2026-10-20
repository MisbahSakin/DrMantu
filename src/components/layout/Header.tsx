import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, BookOpen } from 'lucide-react';
import { ARCHIVE_META } from '../../data/archiveData';
import { MobileNav } from './MobileNav';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isBn, t } = useLanguage();

  const navLinks = [
    { label: t('nav.biography'), path: '/biography' },
    { label: t('nav.books'), path: '/books' },
    { label: t('nav.writings'), path: '/writings' },
    { label: t('nav.medical'), path: '/medical-career' },
    { label: t('nav.music'), path: '/music-culture' },
    { label: t('nav.research'), path: '/research' },
    { label: t('nav.gallery'), path: '/gallery' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F4ED]/95 backdrop-blur-xs border-b border-[#211F1C]/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 xl:gap-8 h-16 sm:h-20">
            {/* Zone 1: Brand wordmark (responsive and overflow-safe on small mobile) */}
            <Link
              to="/"
              className="group flex flex-col shrink min-w-0 pr-1 focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-4 rounded-xs"
              aria-label={isBn ? "মূল পাতা - ডা. মোঃ মফিজুল ইসলাম মান্টু আর্কাইভ" : "Home - Dr. Md. Mofizul Islam Mantu Archive"}
            >
              {isBn ? (
                <>
                  <span className="font-bengali-heading text-base xs:text-lg sm:text-2xl font-bold tracking-tight text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-tight truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none">
                    {ARCHIVE_META.nameBn}
                  </span>
                  <span className="font-serif text-[11px] sm:text-xs text-[#625D52] tracking-normal -mt-0.5 truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none">
                    {ARCHIVE_META.nameEn}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-serif text-base xs:text-lg sm:text-2xl font-bold tracking-tight text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-tight truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none">
                    {ARCHIVE_META.nameEn}
                  </span>
                  <span className="font-bengali-text text-[11px] sm:text-xs text-[#625D52] tracking-normal -mt-0.5 truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none">
                    {ARCHIVE_META.nameBn}
                  </span>
                </>
              )}
            </Link>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-xs xl:text-sm font-medium text-[#625D52]">
              {navLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#211F1C] focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-2 rounded-xs ${
                      isActive ? 'text-[#A84E36] font-semibold' : ''
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A84E36]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Language Switcher + Catalog button + mobile toggle */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Prominent language switcher */}
              <LanguageSwitcher />

              <Link
                to="/books"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#A84E36] hover:bg-[#8F3E28] rounded-xs shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-2"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('nav.viewCatalog')}</span>
              </Link>

              {/* Mobile Menu Button with 44px tap target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden min-h-[44px] min-w-[44px] p-2 text-[#211F1C] hover:bg-[#EAE4D8] active:bg-[#DDD6C8] rounded-xs transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#A84E36]"
                aria-label={isBn ? "মেনু খুলুন" : "Open navigation menu"}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
