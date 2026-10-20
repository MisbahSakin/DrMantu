import React from 'react';
import { Link } from 'react-router-dom';
import { ARCHIVE_META } from '../../data/archiveData';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { isBn, t, formatNumber } = useLanguage();

  return (
    <footer className="mt-auto bg-[#EAE4D8]/60 border-t border-[#211F1C]/15 text-[#211F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Identity */}
          <div className="md:col-span-5 space-y-2">
            <h3 className={`text-xl font-bold tracking-tight text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {isBn ? ARCHIVE_META.nameBn : ARCHIVE_META.nameEn}
            </h3>
            <p className="text-sm text-[#625D52]">
              {isBn ? ARCHIVE_META.nameEn : ARCHIVE_META.nameBn}
            </p>
            <p className="text-xs text-[#8A8375] font-serif italic pt-1">
              "{isBn ? ARCHIVE_META.taglineBn : ARCHIVE_META.taglineEn}"
            </p>
          </div>

          {/* Essential Nav Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-xs font-sans">
            <div>
              <span className="font-semibold uppercase tracking-wider text-[#A84E36] block mb-2.5">
                {t('footer.colBio')}
              </span>
              <ul className="space-y-2 text-[#625D52]">
                <li>
                  <Link to="/biography" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.bioTimeline')}
                  </Link>
                </li>
                <li>
                  <Link to="/medical-career" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.medicalService')}
                  </Link>
                </li>
                <li>
                  <Link to="/awards-affiliations" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.awardsHonors')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-semibold uppercase tracking-wider text-[#A84E36] block mb-2.5">
                {t('footer.colCreative')}
              </span>
              <ul className="space-y-2 text-[#625D52]">
                <li>
                  <Link to="/books" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.bookLibrary')}
                  </Link>
                </li>
                <li>
                  <Link to="/writings" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.writingsEssays')}
                  </Link>
                </li>
                <li>
                  <Link to="/research" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.historicalResearch')}
                  </Link>
                </li>
                <li>
                  <Link to="/music-culture" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.musicCulture')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-semibold uppercase tracking-wider text-[#A84E36] block mb-2.5">
                {t('footer.colArchive')}
              </span>
              <ul className="space-y-2 text-[#625D52]">
                <li>
                  <Link to="/gallery" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.docGallery')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#211F1C] hover:underline transition-colors">
                    {t('footer.inquiries')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#211F1C]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8A8375] font-sans">
          <p>© {formatNumber(new Date().getFullYear())} {t('footer.copyright')}</p>
          <div className="flex items-center gap-2">
            <span>{t('footer.project')}</span>
            <span>·</span>
            <span>{isBn ? 'রংপুর' : 'Rangpur'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
