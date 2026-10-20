import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/StateFeedback';
import { ArrowLeft, Clock, Calendar, Bookmark, Info, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WRITINGS_DATA, ARCHIVE_META } from '../data/archiveData';

export const WritingDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isBn, t, formatNumber } = useLanguage();
  const writing = WRITINGS_DATA.find((w) => w.slug === slug);

  if (!writing) {
    return (
      <Layout>
        <EmptyState
          title={t('writingDetail.notFoundTitle')}
          message={t('writingDetail.notFoundMsg')}
          onReset={() => {}}
          resetLabel={t('writingDetail.back')}
        />
        <div className="text-center mt-6">
          <Button to="/writings" variant="primary">
            {t('writingDetail.back')}
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedWritings = WRITINGS_DATA.filter(
    (w) => w.id !== writing.id && w.category === writing.category
  ).slice(0, 3);
  const fallbackRelated =
    relatedWritings.length > 0
      ? relatedWritings
      : WRITINGS_DATA.filter((w) => w.id !== writing.id).slice(0, 3);

  const mainTitle = isBn ? (writing.titleBn || writing.title) : writing.title;
  const categoryLabel = isBn ? (writing.categoryBn || writing.category) : writing.category;

  return (
    <Layout>
      <PageHeader
        kicker={`${t('writingDetail.kicker')} · ${categoryLabel}`}
        title={writing.title}
        titleBn={writing.titleBn}
        description={
          writing.publicationVenue
            ? `${isBn ? 'প্রথম প্রকাশ:' : 'First published in'} ${writing.publicationVenue}${
                writing.publishedDate ? ` (${isBn ? formatNumber(writing.publishedDate) : writing.publishedDate})` : ''
              }`
            : undefined
        }
        breadcrumbs={[
          { label: isBn ? 'প্রবন্ধ ও রচনা' : 'Writings', path: '/writings' },
          { label: mainTitle },
        ]}
        actions={
          <Button to="/writings" variant="outline" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
            {t('writingDetail.back')}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Main Reading Column (8 cols) */}
        <article className="lg:col-span-8 max-w-prose">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#8A8375] pb-5 mb-8 border-b border-[#211F1C]/10 font-sans">
            <CategoryLabel category={writing.category} accent />
            {writing.publishedDate && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {writing.publishedDate}
                </span>
              </>
            )}
            {writing.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {writing.readTime}
                </span>
              </>
            )}
            {writing.publicationVenue && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {t('writingDetail.venue')}: <strong className="font-semibold text-[#211F1C]">{writing.publicationVenue}</strong>
                </span>
              </>
            )}
          </div>

          {/* Table of Contents for Long Articles */}
          {writing.tableOfContents && writing.tableOfContents.length > 0 && (
            <div className="mb-8 p-5 bg-[#EAE4D8]/40 border border-[#211F1C]/12 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A84E36]">
                <Bookmark className="w-3.5 h-3.5" />
                <span>{t('writingDetail.toc')}</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-xs text-[#625D52] font-sans">
                {writing.tableOfContents.map((section, idx) => (
                  <li key={idx} className="font-bengali-text text-sm text-[#211F1C]">
                    {section}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Body Content or Honest Metadata Notice */}
          {writing.hasFullText && writing.body ? (
            <div className={`space-y-6 text-base sm:text-lg text-[#211F1C] leading-relaxed ${isBn ? 'font-bengali-text' : 'font-sans'}`}>
              {writing.body.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'editorial-drop-cap' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Honest unsupplied notice */}
              <div className="p-6 bg-white border border-[#211F1C]/15 rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#A84E36]">
                  <Info className="w-4 h-4" />
                  <span>{t('writingDetail.statusPending')}</span>
                </div>
                <h3 className={`text-xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {mainTitle}
                </h3>
                <p className="text-sm text-[#625D52] leading-relaxed font-sans">
                  {writing.unsuppliedNotice || t('writingDetail.unsuppliedNoticeDefault')}
                </p>
                <div className="p-3 bg-[#EAE4D8]/50 rounded-xs text-xs text-[#8A8375] font-sans">
                  <strong>{t('writingDetail.excerptSummary')}</strong> {writing.excerpt}
                </div>
              </div>
            </div>
          )}

          {/* Tags List */}
          {writing.tags && writing.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-[#211F1C]/10">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#8A8375] font-sans">
                <span className="font-semibold uppercase tracking-wider text-[#211F1C]">
                  {t('writingDetail.thematicIndices')}
                </span>
                {writing.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className="text-[#625D52]">{tag}</span>
                    {idx < writing.tags.length - 1 && <span className="text-[#8A8375]/50">/</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Archival Signature Stamp */}
          <div className="mt-10 p-5 bg-[#EAE4D8]/30 border border-[#211F1C]/10 rounded-xs flex items-center justify-between text-xs font-sans">
            <div>
              <strong className="text-[#211F1C] block">{isBn ? ARCHIVE_META.nameBn : ARCHIVE_META.nameEn}</strong>
              <span className={`text-[#625D52] ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                {isBn ? ARCHIVE_META.nameEn : ARCHIVE_META.nameBn}
              </span>
            </div>
            <span className="font-serif italic text-[#A84E36]">
              {isBn ? 'ঐতিহাসিক সংরক্ষণ নথি' : 'Archival Preservation Record'}
            </span>
          </div>
        </article>

        {/* Sidebar: Dossier & Related Writings (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white/70 border border-[#211F1C]/15 rounded-xs space-y-3 text-xs font-sans">
            <h3 className={`text-lg font-semibold text-[#211F1C] border-b border-[#211F1C]/10 pb-2 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('writingDetail.dossierTitle')}
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('writingDetail.category')}</dt>
                <dd className="text-[#211F1C] font-medium mt-0.5">{categoryLabel}</dd>
              </div>
              {writing.publicationVenue && (
                <div>
                  <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('writingDetail.venue')}</dt>
                  <dd className="text-[#211F1C] font-medium mt-0.5">{writing.publicationVenue}</dd>
                </div>
              )}
              {writing.publishedDate && (
                <div>
                  <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('writingDetail.date')}</dt>
                  <dd className="text-[#211F1C] font-medium mt-0.5 tabular-nums">
                    {isBn ? formatNumber(writing.publishedDate) : writing.publishedDate}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('writingDetail.textIntegrity')}</dt>
                <dd className="text-[#211F1C] font-medium mt-0.5">
                  {writing.hasFullText ? t('writingDetail.fullTextAvail') : t('writingDetail.metaOnly')}
                </dd>
              </div>
            </dl>
          </div>

          {/* Related Writings */}
          <div className="p-6 bg-[#EAE4D8]/40 border border-[#211F1C]/10 rounded-xs space-y-4">
            <h4 className={`text-base font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('writingDetail.related')}
            </h4>
            <div className="space-y-3 divide-y divide-[#211F1C]/10 text-xs">
              {fallbackRelated.map((rw) => {
                const rwTitle = isBn ? (rw.titleBn || rw.title) : rw.title;
                const rwCat = isBn ? (rw.categoryBn || rw.category) : rw.category;
                return (
                  <div key={rw.id} className="pt-3 first:pt-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#A84E36] block font-sans">
                      {rwCat}
                    </span>
                    <Link
                      to={`/writings/${rw.slug}`}
                      className={`text-base font-medium text-[#211F1C] hover:text-[#A84E36] transition-colors leading-snug block mt-0.5 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}
                    >
                      {rwTitle}
                    </Link>
                    <p className="text-[#8A8375] mt-1 line-clamp-2">{rw.excerpt}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
};
