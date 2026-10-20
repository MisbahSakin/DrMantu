import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const { isBn } = useLanguage();

  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-[#8A8375] font-sans ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li>
          <Link
            to="/"
            className="hover:text-[#A84E36] transition-colors focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-2 rounded-xs"
          >
            {isBn ? 'আর্কাইভ' : 'Archive'}
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li aria-hidden="true" className="text-[#8A8375]/50 select-none">
                /
              </li>
              <li>
                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    className="hover:text-[#A84E36] transition-colors focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-2 rounded-xs"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#211F1C] font-medium" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
