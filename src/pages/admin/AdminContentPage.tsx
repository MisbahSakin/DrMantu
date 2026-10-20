import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { AdminContentItem, PublicationStatus } from '../../types';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/StateFeedback';
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Edit3,
  Archive,
  RefreshCw,
  Trash2,
  Eye,
  CheckCircle2,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminContentPage: React.FC = () => {
  const {
    contentItems,
    addContent,
    updateContent,
    archiveContent,
    restoreContent,
    deleteContent,
  } = useAdmin();
  const { isBn, t, formatNumber } = useLanguage();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'title' | 'updatedAt' | 'views'>('updatedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminContentItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<AdminContentItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    slug: '',
    type: 'Article' as AdminContentItem['type'],
    category: 'Literature',
    status: 'published' as PublicationStatus,
    author: 'Dr. Md. Mofizul Islam Mantu',
    excerpt: '',
    body: '',
    tags: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset & prepare form for create
  const handleOpenCreateModal = () => {
    setFormData({
      title: '',
      titleBn: '',
      slug: '',
      type: 'Article',
      category: 'Literature',
      status: 'published',
      author: 'Dr. Md. Mofizul Islam Mantu',
      excerpt: '',
      body: '',
      tags: '',
    });
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  // Prepare form for edit
  const handleOpenEditModal = (item: AdminContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      titleBn: item.titleBn || '',
      slug: item.slug,
      type: item.type,
      category: item.category,
      status: item.status,
      author: item.author,
      excerpt: item.excerpt,
      body: item.body || '',
      tags: (item.tags || []).join(', '),
    });
    setFormErrors({});
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'English title is required';
    if (!formData.slug.trim()) errors.slug = 'URL slug is required';
    if (!formData.excerpt.trim()) errors.excerpt = 'A summary excerpt is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingItem) {
      updateContent(editingItem.id, {
        title: formData.title,
        titleBn: formData.titleBn || undefined,
        slug: formData.slug,
        type: formData.type,
        category: formData.category,
        status: formData.status,
        author: formData.author,
        excerpt: formData.excerpt,
        body: formData.body || undefined,
        tags: tagsArray,
      });
      setEditingItem(null);
    } else {
      addContent({
        title: formData.title,
        titleBn: formData.titleBn || undefined,
        slug: formData.slug,
        type: formData.type,
        category: formData.category,
        status: formData.status,
        author: formData.author,
        excerpt: formData.excerpt,
        body: formData.body || undefined,
        tags: tagsArray,
        views: 0,
      });
      setIsCreateModalOpen(false);
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = () => {
    if (itemToDelete) {
      deleteContent(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  // Filter & Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    return contentItems
      .filter((item) => {
        const matchesType = typeFilter === 'all' || item.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          item.title.toLowerCase().includes(q) ||
          (item.titleBn && item.titleBn.includes(q)) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q);

        return matchesType && matchesStatus && matchesQuery;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'title') {
          comp = a.title.localeCompare(b.title);
        } else if (sortField === 'updatedAt') {
          comp = a.updatedAt.localeCompare(b.updatedAt);
        } else if (sortField === 'views') {
          comp = (a.views || 0) - (b.views || 0);
        }
        return sortDirection === 'desc' ? -comp : comp;
      });
  }, [contentItems, typeFilter, statusFilter, searchQuery, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(start, start + itemsPerPage);
  }, [filteredAndSortedItems, currentPage]);

  const toggleSort = (field: 'title' | 'updatedAt' | 'views') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <AdminLayout
      title={isBn ? 'প্রবন্ধ ও সম্পাদনা কনটেন্ট ম্যানেজার' : 'Writings & Editorial Content Manager'}
      subtitle={isBn ? 'প্রবন্ধ, গবেষণা ও ওয়েব পাতা খসড়া, সম্পাদনা ও সংরক্ষণ।' : 'Draft, organize, edit, and archive essays, research articles, and static institutional pages.'}
      breadcrumbs={[{ label: isBn ? t('admin.content') : 'Content Manager' }]}
      actions={
        <Button
          onClick={handleOpenCreateModal}
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          {isBn ? 'নতুন কনটেন্ট তৈরি' : 'Create New Content'}
        </Button>
      }
    >
      {/* 1. Search and Filter Bar */}
      <div className="bg-white/80 border border-[#211F1C]/15 p-4 rounded-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375]" />
            <input
              type="text"
              placeholder={isBn ? 'শিরোনাম, বাংলা নাম, স্ল্যাগ বা বিষয় দিয়ে খুঁজুন...' : 'Search content by title, Bengali title, slug, or topic...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
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

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1 text-[#8A8375]">
              <Filter className="w-3.5 h-3.5" />
              <span>{isBn ? 'ধরন:' : 'Type:'}</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 bg-white border border-[#211F1C]/20 rounded-xs text-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
            >
              <option value="all">{isBn ? 'সকল ধরন' : 'All Content Types'}</option>
              <option value="Article">{isBn ? 'প্রবন্ধ' : 'Article'}</option>
              <option value="Essay">{isBn ? 'রচনা' : 'Essay'}</option>
              <option value="Monograph">{isBn ? 'গবেষণাপত্র' : 'Monograph'}</option>
              <option value="Page">{isBn ? 'প্রাতিষ্ঠানিক পাতা' : 'Core Page'}</option>
            </select>

            <div className="flex items-center gap-1 text-[#8A8375] ml-2">
              <span>{isBn ? 'অবস্থা:' : 'Status:'}</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 bg-white border border-[#211F1C]/20 rounded-xs text-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
            >
              <option value="all">{isBn ? 'সকল অবস্থা' : 'All Statuses'}</option>
              <option value="published">{isBn ? 'প্রকাশিত' : 'Published'}</option>
              <option value="draft">{isBn ? 'খসড়া' : 'Draft'}</option>
              <option value="archived">{isBn ? 'সংরক্ষিত' : 'Archived'}</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-[11px] text-[#8A8375] pt-2 border-t border-[#211F1C]/10 font-sans">
          <span>
            {isBn
              ? `${formatNumber(filteredAndSortedItems.length)} / ${formatNumber(contentItems.length)} টি এন্ট্রি প্রদর্শিত`
              : `Showing ${filteredAndSortedItems.length} of ${contentItems.length} total entries`}
          </span>
          {(searchQuery || typeFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="text-[#A84E36] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* 2. Content Table */}
      {filteredAndSortedItems.length === 0 ? (
        <EmptyState
          title="No content records matched"
          message="Try adjusting your search criteria or clear status filters to view catalog entries."
          onReset={() => {
            setSearchQuery('');
            setTypeFilter('all');
            setStatusFilter('all');
          }}
          resetLabel="Clear all filters"
        />
      ) : (
        <div className="bg-white/80 border border-[#211F1C]/15 rounded-xs overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#EAE4D8]/50 border-b border-[#211F1C]/10 text-[#8A8375] uppercase tracking-wider select-none">
                <tr>
                  <th
                    onClick={() => toggleSort('title')}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-[#211F1C] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Title / Headline</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th
                    onClick={() => toggleSort('updatedAt')}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-[#211F1C] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Last Updated</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    onClick={() => toggleSort('views')}
                    className="py-3 px-4 font-semibold cursor-pointer hover:text-[#211F1C] transition-colors tabular-nums"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Views</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#211F1C]/10 text-[#211F1C]">
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#EAE4D8]/20 transition-colors">
                    {/* Title */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-[#211F1C] leading-snug">
                        {item.title}
                      </div>
                      {item.titleBn && (
                        <div className="font-bengali-text text-[11px] text-[#625D52]">
                          {item.titleBn}
                        </div>
                      )}
                      <div className="text-[10px] text-[#8A8375] font-mono mt-0.5">
                        /{item.slug}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8A8375]">
                        {item.type}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-[#625D52]">{item.category}</td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          item.status === 'published'
                            ? 'text-[#2A4736]'
                            : item.status === 'draft'
                            ? 'text-[#B38F44]'
                            : 'text-[#8A8375]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'published'
                              ? 'bg-[#2A4736]'
                              : item.status === 'draft'
                              ? 'bg-[#B38F44]'
                              : 'bg-[#8A8375]'
                          }`}
                        />
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </td>

                    {/* Updated At */}
                    <td className="py-3.5 px-4 tabular-nums text-[#625D52]">
                      {item.updatedAt}
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 tabular-nums font-mono text-[#8A8375]">
                      {item.views || 0}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* View in Public Site */}
                        <Link
                          to={item.type === 'Page' ? `/${item.slug}` : `/writings/${item.slug}`}
                          className="p-1.5 text-[#625D52] hover:text-[#211F1C] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                          title="View Public Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {/* Edit Item */}
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-[#625D52] hover:text-[#A84E36] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                          title="Edit Content"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Archive or Restore */}
                        {item.status === 'archived' ? (
                          <button
                            onClick={() => restoreContent(item.id)}
                            className="p-1.5 text-[#2A4736] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                            title="Restore to Active"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => archiveContent(item.id)}
                            className="p-1.5 text-[#625D52] hover:text-[#B38F44] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                            title="Archive Item"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Item */}
                        <button
                          onClick={() => setItemToDelete(item)}
                          className="p-1.5 text-[#625D52] hover:text-[#933420] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[#211F1C]/10 bg-[#EAE4D8]/30 flex items-center justify-between text-xs text-[#625D52]">
              <div>
                Page <span className="font-semibold text-[#211F1C]">{currentPage}</span> of{' '}
                <span className="font-semibold text-[#211F1C]">{totalPages}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded-xs border border-[#211F1C]/15 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EAE4D8] transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-7 h-7 rounded-xs text-xs font-medium transition-colors ${
                      currentPage === idx + 1
                        ? 'bg-[#211F1C] text-white'
                        : 'bg-white border border-[#211F1C]/15 text-[#211F1C] hover:bg-[#EAE4D8]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 rounded-xs border border-[#211F1C]/15 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EAE4D8] transition-colors flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================
          CREATE / EDIT CONTENT MODAL
         =================================================================== */}
      {(isCreateModalOpen || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs overflow-y-auto">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/20 rounded-xs max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#211F1C]/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#A84E36]" />
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  {editingItem ? 'Edit Content Record' : 'Create New Editorial Content'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingItem(null);
                }}
                className="text-[#625D52] hover:text-[#211F1C] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Title (English)"
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
                      slug: editingItem ? formData.slug : slug,
                    });
                  }}
                  required
                />
                <Input
                  label="Title (Bengali / বাংলা)"
                  value={formData.titleBn}
                  onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
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

                <Select
                  label="Content Type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as AdminContentItem['type'] })
                  }
                  options={[
                    { value: 'Article', label: 'Article' },
                    { value: 'Essay', label: 'Essay' },
                    { value: 'Monograph', label: 'Monograph' },
                    { value: 'Page', label: 'Core Page' },
                  ]}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Category / Folio"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <Input
                  label="Author / Byline"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <Textarea
                label="Summary / Excerpt"
                value={formData.excerpt}
                error={formErrors.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                helperText="Short abstract displayed on catalog cards and search indexes."
                required
              />

              <Textarea
                label="Body Text / Full Archival Transcript"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={4}
                helperText="Optional transcript or notes for this article."
              />

              <Input
                label="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g. Liberation War, Rangpur, Literature"
              />

              <div className="pt-4 border-t border-[#211F1C]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#8A8375]">
                  Changes apply immediately to your active browser session.
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setEditingItem(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    {editingItem ? 'Save Updates' : 'Publish Content'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          DELETE CONFIRMATION MODAL
         =================================================================== */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/20 rounded-xs max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#933420] font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Confirm Permanent Deletion</span>
            </div>
            <p className="text-xs text-[#625D52] leading-relaxed">
              Are you sure you want to delete the record{' '}
              <strong className="text-[#211F1C]">"{itemToDelete.title}"</strong>? This will remove
              it from your active browser session.
            </p>
            <div className="p-3 bg-[#EAE4D8]/50 rounded-2xs text-[11px] text-[#8A8375]">
              Tip: You can also choose to <strong>Archive</strong> this item instead of deleting it,
              keeping the metadata preserved.
            </div>
            <div className="pt-3 border-t border-[#211F1C]/10 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setItemToDelete(null)}
              >
                Cancel
              </Button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 bg-[#933420] text-white text-xs font-medium rounded-xs hover:bg-[#782918] transition-colors"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
