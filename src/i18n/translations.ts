export type Language = 'bn' | 'en';

export const toBengaliDigits = (val: number | string): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(val).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
};

export const translations = {
  // Navigation
  'nav.home': { bn: 'মূল পাতা', en: 'Home' },
  'nav.biography': { bn: 'জীবনালেখ্য', en: 'Biography' },
  'nav.books': { bn: 'গ্রন্থসমগ্র', en: 'Books' },
  'nav.writings': { bn: 'সাহিত্য ও প্রবন্ধ', en: 'Writings' },
  'nav.medical': { bn: 'চিকিৎসা জীবন', en: 'Medical' },
  'nav.music': { bn: 'সঙ্গীত ও সংস্কৃতি', en: 'Music & Culture' },
  'nav.research': { bn: 'গবেষণা', en: 'Research' },
  'nav.gallery': { bn: 'চিত্রশালা ও দলিল', en: 'Gallery' },
  'nav.awards': { bn: 'স্বীকৃতি ও সম্মাননা', en: 'Awards' },
  'nav.contact': { bn: 'যোগাযোগ', en: 'Contact' },
  'nav.viewCatalog': { bn: 'গ্রন্থতালিকা', en: 'View Catalog' },
  'nav.exploreLife': { bn: 'জীবনালেখ্য দেখুন', en: 'Explore His Life' },
  'nav.exploreWorks': { bn: 'গ্রন্থসমগ্র দেখুন', en: 'Explore His Works' },
  'nav.readChronicle': { bn: 'জীবনালেখ্য পড়ুন', en: 'Read Chronicle' },

  // Hero Section
  'hero.kicker': { bn: 'ব্যক্তিগত আর্কাইভ · রংপুর, বাংলাদেশ', en: 'Personal Archive · Rangpur, Bangladesh' },
  'hero.tagline': { bn: 'চিকিৎসা, সাহিত্য, সংগীত ও জনসেবায় এক জীবন', en: 'A Life in Healing, Literature, Music and Service' },
  'hero.summary': {
    bn: 'চিকিৎসক, কবি, গবেষক, সঙ্গীতশিল্পী ও সাংস্কৃতিক সংগঠক — উত্তরবঙ্গের চিকিৎসা সেবা, আঞ্চলিক ইতিহাস ও সাহিত্য সাধনায় নিবেদিত এক মানবিক জীবন।',
    en: 'Physician, poet, researcher, musician, and cultural activist dedicated to healing, regional history, and Bengali letters in northern Bangladesh.',
  },
  'hero.archivalNote': {
    bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর জীবন, চিকিৎসা ও সাহিত্য সাধনার ডিজিটাল সংগ্রহশালা।',
    en: 'Official digital archive of the life, medical service, and literary works of Dr. Md. Mofizul Islam Mantu.',
  },
  'hero.plate': { bn: 'দলিল ফলক ০১ · প্রতিকৃতি সংগ্রহ', en: 'Plate No. 01 · Portrait Folio' },
  'hero.roles': { bn: 'চিকিৎসক · কবি · গবেষক · সঙ্গীতশিল্পী', en: 'Physician · Poet · Researcher · Musician' },
  'hero.heritageSeat': { bn: 'স্মারক কেন্দ্র: রংপুর, বাংলাদেশ · জন্ম ১৯৫৩', en: 'Heritage Seat: Rangpur, Bangladesh · Est. 1953' },
  'hero.caption': { bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টু · ঐতিহাসিক প্রতিকৃতি সংরক্ষণ।', en: 'Dr. Md. Mofizul Islam Mantu · Archival photographic portrait.' },
  'hero.portraitAlt': {
    bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
    en: 'Photographic portrait of Dr. Md. Mofizul Islam Mantu',
  },
  'hero.portraitCaption': {
    bn: 'ঐতিহাসিক আলোকচিত্র প্রতিকৃতি · রংপুর সংগ্রহশালা',
    en: 'Historical Photographic Portrait · Rangpur Collection',
  },
  'hero.placeholderTitle': {
    bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর প্রতিকৃতি',
    en: 'Portrait of Dr. Md. Mofizul Islam Mantu',
  },
  'hero.placeholderNotice': {
    bn: 'ঐতিহাসিক সংরক্ষিত ফলক · রংপুর সংগ্রহশালা',
    en: 'Historical Archival Registry Plate · Rangpur Preserved Collection',
  },
  'hero.portraitBadge': {
    bn: 'ঐতিহাসিক আলোকচিত্র প্রতিকৃতি',
    en: 'Archival Photographic Portrait',
  },

  // Homepage Introduction
  'home.bioKicker': { bn: 'জীবনবৃত্তান্ত পরিচিতি', en: 'Biographical Profile' },
  'home.bioTitle': {
    bn: 'চিকিৎসক, কবি, গবেষক, সঙ্গীতশিল্পী ও সাংস্কৃতিক সংগঠক',
    en: 'Physician, Poet, Researcher, Musician, and Cultural Activist',
  },
  'home.bioSub': {
    bn: 'চিকিৎসা, সাহিত্য সাধনা ও উত্তরবঙ্গের সংস্কৃতির সমন্বিত আলেখ্য',
    en: 'A life woven into medicine, literature, music, and regional history',
  },
  'home.bioP1': {
    bn: '১৯৫৩ সালে রংপুরে জন্ম। শিক্ষাজীবনে তিনি রংপুর মেডিকেল কলেজে চিকিৎসাবিজ্ঞান পাঠের (১৯৭১–১৯৭৬) পাশাপাশি রংপুর সঙ্গীত একাডেমিতে আট বছরব্যাপী মার্গ সঙ্গীতের গভীর তালিম গ্রহণ করেন (১৯৬৮–১৯৭৬)।',
    en: 'Born in Rangpur in 1953, Dr. Md. Mofizul Islam Mantu combined rigorous medical study at Rangpur Medical College (1971–1976) with eight years of classical vocal education at Rangpur Sangeet Academy (1968–1976).',
  },
  'home.bioP2': {
    bn: '১৯৭৮ সালে বাংলাদেশে চিকিৎসাসেবা শুরু এবং ১৯৮৪ থেকে ১৯৯২ পর্যন্ত ইরানে আট বছরের আন্তর্জাতিক হাসপাতাল সেবার পর তিনি রংপুরে ফিরে পারিবারিক চিকিৎসা শুরু করেন। সেবার পাশাপাশি তিনি স্বাস্থ্যসেবা উপদেষ্টা (২০০৪–২০০৯) এবং শিক্ষকতায় (২০১০–২০২০) সক্রিয় ছিলেন এবং কবিতা, ছড়া ও আঞ্চলিক ইতিহাসের আকর গ্রন্থ রচনা করেছেন।',
    en: 'Following clinical service in Bangladesh from 1978 and eight years of medical practice in Iran (1984–1992), he established a private family medicine practice in Rangpur. Alongside healing, healthcare advisory roles (2004–2009), and teaching (2010–2020), he authored notable books in poetry, children\'s literature, and regional history.',
  },
  'home.readFullBio': { bn: 'সম্পূর্ণ জীবনালেখ্য ও সময়রেখা পড়ুন', en: 'Read Full Biography & Life Ledger' },

  // Homepage Selected Books
  'home.booksKicker': { bn: 'প্রকাশিত গ্রন্থাবলি', en: 'Published Works' },
  'home.booksTitle': { bn: 'নির্বাচিত গ্রন্থ ও সংকলন', en: 'Selected Books & Monographs' },
  'home.booksSub': { bn: 'কাব্যগ্রন্থ, শিশুসাহিত্য, প্রবন্ধ ও ইতিহাস গবেষণা', en: 'Poetry collections, children’s rhymes, essays, and regional history' },
  'home.viewAllBooks': { bn: 'সকল গ্রন্থ দেখুন', en: 'View All' },
  'home.allTitles': { bn: 'সকল গ্রন্থ', en: 'All Titles' },

  // Homepage Milestones
  'home.milestonesKicker': { bn: 'ঐতিহাসিক সময়রেখা', en: 'Chronicle' },
  'home.milestonesTitle': { bn: 'জীবনের মাইলফলক', en: 'Life in Milestones' },
  'home.milestonesSub': { bn: 'পাঁচ দশকের প্রমাণিত ও সংরক্ষিত ঐতিহাসিক ঘটনাপঞ্জি।', en: 'Documented historical milestones across five decades.' },
  'home.viewFullTimeline': { bn: 'সম্পূর্ণ ঘটনাপঞ্জি দেখুন →', en: 'Explore Complete Chronology →' },

  // Books Page
  'books.kicker': { bn: 'গ্রন্থতালিকা', en: 'PUBLICATION CATALOG' },
  'books.title': { bn: 'প্রকাশিত গ্রন্থ ও সংকলন', en: 'Published Books & Monographs' },
  'books.desc': {
    bn: 'কাব্যগ্রন্থ, শিশু-কিশোর সাহিত্য, প্রবন্ধ ও আঞ্চলিক ইতিহাস গবেষণার সংকলিত তালিকা।',
    en: 'Catalog of published poetry, children’s literature, and regional research monographs.',
  },
  'books.searchPlaceholder': { bn: 'গ্রন্থের নাম বা বিষয় দিয়ে খুঁজুন...', en: 'Search books by title, topic, or keyword...' },
  'books.showing': { bn: 'প্রদর্শিত হচ্ছে', en: 'Showing' },
  'books.of': { bn: 'এর মধ্যে', en: 'of' },
  'books.titles': { bn: 'টি গ্রন্থ', en: 'titles' },
  'books.sortNewest': { bn: 'বছর: নতুন থেকে পুরাতন', en: 'Year: Newest First' },
  'books.sortOldest': { bn: 'বছর: পুরাতন থেকে নতুন', en: 'Year: Oldest First' },
  'books.pages': { bn: 'পৃষ্ঠা', en: 'pages' },
  'books.edition': { bn: 'সংস্করণ', en: 'edition' },
  'books.noResults': { bn: 'কোন গ্রন্থ খুঁজে পাওয়া যায়নি', en: 'No Publications Located' },
  'books.noResultsDesc': { bn: 'আপনার অনুসন্ধানের সাথে মিল রেখে কোনো গ্রন্থ পাওয়া যায়নি।', en: 'No volumes match your search in this publication category.' },
  'books.resetFilter': { bn: 'অনুসন্ধান রিসেট করুন', en: 'Reset Search & Filters' },
  'books.inspect': { bn: 'গ্রন্থ বিবরণী দেখুন →', en: 'Inspect Publication →' },

  // Categories
  'cat.all': { bn: 'সকল গ্রন্থ', en: 'All Publications' },
  'cat.poetry': { bn: 'কবিতা', en: 'Poetry' },
  'cat.children': { bn: 'শিশু-কিশোর সাহিত্য', en: "Children's Literature" },
  'cat.research': { bn: 'গবেষণা গ্রন্থ', en: 'Research Books' },
  'cat.edited': { bn: 'সম্পাদিত ও স্মারক গ্রন্থ', en: 'Edited & Memorial Books' },
  'cat.other': { bn: 'অন্যান্য প্রকাশনা', en: 'Other Publications' },

  // Book Detail
  'bookDetail.kicker': { bn: 'গ্রন্থ পরিচিতি', en: 'PUBLICATION DOSSIER' },
  'bookDetail.back': { bn: 'গ্রন্থতালিকায় ফিরুন', en: 'Return to Book Library' },
  'bookDetail.about': { bn: 'গ্রন্থ পরিচিতি', en: 'About This Publication' },
  'bookDetail.dossier': { bn: 'গ্রন্থ বিবরণী ও তথ্য', en: 'Bibliographical Dossier' },
  'bookDetail.year': { bn: 'প্রকাশনার বছর', en: 'Publication Year' },
  'bookDetail.classification': { bn: 'শ্রেণিবিভাগ', en: 'Classification' },
  'bookDetail.publisher': { bn: 'প্রকাশক', en: 'Publisher' },
  'bookDetail.status': { bn: 'সংস্করণ / স্থিতি', en: 'Edition / Status' },
  'bookDetail.extent': { bn: 'পৃষ্ঠা সংখ্যা', en: 'Extent' },
  'bookDetail.isbn': { bn: 'আইএসবিএন (ISBN)', en: 'ISBN' },
  'bookDetail.toc': { bn: 'সূচিপত্র ও অধ্যায়', en: 'Table of Contents & Chapters' },
  'bookDetail.excerpt': { bn: 'নির্বাচিত অংশ', en: 'Selected Archival Excerpt' },
  'bookDetail.excerptNote': { bn: 'মুদ্রিত সংস্করণ থেকে সংগৃহীত · রংপুর', en: 'Extracted from the published edition · Rangpur' },
  'bookDetail.archivalNoticeTitle': { bn: 'আর্কাইভ কপি সংরক্ষণ:', en: 'Archival Full-Text Notice:' },
  'bookDetail.archivalNotice': {
    bn: 'ডিজিটাল স্ক্যান ও মূল মুদ্রিত কপি রংপুরের স্মৃতি পাঠাগারে সংরক্ষিত রয়েছে। গবেষকদের চাহিদামতো অনুলিপি সরবরাহ করা হয়।',
    en: 'Complete digital scans and physical copies are preserved in the Rangpur study chamber. Accessible upon scholarly request.',
  },
  'bookDetail.requestAccess': { bn: 'গবেষণার জন্য আবেদন', en: 'Request Academic Access' },
  'bookDetail.browseMore': { bn: 'আরও গ্রন্থ দেখুন', en: 'Browse More Books' },
  'bookDetail.related': { bn: 'সম্পর্কিত অন্যান্য গ্রন্থ', en: 'Related Publications' },
  'bookDetail.viewAll': { bn: 'সকল গ্রন্থ দেখুন →', en: 'View All Volumes →' },
  'bookDetail.notFound': { bn: 'গ্রন্থটি খুঁজে পাওয়া যায়নি', en: 'Publication Not Found' },

  // Biography Page
  'bio.kicker': { bn: 'জীবনবৃত্তান্ত', en: 'ARCHIVAL BIOGRAPHY' },
  'bio.title': { bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টু', en: 'Dr. Md. Mofizul Islam Mantu' },
  'bio.titleSub': { bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টু — জীবনালেখ্য', en: 'Life, Medical Vocation & Literary Contributions' },
  'bio.desc': {
    bn: 'রংপুরে চিকিৎসা সেবা, মার্গ সঙ্গীত সাধনা, আঞ্চলিক ইতিহাস গবেষণা ও সাহিত্যের পাঁচ দশকের আলেখ্য।',
    en: 'A concise chronicle of his medical vocation, classical musical education, regional research, and literary publications in Rangpur.',
  },
  'bio.tabTimeline': { bn: 'সময়রেখা ভিউ', en: 'Timeline View' },
  'bio.tabChapters': { bn: 'অধ্যায় সংক্ষেপ', en: 'Summary Chapters' },
  'bio.timelineHeading': { bn: 'কালানুক্রমিক সময়রেখা', en: 'Chronological Timeline' },
  'bio.timelineSub': {
    bn: 'শিক্ষা থেকে চিকিৎসা সেবা, ইরান প্রবাস এবং সাহিত্য গবেষণার ঐতিহাসিক পর্যায়ক্রম।',
    en: 'Historical progression from academic formation to medical practice and literary publications.',
  },
  'bio.chaptersHeading': { bn: 'জীবনালেখ্য সংক্ষেপ', en: 'Biographical Chapters in Brief' },
  'bio.chaptersSub': { bn: 'আটটি প্রধান জীবন পর্যায়ের সারসংক্ষেপ।', en: 'Concise overview across eight core life domains.' },
  'bio.ledgerTitle': { bn: 'জীবনী পরিচিতি পঞ্জি', en: 'Biographical Ledger' },
  'bio.exploreTitle': { bn: 'বিশেষায়িত বিভাগসমূহ', en: 'Explore Dedicated Archives' },
  'bio.exploreMedical': { bn: 'চিকিৎসা জীবন ও ক্লিনিক', en: 'Medical Career & Clinics' },
  'bio.exploreMusic': { bn: 'সঙ্গীত ও সাংস্কৃতিক নেতৃত্ব', en: 'Music & Cultural Leadership' },
  'bio.exploreBooks': { bn: 'প্রকাশিত গ্রন্থাবলি', en: 'Published Books & Folios' },
  'bio.exploreAwards': { bn: 'স্বীকৃতি ও সম্মাননা', en: 'Honors & Affiliations' },

  // Writings Page
  'writings.kicker': { bn: 'প্রবন্ধ ও নিবন্ধ সমগ্র', en: 'ARCHIVAL ESSAYS & REVIEWS' },
  'writings.title': { bn: 'সাহিত্য, প্রবন্ধ ও নিবন্ধ সংকলন', en: 'Writings & Scholarly Articles' },
  'writings.desc': {
    bn: 'মুক্তিযুদ্ধ, রবীন্দ্র-নজরুল চর্চা, সঙ্গীত দর্শন, চিকিৎসা নীতিশাস্ত্র ও উত্তরবঙ্গের সমাজভাবনা বিষয়ক রচনা।',
    en: 'Collected essays on history, liberation studies, music, medical ethics, and Bengali literature.',
  },
  'writings.searchPlaceholder': { bn: 'প্রবন্ধের নাম বা বিষয় দিয়ে খুঁজুন...', en: 'Search essays by title or keyword...' },
  'writings.showing': { bn: 'টি নিবন্ধ', en: 'writings' },
  'writings.read': { bn: 'প্রবন্ধ পড়ুন →', en: 'Read →' },
  'writings.summaryTag': { bn: '[সংক্ষিপ্ত পরিচিতি]', en: '[Archival Summary]' },
  'writings.venue': { bn: 'প্রকাশনা মাধ্যম:', en: 'Venue:' },
  'writings.noResults': { bn: 'কোন প্রবন্ধ পাওয়া যায়নি', en: 'No Writings Match Your Criteria' },
  'writings.noResultsDesc': { bn: 'অনুসন্ধানের সাথে সামঞ্জস্যপূর্ণ কোনো প্রবন্ধ খুঁজে পাওয়া যায়নি।', en: 'No essays or articles match your search in the selected category.' },

  // Writing Detail
  'writingDetail.kicker': { bn: 'প্রবন্ধ বিবরণী', en: 'ESSAY RECORD' },
  'writingDetail.back': { bn: 'প্রবন্ধ তালিকায় ফিরুন', en: 'Back to Writings' },
  'writingDetail.toc': { bn: 'সূচিপত্র ও পরিচ্ছেদ', en: 'Essay Outline & Sections' },
  'writingDetail.archivalNoticeTitle': { bn: 'আর্কাইভ সারসংক্ষেপ:', en: 'Archival Summary Record:' },
  'writingDetail.archivalNotice': {
    bn: 'এই নিবন্ধের মূল মুদ্রিত কপি বা সাময়িকী পাতাটি রংপুরের স্মৃতি পাঠাগারে সংরক্ষিত আছে। গবেষকগণ সরাসরি যোগাযোগের মাধ্যমে মূল অনুলিপি দেখতে পারেন।',
    en: 'Complete printed copy preserved in the Rangpur study chamber. Authenticated scholars may request access.',
  },
  'writingDetail.inquire': { bn: 'মূল দলিলের জন্য আবেদন', en: 'Request Archival Transcript' },
  'writingDetail.related': { bn: 'সম্পর্কিত অন্যান্য রচনা', en: 'Related Writings & Essays' },
  'writingDetail.statusPending': { bn: 'আর্কাইভ স্থিতি: মূল টেক্সট স্ক্যানিং প্রক্রিয়াধীন', en: 'Archival Status: Text Accession Pending' },
  'writingDetail.unsuppliedNoticeDefault': {
    bn: 'মূল প্রবন্ধটি গবেষক পাঠাগার ও পারিবারিক সংরক্ষিত নথি থেকে স্ক্যান ও ডিজিটাল প্রতিলিপির প্রক্রিয়ায় রয়েছে। এখানে গ্রন্থপঞ্জি তথ্য, সারসংক্ষেপ ও বিষয়সূচি সংরক্ষিত হলো।',
    en: 'Full article text is currently undergoing physical archival scanning and transcription from the author’s study records. The bibliographic entry, abstract, and thematic indexing are cataloged here.',
  },
  'writingDetail.excerptSummary': { bn: 'উদ্ধৃতাংশ সারসংক্ষেপ:', en: 'Excerpt Summary:' },
  'writingDetail.thematicIndices': { bn: 'বিষয়ভিত্তিক সূচক:', en: 'Thematic Indices:' },
  'writingDetail.dossierTitle': { bn: 'প্রকাশনা বিবরণী', en: 'Publication Dossier' },
  'writingDetail.category': { bn: 'শ্রেণিবিভাগ', en: 'Category' },
  'writingDetail.venue': { bn: 'প্রকাশনা মাধ্যম', en: 'Venue' },
  'writingDetail.date': { bn: 'প্রকাশের তারিখ', en: 'Date' },
  'writingDetail.textIntegrity': { bn: 'টেক্সট সংরক্ষণ স্থিতি', en: 'Text Integrity' },
  'writingDetail.fullTextAvail': { bn: 'সম্পূর্ণ পাঠ্য সংরক্ষিত', en: 'Full Archival Text Available' },
  'writingDetail.metaOnly': { bn: 'ক্যাটালগ বিবরণ সংরক্ষিত', en: 'Catalog Metadata Preserved' },
  'writingDetail.preservationRecord': { bn: 'ঐতিহাসিক আর্কাইভ সংরক্ষণ রেকর্ড', en: 'Archival Preservation Record' },
  'writingDetail.notFoundTitle': { bn: 'প্রবন্ধটি খুঁজে পাওয়া যায়নি', en: 'Writing Record Not Located' },
  'writingDetail.notFoundMsg': { bn: 'অনুরোধকৃত প্রবন্ধের শিরোনাম বা আইডি আর্কাইভে খুঁজে পাওয়া যায়নি।', en: 'The essay or article identifier was not found in the archival index.' },

  // Medical Career Page
  'medical.kicker': { bn: 'চিকিৎসা জীবন', en: 'CLINICAL RECORD' },
  'medical.title': { bn: 'পাঁচ দশকের চিকিৎসা সেবা ও মানবকল্যাণ', en: 'Five Decades of Medical Service' },
  'medical.desc': {
    bn: 'রংপুর মেডিকেল কলেজের শিক্ষা, বাংলাদেশ ও ইরানে সেবা, রাধাবল্লভে পারিবারিক চিকিৎসা এবং শিক্ষকতার ইতিহাস।',
    en: 'A historical overview of medical training, service in Bangladesh and Iran, private family practice, and medical teaching.',
  },
  'medical.buttonBook': { bn: '"স্বাস্থ্যসেবার ইতিহাসে রংপুর"', en: '"Sthasyasebar Itihase Rangpur"' },
  'medical.introTitle': { bn: 'রোগীর পাশে মানবিক চিকিৎসক', en: 'The Bedside Physician' },
  'medical.introText': {
    bn: 'রংপুর মেডিকেল কলেজে শিক্ষা সমাপনান্তে (১৯৭১–১৯৭৬) ডা. মোঃ মফিজুল ইসলাম মান্টু পাঁচ দশকেরও বেশি সময় ধরে সাধারণ মানুষের স্বাস্থ্যসেবায় যুক্ত। ইরানে দীর্ঘ আট বছরের চিকিৎসা সেবা এবং রংপুরে তিন দশকেরও বেশি সময় ধরে মানবিক পারিবারিক চিকিৎসার এক উজ্জ্বল দৃষ্টান্ত তিনি।',
    en: 'Trained at Rangpur Medical College (1971–1976), Dr. Md. Mofizul Islam Mantu has devoted over fifty years to patient-centered clinical care. His career spans international service in Iran (1984–1992) and more than thirty years of ethical family medicine in Rangpur.',
  },
  'medical.timelineTitle': { bn: 'চিকিৎসা কর্মজীবনের ধারা', en: 'Chronicle of Clinical Service' },
  'medical.timelineSub': {
    bn: 'চিকিৎসা শিক্ষা থেকে শুরু করে আন্তর্জাতিক সেবা ও নিভৃত পারিবারিক চিকিৎসার প্রধান মাইলফলক।',
    en: 'Key professional appointments across education, international practice, and family medicine.',
  },

  // Music & Culture Page
  'music.kicker': { bn: 'সঙ্গীত ও সংস্কৃতি', en: 'ARCHIVAL FOLIO' },
  'music.title': { bn: 'সঙ্গীত সাধনা, সুর ও সাংস্কৃতিক উত্তরাধিকার', en: 'Music, Vocal Traditions & Cultural Leadership' },
  'music.desc': {
    bn: 'রংপুর সঙ্গীত একাডেমিতে আট বছরের তালিম (১৯৬৮–১৯৭৬), ভাওয়াইয়া সুরের গবেষণা এবং সাংস্কৃতিক নেতৃত্ব।',
    en: 'Classical vocal training at Rangpur Sangeet Academy (1968–1976), Bhawaiya ethnomusicology, and cultural stewardship.',
  },
  'music.viewMemorabilia': { bn: 'সঙ্গীত স্মারক দেখুন', en: 'View Archival Memorabilia' },
  'music.introTitle': { bn: 'সুর ও ছন্দের সাধনা', en: 'Discipleship in Melody & Rhythm' },
  'music.introText': {
    bn: '১৯৬৮ থেকে ১৯৭৬ সাল পর্যন্ত ডা. মোঃ মফিজুল ইসলাম মান্টু রংপুর সঙ্গীত একাডেমিতে উচ্চাঙ্গ সঙ্গীতের তালিম গ্রহণ করেন। তিনি মার্গ খেয়াল, নজরুল গীতি, রবীন্দ্রসঙ্গীত এবং উত্তরবঙ্গের লোকসঙ্গীত ভাওয়াইয়ার রূপতাত্ত্বিক গবেষণায় যুক্ত থেকেছেন।',
    en: 'Between 1968 and 1976, Dr. Md. Mofizul Islam Mantu undertook formal vocal education at the historic Rangpur Sangeet Academy. His practice spans North Indian classical khayal, Nazrul Sangeet, Rabindra Sangeet, and the indigenous Bhawaiya melodies of northern Bengal.',
  },
  'music.awardBadge': { bn: 'স্বীকৃতি · ২০২২', en: 'Distinction · 2022' },
  'music.awardTitle': { bn: 'শ্রেষ্ঠ সংগঠক সম্মাননা', en: 'Best Organizer Distinction' },
  'music.awardOrg': { bn: 'জেলা শিল্পকলা একাডেমি, রংপুর', en: 'District Shilpakala Academy, Rangpur' },
  'music.awardDesc': {
    bn: 'চার দশকের সাংস্কৃতিক নেতৃত্ব ও সঙ্গীত প্রসারে অবদানের জন্য জেলা প্রশাসন ও শিল্পকলা একাডেমি, রংপুর কর্তৃক প্রদত্ত।',
    en: 'Conferred by the District Administration and Shilpakala Academy of Rangpur in recognition of four decades of cultural stewardship and musical mentorship.',
  },
  'music.audioBadge': { bn: 'অডিও সংরক্ষণ', en: 'Audio Preservation' },
  'music.audioTitle': { bn: 'আর্কাইভ মাস্টার টেপ', en: 'Archival Master Tapes' },
  'music.audioDesc': {
    bn: 'ব্যক্তিগত আসর ও সঙ্গীত একাডেমির দুর্লভ অডিও রেকর্ডিং ডিজিটাল সংরক্ষণের প্রক্রিয়াধীন রয়েছে। সংরক্ষিত প্রামাণ্য রেকর্ডিং এখানে প্রকাশ করা হবে।',
    en: 'Audio recordings from private recitals and Sangeet Academy sessions are currently being restored and cataloged for the digital collection.',
  },

  // Research Page
  'research.kicker': { bn: 'আর্কাইভ গবেষণা', en: 'ARCHIVAL SCHOLARSHIP' },
  'research.title': { bn: 'ঐতিহাসিক ও সাংস্কৃতিক গবেষণা', en: 'Historical & Cultural Research' },
  'research.desc': {
    bn: 'রংপুরের আঞ্চলিক ইতিহাস, স্বাস্থ্যসেবার বিবর্তন, একাত্তরের মুক্তিযুদ্ধ ও বিশিষ্ট ব্যক্তিত্বদের ওপর গবেষণাপত্র।',
    en: 'Regional history of Rangpur, 1971 Liberation War cultural resistance, and North Bengal biographical studies.',
  },
  'research.searchPlaceholder': { bn: 'গবেষণার বিষয় বা শিরোনাম দিয়ে খুঁজুন...', en: 'Search research papers by title or topic...' },
  'research.papersCount': { bn: 'টি গবেষণাপত্র', en: 'papers' },
  'research.citations': { bn: 'উদ্ধৃতি', en: 'citations' },
  'research.venue': { bn: 'প্রকাশনা মাধ্যম:', en: 'Venue:' },
  'research.viewMonograph': { bn: 'মূল গ্রন্থ দেখুন', en: 'View Monograph' },
  'research.inquire': { bn: 'অনুসন্ধান →', en: 'Inquire →' },
  'research.noResults': { bn: 'কোন গবেষণাপত্র পাওয়া যায়নি', en: 'No Studies Found' },
  'research.noResultsDesc': { bn: 'অনুসন্ধানের সাথে মিল রেখে কোনো গবেষণাপত্র পাওয়া যায়নি।', en: 'No research papers match your search criteria.' },

  // Gallery Page
  'gallery.kicker': { bn: 'চিত্রশালা ও দলিল', en: 'ARCHIVAL GALLERY' },
  'gallery.title': { bn: 'ঐতিহাসিক দলিল ও পাণ্ডুলিপি সংগ্রহ', en: 'Archival Documents & Manuscripts' },
  'gallery.desc': {
    bn: 'সংরক্ষিত পাণ্ডুলিপি, চিকিৎসা নথি, সঙ্গীত স্মারক ও সম্মাননা স্মারক।',
    en: 'Preserved historical records, handwritten manuscripts, medical documents, and cultural memorabilia.',
  },
  'gallery.noticeTitle': { bn: 'সংগ্রহশালা ক্যাটালগ:', en: 'Archival Collection:' },
  'gallery.notice': {
    bn: 'সংগ্রহের সকল স্মারক ও পাণ্ডুলিপি সংরক্ষিত নথিপত্র অনুসারে সংকলিত।',
    en: 'Archival materials and manuscripts cataloged from personal and family collections.',
  },
  'gallery.searchPlaceholder': { bn: 'স্মারকের নাম বা আইডি দিয়ে খুঁজুন...', en: 'Search artifacts by accession ID, medium, or title...' },
  'gallery.exhibitsCount': { bn: 'টি স্মারক প্রদর্শিত', en: 'cataloged exhibits' },
  'gallery.all': { bn: 'সকল স্মারক', en: 'All Artifacts' },
  'gallery.manuscripts': { bn: 'পাণ্ডুলিপি', en: 'Manuscripts' },
  'gallery.medical': { bn: 'চিকিৎসা স্মারক', en: 'Medical Memorabilia' },
  'gallery.musical': { bn: 'সঙ্গীত স্মারক', en: 'Musical Memorabilia' },
  'gallery.awards': { bn: 'পদক ও সম্মাননা', en: 'Awards & Medals' },
  'gallery.noResults': { bn: 'কোন স্মারক খুঁজে পাওয়া যায়নি', en: 'No Artifacts Located' },

  // Awards & Affiliations
  'awards.kicker': { bn: 'নাগরিক স্বীকৃতি', en: 'PUBLIC RECORD' },
  'awards.title': { bn: 'স্বীকৃতি, সম্মাননা ও সামাজিক সম্পৃক্ততা', en: 'Civic Honors & Institutional Roles' },
  'awards.desc': {
    bn: 'সাহিত্য সাধনা, চিকিৎসা ও সমাজকল্যাণে প্রাপ্ত প্রাতিষ্ঠানিক পদক ও আজীবন সদস্যপদ।',
    en: 'Regional medals, honorary life memberships, and institutional leadership appointments.',
  },
  'awards.primaryKicker': { bn: 'স্বীকৃতি ও পদক', en: 'Conferred Distinctions' },
  'awards.primaryTitle': { bn: 'প্রাপ্ত পদক ও সম্মাননা', en: 'Supplied Awards & Civic Medals' },
  'awards.primarySub': { bn: 'সাহিত্য সাধনা, সমাজকল্যাণ ও সংস্কৃতিতে প্রাপ্ত প্রাতিষ্ঠানিক পদক', en: 'Recognitions conferred for literature, public health, and cultural organizing' },
  'awards.conferredBy': { bn: 'প্রদানকারী সংস্থা:', en: 'Conferred by:' },
  'awards.distinctionBadge': { bn: 'স্বীকৃতি ও সম্মাননা', en: 'Honors & Distinctions' },
  'awards.registryKicker': { bn: 'প্রাতিষ্ঠানিক তালিকা', en: 'Organizational Registry' },
  'awards.registryTitle': { bn: 'প্রাতিষ্ঠানিক সম্পৃক্ততা ও ভূমিকা', en: 'Institutional Affiliations & Civic Roles' },
  'awards.registrySub': { bn: 'আজীবন সদস্যপদ, সাবেক পরিচালনা পর্ষদ ও উপদেষ্টা দায়িত্বের বিবরণ।', en: 'Carefully categorized to distinguish life memberships, former committee positions, founding roles, and advisory affiliations.' },
  'awards.showingRecords': { bn: 'টি রেকর্ড প্রদর্শিত', en: 'records' },

  // Contact Page
  'contact.kicker': { bn: 'যোগাযোগ', en: 'COMMUNICATIONS' },
  'contact.title': { bn: 'যোগাযোগ ও গবেষণা অনুসন্ধান', en: 'Research & Archival Inquiries' },
  'contact.desc': {
    bn: 'গবেষক, জীবনীকার ও ইতিহাসবিদদের জন্য পাণ্ডুলিপি পরিদর্শন ও যোগাযোগের তথ্যাবলি।',
    en: 'Archival consultations for scholars, cultural historians, and researchers.',
  },
  'contact.formTitle': { bn: 'পাণ্ডুলিপি ও গবেষণা অনুসন্ধান ফর্ম', en: 'Scholarly Consultation & Inquiry Form' },
  'contact.formSub': { bn: 'প্রকাশনা, ইতিহাস অথবা চিকিৎসা বিষয়ক গবেষণার অনুসন্ধান পাঠান।', en: 'Submit an inquiry regarding publications, historical records, or medical research.' },
  'contact.name': { bn: 'আপনার নাম', en: 'Full Name' },
  'contact.email': { bn: 'ইমেইল ঠিকানা', en: 'Email Address' },
  'contact.affiliation': { bn: 'প্রতিষ্ঠান / বিভাগ', en: 'Institution / Department' },
  'contact.inquiryType': { bn: 'অনুসন্ধানের ক্ষেত্র', en: 'Field of Inquiry' },
  'contact.subject': { bn: 'বিষয়', en: 'Inquiry Subject' },
  'contact.message': { bn: 'বিস্তারিত বার্তা / গবেষণার বিষয়বস্তু', en: 'Research Scope / Detailed Message' },
  'contact.submit': { bn: 'অনুসন্ধান বার্তা পাঠান', en: 'Submit Research Inquiry' },
  'contact.submitting': { bn: 'প্রেরণ করা হচ্ছে...', en: 'Sending Inquiry...' },
  'contact.successTitle': { bn: 'বার্তা সফলভাবে গৃহীত হয়েছে', en: 'Inquiry Received Successfully' },
  'contact.successMsg': { bn: 'আপনার অনুসন্ধানের জন্য ধন্যবাদ। আর্কাইভ সমন্বয়কারী দল আপনার বার্তার প্রেক্ষিতে দ্রুত যোগাযোগ করবেন।', en: 'Thank you for your inquiry. The archive curatorial team will review your message and respond shortly.' },
  'contact.errorTitle': { bn: 'বার্তা প্রেরণে ত্রুটি', en: 'Transmission Error' },
  'contact.errorMsg': { bn: 'ফর্মের মাধ্যমে বার্তা প্রেরণে সংযোগ ত্রুটি হয়েছে। অনুগ্রহ করে সরাসরি archive@drmofizulmantu.org ঠিকানায় যোগাযোগ করুন।', en: 'Unable to deliver message through web form at this time. Please send your inquiry directly to archive@drmofizulmantu.org.' },
  'contact.testAnother': { bn: 'নতুন অনুসন্ধান পাঠান', en: 'Submit Another Inquiry' },
  'contact.directEmail': { bn: 'সরাসরি ইমেইল পাঠান', en: 'Send via Email Client' },
  'contact.addressTitle': { bn: 'স্মারক ও পাঠাগার কেন্দ্র', en: 'The Heritage Study & Chamber' },
  'contact.addressLocation': { bn: 'রাধাবল্লভ, রংপুর সদর, রংপুর ৫৪০০, বাংলাদেশ', en: 'Radhaballabh, Rangpur Sadar, Rangpur 5400, Bangladesh' },
  'contact.visitingHoursTitle': { bn: 'সাক্ষাতের সময়সূচি', en: 'Research Consultation Hours' },
  'contact.visitingHours': { bn: 'শনিবার – বৃহস্পতিবার: সকাল ১০টা – বিকাল ৪টা', en: 'Saturday – Thursday: 10:00 AM – 4:00 PM' },
  'contact.inquirySubject': { bn: 'অনুসন্ধানের বিষয়', en: 'Inquiry Subject' },
  'contact.approvedEstateDetails': { bn: 'অনুমোদিত যোগাযোগ ও ঠিকানা', en: 'Approved Estate Contact Details' },
  'contact.correspondenceAddress': { bn: 'দাপ্তরিক যোগাযোগ ঠিকানা', en: 'Archival Correspondence Address' },
  'contact.scholarsGuidelines': { bn: 'গবেষক ও জীবনীকারদের জন্য নির্দেশিকা', en: 'Guidelines for Scholars & Biographers' },
  'contact.guideline1': { bn: 'উচ্চতর গবেষকদের নিজ বিশ্ববিদ্যালয়ের বিভাগীয় প্রত্যয়নপত্র প্রদর্শন করতে হবে।', en: 'Graduate scholars must present an institutional letter of introduction from their university department.' },
  'contact.guideline2': { bn: 'মূল হস্তলিখিত পাণ্ডুলিপিসমূহ আর্কাইভের সংরক্ষিত কক্ষে তত্ত্বাবধানে দেখার নিয়ম প্রযোজ্য।', en: 'Handwritten original manuscripts are examined in the reading room under preservation supervision.' },
  'contact.guideline3': { bn: 'কোনো অপ্রকাশিত কবিতা বা দলিলের উদ্ধৃতি প্রকাশের জন্য পূর্বানুমতি আবশ্যক।', en: 'Reproduction or publication of excerpted poems and historical documents requires written estate consent.' },
  'contact.inquiryNote': { bn: 'সকল অনুসন্ধানের বার্তা দায়িত্বশীলভাবে পর্যালোচনা করা হয়।', en: 'Inquiries are received by the archive administration.' },
  'contact.fieldAcademic': { bn: 'ঐতিহাসিক ও আর্কাইভ গবেষণা', en: 'Historical & Archival Research' },
  'contact.fieldManuscripts': { bn: 'কবিতা ও সাহিত্য পাণ্ডুলিপি', en: 'Poetry & Literary Manuscripts' },
  'contact.fieldMedical': { bn: 'রংপুরের চিকিৎসা ইতিহাস', en: 'Rangpur Healthcare History' },
  'contact.fieldMusic': { bn: 'ভাওয়াইয়া ও সঙ্গীত একাডেমি তথ্য', en: 'Bhawaiya & Sangeet Academy Inquiries' },
  'contact.fieldGeneral': { bn: 'সাধারণ নাগরিক ও শিক্ষামূলক অনুসন্ধান', en: 'General Civic & Educational Query' },

  // Gallery Additional
  'gallery.inspect': { bn: 'স্মারক পরিদর্শন করুন', en: 'Inspect Exhibit' },
  'gallery.closeDialog': { bn: 'ডায়ালগ বন্ধ করুন', en: 'Close dialog' },
  'gallery.originPeriod': { bn: 'মূল সময়কাল', en: 'Origin Period' },
  'gallery.medium': { bn: 'সংরক্ষণ মাধ্যম', en: 'Preservation Medium' },
  'gallery.curatorialNote': { bn: 'কিউরেটরীয় রেকর্ড নোট', en: 'Curatorial Record Note' },
  'gallery.clearFilter': { bn: 'ফিল্টার রিসেট করুন', en: 'Clear Gallery Filter' },

  // Search & Filter
  'search.clear': { bn: 'অনুসন্ধান মুছুন', en: 'Clear search' },
  'search.showing': { bn: 'প্রদর্শিত হচ্ছে', en: 'Showing' },
  'search.of': { bn: 'এর মধ্যে', en: 'of' },
  'search.records': { bn: 'টি রেকর্ড', en: 'records' },
  'search.archivedRecords': { bn: 'টি সংরক্ষিত রেকর্ড', en: 'archived records' },

  // State Feedback
  'state.loading': { bn: 'আর্কাইভ ও পাণ্ডুলিপির তথ্য আহরণ করা হচ্ছে...', en: 'Retrieving archival manuscripts and records...' },
  'state.emptyTitle': { bn: 'কোনো আর্কাইভ রেকর্ড পাওয়া যায়নি', en: 'No Archival Records Found' },
  'state.emptyDesc': { bn: 'আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো নথি পাওয়া যায়নি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।', en: 'There are no items matching your criteria in this folio. Try clearing your filters or altering your search terms.' },
  'state.resetFilters': { bn: 'সকল ফিল্টার রিসেট করুন', en: 'Reset All Filters' },
  'state.errorTitle': { bn: 'আর্কাইভ ইনডেক্সিং ত্রুটি', en: 'Archive Indexing Error' },
  'state.errorDesc': { bn: 'ক্যাটালগ রিপোজিটরির সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করুন।', en: 'Unable to connect to the catalog repository at this moment. Please verify your connection or attempt to reload the folio.' },
  'state.retry': { bn: 'পুনরায় চেষ্টা করুন', en: 'Retry Catalog Retrieval' },

  // Admin Interface
  'admin.dashboard': { bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  'admin.content': { bn: 'কনটেন্ট ম্যানেজার', en: 'Content Manager' },
  'admin.books': { bn: 'গ্রন্থতালিকা', en: 'Books Catalog' },
  'admin.media': { bn: 'মিডিয়া লাইব্রেরি', en: 'Media Library' },
  'admin.settings': { bn: 'সেটিংস', en: 'Site Settings' },
  'admin.publicArchive': { bn: 'পাবলিক আর্কাইভ', en: 'Public Archive' },
  'admin.sessionStatus': { bn: 'সক্রিয় সেশন', en: 'Active Session' },
  'admin.liveSite': { bn: 'ওয়েবসাইট দেখুন', en: 'View Website' },
  'admin.navHeading': { bn: 'ব্যবস্থাপনা', en: 'Management' },
  'admin.title': { bn: 'আর্কাইভ তত্ত্বাবধান ড্যাশবোর্ড', en: 'Archive Stewardship Overview' },
  'admin.subtitle': { bn: 'প্রকাশনা, প্রবন্ধ ও দলিল ব্যবস্থাপনা প্যানেল।', en: 'Administrative console for publications, articles, and archival assets.' },
  'admin.publishedBooks': { bn: 'প্রকাশিত গ্রন্থ', en: 'Published Books' },
  'admin.publishedArticles': { bn: 'প্রকাশিত প্রবন্ধ', en: 'Published Articles' },
  'admin.draftItems': { bn: 'খসড়া আইটেম', en: 'Draft Items' },
  'admin.mediaAccessions': { bn: 'সংরক্ষিত মিডিয়া স্মারক', en: 'Archival Media Accessions' },
  'admin.quickActions': { bn: 'দ্রুত পদক্ষেপ', en: 'Quick Actions' },
  'admin.addBook': { bn: 'নতুন গ্রন্থ যুক্ত করুন', en: 'Add Publication' },
  'admin.newArticle': { bn: 'নতুন প্রবন্ধ তৈরি করুন', en: 'New Article' },
  'admin.uploadMedia': { bn: 'মিডিয়া আপলোড করুন', en: 'Upload Media' },
  'admin.recentActivity': { bn: 'সাম্প্রতিক কর্মকাণ্ড', en: 'Recent Activity' },
  'admin.systemNotice': { bn: 'সিস্টেম স্ট্যাটাস', en: 'System Status' },

  // Footer
  'footer.colBio': { bn: 'জীবনী ও চিকিৎসা', en: 'Biography & Care' },
  'footer.colCreative': { bn: 'সাহিত্য ও শিল্পকর্ম', en: 'Creative Works' },
  'footer.colArchive': { bn: 'আর্কাইভ ও সংগ্রহশালা', en: 'Archive' },
  'footer.bioTimeline': { bn: 'জীবন ও সময়রেখা', en: 'Life & Timeline' },
  'footer.medicalService': { bn: 'চিকিৎসা সেবা', en: 'Medical Service' },
  'footer.awardsHonors': { bn: 'স্বীকৃতি ও পদক', en: 'Awards & Honors' },
  'footer.bookLibrary': { bn: 'গ্রন্থতালিকা', en: 'Book Library' },
  'footer.writingsEssays': { bn: 'প্রবন্ধ ও সাহিত্য', en: 'Writings & Essays' },
  'footer.historicalResearch': { bn: 'ঐতিহাসিক গবেষণা', en: 'Historical Research' },
  'footer.musicCulture': { bn: 'সঙ্গীত ও সংস্কৃতি', en: 'Music & Culture' },
  'footer.docGallery': { bn: 'চিত্রশালা ও স্মারক', en: 'Document Gallery' },
  'footer.inquiries': { bn: 'গবেষণা অনুসন্ধান', en: 'Research Inquiries' },
  'footer.copyright': { bn: 'ডা. মোঃ মফিজুল ইসলাম মান্টু স্মৃতি সংরক্ষণ উদ্যোগ। রংপুর, বাংলাদেশ।', en: 'The Dr. Md. Mofizul Islam Mantu Archive. Rangpur, Bangladesh.' },
  'footer.project': { bn: 'ঐতিহাসিক ও সাহিত্য স্মারক আর্কাইভ', en: 'Historical & Literary Archive' },

  // 404 Page
  'notFound.kicker': { bn: 'ত্রুটি ৪০৪ · পৃষ্ঠা অপসারিত', en: 'ERROR 404 · RECORD NOT LOCATED' },
  'notFound.title': { bn: 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি', en: 'Archival Record Not Located' },
  'notFound.msg': {
    bn: 'অনুরোধকৃত পাতা বা দলিলটি আর্কাইভে খুঁজে পাওয়া যায়নি অথবা স্থানান্তর করা হয়েছে।',
    en: 'The requested archival folio or ledger entry does not exist or has been relocated.',
  },
  'notFound.btnHome': { bn: 'মূল পাতায় ফিরুন', en: 'Return to Archive Home' },
  'notFound.btnBooks': { bn: 'গ্রন্থসমগ্র ব্রাউজ করুন', en: 'Browse Book Library' },

  // Common UI
  'ui.back': { bn: 'ফিরে যান', en: 'Back' },
  'ui.readMore': { bn: 'আরও পড়ুন', en: 'Read More' },
  'ui.view': { bn: 'দেখুন', en: 'View' },
  'ui.search': { bn: 'অনুসন্ধান', en: 'Search' },
  'ui.clear': { bn: 'পরিষ্কার করুন', en: 'Clear' },
  'ui.reset': { bn: 'রিসেট', en: 'Reset' },
} as const;

export type TranslationKey = keyof typeof translations;
