import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminBook,
  AdminContentItem,
  AdminMediaItem,
  AdminSettings,
  BookCategory,
  PublicationStatus,
  MediaSection,
} from '../types';
import { BOOKS_DATA, WRITINGS_DATA, GALLERY_ITEMS, ARCHIVE_META } from '../data/archiveData';

export interface ActivityLogItem {
  id: string;
  action: 'Created' | 'Updated' | 'Archived' | 'Restored' | 'Deleted';
  itemTitle: string;
  itemType: 'Book' | 'Article' | 'Page' | 'Media' | 'Settings';
  timestamp: string;
  user: string;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface AdminUser {
  name: string;
  email: string;
  role: 'Administrator' | 'Curator' | 'Archivist';
}

export interface MediaUploadPayload {
  title: string;
  titleBn?: string;
  accessionNo: string;
  category: AdminMediaItem['category'];
  year: string;
  medium: string;
  caption: string;
  captionBn?: string;
  altText: string;
  altTextBn?: string;
  section: MediaSection;
  targetId?: string;
  status: PublicationStatus;
}

export interface PublishedHeroPortrait {
  url: string;
  altText: string;
  altTextBn?: string;
  caption?: string;
  captionBn?: string;
  title?: string;
  titleBn?: string;
}

export interface SectionMediaResult {
  url: string;
  altText: string;
  altTextBn?: string;
  caption?: string;
  captionBn?: string;
  title?: string;
  titleBn?: string;
}

interface AdminContextType {
  // Authentication & Security Separation
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (passcode?: string) => boolean;
  logout: () => void;

  // Books
  books: AdminBook[];
  addBook: (book: Omit<AdminBook, 'id'>) => void;
  updateBook: (id: string, updates: Partial<AdminBook>) => void;
  deleteBook: (id: string) => void;

  // Content
  contentItems: AdminContentItem[];
  addContent: (item: Omit<AdminContentItem, 'id' | 'updatedAt'>) => void;
  updateContent: (id: string, updates: Partial<AdminContentItem>) => void;
  archiveContent: (id: string) => void;
  restoreContent: (id: string) => void;
  deleteContent: (id: string) => void;

  // Media & Image Management (Admin-only operations)
  mediaItems: AdminMediaItem[];
  addMedia: (item: Omit<AdminMediaItem, 'id' | 'uploadedAt'>) => void;
  uploadMediaFile: (
    file: File,
    payload: MediaUploadPayload
  ) => Promise<{ success: boolean; error?: string; item?: AdminMediaItem }>;
  replaceMediaFile: (id: string, file: File) => Promise<{ success: boolean; error?: string }>;
  updateMedia: (id: string, updates: Partial<AdminMediaItem>) => void;
  publishMedia: (id: string) => void;
  unpublishMedia: (id: string) => void;
  assignMedia: (id: string, section: MediaSection, targetId?: string) => void;
  removeMediaAssignment: (id: string) => void;
  deleteMedia: (id: string) => void;

  // Public Query Getters (Read-Only, Published Content Only)
  getPublishedHeroPortrait: () => PublishedHeroPortrait | null;
  getPublishedBookCover: (bookSlug: string) => string | null;
  getPublishedGalleryItem: (idOrAccession: string) => SectionMediaResult | null;
  getPublishedGalleryItems: () => {
    id: string;
    title: string;
    titleBn?: string;
    year: string;
    category: AdminMediaItem['category'];
    accessionNo: string;
    caption: string;
    captionBn?: string;
    medium: string;
    aspectRatio: AdminMediaItem['aspectRatio'];
    imageUrl?: string;
  }[];
  getPublishedSectionImage: (
    section: 'biography' | 'music' | 'awards' | 'medical'
  ) => SectionMediaResult | null;

  // Settings
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  resetSettings: () => void;

  // Activity Log
  activityLogs: ActivityLogItem[];
  addActivityLog: (action: ActivityLogItem['action'], itemTitle: string, itemType: ActivityLogItem['itemType']) => void;

