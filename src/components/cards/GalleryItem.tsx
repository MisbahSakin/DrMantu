import React, { useState } from 'react';
import { GalleryItemData } from '../../types';
import { FileText, Music, Stethoscope, Landmark, Maximize2, X, Archive } from 'lucide-react';
import { CategoryLabel } from '../ui/CategoryLabel';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

interface GalleryItemProps {
  item: GalleryItemData;
  className?: string;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ item, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isBn, t, formatNumber } = useLanguage();
  const { getPublishedGalleryItem } = useAdmin();

  // Lock body scroll while archival inspection modal is open
  React.useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Retrieve published image if an administrator published one for this accession or id
  const publishedImage = getPublishedGalleryItem(item.id) || getPublishedGalleryItem(item.accessionNo);

  const mainTitle = isBn ? (item.titleBn || item.title) : item.title;
  const subTitle = isBn
    ? (item.titleBn && item.title !== item.titleBn ? item.title : undefined)
    : item.titleBn;

  // Return contextual archival motif icon based on category
  const renderCategoryIcon = () => {
    switch (item.category) {
      case 'Manuscripts':
        return <FileText className="w-8 h-8 text-[#A84E36] stroke-[1.2]" />;
      case 'Musical Memorabilia':
        return <Music className="w-8 h-8 text-[#B38F44] stroke-[1.2]" />;
      case 'Medical Memorabilia':
        return <Stethoscope className="w-8 h-8 text-[#7A3B2E] stroke-[1.2]" />;
      case 'Historic Rangpur':
      case 'Awards & Plaquettes':
        return <Landmark className="w-8 h-8 text-[#4A5B52] stroke-[1.2]" />;
      default:
        return <Archive className="w-8 h-8 text-[#625D52] stroke-[1.2]" />;
    }
  };

  return (
    <>
      <article
        onClick={() => setIsOpen(true)}
        className={`group cursor-pointer flex flex-col border border-[#211F1C]/12 bg-[#FBF9F5] p-4 rounded-xs hover:border-[#211F1C]/30 hover:shadow-md transition-all ${className}`}
      >
        {/* Curatorial Framing Container */}
        {publishedImage ? (
          <div className="relative aspect-[4/3] bg-[#EAE4D8]/60 border border-[#211F1C]/10 rounded-2xs overflow-hidden">
            <img
              src={publishedImage.url}
              alt={publishedImage.altText || mainTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              type="button"
              className="absolute right-3 top-3 p-1.5 bg-white/90 text-[#211F1C] rounded-xs shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={t('gallery.inspect')}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="relative aspect-[4/3] bg-[#EAE4D8]/60 border border-[#211F1C]/10 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Subtle watermark engraving frame */}
            <div className="absolute inset-2 border border-[#211F1C]/10 rounded-2xs pointer-events-none" />

            {/* Archival category motif */}
            <div className="p-3 rounded-full bg-white/70 shadow-xs mb-3 group-hover:scale-105 transition-transform duration-300">
              {renderCategoryIcon()}
            </div>

            <span className={`text-xs text-[#625D52] line-clamp-1 max-w-[85%] ${isBn ? 'font-bengali-heading' : 'font-serif italic'}`}>
              {mainTitle}
            </span>
            <span className="font-mono text-[10px] text-[#8A8375] tracking-widest uppercase mt-1">
              {item.accessionNo}
            </span>

            {/* Quick zoom button */}
            <button
              type="button"
              className="absolute right-3 top-3 p-1.5 bg-white/90 text-[#211F1C] rounded-xs shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={t('gallery.inspect')}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Curatorial Metadata */}
        <div className="mt-4 flex flex-col flex-1">
          <div className="flex items-center justify-between text-xs text-[#8A8375] mb-1">
            <CategoryLabel category={item.category} />
            <span className="tabular-nums font-mono text-[11px]">{formatNumber(item.year)}</span>
          </div>

          <h3 className={`text-base font-semibold text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {mainTitle}
          </h3>
          {subTitle && (
            <p className={`text-xs text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
              {subTitle}
            </p>
          )}

          <p className="text-xs text-[#625D52] mt-2 line-clamp-2 leading-relaxed font-sans flex-1">
            {item.caption}
          </p>

          <div className="mt-3 pt-2 border-t border-[#211F1C]/10 flex items-center justify-between text-[11px] text-[#8A8375]">
            <span className="truncate italic max-w-[200px]">{item.medium}</span>
            <span className="font-mono text-[10px]">{item.accessionNo}</span>
          </div>
        </div>
      </article>

      {/* Modal Dialog for Archival Inspection */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#211F1C]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#F7F4ED] text-[#211F1C] max-w-2xl w-full max-h-[90dvh] overflow-y-auto border border-[#211F1C]/20 shadow-2xl p-5 sm:p-8 rounded-xs relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 sm:right-5 top-3 sm:top-5 min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#625D52] hover:text-[#211F1C] rounded-xs hover:bg-[#EAE4D8] active:bg-[#DDD6C8] transition-colors"
              aria-label={t('gallery.closeDialog')}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A84E36]">
                {item.accessionNo} · {item.category}
              </span>
              <h2 className={`text-2xl sm:text-3xl font-semibold text-[#211F1C] mt-1 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                {mainTitle}
              </h2>
              {subTitle && (
                <p className={`text-base text-[#625D52] mt-1 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                  {subTitle}
                </p>
              )}
            </div>

            {/* Exhibit display plate */}
            {publishedImage ? (
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#211F1C]/5 border border-[#211F1C]/15 rounded-xs overflow-hidden my-6 flex items-center justify-center">
                <img
                  src={publishedImage.url}
                  alt={publishedImage.altText || mainTitle}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="p-8 bg-[#EAE4D8]/50 border border-[#211F1C]/15 rounded-xs flex flex-col items-center justify-center text-center my-6">
                <div className="p-4 rounded-full bg-white shadow-xs mb-3">
                  {renderCategoryIcon()}
                </div>
                <p className={`text-sm text-[#625D52] max-w-md ${isBn ? 'font-bengali-text' : 'font-serif italic'}`}>
                  "{item.caption}"
                </p>
                <div className="mt-4 text-xs font-mono text-[#8A8375]">
                  {isBn ? 'মহাফেজখানা ফলক' : 'Archival Plate'} · {item.aspectRatio} · {item.medium}
                </div>
              </div>
            )}

            {/* Provenance and Details */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-[#211F1C]/15 pt-4">
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('gallery.originPeriod')}</dt>
                <dd className="font-medium text-[#211F1C] mt-0.5">{formatNumber(item.year)}</dd>
              </div>
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('gallery.medium')}</dt>
                <dd className="font-medium text-[#211F1C] mt-0.5">{item.medium}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('gallery.curatorialNote')}</dt>
                <dd className="text-[#625D52] mt-0.5 leading-relaxed font-sans">{item.caption}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
};
