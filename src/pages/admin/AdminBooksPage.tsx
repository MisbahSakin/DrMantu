import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { AdminBook, BookCategory, PublicationStatus } from '../../types';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/StateFeedback';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  Star,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminBooksPage: React.FC = () => {
  const { books, addBook, updateBook, deleteBook } = useAdmin();
  const { isBn, t, formatNumber } = useLanguage();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<AdminBook | null>(null);
  const [bookToDelete, setBookToDelete] = useState<AdminBook | null>(null);

  // Form State
  const initialFormData = {
    title: '',
    titleBn: '',
    slug: '',
    year: new Date().getFullYear(),
    category: 'Poetry' as BookCategory,
    authorOrEditor: 'Dr. Md. Mofizul Islam Mantu',
    publisher: 'Radhaballabh Memorial Press, Rangpur',
    pages: 128,
    isbn: '',
    summary: '',
    description: '',
    jacketColor: '#3A4D39',
    foilColor: '#D4AF37',
    status: 'published' as PublicationStatus,
    featured: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Preset jacket colors
  const jacketColors = [
    { name: 'Forest Green', hex: '#3A4D39' },
    { name: 'Terracotta Red', hex: '#A84E36' },
    { name: 'Imperial Indigo', hex: '#1C2D42' },
    { name: 'Deep Burgundy', hex: '#581825' },
    { name: 'Warm Ochre', hex: '#8C5E2D' },
    { name: 'Midnight Charcoal', hex: '#2B2B28' },
  ];

  const categories: BookCategory[] = [
    'Poetry',
    "Children's Literature",
    'Research Books',
    'Edited and Memorial Books',
    'Other Publications',
  ];

  // Open Create
  const handleOpenCreate = () => {
    setEditingBook(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (book: AdminBook) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      titleBn: book.titleBn,
      slug: book.slug,
      year: book.year,
      category: book.category,
      authorOrEditor: book.authorOrEditor || 'Dr. Md. Mofizul Islam Mantu',
      publisher: book.publisher || '',
      pages: book.pages || 120,
      isbn: book.isbn || '',
      summary: book.summary,
      description: book.description,
      jacketColor: book.jacketColor,
      foilColor: book.foilColor,
      status: book.status,
      featured: book.featured,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'English title is required';
    if (!formData.titleBn.trim()) errors.titleBn = 'Bengali title is required';
    if (!formData.slug.trim()) errors.slug = 'Slug is required';
    if (!formData.summary.trim()) errors.summary = 'Summary is required';
    if (!formData.year || isNaN(formData.year)) errors.year = 'Valid year is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingBook) {
      updateBook(editingBook.id, formData);
    } else {
      addBook(formData);
    }
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete.id);
      setBookToDelete(null);
    }
  };

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchesCat = categoryFilter === 'all' || b.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQ =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.titleBn.includes(q) ||
        b.summary.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        (b.publisher && b.publisher.toLowerCase().includes(q));

      return matchesCat && matchesStatus && matchesQ;
    });
  }, [books, categoryFilter, statusFilter, searchQuery]);

  return (
    <AdminLayout
      title={isBn ? 'গ্রন্থ ও প্রকাশনা ক্যাটালগ ম্যানেজার' : 'Monographs & Publications Catalog Manager'}
      subtitle={isBn ? 'গ্রন্থাবলির গ্রন্থপঞ্জি, বাঁধাই প্রচ্ছদ, আইএসবিএন এবং হোমপেজ বৈশিষ্ট্য ব্যবস্থাপনা।' : 'Maintain publication bibliographic registries, clothbound cover swatches, ISBNs, and homepage highlights.'}
      breadcrumbs={[{ label: isBn ? t('admin.books') : 'Books Catalog' }]}
      actions={
        <Button
          onClick={handleOpenCreate}
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          {isBn ? 'নতুন গ্রন্থ নিবন্ধন' : 'Register New Volume'}
        </Button>
      }
    >
      {/* Search & Category Filter Bar */}
      <div className="bg-white/80 border border-[#211F1C]/15 p-4 rounded-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375]" />
            <input
              type="text"
              placeholder={isBn ? 'ইংরেজি বা বাংলা শিরোনাম, সাল বা আইএসবিএন দিয়ে খুঁজুন...' : 'Search publications by English or Bengali title, year, or ISBN...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#211F1C]/20 rounded-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8375] hover:text-[#211F1C]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="text-[#8A8375]">{isBn ? 'শাখা:' : 'Category:'}</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#211F1C]/20 rounded-xs text-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
            >
              <option value="all">{isBn ? 'সকল শাখা' : 'All Categories'}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <span className="text-[#8A8375] ml-2">{isBn ? 'অবস্থা:' : 'Status:'}</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#211F1C]/20 rounded-xs text-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
            >
              <option value="all">{isBn ? 'সকল অবস্থা' : 'All Statuses'}</option>
              <option value="published">{isBn ? 'প্রকাশিত' : 'Published'}</option>
              <option value="draft">{isBn ? 'খসড়া' : 'Draft'}</option>
              <option value="archived">{isBn ? 'সংরক্ষিত' : 'Archived'}</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-[#8A8375] pt-2 border-t border-[#211F1C]/10 flex items-center justify-between">
          <span>
            {isBn
              ? `${formatNumber(filteredBooks.length)} / ${formatNumber(books.length)} টি গ্রন্থ প্রদর্শিত`
              : `${filteredBooks.length} of ${books.length} publications shown`}
          </span>
          {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setStatusFilter('all');
              }}
              className="text-[#A84E36] hover:underline"
            >
              {isBn ? 'ফিল্টার রিসেট করুন' : 'Reset filters'}
            </button>
          )}
        </div>
      </div>

      {/* Books Grid / Cards with Cover Previews */}
      {filteredBooks.length === 0 ? (
        <EmptyState
          title="No publications found"
          message="No published books or monographs matched the current filter criteria."
          onReset={() => {
            setSearchQuery('');
            setCategoryFilter('all');
            setStatusFilter('all');
          }}
          resetLabel="Clear filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="p-5 bg-white/80 border border-[#211F1C]/15 rounded-xs hover:border-[#211F1C]/35 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#8A8375] mb-3 font-sans">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-[#A84E36]">
                      {book.category}
                    </span>
                    {book.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#B38F44] font-medium bg-[#B38F44]/10 px-1.5 py-0.5 rounded-2xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                  <span className="tabular-nums font-mono text-[#211F1C] font-semibold">
                    {book.year}
                  </span>
                </div>

                {/* Book Presentation: Jacket Cover preview + Details */}
                <div className="flex gap-4 items-start">
                  {book.coverImage ? (
                    <div className="w-14 h-20 rounded-2xs shrink-0 shadow-xs border border-[#211F1C]/20 overflow-hidden relative bg-[#EAE4D8]">
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[7px] text-white text-center py-0.5 font-mono">
                        IMAGE
                      </span>
                    </div>
                  ) : (
                    /* Clothbound Cover Preview */
                    <div
                      className="w-14 h-20 rounded-2xs shrink-0 shadow-xs border border-white/20 p-2 flex flex-col justify-between text-center relative overflow-hidden"
                      style={{ backgroundColor: book.jacketColor }}
                    >
                      <div
                        className="text-[7px] font-serif uppercase tracking-widest truncate"
                        style={{ color: book.foilColor }}
                      >
                        MANTU
                      </div>
                      <div
                        className="font-bengali-text text-[9px] font-bold leading-tight line-clamp-2"
                        style={{ color: book.foilColor }}
                      >
                        {book.titleBn}
                      </div>
                      <div
                        className="text-[7px] font-mono tabular-nums"
                        style={{ color: book.foilColor }}
                      >
                        {book.year}
                      </div>
                    </div>
                  )}

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base font-semibold text-[#211F1C] leading-snug">
                      {book.title}
                    </h3>
                    <p className="font-bengali-text text-xs text-[#625D52] mt-0.5">
                      {book.titleBn}
                    </p>
                    <div className="text-[11px] text-[#8A8375] mt-1 space-y-0.5 font-sans">
                      <div>Author/Editor: {book.authorOrEditor}</div>
                      <div>
                        {book.publisher} · {book.pages} pp.
                      </div>
                      <div className="font-mono text-[10px] text-[#8A8375]">
                        {book.isbn ? `ISBN ${book.isbn}` : 'No ISBN assigned'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description summary */}
                <p className="text-xs text-[#625D52] mt-3 line-clamp-2 leading-relaxed font-sans">
                  {book.summary}
                </p>
              </div>

              {/* Card Footer: Status & Actions */}
              <div className="mt-4 pt-3 border-t border-[#211F1C]/10 flex items-center justify-between text-xs font-sans">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
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
                  <span className="capitalize">{book.status}</span>
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/books/${book.slug}`}
                    className="p-1.5 text-[#625D52] hover:text-[#211F1C] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                    title="View Public Page"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleOpenEdit(book)}
                    className="p-1.5 text-[#625D52] hover:text-[#A84E36] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                    title="Edit Publication"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setBookToDelete(book)}
                    className="p-1.5 text-[#625D52] hover:text-[#933420] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                    title="Delete Publication"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================
          ADD / EDIT BOOK MODAL
         =================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs overflow-y-auto">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/20 rounded-xs max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#211F1C]/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#A84E36]" />
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  {editingBook ? 'Edit Publication Record' : 'Register New Publication Volume'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#625D52] hover:text-[#211F1C] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Bengali Title (বাংলা নাম)"
                  value={formData.titleBn}
                  error={formErrors.titleBn}
                  onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                  placeholder="e.g. অরণ্যে টিয়ে পাখি গান"
                  required
                />

                <Input
                  label="English Title"
                  value={formData.title}
                  error={formErrors.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)+/g, '');
                    setFormData({
                      ...formData,
                      title,
                      slug: editingBook ? formData.slug : slug,
                    });
                  }}
                  placeholder="e.g. Oronne Tiye Pakhi Gaan"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="URL Slug"
                  value={formData.slug}
                  error={formErrors.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />

                <Input
                  label="Publication Year"
                  type="number"
                  value={formData.year}
                  error={formErrors.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })
                  }
                  required
                />

                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as BookCategory })
                  }
                  options={categories.map((c) => ({ value: c, label: c }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Author or Editor"
                  value={formData.authorOrEditor}
                  onChange={(e) => setFormData({ ...formData, authorOrEditor: e.target.value })}
                />

                <Input
                  label="Publisher / Press"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Page Count"
                  type="number"
                  value={formData.pages || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, pages: parseInt(e.target.value) || 0 })
                  }
                />

                <Input
                  label="ISBN Designation"
                  value={formData.isbn || ''}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  placeholder="978-984-..."
                />

                <Select
                  label="Publication Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as PublicationStatus,
                    })
                  }
                  options={[
                    { value: 'published', label: 'Published' },
                    { value: 'draft', label: 'Draft' },
                    { value: 'archived', label: 'Archived' },
                  ]}
                />
              </div>

              {/* Cover Jacket Swatch Picker Placeholder */}
              <div className="p-3 bg-[#EAE4D8]/50 border border-[#211F1C]/10 rounded-xs space-y-2">
                <div className="font-semibold text-[#211F1C]">
                  Clothbound Jacket Color Swatch
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {jacketColors.map((color) => (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => setFormData({ ...formData, jacketColor: color.hex })}
                        className={`w-7 h-7 rounded-2xs border-2 transition-transform ${
                          formData.jacketColor === color.hex
                            ? 'border-[#211F1C] scale-110 shadow-xs'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 ml-auto text-[11px] text-[#625D52]">
                    <span>Current:</span>
                    <span
                      className="w-5 h-5 rounded-2xs border border-[#211F1C]/20"
                      style={{ backgroundColor: formData.jacketColor }}
                    />
                  </div>
                </div>
              </div>

              <Textarea
                label="Brief Catalog Description"
                value={formData.summary}
                error={formErrors.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={2}
                helperText="Short one or two-line summary shown on cards."
                required
              />

              <Textarea
                label="Full Archival Monograph Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                helperText="Long-form bibliographic dossier displayed on the individual book page."
              />

              {/* Featured checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded-xs border-[#211F1C]/30 text-[#A84E36] focus:ring-[#A84E36]"
                />
                <span className="text-xs text-[#211F1C] font-medium">
                  Feature this publication prominently on the homepage
                </span>
              </label>

              <div className="pt-4 border-t border-[#211F1C]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#8A8375]">
                  Updates persist in current browser session state.
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    {editingBook ? 'Save Publication' : 'Add to Catalog'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {bookToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/20 rounded-xs max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#933420] font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Delete Publication Volume</span>
            </div>
            <p className="text-xs text-[#625D52] leading-relaxed">
              Are you sure you want to remove <strong className="text-[#211F1C]">"{bookToDelete.title}"</strong> from the session catalog? This action will remove its detail route in the current session.
            </p>
            <div className="pt-3 border-t border-[#211F1C]/10 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBookToDelete(null)}
              >
                Cancel
              </Button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 bg-[#933420] text-white text-xs font-medium rounded-xs hover:bg-[#782918] transition-colors"
              >
                Delete Volume
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