  // Shell State
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Feedback Toast
  toast: ToastMessage | null;
  showToast: (message: string, type?: ToastMessage['type']) => void;
}

const initialBooks: AdminBook[] = [
  ...BOOKS_DATA.map((b, index) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    titleBn: b.titleBn,
    subtitle: b.subtitle,
    category: b.category,
    year: b.year,
    authorOrEditor: 'Dr. Md. Mofizul Islam Mantu',
    publisher: b.publisher || 'Radhaballabh Memorial Press, Rangpur',
    pages: b.pages || 120,
    isbn: b.isbn,
    description: b.description,
    summary: b.summary,
    jacketColor: b.jacketColor,
    foilColor: b.foilColor,
    status: (index === 7 ? 'draft' : 'published') as PublicationStatus,
    featured: b.featured ?? true,
    coverImage: undefined,
  })),
  {
    id: 'book-draft-01',
    slug: 'teesta-parer-smriti',
    title: 'Teesta Parer Smriti: Riverine Memoirs',
    titleBn: 'তিস্তা পাড়ের স্মৃতি ও উত্তরবঙ্গের সুর',
    subtitle: 'Collected Notes on River Morphology, Bhawaiya Melodies and Village Life',
    category: 'Other Publications' as BookCategory,
    year: 2024,
    authorOrEditor: 'Dr. Md. Mofizul Islam Mantu',
    publisher: 'Rangpur Sahitya Parishad',
    pages: 184,
    isbn: 'Pending Archival ISBN',
    description: 'Anthology of river folklore, climate witness testimony, and biographical journals.',
    summary: 'Personal reminiscences of northern waterways and rural dispensaries.',
    jacketColor: '#36454F',
    foilColor: '#EED9B3',
    status: 'draft',
    featured: false,
  },
];

const initialContent: AdminContentItem[] = [
  ...WRITINGS_DATA.slice(0, 8).map((w, index) => ({
    id: w.id,
    title: w.title,
    titleBn: w.titleBn,
    slug: w.slug,
    type: (index % 3 === 0 ? 'Essay' : index % 3 === 1 ? 'Article' : 'Monograph') as AdminContentItem['type'],
    category: w.category,
    status: 'published' as PublicationStatus,
    author: 'Dr. Md. Mofizul Islam Mantu',
    updatedAt: w.publishedDate || '2024-04-12',
    excerpt: w.excerpt,
    body: w.body || w.excerpt,
    tags: w.tags ? w.tags.slice(0, 3) : ['Archive', 'History'],
    views: 140 + index * 35,
  })),
  {
    id: 'page-medical',
    title: 'Medical Career & Clinical Service',
    titleBn: 'চিকিৎসা জীবন ও মানবসেবা',
    slug: 'medical-career',
    type: 'Page',
    category: 'Core Institutional Pages',
    status: 'published',
    author: 'Curatorial Board',
    updatedAt: '2024-01-20',
    excerpt: 'Dossier of hospital service in Iran (1984–1992), community dispensary in Radhaballabh, and medical college teaching tenure.',
    tags: ['Medical', 'Iran', 'Radhaballabh'],
    views: 920,
  },
  {
    id: 'page-music',
    title: 'Music & Cultural Stewardship',
    titleBn: 'সঙ্গীত সাধনা ও সাংস্কৃতিক নেতৃত্ব',
    slug: 'music-culture',
    type: 'Page',
    category: 'Core Institutional Pages',
    status: 'published',
    author: 'Estate Editorial Board',
    updatedAt: '2024-03-05',
    excerpt: 'Rangpur Sangeet Academy lineage (1968–1976), classical vocal sadhana, and Sammilita Sangskritik Jote activism.',
    tags: ['Music', 'Classical', 'Bhawaiya'],
    views: 840,
  },
  {
    id: 'essay-draft-archived-01',
    title: 'The Lost Dispensaries of Dinajpur and Rangpur (1885–1947)',
    titleBn: 'দিনাজপুর ও রংপুরের প্রাচীন ডিসপেনসারি ঐতিহ্য',
    slug: 'lost-dispensaries-dinajpur-rangpur',
    type: 'Essay',
    category: 'Medical Science',
    status: 'archived',
    author: 'Dr. Md. Mofizul Islam Mantu',
    updatedAt: '2021-08-14',
    excerpt: 'Historical study of early colonial medical outposts and municipal charitable dispensaries across North Bengal.',
    tags: ['History', 'Medicine', 'Colonial Bengal'],
    views: 65,
  },
];

