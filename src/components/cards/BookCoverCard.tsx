import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { ARCHIVE_META } from '../../data/archiveData';
import { CategoryLabel } from '../ui/CategoryLabel';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

interface BookCoverCardProps {
  book: Book;
  className?: string;
}

export const BookCoverCard: React.FC<BookCoverCardProps> = ({ book, className = '' }) => {
  const { isBn, formatNumber } = useLanguage();
  const { getPublishedBookCover } = useAdmin();

  const publishedCover = getPublishedBookCover(book.slug);

  return (
    <article className={`group flex flex-col ${className}`}>
      {/* Book Cover Visual (Clothbound Edition or Published Cover Image) */}
      <Link
        to={`/books/${book.slug}`}
        className="block relative aspect-[3/4] w-full rounded-xs shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-4"
        style={{ backgroundColor: book.jacketColor }}
        aria-label={isBn ? `${book.titleBn} এর বিবরণী দেখুন` : `View details for ${book.title}`}
      >
        {publishedCover ? (
          <img
            src={publishedCover}
            alt={isBn ? book.titleBn : book.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <>
            {/* Cloth weave texture effect & spine highlight */}
            <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/25 border-r border-white/10 pointer-events-none" />
            <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none" />

            {/* Embossed inner border */}
            <div className="absolute inset-3 border border-white/20 rounded-2xs pointer-events-none flex flex-col justify-between p-4 text-center">
          {/* Top: Category & Year */}
          <div className="text-[10px] uppercase tracking-widest text-white/75 font-sans">
            {isBn ? (book.categoryBn || book.category) : book.category} · {formatNumber(book.year)}
          </div>

          {/* Center: Title in active language */}
          <div className="my-auto py-2">
            <h3 className={`text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-xs ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {isBn ? book.titleBn : book.title}
            </h3>
            {(isBn ? book.subtitleBn : book.subtitle) && (
              <p className={`text-xs sm:text-sm text-white/90 mt-2 line-clamp-2 ${isBn ? 'font-bengali-text' : 'font-serif italic font-normal'}`}>
                {isBn ? book.subtitleBn : book.subtitle}
              </p>
            )}
            <div className="w-8 h-[1px] bg-white/40 mx-auto my-2.5" />
            <p className="text-[10px] tracking-wider uppercase text-white/80 font-sans">
              {isBn ? ARCHIVE_META.nameBn : ARCHIVE_META.nameEn}
            </p>
          </div>

          {/* Bottom: Publisher / Origin */}
          <div className="text-[9px] text-white/60 font-sans truncate">
            {isBn ? (book.publisherBn || book.publisher || 'রংপুর') : (book.publisher || book.publisherBn || 'Rangpur')}
          </div>
        </div>
        </>
        )}
      </Link>

      {/* Book Meta Details - Prioritizing Category, Year, Title, Pages */}
      <div className="mt-3.5 flex flex-col flex-1">
        <CategoryLabel
          category={book.category}
          categoryBn={book.categoryBn}
          year={book.year}
          className="mb-1"
        />
        <h4 className={`text-base sm:text-lg font-semibold text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
          <Link to={`/books/${book.slug}`} className="hover:underline">
            {isBn ? book.titleBn : book.title}
          </Link>
        </h4>
        {(isBn ? book.subtitleBn : book.subtitle) && (
          <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-bengali-text' : 'font-serif italic'}`}>
            {isBn ? book.subtitleBn : book.subtitle}
          </p>
        )}
        <div className="mt-2 text-xs text-[#8A8375] font-sans">
          <span>{book.pages ? `${formatNumber(book.pages)} ${isBn ? 'পৃষ্ঠা' : 'pages'}` : (isBn ? 'সংরক্ষিত গ্রন্থ' : 'Monograph')}</span> · <span className="tabular-nums">{book.edition}</span>
        </div>
      </div>
    </article>
  );
};
