import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Archive, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { isBn, t } = useLanguage();

  return (
    <Layout>
      <div className="py-20 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#EAE4D8] text-[#A84E36] flex items-center justify-center mx-auto mb-6">
          <Archive className="w-8 h-8 stroke-[1.2]" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold block mb-2 font-sans">
          {t('notFound.kicker')}
        </span>
        <h1 className={`text-3xl sm:text-4xl font-bold text-[#211F1C] mb-3 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
          {t('notFound.title')}
        </h1>
        <p className="text-sm text-[#625D52] leading-relaxed font-sans mb-8">
          {t('notFound.msg')}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button to="/" variant="primary" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
            {t('notFound.btnHome')}
          </Button>
          <Button to="/books" variant="secondary">
            {t('notFound.btnBooks')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

