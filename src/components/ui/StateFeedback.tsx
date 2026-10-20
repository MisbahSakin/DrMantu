import React from 'react';
import { Archive, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../../context/LanguageContext';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message,
  className = '',
}) => {
  const { t } = useLanguage();
  const displayMsg = message || t('state.loading');

  return (
    <div
      role="status"
      className={`py-16 px-4 flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="w-8 h-8 rounded-full border-2 border-[#A84E36]/20 border-t-[#A84E36] animate-spin mb-4" />
      <p className="text-sm text-[#625D52] font-serif italic max-w-sm">{displayMsg}</p>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  onReset,
  resetLabel,
  icon,
  className = '',
}) => {
  const { isBn, t } = useLanguage();
  const displayTitle = title || t('state.emptyTitle');
  const displayMsg = message || t('state.emptyDesc');
  const displayReset = resetLabel || t('state.resetFilters');

  return (
    <div className={`py-16 px-6 text-center border border-dashed border-[#211F1C]/20 rounded-xs bg-[#EAE4D8]/30 max-w-lg mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[#EAE4D8] text-[#8A8375] flex items-center justify-center mx-auto mb-4">
        {icon || <Archive className="w-6 h-6 stroke-[1.5]" />}
      </div>
      <h3 className={`text-xl font-medium text-[#211F1C] mb-2 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
        {displayTitle}
      </h3>
      <p className="text-xs text-[#625D52] leading-relaxed mb-6 font-sans">{displayMsg}</p>
      {onReset && (
        <Button variant="secondary" size="sm" onClick={onReset}>
          {displayReset}
        </Button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  retryLabel,
  className = '',
}) => {
  const { isBn, t } = useLanguage();
  const displayTitle = title || t('state.errorTitle');
  const displayMsg = message || t('state.errorDesc');
  const displayRetry = retryLabel || t('state.retry');

  return (
    <div className={`py-12 px-6 border border-[#A84E36]/30 bg-[#A84E36]/5 rounded-xs max-w-md mx-auto text-center ${className}`}>
      <div className="w-10 h-10 rounded-full bg-[#A84E36]/15 text-[#A84E36] flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-5 h-5 stroke-[1.5]" />
      </div>
      <h3 className={`text-lg font-medium text-[#211F1C] mb-1.5 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
        {displayTitle}
      </h3>
      <p className="text-xs text-[#625D52] leading-relaxed mb-5 font-sans">{displayMsg}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} icon={<RefreshCw className="w-3.5 h-3.5" />}>
          {displayRetry}
        </Button>
      )}
    </div>
  );
};