const initialMedia: AdminMediaItem[] = [
  ...GALLERY_ITEMS.map((g) => ({
    id: g.id,
    title: g.title,
    titleBn: g.titleBn,
    accessionNo: g.accessionNo,
    category: g.category as AdminMediaItem['category'],
    year: g.year,
    medium: g.medium,
    caption: g.caption,
    captionBn: g.titleBn,
    altText: `Archival artifact ${g.accessionNo}: ${g.title} (${g.year}) - preserved in Dr. Mantu Archive`,
    altTextBn: `ঐতিহাসিক দলিল ${g.accessionNo}: ${g.titleBn || g.title}`,
    fileSize: '2.4 MB',
    dimensions: '2400 × 1600 px',
    aspectRatio: g.aspectRatio as AdminMediaItem['aspectRatio'],
    uploadedAt: '2024-01-15',
    previewColor: '#DDD6C8',
    status: 'published' as PublicationStatus,
    assignment: {
      section: 'gallery' as MediaSection,
      targetId: g.id,
    },
  })),
  {
    id: 'media-acc-06',
    title: 'Rangpur Medical College Clinical Ward Register',
    titleBn: 'রংপুর মেডিকেল কলেজ ওয়ার্ড রেজিস্টার',
    accessionNo: 'RM-1975-01',
    category: 'Medical Memorabilia',
    year: '1975',
    medium: 'Hardbound Folio with Letterpress Seal',
    caption: 'Official clinical batch assignment ledger from his undergraduate clinical internship at Rangpur Medical College Hospital.',
    captionBn: 'রংপুর মেডিকেল কলেজ হাসপাতালে ইন্টার্নশিপের ঐতিহাসিক দায়িত্ব বণ্টন খাতা।',
    altText: 'Vintage medical clinical ward register folio preserved from 1975 at Rangpur Medical College',
    altTextBn: 'রংপুর মেডিকেল কলেজের ১৯৭৫ সালের ঐতিহাসিক ক্লিনিক্যাল ওয়ার্ড রেজিস্টার',
    fileSize: '3.8 MB',
    dimensions: '3000 × 2000 px',
    aspectRatio: '16:9',
    uploadedAt: '2024-02-10',
    previewColor: '#C4BCAB',
    status: 'published',
    assignment: {
      section: 'gallery',
      targetId: 'gal-med-rmc-75',
    },
  },
];

const initialSettings: AdminSettings = {
  siteNameEn: ARCHIVE_META.nameEn,
  siteNameBn: ARCHIVE_META.nameBn,
  taglineEn: ARCHIVE_META.taglineEn,
  taglineBn: ARCHIVE_META.taglineBn,
  descriptionEn:
    'The official personal legacy archive of Dr. Md. Mofizul Islam Mantu — physician, poet, researcher, musician, and cultural activist from Rangpur, Bangladesh.',
  descriptionBn:
    'চিকিৎসা, সাহিত্য, সংগীত ও জনসেবায় নিবেদিত এক বিরল বহুভাষিক ব্যক্তিত্ব — ডা. মোঃ মফিজুল ইসলাম মান্টু স্মারক ও মহাফেজখানা।',
  curatorName: 'Misbah Sakin (Archive Secretariat)',
  curatorEmail: 'curator@drmofizulmantu.org',
  curatorPhone: '+880 1711 000000',
  location: 'Radhaballabh, Rangpur Sadar, Rangpur-5400, Bangladesh',
  researchHours: 'Sunday through Thursday, 10:00 AM – 4:00 PM (By Academic Appointment)',
  citationPolicy:
    'Materials from this archive may be cited in academic research, doctoral dissertations, and literary anthologies with formal credit to the "Dr. Md. Mofizul Islam Mantu Personal Legacy Archive, Rangpur".',
  navLabels: {
    home: 'Home (মূল পাতা)',
    biography: 'Biography (জীবনালেখ্য)',
    books: 'Books (প্রকাশিত গ্রন্থ)',
    writings: 'Writings (প্রবন্ধ ও সাহিত্য)',
    medicalCareer: 'Medical Career (চিকিৎসা জীবন)',
    musicCulture: 'Music & Culture (সঙ্গীত ও সংস্কৃতি)',
    research: 'Research (গবেষণা ও ইতিহাস)',
    gallery: 'Archival Gallery (চিত্রশালা ও দলিল)',
    awards: 'Awards (স্বীকৃতি ও সম্মাননা)',
    contact: 'Contact (যোগাযোগ ও অনুসন্ধান)',
  },
  featuredBookSlugs: [
    'oronne-tiye-pakhi-gaan',
    'nodi-amar-ma',
    'sthasyasebar-itihase-rangpur',
    'bangalir-muktijuddho',
  ],
  featuredWritingSlugs: [
    'bangalir-muktijuddho-bhasha-songram',
    'rabindranath-o-nodi',
    'nazrul-sangeet-shastrio-rup',
    'swasthyo-sebay-rangpur-dui-shatabdi',
  ],
  socialLinks: {
    researchGate: 'https://www.researchgate.net',
    academia: 'https://independent.academia.edu',
    medicalRegistry: 'https://bmdc.org.bd',
    youtubeArchive: 'https://www.youtube.com',
  },
  footerNoticeEn:
    'Dr. Md. Mofizul Islam Mantu Archive Estate. Non-commercial cultural and educational archive maintained in Rangpur, Bangladesh.',
  footerNoticeBn:
    'ডা. মোঃ মফিজুল ইসলাম মান্টু মহাফেজখানা ও স্মারক তহবিল। অলাভজনক সাহিত্য, চিকিৎসা ও সাংস্কৃতিক মহাফেজখানা।',
};

