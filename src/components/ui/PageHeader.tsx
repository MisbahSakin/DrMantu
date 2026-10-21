import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import { useLanguage } from '../../context/LanguageContext';

interface PageHeaderProps {
  title: string;
  titleBn?: string;
  subtitle?: string;
  subtitleBn?: string;
  kicker?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  titleBn,
  subtitle,
  subtitleBn,
  kicker,
  description,
  breadcrumbs,
  actions,
  className = '',
}) => {
  const { isBn } = useLanguage();

  const mainTitle = isBn ? (titleBn || title) : title;
  const subTitle = isBn ? subtitleBn : subtitle;

  return (
    <header className={`border-b border-[#211F1C]/10 pb-6 sm:pb-8 mb-6 sm:mb-10 pt-2 sm:pt-4 ${className}`}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-3 sm:mb-4" />}

      {kicker && (
        <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#A84E36] font-semibold mb-2 font-sans">
          {kicker}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div className="max-w-3xl">
          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-semibold leading-[1.2] sm:leading-[1.15] text-[#211F1C] text-balance ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {mainTitle}
          </h1>
          {subTitle && (
            <p className={`text-base sm:text-xl text-[#625D52] font-normal mt-2 leading-relaxed ${isBn ? 'font-bengali-text' : 'font-serif'}`}>
              {subTitle}
            </p>
          )}
          {description && (
            <p className={`text-sm sm:text-base text-[#625D52] mt-3 leading-relaxed max-w-2xl ${isBn ? 'font-bengali-text' : 'font-sans'}`}>
              {description}
            </p>
          )}
        </div>

        {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
};
