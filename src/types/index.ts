export interface NavItem {
  label: string;
  labelBn?: string;
  path: string;
}

export type BookCategory =
  | 'Poetry'
  | "Children's Literature"
  | 'Research Books'
  | 'Edited and Memorial Books'
  | 'Other Publications';

export interface Book {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  subtitle?: string;
  subtitleBn?: string;
  category: BookCategory;
  categoryBn?: string;
  year: number;
  publisher?: string;
  publisherBn?: string;
  pages?: number;
  isbn?: string;
  summary: string;
  summaryBn?: string;
  description: string;
  jacketColor: string; // Hex for clothbound spine/jacket tone
  foilColor: string; // Gold, Silver, Ivory
  edition?: string;
  tableOfContents?: string[];
  excerpt?: string;
  featured?: boolean;
  isFullTextSupplied?: boolean;
}

export type WritingCategory =
  | 'Liberation War'
  | 'Rabindranath & Nazrul'
  | 'Music'
  | 'Biographies'
  | 'Medical Science'
  | 'Satire & Humour'
  | 'Travel Writing'
  | 'Other Essays';

export interface Writing {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  category: WritingCategory;
  categoryBn?: string;
  publishedDate?: string;
  publicationVenue?: string;
  readTime?: string;
  excerpt: string;
  body?: string;
  bodyBn?: string;
  tags: string[];
  featured?: boolean;
  hasFullText: boolean;
  unsuppliedNotice?: string;
  tableOfContents?: string[];
  relatedWritingSlugs?: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  periodBn?: string;
  title: string;
  titleBn?: string;
  category: 'Medical' | 'Literary' | 'Musical' | 'Civic' | 'Life';
  location: string;
  locationBn?: string;
  description: string;
  descriptionBn?: string;
  archivalRef?: string;
}

export type ResearchThematicCategory =
  | 'Rangpur History'
  | 'The Liberation War'
  | 'Language & Culture'
  | 'Biographies of Notable Personalities';

export interface ResearchPaper {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  year: number;
  journal?: string;
  field: ResearchThematicCategory;
  fieldBn?: string;
  abstract: string;
  authors: string[];
  citations?: number;
  doi?: string;
  locationFocus: string;
  relatedBookSlug?: string;
  hasFullText?: boolean;
}

export interface CulturalProject {
  id: string;
  title: string;
  titleBn: string;
  role: string;
  year: string;
  type: 'Classical Vocal' | 'Nazrul Sangeet' | 'Rabindra Sangeet' | 'Bhawaiya & Lalon' | 'Cultural Festival';
  description: string;
  raga?: string;
  venue?: string;
}

export interface GalleryItemData {
  id: string;
  title: string;
  titleBn?: string;
  year: string;
  category: 'Manuscripts' | 'Historic Rangpur' | 'Musical Memorabilia' | 'Medical Memorabilia' | 'Awards & Plaquettes';
  accessionNo: string;
  caption: string;
  medium: string;
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1';
  isPlaceholder: boolean;
}

export type AffiliationType =
  | 'Award'
  | 'Life Membership'
  | 'Former Position'
  | 'Founding Member'
  | 'Advisory Affiliation';

export interface AffiliationRecord {
  id: string;
  title: string;
  titleBn?: string;
  organization: string;
  organizationBn?: string;
  yearOrPeriod: string;
  type: AffiliationType;
  category: 'Literature' | 'Medicine' | 'Culture' | 'Public Service';
  citationOrRole: string;
}

export interface Award {
  id: string;
  title: string;
  titleBn?: string;
  organization: string;
  organizationBn?: string;
  year: number;
  category: 'Literature' | 'Medicine' | 'Cultural Service' | 'Civic Honor';
  citation: string;
}

export type PublicationStatus = 'published' | 'draft' | 'archived';

export interface AdminContentItem {
  id: string;
  title: string;
  titleBn?: string;
  slug: string;
  type: 'Article' | 'Essay' | 'Monograph' | 'Page';
  category: string;
  categoryBn?: string;
  status: PublicationStatus;
  author: string;
  updatedAt: string;
  excerpt: string;
  body?: string;
  tags?: string[];
  views?: number;
}

export interface AdminBook {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  subtitle?: string;
  category: BookCategory;
  year: number;
  authorOrEditor: string;
  publisher: string;
  pages?: number;
  isbn?: string;
  description: string;
  summary: string;
  jacketColor: string;
  foilColor: string;
  status: PublicationStatus;
  featured: boolean;
  coverImage?: string;
}

export type MediaSection =
  | 'hero'
  | 'books'
  | 'gallery'
  | 'biography'
  | 'music'
  | 'awards'
  | 'medical'
  | 'unassigned';

export interface AdminMediaItem {
  id: string;
  title: string;
  titleBn?: string;
  accessionNo: string;
  category: 'Manuscripts' | 'Historic Rangpur' | 'Musical Memorabilia' | 'Medical Memorabilia' | 'Awards & Plaquettes' | 'Photographic Portrait';
  year: string;
  medium: string;
  caption: string;
  captionBn?: string;
  altText: string;
  altTextBn?: string;
  fileSize: string;
  dimensions: string;
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1' | '4:5';
  uploadedAt: string;
  previewColor?: string;
  url?: string;
  status: PublicationStatus;
  assignment: {
    section: MediaSection;
    targetId?: string; // e.g. book slug, gallery accession/id, or 'hero-portrait'
  };
}

export interface AdminSettings {
  siteNameEn: string;
  siteNameBn: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  curatorName: string;
  curatorEmail: string;
  curatorPhone: string;
  location: string;
  researchHours: string;
  citationPolicy: string;
  navLabels: {
    home: string;
    biography: string;
    books: string;
    writings: string;
    medicalCareer: string;
    musicCulture: string;
    research: string;
    gallery: string;
    awards: string;
    contact: string;
  };
  featuredBookSlugs: string[];
  featuredWritingSlugs: string[];
  socialLinks: {
    researchGate?: string;
    academia?: string;
    medicalRegistry?: string;
    youtubeArchive?: string;
  };
  footerNoticeEn: string;
  footerNoticeBn: string;
}