const initialActivityLogs: ActivityLogItem[] = [
  {
    id: 'log-1',
    action: 'Created',
    itemTitle: 'Teesta Parer Smriti: Riverine Memoirs',
    itemType: 'Book',
    timestamp: 'Today, 02:45 AM',
    user: 'Misbah Sakin',
  },
  {
    id: 'log-2',
    action: 'Updated',
    itemTitle: 'Bangalir Muktijuddho: Bhasha-Sanskritir Songram',
    itemType: 'Article',
    timestamp: 'Yesterday, 04:15 PM',
    user: 'Misbah Sakin',
  },
  {
    id: 'log-3',
    action: 'Archived',
    itemTitle: 'The Lost Dispensaries of Dinajpur and Rangpur',
    itemType: 'Article',
    timestamp: 'Oct 12, 2026',
    user: 'Misbah Sakin',
  },
  {
    id: 'log-4',
    action: 'Created',
    itemTitle: 'Rangpur Medical College Clinical Ward Register',
    itemType: 'Media',
    timestamp: 'Oct 11, 2026',
    user: 'Misbah Sakin',
  },
  {
    id: 'log-5',
    action: 'Updated',
    itemTitle: 'Archive Settings & Citation Policy',
    itemType: 'Settings',
    timestamp: 'Oct 09, 2026',
    user: 'Misbah Sakin',
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication & Security separation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const storedAuth = localStorage.getItem('mantu_admin_auth_v2');
      if (storedAuth !== null) {
        return storedAuth === 'true';
      }
    } catch {
      // ignore
    }
    return true; // Authorized session
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>({
    name: 'Misbah Sakin',
    email: 'curator@drmofizulmantu.org',
    role: 'Administrator',
  });

  const login = (passcode?: string): boolean => {
    // Frontend auth state gate
    setIsAuthenticated(true);
    setCurrentUser({
      name: 'Misbah Sakin',
      email: 'curator@drmofizulmantu.org',
      role: 'Administrator',
    });
    try {
      localStorage.setItem('mantu_admin_auth_v2', 'true');
    } catch {
      // ignore
    }
    showToast('Administrator session established successfully.');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      localStorage.setItem('mantu_admin_auth_v2', 'false');
    } catch {
      // ignore
    }
    showToast('Signed out of administrative console.', 'info');
  };

  // State with LocalStorage Synchronization
  const [books, setBooks] = useState<AdminBook[]>(() => {
    try {
      const saved = localStorage.getItem('mantu_admin_books_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialBooks;
  });

  const [contentItems, setContentItems] = useState<AdminContentItem[]>(initialContent);

  const [mediaItems, setMediaItems] = useState<AdminMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('mantu_admin_media_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }

    // Check if legacy hero portrait exists from previous session
    let initialList = [...initialMedia];
    try {
      const savedHero = localStorage.getItem('dr_mantu_hero_portrait');
      if (savedHero) {
        const heroItem: AdminMediaItem = {
          id: 'media-hero-portrait-01',
          title: 'Authentic Portrait of Dr. Md. Mofizul Islam Mantu',
          titleBn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
          accessionNo: 'ACC-POR-1976-01',
          category: 'Photographic Portrait',
          year: '1976',
          medium: 'Preserved Photographic Print',
          caption: 'Archival photographic portrait preserved in the Rangpur collection.',
          captionBn: 'রংপুর মহাফেজখানায় সংরক্ষিত ঐতিহাসিক আলোকচিত্র প্রতিকৃতি।',
          altText: 'Authentic photographic portrait of Dr. Md. Mofizul Islam Mantu',
          altTextBn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
          fileSize: '1.8 MB',
          dimensions: '1800 × 2250 px',
          aspectRatio: '4:5',
          uploadedAt: '2024-01-10',
          url: savedHero,
          status: 'published',
          assignment: {
            section: 'hero',
            targetId: 'hero-portrait',
          },
        };
        initialList.unshift(heroItem);
      }
    } catch {
      // ignore
    }
    return initialList;
  });

  const [settings, setSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('mantu_admin_settings_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialSettings;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(initialActivityLogs);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Synchronize to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mantu_admin_media_v2', JSON.stringify(mediaItems));
    } catch (e) {
      console.warn('LocalStorage write warning for mediaItems', e);
    }
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem('mantu_admin_books_v2', JSON.stringify(books));
    } catch (e) {
      console.warn('LocalStorage write warning for books', e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('mantu_admin_settings_v2', JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage write warning for settings', e);
    }
  }, [settings]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  const addActivityLog = (
    action: ActivityLogItem['action'],
    itemTitle: string,
    itemType: ActivityLogItem['itemType']
  ) => {
    const newLog: ActivityLogItem = {
      id: Date.now().toString(),
      action,
      itemTitle,
      itemType,
      timestamp: 'Just now',
      user: currentUser?.name || 'Administrator',
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Public Query Getters (Read-Only, Published Content Only)
  const getPublishedHeroPortrait = (): PublishedHeroPortrait | null => {
    const item = mediaItems.find(
      (m) => m.assignment.section === 'hero' && m.status === 'published' && !!m.url
    );
    if (!item || !item.url) return null;
    return {
      url: item.url,
      altText: item.altText,
      altTextBn: item.altTextBn,
      caption: item.caption,
      captionBn: item.captionBn,
      title: item.title,
      titleBn: item.titleBn,
    };
  };

  const getPublishedBookCover = (bookSlug: string): string | null => {
    // 1. Direct media assigned to this book slug and published
    const media = mediaItems.find(
      (m) =>
        m.assignment.section === 'books' &&
        m.assignment.targetId === bookSlug &&
        m.status === 'published' &&
        !!m.url
    );
    if (media?.url) return media.url;

    // 2. Fallback to book record if coverImage is specified and published
    const book = books.find((b) => b.slug === bookSlug && b.status === 'published');
    return book?.coverImage || null;
  };

  const getPublishedGalleryItem = (
    idOrAccession: string
  ): SectionMediaResult | null => {
    const media = mediaItems.find(
      (m) =>
        m.assignment.section === 'gallery' &&
        (m.assignment.targetId === idOrAccession || m.id === idOrAccession || m.accessionNo === idOrAccession) &&
        m.status === 'published' &&
        !!m.url
    );
    if (!media || !media.url) return null;
    return {
      url: media.url,
      altText: media.altText,
      altTextBn: media.altTextBn,
      caption: media.caption,
      captionBn: media.captionBn,
      title: media.title,
      titleBn: media.titleBn,
    };
  };

  const getPublishedGalleryItems = () => {
    // Return all media items assigned to gallery that are published
    const publishedGalleryMedia = mediaItems.filter(
      (m) => m.assignment.section === 'gallery' && m.status === 'published'
    );

    // Map each published gallery media into a gallery exhibit entry
    return publishedGalleryMedia.map((m) => ({
      id: m.assignment.targetId || m.id,
      title: m.title,
      titleBn: m.titleBn,
      year: m.year,
      category: m.category,
      accessionNo: m.accessionNo,
      caption: m.caption,
      captionBn: m.captionBn,
      medium: m.medium,
      aspectRatio: m.aspectRatio,
      imageUrl: m.url,
    }));
  };

  const getPublishedSectionImage = (
    section: 'biography' | 'music' | 'awards' | 'medical'
  ): SectionMediaResult | null => {
    const media = mediaItems.find(
      (m) => m.assignment.section === section && m.status === 'published' && !!m.url
    );
    if (!media || !media.url) return null;
    return {
      url: media.url,
      altText: media.altText,
      altTextBn: media.altTextBn,
      caption: media.caption,
      captionBn: media.captionBn,
      title: media.title,
      titleBn: media.titleBn,
    };
  };

  // Book CRUD
  const addBook = (newBookData: Omit<AdminBook, 'id'>) => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Administrator session required.', 'error');
      return;
    }
    const id = `book-${Date.now()}`;
    const newBook: AdminBook = { ...newBookData, id };
    setBooks((prev) => [newBook, ...prev]);
    addActivityLog('Created', newBook.title, 'Book');
    showToast(`Book "${newBook.title}" successfully registered in catalog.`);
  };

  const updateBook = (id: string, updates: Partial<AdminBook>) => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Administrator session required.', 'error');
      return;
    }
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    const bookTitle = updates.title || books.find((b) => b.id === id)?.title || 'Book';
    addActivityLog('Updated', bookTitle, 'Book');
    showToast(`Book "${bookTitle}" metadata successfully updated.`);
  };

  const deleteBook = (id: string) => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Administrator session required.', 'error');
      return;
    }
    const book = books.find((b) => b.id === id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    if (book) {
      addActivityLog('Deleted', book.title, 'Book');
      showToast(`Book "${book.title}" removed from catalog.`, 'warning');
    }
  };

  // Content CRUD
  const addContent = (newItemData: Omit<AdminContentItem, 'id' | 'updatedAt'>) => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Administrator session required.', 'error');
      return;
    }
    const id = `content-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newItem: AdminContentItem = { ...newItemData, id, updatedAt: today, views: 0 };
    setContentItems((prev) => [newItem, ...prev]);
    addActivityLog('Created', newItem.title, newItem.type === 'Page' ? 'Page' : 'Article');
    showToast(`Content item "${newItem.title}" added to directory.`);
  };

  const updateContent = (id: string, updates: Partial<AdminContentItem>) => {
    if (!isAuthenticated) {
      showToast('Unauthorized: Administrator session required.', 'error');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    setContentItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: today } : c))
    );
    const title = updates.title || contentItems.find((c) => c.id === id)?.title || 'Content Item';
    addActivityLog('Updated', title, 'Article');
    showToast(`"${title}" successfully saved.`);
  };

  const archiveContent = (id: string) => {
    if (!isAuthenticated) return;
    const item = contentItems.find((c) => c.id === id);
    if (!item) return;
    updateContent(id, { status: 'archived' });
    addActivityLog('Archived', item.title, 'Article');
    showToast(`"${item.title}" moved to archive registry.`, 'info');
  };

  const restoreContent = (id: string) => {
    if (!isAuthenticated) return;
    const item = contentItems.find((c) => c.id === id);
    if (!item) return;
    updateContent(id, { status: 'published' });
    addActivityLog('Restored', item.title, 'Article');
    showToast(`"${item.title}" restored to active status.`);
  };

  const deleteContent = (id: string) => {
    if (!isAuthenticated) return;
    const item = contentItems.find((c) => c.id === id);
    setContentItems((prev) => prev.filter((c) => c.id !== id));
    if (item) {
      addActivityLog('Deleted', item.title, 'Article');
      showToast(`"${item.title}" permanently removed.`, 'warning');
    }
  };

  // Media CRUD & Management (Restricted to Authorized Administrators)
  const addMedia = (newMediaData: Omit<AdminMediaItem, 'id' | 'uploadedAt'>) => {
    if (!isAuthenticated) {
      showToast('Access Denied: Only authenticated administrators can add media records.', 'error');
      return;
    }
    const id = `media-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newMedia: AdminMediaItem = { ...newMediaData, id, uploadedAt: today };
    setMediaItems((prev) => [newMedia, ...prev]);
    addActivityLog('Created', newMedia.title, 'Media');
    showToast(`Artifact accession "${newMedia.accessionNo}" successfully registered.`);
  };

  const uploadMediaFile = async (
    file: File,
    payload: MediaUploadPayload
  ): Promise<{ success: boolean; error?: string; item?: AdminMediaItem }> => {
    if (!isAuthenticated) {
      const errorMsg = 'Access Denied: Only authenticated administrators can upload media.';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }

    // 1. Validate File Type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      const errorMsg = `Unsupported format "${file.type || 'unknown'}". Only JPG, PNG, and WebP images are permitted for archival preservation.`;
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }

    // 2. Validate File Size (5.0 MB limit)
    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const errorMsg = `File size (${sizeMb} MB) exceeds the 5.0 MB archival threshold. Please optimize the image before uploading.`;
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }

    // 3. Process image buffer client-side
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onerror = () => {
        const errorMsg = 'Failed to read image file buffer from storage device.';
        showToast(errorMsg, 'error');
        resolve({ success: false, error: errorMsg });
      };

      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = async () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const ratio = width / height;
          let detectedAspect: AdminMediaItem['aspectRatio'] = '4:3';
          if (Math.abs(ratio - 16 / 9) < 0.2) detectedAspect = '16:9';
          else if (Math.abs(ratio - 4 / 5) < 0.15) detectedAspect = '4:5';
          else if (Math.abs(ratio - 3 / 4) < 0.15) detectedAspect = '3:4';
          else if (Math.abs(ratio - 1) < 0.15) detectedAspect = '1:1';

          const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
          const newId = `media-${Date.now()}`;
          const today = new Date().toISOString().split('T')[0];

          // Upload to Vercel Blob storage if available, otherwise retain inline data URL
          let targetUrl = dataUrl;
          try {
            const uploadRes = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: file.name,
                dataUrl,
                contentType: file.type,
              }),
            });
            if (uploadRes.ok) {
              const uploadData = await uploadRes.json();
              if (uploadData.url) {
                targetUrl = uploadData.url;
              }
            }
          } catch {
            // Fallback silently to dataUrl in offline/local environments
          }

          const newItem: AdminMediaItem = {
            id: newId,
            title: payload.title.trim(),
            titleBn: payload.titleBn?.trim() || undefined,
            accessionNo: payload.accessionNo.trim(),
            category: payload.category,
            year: payload.year.trim() || String(new Date().getFullYear()),
            medium: payload.medium.trim() || 'Digital Master Scan',
            caption: payload.caption.trim() || payload.title.trim(),
            captionBn: payload.captionBn?.trim() || undefined,
            altText: payload.altText.trim() || payload.title.trim(),
            altTextBn: payload.altTextBn?.trim() || undefined,
            fileSize: sizeFormatted,
            dimensions: `${width} × ${height} px`,
            aspectRatio: detectedAspect,
            uploadedAt: today,
            previewColor: '#DDD6C8',
            url: targetUrl,
            status: payload.status,
            assignment: {
              section: payload.section,
              targetId: payload.targetId,
            },
          };

          setMediaItems((prev) => {
            let updated = [newItem, ...prev];
            // If assigned to hero and published, ensure existing hero items are set to draft so only one is active
            if (payload.section === 'hero' && payload.status === 'published') {
              updated = updated.map((m) =>
                m.id !== newItem.id && m.assignment.section === 'hero'
                  ? { ...m, status: 'draft' as PublicationStatus }
                  : m
              );
            }
            return updated;
          });

          // If assigned to a book, also update that book's coverImage
          if (payload.section === 'books' && payload.targetId) {
            setBooks((prevBooks) =>
              prevBooks.map((b) =>
                b.slug === payload.targetId ? { ...b, coverImage: targetUrl } : b
              )
            );
          }

          addActivityLog('Created', newItem.title, 'Media');
          showToast(
            `Image "${newItem.title}" (${sizeFormatted}) registered${
              payload.status === 'published' ? ' and published to archive' : ' as draft'
            }.`
          );
          resolve({ success: true, item: newItem });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const replaceMediaFile = async (
    id: string,
    file: File
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isAuthenticated) {
      const errorMsg = 'Access Denied: Only authenticated administrators can replace media files.';
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      const errorMsg = `Unsupported format "${file.type}". Only JPG, PNG, and WebP are allowed.`;
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }

    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const errorMsg = `File size (${sizeMb} MB) exceeds the 5.0 MB archival threshold.`;
      showToast(errorMsg, 'error');
      return { success: false, error: errorMsg };
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = async () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

          let targetUrl = dataUrl;
          try {
            const uploadRes = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: file.name,
                dataUrl,
                contentType: file.type,
              }),
            });
            if (uploadRes.ok) {
              const uploadData = await uploadRes.json();
              if (uploadData.url) {
                targetUrl = uploadData.url;
              }
            }
          } catch {
            // Fallback silently to dataUrl in offline/local environments
          }

          setMediaItems((prev) =>
            prev.map((m) =>
              m.id === id
                ? {
                    ...m,
                    url: targetUrl,
                    fileSize: sizeFormatted,
                    dimensions: `${width} × ${height} px`,
                  }
                : m
            )
          );

          const current = mediaItems.find((m) => m.id === id);
          if (current?.assignment.section === 'books' && current.assignment.targetId) {
            setBooks((prev) =>
              prev.map((b) =>
                b.slug === current.assignment.targetId ? { ...b, coverImage: targetUrl } : b
              )
            );
          }

          addActivityLog('Updated', current?.title || 'Media File', 'Media');
          showToast(`Image file for "${current?.title || 'Media'}" replaced successfully (${sizeFormatted}).`);
          resolve({ success: true });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const updateMedia = (id: string, updates: Partial<AdminMediaItem>) => {
    if (!isAuthenticated) return;
    setMediaItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    const title = updates.title || mediaItems.find((m) => m.id === id)?.title || 'Media';
    addActivityLog('Updated', title, 'Media');
    showToast(`Media accession "${title}" updated.`);
  };

  const publishMedia = (id: string) => {
    if (!isAuthenticated) return;
    const target = mediaItems.find((x) => x.id === id);
    if (!target) return;

    setMediaItems((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return { ...m, status: 'published' as PublicationStatus };
        }
        // If publishing hero, ensure any other hero is set to draft
        if (target.assignment.section === 'hero' && m.assignment.section === 'hero') {
          return { ...m, status: 'draft' as PublicationStatus };
        }
        return m;
      })
    );

    // If target was assigned to a book, update that book's coverImage
    if (target.assignment.section === 'books' && target.assignment.targetId && target.url) {
      setBooks((prev) =>
        prev.map((b) => (b.slug === target.assignment.targetId ? { ...b, coverImage: target.url } : b))
      );
    }

    addActivityLog('Updated', target.title, 'Media');
    showToast(`"${target.title}" is now published and visible on the public website.`);
  };

  const unpublishMedia = (id: string) => {
    if (!isAuthenticated) return;
    const target = mediaItems.find((x) => x.id === id);
    if (!target) return;

    setMediaItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'draft' as PublicationStatus } : m))
    );

    // If target was assigned to a book, clear book's coverImage
    if (target.assignment.section === 'books' && target.assignment.targetId) {
      setBooks((prev) =>
        prev.map((b) => (b.slug === target.assignment.targetId ? { ...b, coverImage: undefined } : b))
      );
    }

    addActivityLog('Updated', target.title, 'Media');
    showToast(`"${target.title}" moved to draft. It is now hidden from public visitors.`, 'info');
  };

  const assignMedia = (id: string, section: MediaSection, targetId?: string) => {
    if (!isAuthenticated) return;
    const target = mediaItems.find((x) => x.id === id);
    if (!target) return;

    setMediaItems((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            assignment: { section, targetId },
          };
        }
        // If assigning to hero and published, unpublish other hero items
        if (section === 'hero' && target.status === 'published' && m.assignment.section === 'hero') {
          return { ...m, status: 'draft' as PublicationStatus };
        }
        return m;
      })
    );

    // If assigning to a book, update the book's coverImage (if published)
    if (section === 'books' && targetId) {
      setBooks((prev) =>
        prev.map((b) =>
          b.slug === targetId
            ? { ...b, coverImage: target.status === 'published' ? target.url : undefined }
            : b
        )
      );
    }

    addActivityLog('Updated', target.title, 'Media');
    showToast(`Assigned "${target.title}" to ${section}${targetId ? ` (${targetId})` : ''}.`);
  };

  const removeMediaAssignment = (id: string) => {
    if (!isAuthenticated) return;
    const target = mediaItems.find((x) => x.id === id);
    if (!target) return;

    setMediaItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, assignment: { section: 'unassigned' } } : m))
    );

    // If it was assigned to a book, clear book's coverImage
    if (target.assignment.section === 'books' && target.assignment.targetId) {
      setBooks((prev) =>
        prev.map((b) =>
          b.slug === target.assignment.targetId ? { ...b, coverImage: undefined } : b
        )
      );
    }

    addActivityLog('Updated', target.title, 'Media');
    showToast(`Unassigned "${target.title}".`);
  };

  const deleteMedia = (id: string) => {
    if (!isAuthenticated) return;
    const media = mediaItems.find((m) => m.id === id);
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    if (media) {
      // If deleted media was assigned to a book, clear that book's coverImage
      if (media.assignment.section === 'books' && media.assignment.targetId) {
        setBooks((prev) =>
          prev.map((b) =>
            b.slug === media.assignment.targetId ? { ...b, coverImage: undefined } : b
          )
        );
      }
      addActivityLog('Deleted', media.title, 'Media');
      showToast(`Accession "${media.accessionNo}" deleted from library.`, 'warning');
    }
  };

  // Settings
  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    if (!isAuthenticated) return;
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addActivityLog('Updated', 'Archive Configuration & Identity', 'Settings');
    showToast('Archive configuration & metadata successfully updated.');
  };

  const resetSettings = () => {
    if (!isAuthenticated) return;
    setSettings(initialSettings);
    addActivityLog('Updated', 'Settings reset to factory defaults', 'Settings');
    showToast('Archive settings reset to default baseline.', 'info');
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        books,
        addBook,
        updateBook,
        deleteBook,
        contentItems,
        addContent,
        updateContent,
        archiveContent,
        restoreContent,
        deleteContent,
        mediaItems,
        addMedia,
        uploadMediaFile,
        replaceMediaFile,
        updateMedia,
        publishMedia,
        unpublishMedia,
        assignMedia,
        removeMediaAssignment,
        deleteMedia,
        getPublishedHeroPortrait,
        getPublishedBookCover,
        getPublishedGalleryItem,
        getPublishedGalleryItems,
        getPublishedSectionImage,
        settings,
        updateSettings,
        resetSettings,
        activityLogs,
        addActivityLog,
        isSidebarCollapsed,
        toggleSidebar,
        mobileMenuOpen,
        setMobileMenuOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
