import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import {
  BookOpen,
  FileText,
  Image as ImageIcon,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileEdit,
  TrendingUp,
  FolderOpen,
  Settings,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export const AdminOverviewPage: React.FC = () => {
  const { books, contentItems, mediaItems, activityLogs } = useAdmin();
  const { isBn, t, formatNumber } = useLanguage();

  // Metrics dynamically calculated from context state
  const publishedBooksCount = books.filter((b) => b.status === 'published').length;
  const publishedArticlesCount = contentItems.filter(
    (c) => c.status === 'published' && c.type !== 'Page'
  ).length;
  const draftItemsCount =
    books.filter((b) => b.status === 'draft').length +
    contentItems.filter((c) => c.status === 'draft').length;
  const galleryImagesCount = mediaItems.length;
  const recentUpdatesCount = activityLogs.length;

  const metricCards = [
    {
      label: 'Published Books',
      labelBn: 'প্রকাশিত গ্রন্থ',
      count: publishedBooksCount,
      total: books.length,
      path: '/admin/books',
      icon: BookOpen,
      color: 'text-[#A84E36]',
      sub: isBn ? `${formatNumber(books.length - publishedBooksCount)}টি খসড়া বা বিবেচনাধীন` : `${books.length - publishedBooksCount} in draft or review`,
    },
    {
      label: 'Published Articles',
      labelBn: 'প্রকাশিত প্রবন্ধ',
      count: publishedArticlesCount,
      total: contentItems.filter((c) => c.type !== 'Page').length,
      path: '/admin/content',
      icon: FileText,
      color: 'text-[#2A4736]',
      sub: isBn ? `${formatNumber(contentItems.filter((c) => c.type === 'Page').length)}টি প্রাতিষ্ঠানিক পাতা` : `${contentItems.filter((c) => c.type === 'Page').length} core institutional pages`,
    },
    {
      label: 'Draft Items',
      labelBn: 'খসড়া আইটেম',
      count: draftItemsCount,
      total: books.length + contentItems.length,
      path: '/admin/content',
      icon: FileEdit,
      color: 'text-[#B38F44]',
      sub: isBn ? 'অনুমোদনের অপেক্ষায়' : 'Awaiting publication approval',
    },
    {
      label: 'Archival Media Accessions',
      labelBn: 'সংরক্ষিত মিডিয়া স্মারক',
      count: galleryImagesCount,
      total: galleryImagesCount,
      path: '/admin/media',
      icon: ImageIcon,
      color: 'text-[#2E4A62]',
      sub: isBn ? 'মূল স্মারক ও নথিপত্র' : 'Cataloged physical & folio items',
    },
  ];

  return (
    <AdminLayout
      title={isBn ? t('admin.title') : 'Archive Stewardship Overview'}
      subtitle={isBn ? t('admin.subtitle') : 'Administrative console for publications, articles, and archival assets.'}
      breadcrumbs={[{ label: isBn ? t('admin.dashboard') : 'Dashboard' }]}
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/admin/content"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#211F1C] text-white text-xs font-medium rounded-xs hover:bg-[#38342F] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন প্রবন্ধ' : 'New Article'}</span>
          </Link>
          <Link
            to="/admin/books"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EAE4D8] border border-[#211F1C]/15 text-[#211F1C] text-xs font-medium rounded-xs hover:bg-[#DDD6C8] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন গ্রন্থ' : 'Add Book'}</span>
          </Link>
        </div>
      }
    >
      {/* 1. Summary Metrics Cards (Zero-pill, tabular, dynamic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Link
              key={i}
              to={card.path}
              className="p-5 bg-white/80 border border-[#211F1C]/15 rounded-xs hover:border-[#211F1C]/40 hover:bg-white transition-all shadow-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[#8A8375] mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold font-sans">
                    {isBn ? card.labelBn : card.label}
                  </span>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div className="font-serif text-3xl font-bold text-[#211F1C] tabular-nums group-hover:text-[#A84E36] transition-colors">
                  {formatNumber(card.count)}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#211F1C]/10 text-[11px] text-[#8A8375] flex items-center justify-between font-sans">
                <span>{card.sub}</span>
                <span className="text-[#A84E36] font-medium group-hover:translate-x-0.5 transition-transform">
                  {isBn ? 'ব্যবস্থাপনা →' : 'Manage →'}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2. Quick Actions & Shortcuts Banner */}
      <div className="p-5 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#A84E36]">
            {isBn ? 'প্রশাসনিক দ্রুত পদক্ষেপ' : 'Administrative Quick Actions'}
          </h2>
          <span className="text-xs text-[#8A8375] font-sans">
            {isBn ? 'সিস্টেম সক্রিয়' : 'System Active'}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <Link
            to="/admin/content"
            className="flex items-center gap-2.5 p-3 rounded-xs border border-[#211F1C]/10 hover:border-[#A84E36] bg-[#F7F4ED]/80 hover:bg-white transition-all text-xs text-[#211F1C] font-medium"
          >
            <FileText className="w-4 h-4 text-[#A84E36]" />
            <span>{isBn ? 'নতুন প্রবন্ধ খসড়া' : 'Draft New Article'}</span>
          </Link>
          <Link
            to="/admin/books"
            className="flex items-center gap-2.5 p-3 rounded-xs border border-[#211F1C]/10 hover:border-[#A84E36] bg-[#F7F4ED]/80 hover:bg-white transition-all text-xs text-[#211F1C] font-medium"
          >
            <BookOpen className="w-4 h-4 text-[#A84E36]" />
            <span>{isBn ? 'গ্রন্থ নিবন্ধন' : 'Register Volume'}</span>
          </Link>
          <Link
            to="/admin/media"
            className="flex items-center gap-2.5 p-3 rounded-xs border border-[#211F1C]/10 hover:border-[#A84E36] bg-[#F7F4ED]/80 hover:bg-white transition-all text-xs text-[#211F1C] font-medium"
          >
            <ImageIcon className="w-4 h-4 text-[#A84E36]" />
            <span>{isBn ? 'মিডিয়া স্মারক আপলোড' : 'Upload Archival Media'}</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-2.5 p-3 rounded-xs border border-[#211F1C]/10 hover:border-[#A84E36] bg-[#F7F4ED]/80 hover:bg-white transition-all text-xs text-[#211F1C] font-medium"
          >
            <Settings className="w-4 h-4 text-[#A84E36]" />
            <span>{isBn ? 'সাইট কনফিগারেশন' : 'Configure Identity'}</span>
          </Link>
        </div>
      </div>

      {/* 3. Main Split: Recent Catalog Items & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Content Snapshot (7 cols) */}
        <div className="lg:col-span-7 bg-white/80 border border-[#211F1C]/15 rounded-xs overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-[#211F1C]/10 flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                {isBn ? 'সাম্প্রতিক প্রকাশনা ও গ্রন্থতালিকা' : 'Recent Publications & Books'}
              </h2>
              <p className="text-xs text-[#8A8375] font-sans">
                {isBn
                  ? `ক্যাটালগে মোট ${formatNumber(books.length)}টি গ্রন্থ সংরক্ষিত।`
                  : `${books.length} volumes indexed in the active catalog.`}
              </p>
            </div>
            <Link
              to="/admin/books"
              className="text-xs text-[#A84E36] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>{isBn ? 'সব দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#EAE4D8]/40 border-b border-[#211F1C]/10 text-[#8A8375] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">{isBn ? 'শিরোনাম' : 'Title'}</th>
                  <th className="py-2.5 px-4 font-semibold">{isBn ? 'শাখা' : 'Genre'}</th>
                  <th className="py-2.5 px-4 font-semibold">{isBn ? 'বছর' : 'Year'}</th>
                  <th className="py-2.5 px-4 font-semibold">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                  <th className="py-2.5 px-4 font-semibold text-right">{isBn ? 'পদক্ষেপ' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#211F1C]/10 text-[#211F1C]">
                {books.slice(0, 6).map((book) => {
                  const bookTitle = isBn ? (book.titleBn || book.title) : book.title;
                  const bookSub = undefined;
                  const bookCat = book.category;
                  return (
                    <tr key={book.id} className="hover:bg-[#EAE4D8]/20 transition-colors">
                      <td className="py-3 px-4">
                        <strong className="font-medium block truncate max-w-[200px]">
                          {bookTitle}
                        </strong>
                        {bookSub && (
                          <span className="text-[#625D52] block text-[11px] truncate max-w-[200px]">
                            {bookSub}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#625D52]">{bookCat}</td>
                      <td className="py-3 px-4 tabular-nums">{formatNumber(book.year)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                            book.status === 'published'
                              ? 'text-[#2A4736]'
                              : book.status === 'draft'
                              ? 'text-[#B38F44]'
                              : 'text-[#8A8375]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              book.status === 'published'
                                ? 'bg-[#2A4736]'
                                : book.status === 'draft'
                                ? 'bg-[#B38F44]'
                                : 'bg-[#8A8375]'
                            }`}
                          />
                          <span className="capitalize">
                            {isBn
                              ? book.status === 'published'
                                ? 'প্রকাশিত'
                                : book.status === 'draft'
                                ? 'খসড়া'
                                : 'সংরক্ষিত'
                              : book.status}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/books/${book.slug}`}
                          className="text-[#A84E36] hover:underline font-medium inline-flex items-center gap-1"
                          title="View Public Page"
                        >
                          <span>{isBn ? 'দেখুন' : 'View'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Activity Feed & System Disclosures (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Activity Log */}
          <div className="bg-white/80 border border-[#211F1C]/15 rounded-xs p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#211F1C]/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A84E36]" />
                <h2 className={`text-base font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {isBn ? 'সাম্প্রতিক কর্মকাণ্ড ও হালনাগাদ' : 'Recent Activity Feed'}
                </h2>
              </div>
              <span className="text-[11px] text-[#8A8375] tabular-nums font-mono">
                {isBn ? `${formatNumber(activityLogs.length)}টি হালনাগাদ নথিভুক্ত` : `${activityLogs.length} updates recorded`}
              </span>
            </div>

            <div className="space-y-3">
              {activityLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-2xs bg-[#F7F4ED]/70 border border-[#211F1C]/10 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-2xs ${
                          log.action === 'Created'
                            ? 'bg-[#2A4736]/15 text-[#2A4736]'
                            : log.action === 'Updated'
                            ? 'bg-[#2E4A62]/15 text-[#2E4A62]'
                            : log.action === 'Archived'
                            ? 'bg-[#B38F44]/15 text-[#B38F44]'
                            : 'bg-[#933420]/15 text-[#933420]'
                        }`}
                      >
                        {isBn
                          ? log.action === 'Created'
                            ? 'তৈরি'
                            : log.action === 'Updated'
                            ? 'হালনাগাদ'
                            : log.action === 'Archived'
                            ? 'সংরক্ষিত'
                            : log.action
                          : log.action}
                      </span>
                      <span className="text-[#8A8375] text-[11px]">{log.itemType}</span>
                    </div>
                    <div className="font-medium text-[#211F1C] truncate">{log.itemTitle}</div>
                    <div className="text-[10px] text-[#8A8375]">{isBn ? 'ব্যবহারকারী:' : 'By'} {log.user}</div>
                  </div>
                  <div className="text-[10px] text-[#8A8375] shrink-0 tabular-nums">
                    {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archival Standards */}
          <div className="p-4 bg-[#EAE4D8]/50 border border-[#211F1C]/15 rounded-xs space-y-2 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#A84E36] font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{isBn ? 'সংরক্ষণাগার মানদণ্ড' : 'Archive Preservation Standards'}</span>
            </div>
            <p className="text-[#625D52] leading-relaxed">
              {isBn
                ? 'জীবনীভিত্তিক বিবরণ, চিকিৎসা সেবার ইতিবৃত্ত ও প্রকাশনা তালিকা ডা. মান্টুর ব্যক্তিগত পাঠাগার ও পারিবারিক স্মারক সংগ্রহ অনুসারে সংকলিত।'
                : 'Biographical milestones, medical history, and publications are cataloged from Dr. Mantu’s personal library and family archive records.'}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
