import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, BookOpen, User, Feather, Activity, Music, Image, Award, Mail } from 'lucide-react';
import { ARCHIVE_META } from '../../data/archiveData';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isBn, t } = useLanguage();

  // Lock body scroll and handle Escape key while mobile drawer is open
  React.useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const publicRoutes = [
    { path: '/', label: isBn ? 'মূল পাতা' : 'Home', sub: isBn ? 'হোম' : 'Overview', icon: BookOpen },
    { path: '/biography', label: isBn ? 'জীবনালেখ্য' : 'Biography', sub: isBn ? 'জীবনকথা' : 'Life Ledger', icon: User },
    { path: '/books', label: isBn ? 'গ্রন্থসমগ্র' : 'Books & Volumes', sub: isBn ? 'প্রকাশনা' : 'Catalogue', icon: BookOpen },
    { path: '/writings', label: isBn ? 'সাহিত্য ও প্রবন্ধ' : 'Writings & Essays', sub: isBn ? 'প্রবন্ধ' : 'Articles', icon: Feather },
    { path: '/medical-career', label: isBn ? 'চিকিৎসা জীবন' : 'Medical Career', sub: isBn ? 'চিকিৎসা' : 'Clinical Practice', icon: Activity },
    { path: '/research', label: isBn ? 'ঐতিহাসিক গবেষণা' : 'Research Papers', sub: isBn ? 'গবেষণা' : 'Scholarship', icon: Activity },
    { path: '/music-culture', label: isBn ? 'সঙ্গীত ও সংস্কৃতি' : 'Music & Culture', sub: isBn ? 'সঙ্গীত' : 'Vocal Heritage', icon: Music },
    { path: '/gallery', label: isBn ? 'চিত্রশালা ও দলিল' : 'Archival Gallery', sub: isBn ? 'দলিলপত্র' : 'Exhibits', icon: Image },
    { path: '/awards-affiliations', label: isBn ? 'স্বীকৃতি ও সম্মাননা' : 'Awards & Honors', sub: isBn ? 'স্বীকৃতি' : 'Affiliations', icon: Award },
    { path: '/contact', label: isBn ? 'যোগাযোগ' : 'Archive Inquiries', sub: isBn ? 'অনুসন্ধান' : 'Consultations', icon: Mail },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isBn ? "ন্যাভিগেশন মেনু" : "Navigation Menu"}
      className="fixed inset-0 z-50 lg:hidden flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#211F1C]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-[#F7F4ED] text-[#211F1C] h-full shadow-2xl flex flex-col z-10 border-r border-[#211F1C]/15 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#211F1C]/10 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className={`text-base font-bold text-[#211F1C] truncate ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {isBn ? ARCHIVE_META.nameBn : ARCHIVE_META.nameEn}
            </div>
            <div className="text-xs text-[#625D52] truncate">
              {isBn ? 'ঐতিহাসিক ও সাহিত্য স্মারক আর্কাইভ' : 'Archive & Legacy · Rangpur'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 text-[#625D52] hover:text-[#211F1C] rounded-xs flex items-center justify-center hover:bg-[#EAE4D8]/60 active:bg-[#DDD6C8]"
            aria-label={isBn ? "মেনু বন্ধ করুন" : "Close navigation"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language switcher inside drawer */}
        <div className="p-4 bg-[#EAE4D8]/50 border-b border-[#211F1C]/10">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8A8375] mb-2 font-sans">
            {isBn ? 'ভাষা নির্বাচন' : 'Language Selection'}
          </div>
          <LanguageSwitcher variant="drawer" />
        </div>

        {/* Links list */}
        <nav className="p-4 flex-1 space-y-1">
          {publicRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xs text-sm transition-colors active:scale-[0.99] ${
                  isActive
                    ? 'bg-[#A84E36] text-white font-medium shadow-xs'
                    : 'text-[#211F1C] hover:bg-[#EAE4D8]/60 hover:text-[#A84E36] active:bg-[#DDD6C8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8A8375]'}`} />
                  <span className={isBn ? 'font-bengali-sans font-medium' : 'font-sans'}>{route.label}</span>
                </div>
                <span className={`text-[11px] ${isActive ? 'text-white/80' : 'text-[#8A8375]'}`}>
                  {route.sub}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
