import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { CategoryLabel } from '../components/ui/CategoryLabel';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/StateFeedback';
import { BOOKS_DATA } from '../data/archiveData';
import { ArrowLeft, Quote, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isBn, t, formatNumber } = useLanguage();
  const { getPublishedBookCover } = useAdmin();
  const book = BOOKS_DATA.find((b) => b.slug === slug);

  if (!book) {
    return (
      <Layout>
        <EmptyState
          title={t('bookDetail.notFound')}
          message={isBn ? `"${slug}" শিরোনামের কোনো গ্রন্থ আর্কাইভে পাওয়া যায়নি।` : `The publication record "${slug}" could not be located in the catalog index.`}
          onReset={() => {}}
          resetLabel={t('bookDetail.back')}
        />
        <div className="text-center mt-6">
          <Button to="/books" variant="primary">
            {t('bookDetail.back')}
          </Button>
        </div>
      </Layout>
    );
  }

  const publishedCover = getPublishedBookCover(book.slug);

  const relatedBooks = BOOKS_DATA.filter((b) => b.id !== book.id && b.category === book.category).slice(0, 3);
  const fallbackRelated = relatedBooks.length > 0
    ? relatedBooks
    : BOOKS_DATA.filter((b) => b.id !== book.id).slice(0, 3);

  return (
    <Layout>
      <PageHeader
        kicker={`${t('bookDetail.kicker')} · ${isBn ? (book.categoryBn || book.category) : book.category.toUpperCase()}`}
        title={book.title}
        titleBn={book.titleBn}
        description={isBn ? (book.subtitleBn || book.subtitle) : book.subtitle}
        breadcrumbs={[
          { label: t('nav.books'), path: '/books' },
          { label: isBn ? book.titleBn : book.title },
        ]}
        actions={
          <Button to="/books" variant="outline" size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
            {t('bookDetail.back')}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Book Jacket & Specifications (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {publishedCover ? (
            /* Published Book Cover Image (Managed & Published Exclusively via Admin) */
            <div className="relative aspect-[3/4] max-w-sm mx-auto w-full rounded-xs shadow-xl overflow-hidden border border-[#211F1C]/20 bg-[#EAE4D8]/50 group">
              <img
                src={publishedCover}
                alt={isBn ? book.titleBn : book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-2 sm:inset-3 border border-white/30 rounded-3xs pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs">
                <p className="font-semibold">{isBn ? book.titleBn : book.title}</p>
                <p className="text-[10px] text-white/80">{formatNumber(book.year)} · {book.publisher || 'Rangpur'}</p>
              </div>
            </div>
          ) : (
            /* Clothbound Archival Jacket Presentation Fallback */
            <div
              className="relative aspect-[3/4] max-w-sm mx-auto w-full rounded-xs shadow-xl p-6 flex flex-col justify-between overflow-hidden"
              style={{ backgroundColor: book.jacketColor }}
            >
              {/* Cloth weave texture & spine relief */}
              <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30 border-r border-white/10 pointer-events-none" />
              <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/20 pointer-events-none" />

              {/* Embossed inner foil frame */}
              <div className="absolute inset-4 border border-white/25 rounded-2xs pointer-events-none flex flex-col justify-between p-6 text-center">
                <div className="text-xs uppercase tracking-widest text-white/80 font-sans">
                  {isBn ? (book.categoryBn || book.category) : book.category} · {formatNumber(book.year)}
                </div>

                <div className="my-auto py-2">
                  <h2 className="font-bengali-heading text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-sm">
                    {book.titleBn}
                  </h2>
                  <p className="font-serif italic text-sm sm:text-base text-white/90 mt-3 font-normal">
                    {book.title}
                  </p>
                  <div className="w-12 h-[1px] bg-white/40 mx-auto my-4" />
                  <p className="text-xs tracking-widest uppercase text-white/90 font-sans">
                    ডা. মোঃ মফিজুল ইসলাম মান্টু
                  </p>
                </div>

                <div className="text-[10px] text-white/70 font-sans">
                  {isBn ? (book.publisherBn || book.publisher || 'রংপুর সাহিত্য প্রকাশন') : (book.publisher || book.publisherBn || 'Rangpur Literary Publication')}
                </div>
              </div>
            </div>
          )}

          {/* Bibliographical Specifications Card */}
          <div className="p-6 border border-[#211F1C]/15 bg-white/60 rounded-xs space-y-3 text-xs font-sans">
            <h3 className={`text-lg font-semibold text-[#211F1C] border-b border-[#211F1C]/10 pb-2 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('bookDetail.dossier')}
            </h3>
            <dl className="grid grid-cols-2 gap-3">
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('bookDetail.year')}</dt>
                <dd className="text-[#211F1C] font-medium mt-0.5 tabular-nums">{formatNumber(book.year)}</dd>
              </div>
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('bookDetail.classification')}</dt>
                <dd className="text-[#211F1C] font-medium mt-0.5">{isBn ? (book.categoryBn || book.category) : book.category}</dd>
              </div>
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('bookDetail.publisher')}</dt>
                <dd className="text-[#211F1C] font-medium mt-0.5">
                  {isBn ? (book.publisherBn || book.publisher || 'স্মৃতি প্রকাশনা') : (book.publisher || book.publisherBn || 'Estate Records')}
                </dd>
              </div>
              <div>
                <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('bookDetail.status')}</dt>
                <dd className="text-[#211F1C] font-medium mt-0.5">{book.edition || (isBn ? 'প্রথম সংস্করণ' : 'First Printed Edition')}</dd>
              </div>
              {book.pages && (
                <div>
                  <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('bookDetail.extent')}</dt>
                  <dd className="text-[#211F1C] font-medium mt-0.5 tabular-nums">{formatNumber(book.pages)} {isBn ? 'পৃষ্ঠা' : 'Pages'}</dd>
                </div>
              )}
              {book.isbn && (
                <div>
                  <dt className="text-[#8A8375] uppercase tracking-wider font-semibold">{t('bookDetail.isbn')}</dt>
                  <dd className="text-[#211F1C] font-mono text-[11px] mt-0.5">{book.isbn}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Right Column: Descriptions, Contents & Archival Status (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Overview & Description */}
          <section className="space-y-4">
            <CategoryLabel category={book.category} categoryBn={book.categoryBn} year={book.year} accent />
            <h2 className={`text-2xl sm:text-3xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('bookDetail.about')}
            </h2>
            <p className="text-base text-[#625D52] leading-relaxed font-sans">
              {isBn ? (book.summaryBn || book.description) : book.description}
            </p>
            {isBn ? (
              book.description && book.description !== book.summaryBn && (
                <div className="p-4 bg-[#EAE4D8]/40 border-l-2 border-[#A84E36] rounded-xs font-serif text-sm text-[#211F1C] leading-relaxed">
                  {book.description}
                </div>
              )
            ) : (
              book.summaryBn && (
                <div className="p-4 bg-[#EAE4D8]/50 border-l-2 border-[#A84E36] rounded-xs font-bengali-text text-sm sm:text-base text-[#211F1C] leading-relaxed">
                  {book.summaryBn}
                </div>
              )
            )}
          </section>

          {/* Archival Excerpt (If Available) */}
          {book.excerpt && (
            <section className="p-6 sm:p-8 bg-white/70 border border-[#211F1C]/15 rounded-xs space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A84E36] font-semibold">
                <Quote className="w-4 h-4 text-[#A84E36]" />
                <span>{t('bookDetail.excerpt')}</span>
              </div>
              <blockquote className="font-bengali-text text-lg text-[#211F1C] leading-loose whitespace-pre-line italic">
                {book.excerpt}
              </blockquote>
              <div className="text-[11px] text-[#8A8375] font-sans pt-2 border-t border-[#211F1C]/10">
                {t('bookDetail.excerptNote')}
              </div>
            </section>
          )}

          {/* Table of Contents / Structural Chapters */}
          {book.tableOfContents && book.tableOfContents.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-[#211F1C]/10">
              <h3 className={`text-xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                {t('bookDetail.toc')}
              </h3>
              <ol className="divide-y divide-[#211F1C]/10 border-y border-[#211F1C]/10 text-sm font-sans">
                {book.tableOfContents.map((chapter, i) => (
                  <li key={i} className="py-2.5 flex items-baseline justify-between text-[#625D52]">
                    <span className="font-bengali-text text-base text-[#211F1C]">{chapter}</span>
                    <span className="text-xs text-[#8A8375] tabular-nums font-mono">
                      {isBn ? `অধ্যায় ${formatNumber(i + 1)}` : `Ch. 0${i + 1}`}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Honest Notice on Full Text Digitization */}
          <div className="p-4 bg-[#EAE4D8]/40 border border-[#211F1C]/12 rounded-xs flex items-start gap-3 text-xs text-[#625D52] font-sans">
            <Info className="w-4 h-4 text-[#A84E36] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#211F1C]">{t('bookDetail.archivalNoticeTitle')}</strong>{' '}
              {t('bookDetail.archivalNotice')}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button to="/contact" variant="primary" size="sm">
              {t('bookDetail.requestAccess')}
            </Button>
            <Button to="/books" variant="secondary" size="sm">
              {t('bookDetail.browseMore')}
            </Button>
          </div>
        </div>
      </div>

      {/* Related Publications Section */}
      <section className="pt-12 border-t border-[#211F1C]/15">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A84E36] font-semibold block mb-1 font-sans">
              {isBn ? 'সম্পর্কিত প্রকাশনা' : 'Complementary Folios'}
            </span>
            <h3 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('bookDetail.related')}
            </h3>
          </div>
          <Link to="/books" className="text-xs font-semibold uppercase tracking-wider text-[#A84E36] hover:underline">
            {t('bookDetail.viewAll')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {fallbackRelated.map((rel) => (
            <Link
              key={rel.id}
              to={`/books/${rel.slug}`}
              className="p-5 bg-white/70 border border-[#211F1C]/15 rounded-xs hover:border-[#211F1C]/30 hover:bg-white transition-all group flex flex-col justify-between"
            >
              <div>
                <CategoryLabel category={rel.category} categoryBn={rel.categoryBn} year={rel.year} className="mb-2" />
                <h4 className={`text-lg font-semibold text-[#211F1C] group-hover:text-[#A84E36] transition-colors leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {isBn ? rel.titleBn : rel.title}
                </h4>
                <p className={`text-sm text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                  {isBn ? rel.title : rel.titleBn}
                </p>
                <p className="text-xs text-[#625D52] mt-2 line-clamp-2 leading-relaxed font-sans">
                  {isBn ? (rel.summaryBn || rel.summary) : rel.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#211F1C]/10 text-xs text-[#A84E36] font-medium font-sans">
                {isBn ? 'গ্রন্থ বিবরণী দেখুন →' : 'Inspect Publication →'}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};
