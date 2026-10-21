import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { AdminMediaItem, MediaSection, PublicationStatus } from '../../types';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/StateFeedback';
import {
  Image as ImageIcon,
  UploadCloud,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileText,
  Maximize2,
  Globe,
  Lock,
  Layers,
  Sparkles,
  RefreshCw,
  Tag,
  BookOpen,
  Music,
  Award,
  Stethoscope,
  User,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminMediaPage: React.FC = () => {
  const {
    mediaItems,
    books,
    uploadMediaFile,
    replaceMediaFile,
    updateMedia,
    publishMedia,
    unpublishMedia,
    assignMedia,
    removeMediaAssignment,
    deleteMedia,
    addMedia,
    serverHeroPortrait,
    storageStatus,
    syncServerHeroPortrait,
    showToast,
  } = useAdmin();

  const { isBn, formatNumber } = useLanguage();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<AdminMediaItem | null>(null);
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [mediaToReplace, setMediaToReplace] = useState<AdminMediaItem | null>(null);
  const [mediaToDelete, setMediaToDelete] = useState<AdminMediaItem | null>(null);
  const [mediaToAssign, setMediaToAssign] = useState<AdminMediaItem | null>(null);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isUploadModalOpen || selectedMedia || mediaToReplace || mediaToDelete || mediaToAssign) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isUploadModalOpen, selectedMedia, mediaToReplace, mediaToDelete, mediaToAssign]);

  // Upload Form State
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [directImageUrl, setDirectImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [fileDimensions, setFileDimensions] = useState<{ width: number; height: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    titleBn: '',
    accessionNo: `ACC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    category: 'Photographic Portrait' as AdminMediaItem['category'],
    year: String(new Date().getFullYear()),
    medium: 'Archival Silver Gelatin Print',
    caption: '',
    captionBn: '',
    altText: '',
    altTextBn: '',
    section: 'hero' as MediaSection,
    targetId: 'hero-portrait',
    status: 'published' as PublicationStatus,
  });

  // Replace Form State
  const replaceFileInputRef = useRef<HTMLInputElement | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [replacePreviewUrl, setReplacePreviewUrl] = useState<string | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);

  // Edit Metadata Form State
  const [editFormData, setEditFormData] = useState({
    title: '',
    titleBn: '',
    category: 'Photographic Portrait' as AdminMediaItem['category'],
    year: '',
    medium: '',
    caption: '',
    captionBn: '',
    altText: '',
    altTextBn: '',
    section: 'unassigned' as MediaSection,
    targetId: '',
    status: 'published' as PublicationStatus,
  });

  // Category definitions
  const categories: AdminMediaItem['category'][] = [
    'Photographic Portrait',
    'Manuscripts',
    'Historic Rangpur',
    'Musical Memorabilia',
    'Medical Memorabilia',
    'Awards & Plaquettes',
  ];

  const sectionOptions: { value: MediaSection; label: string; labelBn: string; icon: React.ReactNode }[] = [
    { value: 'hero', label: 'Hero Section (Dr. Mantu Portrait)', labelBn: 'মূল পোর্ট্রেট (ডা. মান্টু)', icon: <User className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'books', label: 'Book Cover (Select Publication)', labelBn: 'গ্রন্থ প্রচ্ছদ', icon: <BookOpen className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'gallery', label: 'Archival Gallery Exhibit', labelBn: 'চিত্রশালা ও দলিল', icon: <Layers className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'biography', label: 'Biography Chronicle', labelBn: 'জীবনালেখ্য', icon: <User className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'music', label: 'Music & Cultural Stewardship', labelBn: 'সঙ্গীত ও সংস্কৃতি', icon: <Music className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'awards', label: 'Awards & Honors Dossier', labelBn: 'স্বীকৃতি ও পদক', icon: <Award className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'medical', label: 'Medical Career & Clinical Service', labelBn: 'চিকিৎসা জীবন', icon: <Stethoscope className="w-3.5 h-3.5 text-[#A84E36]" /> },
    { value: 'unassigned', label: 'Unassigned (Media Vault Only)', labelBn: 'অনির্ধারিত (সংরক্ষিত)', icon: <Lock className="w-3.5 h-3.5 text-[#8A8375]" /> },
  ];

  // --- File Selection & Validation Handlers ---
  const validateAndPrepareFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      setUploadError(null);

      // 1. Supported file types (JPG, PNG, WebP)
      const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedMime.includes(file.type)) {
        setUploadError(
          `Unsupported file format "${file.type || 'unknown'}". Only archival JPG, PNG, and WebP images are permitted.`
        );
        resolve(false);
        return;
      }

      // 2. Size limit: 5.0 MB
      const MAX_BYTES = 5 * 1024 * 1024;
      if (file.size > MAX_BYTES) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        setUploadError(
          `Image size (${sizeMb} MB) exceeds the 5.0 MB maximum threshold. Please compress or optimize the file.`
        );
        resolve(false);
        return;
      }

      // 3. Read image and inspect dimensions
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewDataUrl(result);
        const img = new Image();
        img.onload = () => {
          setFileDimensions({ width: img.naturalWidth, height: img.naturalHeight });
          resolve(true);
        };
        img.onerror = () => {
          setUploadError('Unable to decode image bitmap. The file may be corrupt.');
          resolve(false);
        };
        img.src = result;
      };
      reader.onerror = () => {
        setUploadError('Error reading file buffer from local storage.');
        resolve(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      await validateAndPrepareFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      await validateAndPrepareFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // --- Upload Submission ---
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadForm.title.trim()) {
      setUploadError('English title is required for catalog indexing.');
      return;
    }

    const targetId =
      uploadForm.section === 'books'
        ? uploadForm.targetId || (books[0]?.slug ?? '')
        : uploadForm.section === 'hero'
        ? 'hero-portrait'
        : uploadForm.targetId;

    if (uploadMode === 'url') {
      const cleanUrl = directImageUrl.trim();
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        setUploadError('Please provide a valid image URL starting with http:// or https://');
        return;
      }

      setIsUploading(true);
      setUploadError(null);
      try {
        addMedia({
          title: uploadForm.title.trim(),
          titleBn: uploadForm.titleBn?.trim() || undefined,
          accessionNo: uploadForm.accessionNo.trim(),
          category: uploadForm.category,
          year: uploadForm.year.trim() || String(new Date().getFullYear()),
          medium: uploadForm.medium.trim() || 'Archival Photographic Print',
          caption: uploadForm.caption.trim() || uploadForm.title.trim(),
          captionBn: uploadForm.captionBn?.trim() || undefined,
          altText: uploadForm.altText.trim() || uploadForm.title.trim(),
          altTextBn: uploadForm.altTextBn?.trim() || undefined,
          url: cleanUrl,
          fileSize: 'Hosted URL',
          dimensions: 'Original Aspect',
          aspectRatio: '4:5',
          status: uploadForm.status,
          assignment: {
            section: uploadForm.section,
            targetId,
          },
        });
        setIsUploadModalOpen(false);
        resetUploadForm();
      } catch (err: any) {
        setUploadError(err.message || 'Failed to register image URL.');
      } finally {
        setIsUploading(false);
      }
      return;
    }

    if (!selectedFile) {
      setUploadError('Please select a valid photographic or manuscript file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadMediaFile(selectedFile, {
        title: uploadForm.title,
        titleBn: uploadForm.titleBn,
        accessionNo: uploadForm.accessionNo,
        category: uploadForm.category,
        year: uploadForm.year,
        medium: uploadForm.medium,
        caption: uploadForm.caption || uploadForm.title,
        captionBn: uploadForm.captionBn || uploadForm.titleBn,
        altText: uploadForm.altText || uploadForm.title,
        altTextBn: uploadForm.altTextBn || uploadForm.titleBn,
        section: uploadForm.section,
        targetId,
        status: uploadForm.status,
      });

      if (result.success) {
        setIsUploadModalOpen(false);
        resetUploadForm();
      } else {
        setUploadError(result.error || 'Failed to register image file.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const resetUploadForm = () => {
    setSelectedFile(null);
    setPreviewDataUrl(null);
    setFileDimensions(null);
    setDirectImageUrl('');
    setUploadMode('file');
    setUploadError(null);
    setUploadForm({
      title: '',
      titleBn: '',
      accessionNo: `ACC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Photographic Portrait',
      year: String(new Date().getFullYear()),
      medium: 'Archival Silver Gelatin Print',
      caption: '',
      captionBn: '',
      altText: '',
      altTextBn: '',
      section: 'hero',
      targetId: 'hero-portrait',
      status: 'published',
    });
  };

  // --- Replace Image Handlers ---
  const handleOpenReplace = (item: AdminMediaItem) => {
    setMediaToReplace(item);
    setReplaceFile(null);
    setReplacePreviewUrl(null);
    setReplaceError(null);
  };

  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReplaceError(null);
    const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMime.includes(file.type)) {
      setReplaceError(`Unsupported format "${file.type}". Allowed: JPG, PNG, WebP.`);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setReplaceError(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds 5.0 MB.`);
      return;
    }

    setReplaceFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setReplacePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmReplace = async () => {
    if (!mediaToReplace || !replaceFile) return;

    setIsReplacing(true);
    setReplaceError(null);

    const result = await replaceMediaFile(mediaToReplace.id, replaceFile);
    setIsReplacing(false);

    if (result.success) {
      setMediaToReplace(null);
      setReplaceFile(null);
      setReplacePreviewUrl(null);
    } else {
      setReplaceError(result.error || 'Failed to replace image.');
    }
  };

  // --- Inspect & Edit Handlers ---
  const handleOpenInspect = (item: AdminMediaItem) => {
    setSelectedMedia(item);
    setIsEditingMetadata(false);
    setEditFormData({
      title: item.title,
      titleBn: item.titleBn || '',
      category: item.category,
      year: item.year,
      medium: item.medium,
      caption: item.caption,
      captionBn: item.captionBn || '',
      altText: item.altText,
      altTextBn: item.altTextBn || '',
      section: item.assignment.section,
      targetId: item.assignment.targetId || '',
      status: item.status,
    });
  };

  const handleSaveMetadataEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedia) return;

    updateMedia(selectedMedia.id, {
      title: editFormData.title,
      titleBn: editFormData.titleBn || undefined,
      category: editFormData.category,
      year: editFormData.year,
      medium: editFormData.medium,
      caption: editFormData.caption,
      captionBn: editFormData.captionBn || undefined,
      altText: editFormData.altText,
      altTextBn: editFormData.altTextBn || undefined,
      status: editFormData.status,
      assignment: {
        section: editFormData.section,
        targetId: editFormData.targetId || undefined,
      },
    });

    // Also update current view
    setSelectedMedia({
      ...selectedMedia,
      title: editFormData.title,
      titleBn: editFormData.titleBn,
      category: editFormData.category,
      year: editFormData.year,
      medium: editFormData.medium,
      caption: editFormData.caption,
      captionBn: editFormData.captionBn,
      altText: editFormData.altText,
      altTextBn: editFormData.altTextBn,
      status: editFormData.status,
      assignment: {
        section: editFormData.section,
        targetId: editFormData.targetId || undefined,
      },
    });

    setIsEditingMetadata(false);
  };

  // --- Assign Section Handler ---
  const handleOpenAssignModal = (item: AdminMediaItem) => {
    setMediaToAssign(item);
  };

  const handleConfirmAssignment = (section: MediaSection, targetId?: string) => {
    if (!mediaToAssign) return;
    assignMedia(mediaToAssign.id, section, targetId);
    setMediaToAssign(null);
  };

  // --- Filtered Media Items ---
  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesSection = sectionFilter === 'all' || item.assignment.section === sectionFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.titleBn && item.titleBn.toLowerCase().includes(q)) ||
        item.accessionNo.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        (item.captionBn && item.captionBn.toLowerCase().includes(q)) ||
        item.medium.toLowerCase().includes(q) ||
        (item.assignment.targetId && item.assignment.targetId.toLowerCase().includes(q));

      return matchesCat && matchesSection && matchesStatus && matchesQuery;
    });
  }, [mediaItems, categoryFilter, sectionFilter, statusFilter, searchQuery]);

  // KPI Metrics
  const totalAssets = mediaItems.length;
  const publishedCount = mediaItems.filter((m) => m.status === 'published').length;
  const draftCount = mediaItems.filter((m) => m.status === 'draft').length;
  const heroAssigned = mediaItems.find((m) => m.assignment.section === 'hero' && m.status === 'published');
  const bookCoversCount = mediaItems.filter((m) => m.assignment.section === 'books' && m.status === 'published').length;

  return (
    <AdminLayout
      title={isBn ? 'ঐতিহাসিক চিত্র ও মিডিয়া ব্যবস্থাপনা স্টুডিও' : 'Archival Image & Media Management Studio'}
      subtitle={
        isBn
          ? 'আর্কাইভাল পোর্ট্রেট, গ্রন্থ প্রচ্ছদ, চিত্রশালা ও দলিলসমূহের কেন্দ্রীয় আপলোড, প্রতিস্থাপন ও প্রকাশনা নিয়ন্ত্রণ।'
          : 'Curatorial control for archive portraits, book covers, manuscript scans, and section image assignments.'
      }
      breadcrumbs={[{ label: isBn ? 'মিডিয়া স্টুডিও' : 'Media Studio' }]}
      actions={
        <Button
          onClick={() => {
            resetUploadForm();
            setIsUploadModalOpen(true);
          }}
          variant="primary"
          size="sm"
          icon={<UploadCloud className="w-4 h-4" />}
        >
          {isBn ? 'নতুন চিত্র আপলোড করুন' : 'Upload Archival Image'}
        </Button>
      }
    >
      {/* ===================================================================
          ARCHITECTURAL DISCLOSURE & SECURITY BOUNDARY NOTICE
         =================================================================== */}
      <div className="p-4 bg-white/90 border border-[#211F1C]/15 rounded-xs flex items-start gap-3 text-xs text-[#625D52] font-sans shadow-2xs">
        <ShieldCheck className="w-4 h-4 text-[#A84E36] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#211F1C] flex items-center gap-2">
            <span>
              {isBn
                ? 'অনুমোদিত প্রশাসনিক চিত্র নিয়ন্ত্রণ ব্যবস্থা'
                : 'Authorized Administrator Image Management Architecture'}
            </span>
            <span className="px-1.5 py-0.5 rounded-3xs bg-[#2A4736]/10 text-[#2A4736] text-[10px] uppercase font-mono font-bold">
              {isBn ? 'নিরাপদ প্রশাসনিক এলাকা' : 'Admin Only'}
            </span>
          </div>
          <p className="leading-relaxed">
            {isBn
              ? 'পাবলিক ওয়েবসাইট থেকে সকল সাধারণ আপলোড নিয়ন্ত্রণ সম্পূর্ণরূপে অপসারিত। শুধুমাত্র এই প্যানেল থেকে অনুমোদিত প্রশাসকগণ ছবি আপলোড, প্রতিস্থাপন, সেকশনে বরাদ্দ বা প্রকাশ করতে পারবেন। অপ্রকাশিত (Draft) ছবি পাবলিক ভিজিটরদের কাছে সম্পূর্ণ লুক্কায়িত থাকে।'
              : 'All public upload inputs and controls have been permanently removed from the visitor website. Only authenticated administrators in this studio can upload, inspect, replace, assign, or publish images. Unpublished (Draft) assets remain strictly private.'}
          </p>
        </div>
      </div>

      {/* ===================================================================
          GLOBAL CROSS-DEVICE SYNC & VERCEL BLOB STORAGE STATUS
         =================================================================== */}
      <div
        className={`p-4 border rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans shadow-2xs ${
          storageStatus?.vercelBlobConfigured
            ? 'bg-[#2A4736]/10 border-[#2A4736]/30 text-[#2A4736]'
            : 'bg-[#B38F44]/10 border-[#B38F44]/30 text-[#625D52]'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <Globe className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-semibold flex items-center gap-2">
              <span>
                {isBn
                  ? 'গ্লোবাল সিঙ্ক ও স্টোরেজ ইঞ্জিন স্থিতি:'
                  : 'Global Sync & Storage Engine Status:'}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded-3xs text-[10px] uppercase font-mono font-bold ${
                  storageStatus?.vercelBlobConfigured
                    ? 'bg-[#2A4736] text-white'
                    : 'bg-[#B38F44] text-white'
                }`}
              >
                {storageStatus?.vercelBlobConfigured
                  ? 'Vercel Blob CDN Active'
                  : 'Serverless Memory / Cache Mode'}
              </span>
            </div>
            <p className="text-[11px] text-[#625D52] leading-relaxed">
              {storageStatus?.vercelBlobConfigured
                ? isBn
                  ? 'ভার্সেল ব্লব স্টোরেজ সফলভাবে সংযুক্ত। আপলোডকৃত সকল পোর্ট্রেট ও ছবি মোবাইল ও সকল ব্রাউজারে বিশ্বব্যাপী সরাসরি লাইভ থাকবে।'
                  : 'Vercel Blob Storage is connected. Uploaded portraits and archive media are hosted on a global CDN and immediately visible across all mobile devices and browsers.'
                : isBn
                ? 'ছবিগুলো ব্যাকএন্ড মেমোরি ও /tmp ক্যাশে সংরক্ষিত হচ্ছে। ভার্সেলে ছবিগুলো স্থায়ীভাবে রাখতে Vercel Project -> Storage ট্যাবে Vercel Blob যুক্ত করুন, অথবা সরাসরি Image URL ব্যবহার করুন।'
                : 'Images are synchronized through server memory and temporary filesystem cache. For permanent persistent image hosting across Vercel deployments, connect Vercel Blob in your Vercel Project Settings (Storage tab), or enter an Image URL directly.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => syncServerHeroPortrait()}
            className="px-3 py-1.5 bg-white border border-[#211F1C]/20 hover:border-[#A84E36] rounded-xs text-[11px] font-medium text-[#211F1C] hover:text-[#A84E36] transition-colors"
          >
            {isBn ? 'সিঙ্ক রিফ্রেশ' : 'Refresh Sync'}
          </button>
        </div>
      </div>

      {/* ===================================================================
          METRICS & PUBLISHING STATUS KPI BAR
         =================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans text-xs">
        <div className="p-3.5 bg-white/80 border border-[#211F1C]/12 rounded-xs shadow-2xs flex flex-col justify-between">
          <span className="text-[#8A8375] uppercase tracking-wider text-[10px] font-semibold">
            {isBn ? 'মোট সংরক্ষিত চিত্র' : 'Total Media Assets'}
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-[#211F1C] tabular-nums">
              {formatNumber(totalAssets)}
            </span>
            <ImageIcon className="w-4 h-4 text-[#8A8375]" />
          </div>
        </div>

        <div className="p-3.5 bg-white/80 border border-[#211F1C]/12 rounded-xs shadow-2xs flex flex-col justify-between">
          <span className="text-[#2A4736] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {isBn ? 'প্রকাশিত' : 'Published'}
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-[#2A4736] tabular-nums">
              {formatNumber(publishedCount)}
            </span>
            <span className="text-[10px] text-[#2A4736] font-medium bg-[#2A4736]/10 px-1.5 py-0.5 rounded-3xs">
              {isBn ? 'পাবলিক দৃশ্যমান' : 'Visible to Public'}
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-white/80 border border-[#211F1C]/12 rounded-xs shadow-2xs flex flex-col justify-between">
          <span className="text-[#B38F44] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3" />
            {isBn ? 'খসড়া / অপ্রকাশিত' : 'Drafts (Private)'}
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-[#B38F44] tabular-nums">
              {formatNumber(draftCount)}
            </span>
            <span className="text-[10px] text-[#B38F44] font-medium bg-[#B38F44]/10 px-1.5 py-0.5 rounded-3xs">
              {isBn ? 'লুক্কায়িত' : 'Hidden from Public'}
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-white/80 border border-[#211F1C]/12 rounded-xs shadow-2xs flex flex-col justify-between">
          <span className="text-[#A84E36] uppercase tracking-wider text-[10px] font-semibold flex items-center gap-1">
            <User className="w-3 h-3" />
            {isBn ? 'হোম পোর্ট্রেট স্থিতি' : 'Active Hero Portrait'}
          </span>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#211F1C] truncate max-w-[140px]">
              {heroAssigned ? (isBn ? 'মূল ছবি প্রকাশিত' : 'Portrait Active') : (isBn ? 'ফলক প্রদর্শন' : 'Archival Fallback')}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                heroAssigned ? 'bg-[#2A4736]' : 'bg-[#B38F44]'
              }`}
              title={heroAssigned ? 'Published Portrait Active' : 'Fallback Plate Active'}
            />
          </div>
        </div>
      </div>

      {/* ===================================================================
          SEARCH, SECTION TABS & FILTER BAR
         =================================================================== */}
      <div className="bg-white/85 border border-[#211F1C]/15 p-4 rounded-xs space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8375]" />
            <input
              type="text"
              placeholder={
                isBn
                  ? 'স্মারক নম্বর, শিরোনাম, বাংলা নাম বা সেকশন দিয়ে খুঁজুন...'
                  : 'Search by Accession ID, English/Bengali title, medium, section...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#211F1C]/20 rounded-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8375] hover:text-[#211F1C] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Section Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#8A8375] font-medium">{isBn ? 'সেকশন:' : 'Section:'}</span>
              <select
                value={sectionFilter}
                onChange={(e) => setSectionFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-[#211F1C]/20 rounded-xs text-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
              >
                <option value="all">{isBn ? 'সকল সেকশন' : 'All Sections'}</option>
                <option value="hero">{isBn ? 'হোম পোর্ট্রেট (Hero)' : 'Hero Portrait'}</option>
                <option value="books">{isBn ? 'গ্রন্থ প্রচ্ছদ (Books)' : 'Book Covers'}</option>
                <option value="gallery">{isBn ? 'চিত্রশালা (Gallery)' : 'Archival Gallery'}</option>
                <option value="biography">{isBn ? 'জীবনালেখ্য (Biography)' : 'Biography'}</option>
                <option value="music">{isBn ? 'সঙ্গীত (Music)' : 'Music & Culture'}</option>
                <option value="awards">{isBn ? 'স্বীকৃতি (Awards)' : 'Awards & Honors'}</option>
                <option value="medical">{isBn ? 'চিকিৎসা জীবন (Medical)' : 'Medical Career'}</option>
                <option value="unassigned">{isBn ? 'অনির্ধারিত (Unassigned)' : 'Unassigned Only'}</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-[#8A8375] font-medium">{isBn ? 'স্থিতি:' : 'Status:'}</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-[#211F1C]/20 rounded-xs text-xs text-[#211F1C] focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
              >
                <option value="all">{isBn ? 'সকল স্থিতি' : 'All Statuses'}</option>
                <option value="published">{isBn ? 'প্রকাশিত (Live)' : 'Published Only'}</option>
                <option value="draft">{isBn ? 'খসড়া (Draft)' : 'Drafts Only'}</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-[#8A8375] font-medium">{isBn ? 'শাখা:' : 'Category:'}</span>
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
            </div>
          </div>
        </div>

        {/* Counter & Reset Line */}
        <div className="text-[11px] text-[#8A8375] pt-2 border-t border-[#211F1C]/10 flex items-center justify-between font-sans">
          <span>
            {isBn
              ? `${formatNumber(filteredMedia.length)} / ${formatNumber(mediaItems.length)} টি চিত্র ও স্মারক প্রদর্শিত`
              : `Showing ${filteredMedia.length} of ${mediaItems.length} archival media assets`}
          </span>
          {(searchQuery || sectionFilter !== 'all' || statusFilter !== 'all' || categoryFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSectionFilter('all');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="text-[#A84E36] hover:underline font-medium"
            >
              {isBn ? 'সকল ফিল্টার রিসেট করুন' : 'Reset all filters'}
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================
          MEDIA ASSET GRID (Dignified Archival Cards with Image Previews)
         =================================================================== */}
      {filteredMedia.length === 0 ? (
        <EmptyState
          title={isBn ? 'কোনো মিডিয়া পাওয়া যায়নি' : 'No archival assets found'}
          message={
            isBn
              ? 'বর্তমান ফিল্টারের সাথে মিলে এমন কোনো ছবি বা দলিল রেজিস্ট্রি তালিকায় নেই।'
              : 'No cataloged images or documents match your search and filter criteria.'
          }
          onReset={() => {
            setSearchQuery('');
            setSectionFilter('all');
            setStatusFilter('all');
            setCategoryFilter('all');
          }}
          resetLabel={isBn ? 'ফিল্টার পরিষ্কার করুন' : 'Clear filters'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => {
            const isHero = item.assignment.section === 'hero';
            const isBook = item.assignment.section === 'books';
            const isPublished = item.status === 'published';

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-xs overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group ${
                  isPublished
                    ? 'border-[#211F1C]/15 hover:border-[#211F1C]/35'
                    : 'border-amber-500/30 bg-amber-500/5'
                }`}
              >
                {/* Visual Image Preview Stage */}
                <div className="relative aspect-[4/3] bg-[#EAE4D8]/80 border-b border-[#211F1C]/10 flex items-center justify-center overflow-hidden">
                  {item.url ? (
                    <img
                      src={item.url}
                      alt={item.altText || item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    /* Fallback Archival Card */
                    <div className="p-4 text-center space-y-1">
                      <div className="w-12 h-12 rounded-full bg-white/70 shadow-xs flex items-center justify-center mx-auto mb-2 text-[#A84E36]">
                        <ImageIcon className="w-6 h-6 stroke-[1.2]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#A84E36] font-bold block">
                        {item.accessionNo}
                      </span>
                      <span className="text-xs font-serif font-semibold text-[#211F1C] line-clamp-1">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[#8A8375] italic block">
                        {item.medium}
                      </span>
                    </div>
                  )}

                  {/* Section Assignment Tag Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-3xs text-[10px] font-sans font-semibold shadow-xs ${
                        isHero
                          ? 'bg-[#211F1C] text-white'
                          : isBook
                          ? 'bg-[#A84E36] text-white'
                          : item.assignment.section === 'gallery'
                          ? 'bg-[#2E4A62] text-white'
                          : item.assignment.section === 'biography'
                          ? 'bg-[#3A4D39] text-white'
                          : item.assignment.section === 'music'
                          ? 'bg-[#B38F44] text-white'
                          : item.assignment.section === 'awards'
                          ? 'bg-[#6D3958] text-white'
                          : item.assignment.section === 'medical'
                          ? 'bg-[#7A3B2E] text-white'
                          : 'bg-black/60 text-white/90 backdrop-blur-xs'
                      }`}
                    >
                      {item.assignment.section === 'hero' && <User className="w-3 h-3" />}
                      {item.assignment.section === 'books' && <BookOpen className="w-3 h-3" />}
                      {item.assignment.section === 'gallery' && <Layers className="w-3 h-3" />}
                      {item.assignment.section === 'music' && <Music className="w-3 h-3" />}
                      {item.assignment.section === 'awards' && <Award className="w-3 h-3" />}
                      {item.assignment.section === 'medical' && <Stethoscope className="w-3 h-3" />}
                      <span>
                        {item.assignment.section === 'hero'
                          ? isBn
                            ? 'হোম পোর্ট্রেট'
                            : 'Hero Portrait'
                          : item.assignment.section === 'books'
                          ? isBn
                            ? `প্রচ্ছদ: ${item.assignment.targetId || ''}`
                            : `Book: ${item.assignment.targetId || ''}`
                          : item.assignment.section.toUpperCase()}
                      </span>
                    </span>
                  </div>

                  {/* Publication Status Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-3xs text-[10px] font-sans font-bold shadow-xs ${
                        isPublished
                          ? 'bg-[#2A4736] text-white'
                          : 'bg-[#B38F44] text-white'
                      }`}
                    >
                      {isPublished ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>{isBn ? 'প্রকাশিত' : 'Published'}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>{isBn ? 'খসড়া' : 'Draft'}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Image Format & Dimensions Overlay (Bottom) */}
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] font-mono text-white bg-black/65 backdrop-blur-2xs px-2 py-1 rounded-3xs">
                    <span>{item.dimensions}</span>
                    <span>{item.fileSize}</span>
                  </div>
                </div>

                {/* Card Details & Metadata */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between text-xs font-sans">
                  <div>
                    <div className="flex items-center justify-between text-[#8A8375] text-[11px] mb-1">
                      <span className="font-mono text-[#A84E36] font-semibold">{item.accessionNo}</span>
                      <span className="tabular-nums">{item.year}</span>
                    </div>

                    <h3 className="font-serif text-sm font-semibold text-[#211F1C] leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    {item.titleBn && (
                      <p className="font-bengali-text text-xs text-[#625D52] mt-0.5 line-clamp-1">
                        {item.titleBn}
                      </p>
                    )}

                    <p className="text-[#625D52] text-[11px] mt-2 line-clamp-2 leading-relaxed">
                      {isBn ? item.captionBn || item.caption : item.caption}
                    </p>
                  </div>

                  {/* Administrative Action Toolbar */}
                  <div className="pt-3 border-t border-[#211F1C]/10 space-y-2">
                    {/* Action 1: Publish / Unpublish Toggle */}
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (isPublished) {
                            unpublishMedia(item.id);
                          } else {
                            publishMedia(item.id);
                          }
                        }}
                        className={`flex-1 py-1 px-2.5 rounded-xs text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          isPublished
                            ? 'bg-[#EAE4D8] text-[#625D52] hover:bg-[#DDD6C8] hover:text-[#211F1C]'
                            : 'bg-[#2A4736] text-white hover:bg-[#1E3426]'
                        }`}
                        title={isPublished ? 'Unpublish to hide from public' : 'Publish to live archive'}
                      >
                        {isPublished ? (
                          <>
                            <Lock className="w-3 h-3 text-[#A84E36]" />
                            <span>{isBn ? 'খসড়া করুন (লুকান)' : 'Move to Draft'}</span>
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3" />
                            <span>{isBn ? 'প্রকাশ করুন' : 'Publish'}</span>
                          </>
                        )}
                      </button>

                      {/* Action 2: Assign Section Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenAssignModal(item)}
                        className="py-1 px-2.5 rounded-xs border border-[#211F1C]/20 hover:border-[#211F1C] text-[11px] font-medium text-[#211F1C] hover:bg-[#EAE4D8]/60 transition-colors flex items-center gap-1"
                        title="Assign to specific public section"
                      >
                        <Tag className="w-3 h-3 text-[#A84E36]" />
                        <span>{isBn ? 'সেকশন' : 'Section'}</span>
                      </button>
                    </div>

                    {/* Action Row 2: Replace File, Inspect & Delete */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleOpenReplace(item)}
                        className="text-[#625D52] hover:text-[#A84E36] flex items-center gap-1 transition-colors"
                        title="Replace this image with a new file"
                      >
                        <RefreshCw className="w-3 h-3 text-[#A84E36]" />
                        <span>{isBn ? 'ছবি প্রতিস্থাপন' : 'Replace Image'}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenInspect(item)}
                          className="p-1.5 text-[#625D52] hover:text-[#211F1C] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                          title="Inspect or Edit Metadata"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleOpenInspect(item);
                            setIsEditingMetadata(true);
                          }}
                          className="p-1.5 text-[#625D52] hover:text-[#A84E36] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                          title="Edit Captions and Alt Text"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setMediaToDelete(item)}
                          className="p-1.5 text-[#625D52] hover:text-[#933420] hover:bg-[#EAE4D8] rounded-xs transition-colors"
                          title="Delete Media Asset"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===================================================================
          MODAL 1: UPLOAD ARCHIVAL IMAGE (Strict Validation & Section Targeting)
         =================================================================== */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-hidden">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/25 rounded-xs max-w-2xl w-full shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
            {/* Modal Sticky Header */}
            <div className="shrink-0 p-4 sm:p-5 border-b border-[#211F1C]/10 flex items-center justify-between bg-[#F7F4ED]">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-[#A84E36]" />
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  {isBn ? 'আর্কাইভাল চিত্র আপলোড ও রেজিস্ট্রি' : 'Upload & Register Archival Image'}
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#625D52] hover:text-[#211F1C] p-1.5 hover:bg-[#EAE4D8] rounded-xs transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden text-xs font-sans">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {uploadError && (
                  <div className="p-3 bg-[#933420]/10 border border-[#933420]/30 rounded-xs flex items-start gap-2.5 text-xs text-[#933420]">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
                {/* Method selector: File Upload vs Direct Hosted URL */}
                <div className="flex items-center gap-2 border-b border-[#211F1C]/10 pb-3">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-3 py-1.5 rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      uploadMode === 'file'
                        ? 'bg-[#211F1C] text-[#F7F4ED]'
                        : 'bg-white border border-[#211F1C]/15 text-[#625D52] hover:text-[#211F1C]'
                    }`}
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>{isBn ? 'ডিভাইস থেকে ফাইল আপলোড' : 'Upload Image File'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-3 py-1.5 rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      uploadMode === 'url'
                        ? 'bg-[#211F1C] text-[#F7F4ED]'
                        : 'bg-white border border-[#211F1C]/15 text-[#625D52] hover:text-[#211F1C]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{isBn ? 'সরাসরি ইমেজ লিঙ্ক (URL)' : 'Direct Image URL'}</span>
                  </button>
                </div>

                {uploadMode === 'url' ? (
                  <div className="p-4 bg-white border border-[#211F1C]/15 rounded-xs space-y-3">
                    <Input
                      label={
                        isBn
                          ? 'অনলাইন ছবির সরাসরি ইউআরএল (https://...)'
                          : 'Direct Image URL (e.g. from Vercel Blob, Imgur, Cloudinary, etc.)'
                      }
                      value={directImageUrl}
                      onChange={(e) => setDirectImageUrl(e.target.value)}
                      placeholder="https://example.com/images/dr-mantu-portrait.jpg"
                      required={uploadMode === 'url'}
                    />
                    {directImageUrl && (
                      <div className="flex items-center gap-3 p-2 bg-[#EAE4D8]/30 border border-[#211F1C]/10 rounded-xs">
                        <div className="w-16 h-20 rounded-2xs overflow-hidden border border-[#211F1C]/15 bg-white shrink-0">
                          <img
                            src={directImageUrl}
                            alt="URL Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="text-[11px] text-[#625D52] space-y-0.5 min-w-0">
                          <p className="font-semibold text-[#211F1C]">
                            {isBn ? 'লাইভ প্রিভিউ' : 'Live Image Preview'}
                          </p>
                          <p className="truncate font-mono text-[10px] text-[#8A8375]">
                            {directImageUrl}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Real File Input Dropzone */
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />

                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xs p-6 text-center cursor-pointer transition-all ${
                        previewDataUrl
                          ? 'border-[#2A4736] bg-[#2A4736]/5'
                          : 'border-[#211F1C]/25 hover:border-[#A84E36] bg-[#EAE4D8]/30'
                      }`}
                    >
                      {previewDataUrl ? (
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xs border border-[#211F1C]/15 overflow-hidden shrink-0 bg-white shadow-xs">
                            <img
                              src={previewDataUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="font-semibold text-sm text-[#211F1C] flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#2A4736]" />
                              <span>Image Validated & Ready</span>
                            </div>
                            <div className="text-[#625D52] text-xs font-mono">
                              {selectedFile?.name}
                            </div>
                            <div className="text-[11px] text-[#8A8375]">
                              Size: {selectedFile ? (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB' : ''} · Dimensions: {fileDimensions ? `${fileDimensions.width} × ${fileDimensions.height} px` : 'Detecting...'}
                            </div>
                            <div className="pt-1 text-[11px] text-[#A84E36] underline">
                              Click to select a different image file
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <UploadCloud className="w-9 h-9 text-[#A84E36] mx-auto stroke-[1.4]" />
                          <div className="font-semibold text-xs text-[#211F1C]">
                            {isBn ? 'ফাইল নির্বাচন করতে ক্লিক করুন অথবা এখানে টেনে আনুন' : 'Click to select image file or drag and drop here'}
                          </div>
                          <p className="text-[11px] text-[#8A8375]">
                            Supported archival formats: <strong>JPG, PNG, WebP</strong> (Maximum: <strong>10.0 MB</strong>)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Title & Bengali Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Artifact / Photograph Title (English)"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. Dr. Md. Mofizul Islam Mantu Archival Portrait"
                  required
                />
                <Input
                  label="শিরোনাম (বাংলা)"
                  value={uploadForm.titleBn}
                  onChange={(e) => setUploadForm({ ...uploadForm, titleBn: e.target.value })}
                  placeholder="যেমন: ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি"
                />
              </div>

              {/* Section Assignment & Publication Target */}
              <div className="p-4 bg-white border border-[#211F1C]/15 rounded-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#211F1C] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#A84E36]" />
                    <span>Public Section Assignment</span>
                  </span>
                  <span className="text-[11px] text-[#8A8375]">
                    Where this image will appear on the public website
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Assign to Section"
                    value={uploadForm.section}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        section: e.target.value as MediaSection,
                        targetId:
                          e.target.value === 'hero'
                            ? 'hero-portrait'
                            : e.target.value === 'books'
                            ? books[0]?.slug ?? ''
                            : '',
                      })
                    }
                    options={sectionOptions.map((s) => ({
                      value: s.value,
                      label: `${s.label} (${s.labelBn})`,
                    }))}
                  />

                  {uploadForm.section === 'books' && (
                    <Select
                      label="Select Target Book"
                      value={uploadForm.targetId}
                      onChange={(e) => setUploadForm({ ...uploadForm, targetId: e.target.value })}
                      options={books.map((b) => ({
                        value: b.slug,
                        label: `${b.title} (${b.titleBn})`,
                      }))}
                    />
                  )}

                  {uploadForm.section === 'hero' && (
                    <div className="flex flex-col justify-end text-[11px] text-[#2A4736] p-2 bg-[#2A4736]/10 rounded-2xs">
                      <strong>Hero Section Portrait:</strong> This image will display as Dr. Mofizul Islam Mantu's primary portrait in the hero section.
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#211F1C]/10 flex items-center justify-between">
                  <span className="text-[11px] text-[#625D52]">Initial Publication Status:</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={uploadForm.status === 'published'}
                        onChange={() => setUploadForm({ ...uploadForm, status: 'published' })}
                        className="text-[#2A4736] focus:ring-[#2A4736]"
                      />
                      <span className="text-xs font-medium text-[#2A4736]">
                        Published (Live immediately)
                      </span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={uploadForm.status === 'draft'}
                        onChange={() => setUploadForm({ ...uploadForm, status: 'draft' })}
                        className="text-[#B38F44] focus:ring-[#B38F44]"
                      />
                      <span className="text-xs font-medium text-[#B38F44]">
                        Draft (Keep private)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Accession, Category & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Accession Number"
                  value={uploadForm.accessionNo}
                  onChange={(e) => setUploadForm({ ...uploadForm, accessionNo: e.target.value })}
                  required
                />
                <Select
                  label="Archive Category"
                  value={uploadForm.category}
                  onChange={(e) =>
                    setUploadForm({
                      ...uploadForm,
                      category: e.target.value as AdminMediaItem['category'],
                    })
                  }
                  options={categories.map((c) => ({ value: c, label: c }))}
                />
                <Input
                  label="Origin Year"
                  value={uploadForm.year}
                  onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                />
              </div>

              {/* Medium */}
              <Input
                label="Physical Medium / Material"
                value={uploadForm.medium}
                onChange={(e) => setUploadForm({ ...uploadForm, medium: e.target.value })}
                placeholder="e.g. Preserved Photographic Print, Bound Manuscript Folio"
              />

              {/* Captions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Textarea
                  label="Archival Caption (English)"
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                  rows={2}
                  placeholder="Historical provenance displayed under the photograph."
                />
                <Textarea
                  label="ক্যাপশন (বাংলা)"
                  value={uploadForm.captionBn}
                  onChange={(e) => setUploadForm({ ...uploadForm, captionBn: e.target.value })}
                  rows={2}
                  placeholder="আলোকচিত্রের ঐতিহাসিক পরিচিতি ও প্রেক্ষিত।"
                />
              </div>

              {/* Alt Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Accessibility Alt Text (English)"
                  value={uploadForm.altText}
                  onChange={(e) => setUploadForm({ ...uploadForm, altText: e.target.value })}
                  placeholder="Descriptive text for accessibility."
                />
                <Input
                  label="বিকল্প টেক্সট (বাংলা Alt Text)"
                  value={uploadForm.altTextBn}
                  onChange={(e) => setUploadForm({ ...uploadForm, altTextBn: e.target.value })}
                  placeholder="দৃষ্টিপ্রতিবন্ধীদের জন্য বর্ণনামূলক টেক্সট।"
                />
              </div>

              </div>

              {/* Modal Sticky Footer */}
              <div className="shrink-0 p-4 border-t border-[#211F1C]/10 bg-[#EAE4D8]/50 flex items-center justify-between">
                <span className="text-[11px] text-[#8A8375] hidden sm:inline">
                  Validated locally and stored in active session registry.
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isUploading || !selectedFile}
                  >
                    {isUploading ? 'Registering Image...' : 'Ingest & Publish Image'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: REPLACE IMAGE FILE (Validated Replacement)
         =================================================================== */}
      {mediaToReplace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/25 rounded-xs max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#211F1C]/10">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#A84E36]" />
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Replace Image for "{mediaToReplace.title}"
                </h3>
              </div>
              <button
                onClick={() => setMediaToReplace(null)}
                className="text-[#625D52] hover:text-[#211F1C] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {replaceError && (
              <div className="p-3 bg-[#933420]/10 border border-[#933420]/30 rounded-xs text-xs text-[#933420]">
                {replaceError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="space-y-1 text-center">
                <div className="text-[10px] text-[#8A8375] uppercase font-semibold">Current Image</div>
                <div className="aspect-[4/3] bg-[#EAE4D8] border border-[#211F1C]/15 rounded-xs overflow-hidden flex items-center justify-center">
                  {mediaToReplace.url ? (
                    <img src={mediaToReplace.url} alt="Current" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-[#8A8375]">No image</span>
                  )}
                </div>
                <div className="text-[10px] text-[#8A8375] font-mono">{mediaToReplace.dimensions}</div>
              </div>

              <div className="space-y-1 text-center">
                <div className="text-[10px] text-[#2A4736] uppercase font-semibold">Replacement Image</div>
                <div className="aspect-[4/3] bg-white border border-[#2A4736]/30 rounded-xs overflow-hidden flex items-center justify-center">
                  {replacePreviewUrl ? (
                    <img src={replacePreviewUrl} alt="Replacement" className="w-full h-full object-cover" />
                  ) : (
                    <div className="p-3 text-[11px] text-[#8A8375]">Select new file below</div>
                  )}
                </div>
                <div className="text-[10px] text-[#2A4736] font-mono">
                  {replaceFile ? (replaceFile.size / (1024 * 1024)).toFixed(2) + ' MB' : 'Pending selection'}
                </div>
              </div>
            </div>

            <div>
              <input
                type="file"
                ref={replaceFileInputRef}
                onChange={handleReplaceFileChange}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-center"
                onClick={() => replaceFileInputRef.current?.click()}
              >
                Choose New Image File (JPG, PNG, WebP ≤ 5MB)
              </Button>
            </div>

            <div className="pt-3 border-t border-[#211F1C]/10 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMediaToReplace(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmReplace}
                disabled={!replaceFile || isReplacing}
              >
                {isReplacing ? 'Updating Image...' : 'Confirm & Replace Image'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: ASSIGN SECTION MODAL (Quick Assignment)
         =================================================================== */}
      {mediaToAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/25 rounded-xs max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#211F1C]/10">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#A84E36]" />
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Assign Section: {mediaToAssign.title}
                </h3>
              </div>
              <button
                onClick={() => setMediaToAssign(null)}
                className="text-[#625D52] hover:text-[#211F1C] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#625D52]">
              Select where this archival media asset should be rendered on the public website:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {sectionOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    if (opt.value === 'books') {
                      // default to first book if none selected
                      handleConfirmAssignment('books', books[0]?.slug ?? '');
                    } else if (opt.value === 'hero') {
                      handleConfirmAssignment('hero', 'hero-portrait');
                    } else {
                      handleConfirmAssignment(opt.value);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xs border text-left text-xs transition-colors ${
                    mediaToAssign.assignment.section === opt.value
                      ? 'border-[#A84E36] bg-[#A84E36]/10 font-semibold text-[#211F1C]'
                      : 'border-[#211F1C]/15 bg-white/70 hover:bg-white text-[#625D52]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </div>
                  {mediaToAssign.assignment.section === opt.value && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A84E36]" />
                  )}
                </button>
              ))}
            </div>

            {mediaToAssign.assignment.section !== 'unassigned' && (
              <button
                type="button"
                onClick={() => {
                  removeMediaAssignment(mediaToAssign.id);
                  setMediaToAssign(null);
                }}
                className="text-xs text-[#933420] hover:underline"
              >
                Remove current assignment (keep in vault)
              </button>
            )}

            <div className="pt-3 border-t border-[#211F1C]/10 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMediaToAssign(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 4: INSPECT & FULL EDIT METADATA MODAL
         =================================================================== */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-hidden">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/25 rounded-xs max-w-2xl w-full shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
            {/* Modal Sticky Header */}
            <div className="shrink-0 p-4 sm:p-5 border-b border-[#211F1C]/10 flex items-center justify-between bg-[#F7F4ED]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#A84E36]">
                  {selectedMedia.accessionNo}
                </span>
                <span className="text-[#8A8375]">·</span>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  {isEditingMetadata ? 'Edit Archival Metadata' : 'Archival Image Inspection'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMedia(null)}
                className="text-[#625D52] hover:text-[#211F1C] p-1.5 hover:bg-[#EAE4D8] rounded-xs transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0">

            {/* Visual Canvas */}
            <div className="aspect-[16/9] bg-[#EAE4D8] border border-[#211F1C]/15 rounded-xs overflow-hidden flex items-center justify-center relative">
              {selectedMedia.url ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.altText}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="w-12 h-12 text-[#8A8375]/40 mx-auto mb-2" />
                  <div className="font-serif text-sm font-semibold">{selectedMedia.title}</div>
                </div>
              )}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/90 text-xs shadow-xs"
                  onClick={() => handleOpenReplace(selectedMedia)}
                >
                  <RefreshCw className="w-3 h-3 text-[#A84E36]" />
                  <span>Replace File</span>
                </Button>
              </div>
            </div>

            {isEditingMetadata ? (
              <form onSubmit={handleSaveMetadataEdit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Title (English)"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                  />
                  <Input
                    label="Title (Bengali)"
                    value={editFormData.titleBn}
                    onChange={(e) => setEditFormData({ ...editFormData, titleBn: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Select
                    label="Category"
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        category: e.target.value as AdminMediaItem['category'],
                      })
                    }
                    options={categories.map((c) => ({ value: c, label: c }))}
                  />
                  <Input
                    label="Year"
                    value={editFormData.year}
                    onChange={(e) => setEditFormData({ ...editFormData, year: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={editFormData.status}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        status: e.target.value as PublicationStatus,
                      })
                    }
                    options={[
                      { value: 'published', label: 'Published (Live)' },
                      { value: 'draft', label: 'Draft (Private)' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Section Assignment"
                    value={editFormData.section}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        section: e.target.value as MediaSection,
                        targetId: e.target.value === 'books' ? books[0]?.slug ?? '' : '',
                      })
                    }
                    options={sectionOptions.map((s) => ({ value: s.value, label: s.label }))}
                  />

                  {editFormData.section === 'books' && (
                    <Select
                      label="Target Book Slug"
                      value={editFormData.targetId}
                      onChange={(e) => setEditFormData({ ...editFormData, targetId: e.target.value })}
                      options={books.map((b) => ({ value: b.slug, label: b.title }))}
                    />
                  )}
                </div>

                <Textarea
                  label="Caption (English)"
                  value={editFormData.caption}
                  onChange={(e) => setEditFormData({ ...editFormData, caption: e.target.value })}
                  rows={2}
                />
                <Textarea
                  label="Caption (Bengali)"
                  value={editFormData.captionBn}
                  onChange={(e) => setEditFormData({ ...editFormData, captionBn: e.target.value })}
                  rows={2}
                />

                <Input
                  label="Alt Text (English)"
                  value={editFormData.altText}
                  onChange={(e) => setEditFormData({ ...editFormData, altText: e.target.value })}
                />
                <Input
                  label="Alt Text (Bengali)"
                  value={editFormData.altTextBn}
                  onChange={(e) => setEditFormData({ ...editFormData, altTextBn: e.target.value })}
                />

                <div className="pt-3 border-t border-[#211F1C]/10 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingMetadata(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Metadata Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-xs font-sans">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-white/70 border border-[#211F1C]/10 rounded-2xs">
                  <div>
                    <span className="text-[10px] text-[#8A8375] uppercase block">Section</span>
                    <span className="font-semibold text-[#211F1C] uppercase font-mono">
                      {selectedMedia.assignment.section}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A8375] uppercase block">Status</span>
                    <span
                      className={`font-semibold ${
                        selectedMedia.status === 'published' ? 'text-[#2A4736]' : 'text-[#B38F44]'
                      }`}
                    >
                      {selectedMedia.status === 'published' ? 'Published (Live)' : 'Draft (Private)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A8375] uppercase block">Resolution</span>
                    <span className="font-semibold text-[#211F1C] font-mono">
                      {selectedMedia.dimensions}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8A8375] uppercase block">File Size</span>
                    <span className="font-semibold text-[#211F1C] font-mono">
                      {selectedMedia.fileSize}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#211F1C] mb-1">Archival Caption (English & Bengali)</h4>
                  <div className="space-y-1.5 bg-white/60 p-3 rounded-2xs border border-[#211F1C]/10 text-xs">
                    <p className="text-[#211F1C]">{selectedMedia.caption}</p>
                    {selectedMedia.captionBn && (
                      <p className="text-[#625D52] font-bengali-text">{selectedMedia.captionBn}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#211F1C] mb-1">Accessibility Description</h4>
                  <p className="text-[#625D52] italic bg-white/60 p-2.5 rounded-2xs border border-[#211F1C]/10 text-[11px]">
                    "{selectedMedia.altText}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#211F1C]/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setMediaToDelete(selectedMedia);
                      setSelectedMedia(null);
                    }}
                    className="text-[#933420] hover:underline text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Asset</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingMetadata(true)}
                      icon={<Edit3 className="w-3.5 h-3.5" />}
                    >
                      Edit Metadata
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedMedia(null)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 5: DELETE CONFIRMATION MODAL
         =================================================================== */}
      {mediaToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div className="bg-[#F7F4ED] border border-[#211F1C]/25 rounded-xs max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#933420] font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Confirm Media Asset Deletion</span>
            </div>
            <p className="text-xs text-[#625D52] leading-relaxed">
              Are you sure you want to permanently delete accession{' '}
              <strong className="text-[#211F1C]">{mediaToDelete.accessionNo}</strong> (
              {mediaToDelete.title})? If this image is currently assigned to a public section (such as
              the hero portrait or book cover), the public site will automatically fall back to its dignified
              curatorial plate.
            </p>
            <div className="pt-3 border-t border-[#211F1C]/10 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMediaToDelete(null)}
              >
                Cancel
              </Button>
              <button
                type="button"
                onClick={() => {
                  deleteMedia(mediaToDelete.id);
                  setMediaToDelete(null);
                }}
                className="px-3.5 py-1.5 bg-[#933420] text-white text-xs font-medium rounded-xs hover:bg-[#782918] transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
