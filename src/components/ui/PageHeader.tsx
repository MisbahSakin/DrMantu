import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';
import { useLanguage } from '../../context/LanguageContext';

interface PageHeaderProps {
  title: string;
  titleBn?: string;
  kicker?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  titleBn,
  kicker,
  description,
  breadcrumbs,
  actions,
  className = '',
}) => {
  const { isBn } = useLanguage();

  const mainTitle = isBn ? (titleBn || title) : title;
  const subTitle = isBn ? (titleBn && title !== titleBn ? title : undefined) : titleBn;

  return (
    <header className={`border-b border-[#211F1C]/10 pb-8 mb-10 pt-4 ${className}`}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-4" />}

      {kicker && (
        <div className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold mb-2 font-sans">
          {kicker}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15] text-[#211F1C] text-balance ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {mainTitle}
          </h1>
          {subTitle && (
            <p className={`text-base sm:text-xl text-[#625D52] font-normal mt-2 leading-relaxed ${isBn ? 'font-serif' : 'font-bengali-text'}`}>
              {subTitle}
            </p>
          )}
          {description && (
            <p className="text-sm sm:text-base text-[#625D52] mt-3 leading-relaxed max-w-2xl font-sans">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
};
