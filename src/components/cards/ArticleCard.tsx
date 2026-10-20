import React from 'react';
import { Link } from 'react-router-dom';
import { Writing } from '../../types';
import { CategoryLabel } from '../ui/CategoryLabel';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ArticleCardProps {
  writing: Writing;
  layout?: 'grid' | 'row';
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  writing,
  layout = 'row',
  className = '',
}) => {
  const { isBn, t, formatNumber } = useLanguage();

  const mainTitle = isBn ? (writing.titleBn || writing.title) : writing.title;
  const subTitle = isBn
    ? (writing.titleBn && writing.title !== writing.titleBn ? writing.title : undefined)
    : writing.titleBn;

  if (layout === 'row') {
    return (
      <article
        className={`group py-4 border-b border-[#211F1C]/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-6 transition-colors hover:bg-[#EAE4D8]/20 px-3 -mx-3 rounded-xs ${className}`}
      >
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center gap-2 mb-1.5">
            <CategoryLabel category={writing.category} categoryBn={writing.categoryBn} />
            <span className="text-[#8A8375]/60 text-xs" aria-hidden="true">
              ·
            </span>
            <span className="text-xs text-[#8A8375] font-sans tabular-nums">{writing.publishedDate}</span>
          </div>

          <h3 className={`text-lg sm:text-xl font-semibold text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            <Link to={`/writings/${writing.slug}`} className="inline-flex items-baseline gap-1.5 hover:underline">
              <span>{mainTitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#A84E36] shrink-0" />
            </Link>
          </h3>

          {subTitle && (
            <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
              {subTitle}
            </p>
          )}

          <p className="text-xs text-[#625D52] mt-1.5 line-clamp-1 font-sans">{writing.excerpt}</p>
        </div>

        <div className="shrink-0">
          <Link
            to={`/writings/${writing.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-[#A84E36] hover:underline"
          >
            {t('writings.read')}
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col p-5 border border-[#211F1C]/10 bg-white/60 rounded-xs hover:border-[#211F1C]/25 hover:bg-white transition-all ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <CategoryLabel category={writing.category} categoryBn={writing.categoryBn} />
        <span className="text-xs text-[#8A8375] tabular-nums font-sans">{writing.publishedDate}</span>
      </div>

      <h3 className={`text-lg font-semibold text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
        <Link to={`/writings/${writing.slug}`} className="hover:underline">
          {mainTitle}
        </Link>
      </h3>
      {subTitle && (
        <p className={`text-xs text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
          {subTitle}
        </p>
      )}

      <p className="text-xs text-[#625D52] mt-2 line-clamp-2 leading-relaxed font-sans">{writing.excerpt}</p>

      <div className="mt-auto pt-3 border-t border-[#211F1C]/10 flex items-center justify-between text-xs font-sans text-[#8A8375]">
        <span>{writing.readTime || (isBn ? 'প্রবন্ধ' : 'Essay')}</span>
        <Link
          to={`/writings/${writing.slug}`}
          className="text-[#A84E36] font-semibold hover:underline"
        >
          {t('writings.read')}
        </Link>
      </div>
    </article>
  );
};
