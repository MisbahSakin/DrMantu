import React from 'react';
import { TimelineEvent } from '../../types';
import { MapPin } from 'lucide-react';
import { CategoryLabel } from '../ui/CategoryLabel';
import { useLanguage } from '../../context/LanguageContext';

interface TimelineItemProps {
  event: TimelineEvent;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ event, isLast = false }) => {
  const { isBn, formatNumber } = useLanguage();

  const displayYear = isBn ? (event.periodBn || formatNumber(event.year)) : event.year;
  const displayTitle = isBn ? (event.titleBn || event.title) : event.title;
  const subTitle = isBn ? (event.titleBn ? event.title : undefined) : event.titleBn;
  const displayLocation = isBn ? (event.locationBn || event.location) : event.location;
  const displayDesc = isBn ? (event.descriptionBn || event.description) : event.description;

  return (
    <div className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-10 pb-10 group">
      {/* Date Column */}
      <div className="md:w-36 shrink-0 flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
        <span className={`text-2xl sm:text-3xl font-semibold text-[#211F1C] tabular-nums tracking-tight group-hover:text-[#A84E36] transition-colors ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
          {displayYear}
        </span>
        {isBn && event.periodBn && event.periodBn !== event.year && (
          <span className="font-serif text-xs text-[#8A8375] font-normal">
            {event.year}
          </span>
        )}
      </div>

      {/* Content Column with Subtle Left Hairline Border */}
      <div className={`flex-1 md:pl-8 md:border-l border-[#211F1C]/15 ${isLast ? 'border-transparent' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <CategoryLabel category={event.category} />
          <span className="text-[#8A8375]/60 text-xs" aria-hidden="true">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#8A8375] font-sans">
            <MapPin className="w-3 h-3 text-[#A84E36]" />
            {displayLocation}
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-semibold text-[#211F1C] leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
          {displayTitle}
        </h3>
        {subTitle && (
          <p className={`text-sm text-[#625D52] mt-0.5 font-normal ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
            {subTitle}
          </p>
        )}

        <p className="text-sm text-[#625D52] mt-2.5 leading-relaxed font-sans max-w-2xl">
          {displayDesc}
        </p>
      </div>
    </div>
  );
};
