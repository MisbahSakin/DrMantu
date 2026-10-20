import {
  Book,
  Writing,
  TimelineEvent,
  ResearchPaper,
  CulturalProject,
  GalleryItemData,
  Award,
  AffiliationRecord,
} from '../types';

export const ARCHIVE_META = {
  nameEn: 'Dr. Md. Mofizul Islam Mantu',
  nameBn: 'ডা. মোঃ মফিজুল ইসলাম মান্টু',
  portraitUrl: '', // Real photograph path (e.g. '/images/dr-mantu.jpg') or uploaded via UI
  taglineEn: 'A Life in Healing, Literature, Music and Service',
  taglineBn: 'চিকিৎসা, সাহিত্য, সংগীত ও জনসেবায় এক জীবন',
  birthYear: '1953',
  birthYearNote: 'Official certificate records a variant date',
  birthplace: 'Rangpur, Bangladesh',
  education: [
    {
      institution: 'Rangpur High School',
      institutionBn: 'রংপুর জিলা স্কুল / রংপুর উচ্চ বিদ্যালয়',
      level: 'Secondary Education (SSC)',
      period: 'Formative Years',
    },
    {
      institution: 'Carmichael College, Rangpur',
      institutionBn: 'কারমাইকেল কলেজ, রংপুর',
      level: 'Higher Secondary Education (HSC)',
      period: 'Pre-Medical Science',
    },
    {
      institution: 'Rangpur Medical College',
      institutionBn: 'রংপুর মেডিকেল কলেজ',
      level: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)',
      period: '1971–1976',
    },
    {
      institution: 'Rangpur Sangeet Academy',
      institutionBn: 'রংপুর সঙ্গীত একাডেমি',
      level: 'Formal Musical Discipleship (Classical Vocal & Harmonium)',
      period: '1968–1976',
    },
  ],
  roles: ['Physician', 'Poet', 'Researcher', 'Musician', 'Cultural Activist'],
  rolesBn: ['চিকিৎসক', 'কবি', 'গবেষক', 'সঙ্গীতশিল্পী', 'সাংস্কৃতিক ব্যক্তিত্ব'],
  biographySummary:
    'Dr. Md. Mofizul Islam Mantu is a distinguished Bangladeshi physician, poet, researcher, musician, and cultural activist from Rangpur. Over five decades of practice and creative devotion, he has served his community through family medicine, public health advocacy, lyric poetry, historical research, and classical music education.',
  biographySummaryBn:
    'রংপুরের বিশিষ্ট চিকিৎসক, কবি, গবেষক, সঙ্গীতশিল্পী ও সাংস্কৃতিক সংগঠক ডা. মোঃ মফিজুল ইসলাম মান্টু। চিকিৎসা সেবা, সাহিত্য সাধনা, আঞ্চলিক ইতিহাস গবেষণা ও সঙ্গীতের নিবিড় চর্চায় তিনি পাঁচ দশকেরও বেশি সময় ধরে আত্মনিয়োগ করে আছেন।',
  contactAddress: {
    street: 'The Dr. Mantu Heritage Study & Chamber, Radhaballabh',
    city: 'Rangpur Sadar',
    postalCode: 'Rangpur 5400',
    country: 'Bangladesh',
    note: 'In-person visits to the manuscript reading room are arranged by prior academic appointment.',
  },
};

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-1',
    slug: 'oronne-tiye-pakhi-gaan',
    title: 'Oronne Tiye Pakhi Gaan',
    titleBn: 'অরণ্যে টিয়ে পাখি গান',
    subtitle: 'Poems of Solitude, Nature and Riverine Memory',
    subtitleBn: 'নিসর্গ ও ভাবনার কবিতা',
    category: 'Poetry',
    categoryBn: 'কবিতা',
    year: 1996,
    publisher: 'Rangpur Sahitya Prakashan',
    publisherBn: 'রংপুর সাহিত্য প্রকাশন',
    pages: 112,
    isbn: '978-984-7002-01-9',
    jacketColor: '#3D4F46', // Deep forest moss slate
    foilColor: '#D4AF37',
    edition: 'First Edition (1996)',
    summary:
      'A poetic meditation exploring nature, birdsong, inner solitude, and the rural landscape of northern Bangladesh.',
    summaryBn:
      'উত্তরবঙ্গের শ্যামল নিসর্গ, পাখ-পাখালির সুর এবং মানুষের আত্মিক নির্জনতা নিয়ে রচিত কবিতার সংকলন।',
    description:
      'First published in 1996, this collection reflects the author’s early poetic maturity, centering on avian symbolism, quiet riverbanks, and the seasonal changes of Rangpur.',
    tableOfContents: [
      '১. অরণ্যের ডাক (The Call of the Forest)',
      '২. টিয়ে পাখির গান (Song of the Parakeet)',
      '৩. সন্ধ্যার নিস্তব্ধতা (Dusk Silence)',
      '৪. উত্তরবঙ্গের ধূলিপথ (Dusty Road of North Bengal)',
    ],
    excerpt: 'অরণ্যের ভেতর একাকী যে পাখি গান গায়,\nতার সুরে কোনো প্রত্যাশা নেই, আছে শুধু বেঁচে থাকার ব্যাকুল আর্তি।',
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-2',
    slug: 'choray-choray-jana',
    title: 'Choray Choray Jana',
    titleBn: 'ছড়ায় ছড়ায় জানা',
    subtitle: 'Rhymes of Knowledge and Discovery for Young Readers',
    subtitleBn: 'শিশু-কিশোরদের জন্য জ্ঞানের ছড়া',
    category: "Children's Literature",
    categoryBn: 'শিশু-কিশোর সাহিত্য',
    year: 2002,
    publisher: 'Kishor Sahitya Bhaban',
    publisherBn: 'কিশোর সাহিত্য ভবন',
    pages: 72,
    isbn: '978-984-7002-02-6',
    jacketColor: '#8C5A3E', // Warm terracotta clay
    foilColor: '#F5E6C8',
    edition: 'Illustrated Children’s Edition (2002)',
    summary:
      'A collection of playful, educational rhymes introducing children to nature, rivers, basic science, and positive social values.',
    summaryBn:
      'ছন্দে ছন্দে প্রকৃতি, বিজ্ঞান ও চারপাশের জগৎ চেনার আনন্দময় কিশোর সাহিত্য সংকলন।',
    description:
      'Designed to awaken intellectual curiosity in children through musical rhythm, clever wordplay, and vernacular idioms rooted in Bengal’s countryside.',
    tableOfContents: [
      '১. নদীর দেশে নদী চিনি (Knowing Rivers)',
      '২. স্বাস্থ্যকথার ছড়া (Rhymes for Health)',
      '৩. রঙের মেলা (Fair of Colors)',
      '৪. তারার খবর (News of Stars)',
    ],
    excerpt: 'নদীর বাঁকে সকাল সাঁঝে\nমাঝি ভাইয়ের গান যে বাজে,\nজল আর মাটি মিলিয়ে চলে\nদেশটা আমার কেমন বলে!',
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-3',
    slug: 'provu-tomar-namei-pori',
    title: 'Provu Tomar Namei Pori',
    titleBn: 'প্রভু তোমার নামেই পড়ি',
    subtitle: 'Spiritual and Devotional Verses',
    subtitleBn: 'ভক্তিমূলক ও আত্মিক উপলব্ধির কবিতা',
    category: 'Poetry',
    categoryBn: 'কবিতা',
    year: 2004,
    publisher: 'Uttaran Grantha Shala',
    publisherBn: 'উত্তরণ গ্রন্থশালা',
    pages: 96,
    isbn: '978-984-7002-03-3',
    jacketColor: '#2F3C48', // Deep twilight ink
    foilColor: '#E6D3A3',
    edition: 'First Edition (2004)',
    summary:
      'Contemplative spiritual poems reflecting on divine benevolence, human mortality, humility, and moral responsibility.',
    summaryBn:
      'স্রষ্টার প্রতি কৃতজ্ঞতা, আত্মশুদ্ধি ও আধ্যাত্মিক ভাবনার অন্তরঙ্গ কাব্য সংকলন।',
    description:
      'A lyrical exploration of faith, inner conscience, and the seeking of peace amidst the trials of medical service and human suffering.',
    tableOfContents: [
      '১. প্রার্থনার সুর (Melody of Prayer)',
      '২. আলো ও অন্ধকারের মাঝে (Between Light and Shadow)',
      '৩. কৃতজ্ঞ চিত্ত (A Grateful Heart)',
      '৪. জীবনের গোধূলি (Twilight of Life)',
    ],
    excerpt: 'তোমার নামেই চোখ মেলে চাই,\nতোমার করুণায় পথ খুঁজে পাই।',
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-4',
    slug: 'nodi-amar-ma',
    title: 'Nodi Amar Ma',
    titleBn: 'নদী আমার মা',
    subtitle: 'Riverine Poems of Bengal and Northern Soil',
    subtitleBn: 'নদীমাতৃক বাংলার আত্মকথা',
    category: 'Poetry',
    categoryBn: 'কবিতা',
    year: 2014,
    publisher: 'Teesta Sahitya Parishad',
    publisherBn: 'তিস্তা সাহিত্য পরিষদ',
    pages: 128,
    isbn: '978-984-7002-04-0',
    jacketColor: '#3B5360', // Riverine slate blue
    foilColor: '#D4AF37',
    edition: 'Second Print (2015)',
    summary:
      'A poignant collection honoring the Teesta, Ghaghot, and Jamuna rivers as maternal life-sources of Northern Bengal.',
    summaryBn:
      'তিস্তা ও ঘাঘট অববাহিকার জনজীবন, ভাঙন ও মমতাময়ী নদীকে মাতৃরূপে উপলব্ধির কাব্যগাথা।',
    description:
      'Written after decades of observing the seasonal floods and droughts of northern river basins, treating the river as a living maternal witness.',
    tableOfContents: [
      '১. মায়ের আঁচল নদী (The River as Mother’s Lap)',
      '২. চরবাসীর কান্না (Lament of the Shoal Dwellers)',
      '৩. পলিমাটির সুবাস (Scent of the Silt)',
      '৪. জলের স্রোতে স্মৃতি (Memories in Current)',
    ],
    excerpt: 'নদী যে মা, তার বুকেতেই জন্ম মোদের ঘর,\nজলের স্নেহে জুড়িয়ে যায় তপ্ত বুকের চর।',
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-5',
    slug: 'bondhu-to-bondhui',
    title: 'Bondhu to Bondhui',
    titleBn: 'বন্ধু তো বন্ধুই',
    subtitle: 'Reflections on Fellowship, Friendship and Memory',
    subtitleBn: 'বন্ধুত্ব, স্মৃতিচারণ ও আন্তরিক সম্পর্কের গদ্য',
    category: 'Edited and Memorial Books',
    categoryBn: 'সম্পাদিত ও স্মারক গ্রন্থ',
    year: 2018,
    publisher: 'Rangpur Sahitya Prakash',
    publisherBn: 'রংপুর সাহিত্য প্রকাশ',
    pages: 144,
    isbn: '978-984-7002-05-7',
    jacketColor: '#6B4235', // Warm terracotta brick
    foilColor: '#EED9B3',
    edition: 'First Edition (2018)',
    summary:
      'Prose essays and memorial reflections celebrating human bonds, youthful companionships, and the sacred value of friendship across time.',
    summaryBn:
      'জীবনের দীর্ঘ পথে পাওয়া বন্ধু-সুহৃদদের স্মৃতি ও নিঃস্বার্থ ভালোবাসার নিবিড় আলেখ্য।',
    description:
      'Reflecting on fifty years of friendships formed in medical halls, music academies, and the cultural societies of Rangpur.',
    tableOfContents: [
      '১. শৈশবের সহপাঠী (Childhood Classmates)',
      '২. চিকিৎসা জীবনের সুহৃদ (Friends in the Medical Wards)',
      '৩. দূর প্রবাসের চিঠি (Letters from Abroad)',
      '৪. স্মৃতির অমলিন প্রদীপ (Unfading Lamp of Memory)',
    ],
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-6',
    slug: 'sthasyasebar-itihase-rangpur',
    title: 'Sthasyasebar Itihase Rangpur',
    titleBn: 'স্বাস্থ্যসেবার ইতিহাসে রংপুর',
    subtitle: 'A Historical Monograph on Regional Healthcare Evolution',
    subtitleBn: 'রংপুর অঞ্চলের চিকিৎসা ঐতিহ্য ও প্রাতিষ্ঠানিক বিবর্তন',
    category: 'Research Books',
    categoryBn: 'গবেষণা গ্রন্থ',
    year: 2020,
    publisher: 'Rangpur Gobeshona Kendro',
    publisherBn: 'রংপুর গবেষণা কেন্দ্র',
    pages: 256,
    isbn: '978-984-7002-06-4',
    jacketColor: '#2B4141', // Deep historical teal
    foilColor: '#D4AF37',
    edition: 'First Research Monograph (2020)',
    summary:
      'A pioneering regional history documenting charitable dispensaries, epidemic management, hospitals, and physician profiles of Rangpur across two centuries.',
    summaryBn:
      'উপনিবেশিক কাল থেকে বর্তমান পর্যন্ত রংপুরের চিকিৎসালয়, মহামারি প্রতিরোধ ও চিকিৎসকদের ভূমিকা নিয়ে প্রামাণ্য গবেষণা।',
    description:
      'A seminal historical survey bringing together archival administrative records, hospital registers, and oral histories of medicine in northern Bengal.',
    tableOfContents: [
      '১. প্রাচীন চিকিৎসা ব্যবস্থা ও কবিরাজি যুগ (Early Healthcare Systems)',
      '২. ডিসপেনসারি ও ব্রিটিশ আমলের হাসপাতাল (Colonial Charitable Dispensaries)',
      '৩. রংপুর মেডিকেল কলেজের প্রতিষ্ঠা ও বিবর্তন (Establishment of Rangpur Medical College)',
      '৪. কালাজ্বর ও সংক্রামক ব্যাধি মোকাবিলার ইতিহাস (History of Epidemics & Kala-azar)',
      '৫. স্মরণীয় চিকিৎসকদের অবদান (Notable Physicians of Rangpur)',
    ],
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-7',
    slug: 'bangalir-muktijuddho-bhasha-sanskritir-songram',
    title: 'Bangalir Muktijuddho: Bhasha-Sanskritir Songram',
    titleBn: 'বাঙালির মুক্তিযুদ্ধ: ভাষা-সংস্কৃতির সংগ্রাম',
    subtitle: 'The Liberation War and the Cultural Struggle of the Bengali Nation',
    subtitleBn: 'জাতীয় মুক্তির প্রেক্ষাপটে ভাষা ও সাংস্কৃতিক প্রতিরোধ',
    category: 'Research Books',
    categoryBn: 'গবেষণা গ্রন্থ',
    year: 2020,
    publisher: 'Muktijuddho Gobeshona Parishad',
    publisherBn: 'মুক্তিযুদ্ধ গবেষণা পরিষদ',
    pages: 288,
    isbn: '978-984-7002-07-1',
    jacketColor: '#6B2D2D', // Deep historical crimson
    foilColor: '#E6D3A3',
    edition: 'First Edition (2020)',
    summary:
      'A rigorous historical exploration of the Bengali democratic and cultural struggles leading from the 1952 Language Movement to the 1971 Liberation War.',
    summaryBn:
      'বায়ান্নর ভাষা আন্দোলন থেকে একাত্তরের মুক্তিযুদ্ধ—বাঙালির স্বাধিকার সংগ্রামের সাংস্কৃতিক ভিত্তির বিশদ বিশ্লেষণ।',
    description:
      'Focusing on the northern front (Sector 6), cultural mobilization in Rangpur, patriotic music, and regional participation in national emancipation.',
    tableOfContents: [
      '১. ভাষা আন্দোলনের বিস্তার ও উত্তরবঙ্গ (Language Movement in North Bengal)',
      '২. সাংস্কৃতিক জাগরণ ও স্বাধিকার চেতনা (Cultural Awakening)',
      '৩. ১৯৭১: প্রতিরোধ ও মুক্তিযুদ্ধের রণক্ষেত্র (1971 Resistance and Battlefields)',
      '৪. স্বাধীনতার গান ও জনপদের চেতনা (Songs of Freedom and Collective Spirit)',
    ],
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-8',
    slug: 'swapnovor-selected-poetry',
    title: 'Swapnovor, Selected Poetry Book',
    titleBn: 'স্বপ্নভোর, নির্বাচিত কবিতা',
    subtitle: 'Anthology of Selected Verses (1980–2025)',
    subtitleBn: 'দীর্ঘ কাব্যযাত্রার নির্বাচিত পঙক্তিমালা',
    category: 'Poetry',
    categoryBn: 'কবিতা',
    year: 2026,
    publisher: 'Kavita Bhaban',
    publisherBn: 'কবিতা ভবন',
    pages: 210,
    isbn: '978-984-7002-08-8',
    jacketColor: '#4A3B4E', // Plum dusk cloth
    foilColor: '#D4AF37',
    edition: 'Retrospective Anthology (2026)',
    summary:
      'A comprehensive curated volume compiling four decades of lyric poetry, sonnets, and humanistic verses.',
    summaryBn:
      'চার দশকের সাহিত্যসাধনায় রচিত শ্রেষ্ঠ কবিতাগুলোর নির্বাচিত সংকলন।',
    description:
      'Organized thematically around memory, healing, the ecology of rivers, and twilight contemplations.',
    tableOfContents: [
      '১. ভোরের প্রার্থনা (Dawn Prayer)',
      '২. নদী ও জনপদ (Rivers and Settlements)',
      '৩. ব্যথার উপশম (Remedy for Grief)',
      '৪. জীবনের গোধূলি প্রহর (Twilight Hours of Existence)',
    ],
    excerpt: 'স্বপ্নের ভোরে জেগে ওঠে যে সুর,\nসে সুর পৌঁছে দেয় হৃদয় বহু দূর।',
    featured: true,
    isFullTextSupplied: false,
  },
  {
    id: 'book-9',
    slug: 'rangpur-sahitya-smarak-grantha',
    title: 'Rangpur Sahitya O Sanskriti Smarak',
    titleBn: 'রংপুর সাহিত্য ও সংস্কৃতি স্মারক',
    subtitle: 'Commemorative Archival Volume on Northern Literary Heritage',
    subtitleBn: 'উত্তর জনপদের সাহিত্য-সাংস্কৃতিক ঐতিহ্যের প্রামাণ্য স্মারক',
    category: 'Edited and Memorial Books',
    categoryBn: 'সম্পাদিত ও স্মারক গ্রন্থ',
    year: 2016,
    publisher: 'Rangpur Sahitya Parishad',
    publisherBn: 'রংপুর সাহিত্য পরিষদ',
    pages: 312,
    isbn: '978-984-7002-09-5',
    jacketColor: '#394648',
    foilColor: '#D4AF37',
    summary:
      'An edited memorial volume compiling research papers, memoirs, and archival profiles of regional writers and cultural pioneers from Rangpur.',
    summaryBn:
      'রংপুরের সাহিত্যিক ও সংস্কৃতি কর্মীদের জীবন ও কর্ম নিয়ে সংকলিত মূল্যবান স্মারক গ্রন্থ।',
    description:
      'Co-edited and compiled to document northern Bengal’s literary history, preserving rare periodicals and biographies of regional polymaths.',
    featured: false,
    isFullTextSupplied: false,
  },
  {
    id: 'book-10',
    slug: 'smritir-jolchobi-iran-travels',
    title: 'Smritir Jolchobi: Iraner Dinguli',
    titleBn: 'স্মৃতির জলছবি: ইরানের দিনগুলি',
    subtitle: 'Travel Memoirs and Clinical Observations from Iran',
    subtitleBn: 'প্রবাসের চিকিৎসা স্মৃতি ও পারস্যের দিনলিপি',
    category: 'Other Publications',
    categoryBn: 'অন্যান্য প্রকাশনা',
    year: 2011,
    publisher: 'Ananya Prakashani',
    publisherBn: 'অনন্যা প্রকাশনী',
    pages: 184,
    isbn: '978-984-7002-10-1',
    jacketColor: '#533D35',
    foilColor: '#E6D3A3',
    summary:
      'A travel and clinical memoir recounting eight years of medical practice in Iran (1984–1992), Persian cultural encounters, and reflections on life abroad.',
    summaryBn:
      'ইরানে আট বছরের চিকিৎসা সেবা, পারস্যের সংস্কৃতি, ইতিহাস ও দূর প্রবাসের দিনলিপি নিয়ে স্মৃতিচারণমূলক প্রকাশনা।',
    description:
      'A vivid personal narrative tracing his hospital practice, cross-cultural medical encounters, and observations of Iran’s historic architecture and people.',
    featured: false,
    isFullTextSupplied: false,
  },
];

export const WRITINGS_DATA: Writing[] = [
  {
    id: 'w-lib-1',
    slug: 'cultural-resistance-sector-6-1971',
    title: 'Cultural Resistance and Humanitarian Service in Sector 6 (1971)',
    titleBn: '১৯৭১: ৬ নম্বর সেক্টরে সাংস্কৃতিক প্রতিরোধ ও মানবিক চিকিৎসা',
    category: 'Liberation War',
    categoryBn: 'মুক্তিযুদ্ধ',
    publishedDate: 'March 2011',
    publicationVenue: 'Muktijuddho Gobeshona Smarak',
    readTime: '6 min read',
    excerpt:
      'Reflections on how northern students, doctors, and cultural organizers sustained the morale of the freedom fighters during the 1971 War of Independence.',
    body: `একাত্তরের মুক্তিযুদ্ধ কেবল সামরিক রণাঙ্গনের যুদ্ধ ছিল না; এটি ছিল একটি সমগ্র জাতির সাংস্কৃতিক অস্তিত্বের লড়াই। উত্তর জনপদের ৬ নম্বর সেক্টরে যখন সম্মুখসমর চলছিল, তখন স্থানীয় চিকিৎসাকর্মী ও তরুণরা জীবনের ঝুঁকি নিয়ে আহত মুক্তিযোদ্ধাদের চিকিৎসা ও খাদ্য সরবরাহে নিয়োজিত ছিলেন।

রংপুর ও কুড়িগ্রামের সীমান্তবর্তী এলাকায় তখন কোনো আধুনিক ফিল্ড হাসপাতাল ছিল না। বাঁশের মাচা, লণ্ঠনের আলো আর সামান্য কয়েকটি জরুরি স্যালাইনই ছিল একমাত্র সম্বল। সেই সংকটময় দিনে মানুষের চোখে যে অপরিসীম আত্মত্যাগ ও মুক্তির আকাঙ্ক্ষা দেখা গিয়েছিল, তা বাংলা সাহিত্যের যেকোনো মহাকাব্যের চেয়েও উজ্জ্বল।`,
    tags: ['Liberation War', 'Sector 6', 'Northern Front', 'Humanitarian'],
    featured: true,
    hasFullText: true,
    tableOfContents: [
      '১. উত্তর জনপদের প্রতিরোধ সূচনা',
      '২. সীমান্ত শিবিরে জরুরি চিকিৎসা সেবা',
      '৩. স্বাধীন বাংলা বেতার ও সাংস্কৃতিক উদ্দীপনা',
      '৪. স্বাধীনতার রক্তিম মূল্য',
    ],
  },
  {
    id: 'w-rab-1',
    slug: 'rabindranath-and-nature-of-bengal',
    title: 'Rabindranath Tagore: Riverine Solitude and the Harmony of Nature',
    titleBn: 'রবীন্দ্রনাথের নদীভাবনা ও পদ্মাপর্বের নিসর্গচেতনা',
    category: 'Rabindranath & Nazrul',
    categoryBn: 'রবীন্দ্র ও নজরুল ভাবনা',
    publishedDate: 'May 2008',
    publicationVenue: 'Sahitya Patrika, Rangpur',
    readTime: '7 min read',
    excerpt:
      'Analyzing Tagore’s intimate encounters with the rivers of Bengal and how riverine solitude shaped the philosophical depth of his music and poetry.',
    body: `রবীন্দ্রনাথের সৃষ্টিশীল জীবনের এক পরম ঐশ্বর্যময় পর্ব হচ্ছে তাঁর উত্তরবঙ্গ ও পূর্ববঙ্গের নদীভ্রমণ। বোটে বসে পদ্মার রূপ, শান্ত জলরাশি এবং দূর দিগন্তের চরের দৃশ্য তাঁর ভেতরে যে সুরের সঞ্চার করেছিল, তা আমাদের গীতিসাহিত্যের ভিত্তি রচনা করেছে।

একজন নিভৃতচারী কবির চোখে নদী কখনোই কেবল জলপ্রবাহ নয়; নদী হলো কালের চিরন্তন স্রোত, যা মানুষের মিলন ও বিরহের চিরসাক্ষী। রবীন্দ্রনাথের গান যখন উত্তরবঙ্গের শান্ত সন্ধ্যায় গীত হয়, তখন মনে হয় সুর যেন এই মাটির ভেতর থেকেই উৎসারিত হচ্ছে।`,
    tags: ['Rabindranath Tagore', 'Riverine Bengal', 'Music', 'Nature'],
    featured: true,
    hasFullText: true,
    tableOfContents: [
      '১. নদীমাতৃক বাংলার রূপ ও রবীন্দ্রমনন',
      '২. ছিন্নপত্র ও পদ্মা অববাহিকার মানুষ',
      '৩. সুরের ভেতর প্রকৃতির স্পন্দন',
    ],
  },
  {
    id: 'w-naz-1',
    slug: 'nazrul-rebel-voice-and-ragas',
    title: 'Kazi Nazrul Islam: The Synthesis of Revolutionary Fire and Classical Ragas',
    titleBn: 'কাজী নজরুল ইসলাম: দ্রোহের বহ্নিশিখা ও রাগসঙ্গীতের রসায়ন',
    category: 'Rabindranath & Nazrul',
    categoryBn: 'রবীন্দ্র ও নজরুল ভাবনা',
    publishedDate: 'August 2014',
    publicationVenue: 'Uttaran Boishakhi Sangkalan',
    readTime: '6 min read',
    excerpt:
      'Examining Nazrul’s profound mastery over classical ragas and how he channeled classical discipline into both revolutionary songs and devotional hymns.',
    body: `বিদ্রোহী কবি হিসেবে আমরা নজরুলকে যে উচ্চতায় দেখি, তাঁর সঙ্গীতস্রষ্টা রূপটিও সমভাবে বিস্ময়কর। হিন্দুস্থানি উচ্চাঙ্গ সঙ্গীতের শত শত রাগ-রাগিণীকে তিনি যেভাবে বাংলা ভাষার স্বকীয় বাণীতে রূপ দিয়েছেন, তা পৃথিবীর ইতিহাসে বিরল।

ভৈরবী থেকে দরবারি কানাড়া—প্রতিটি রাগের সুরবিন্যাসে তিনি খুঁজে পেয়েছিলেন মানুষের স্বাধীনতার ডাক ও পরমেশ্বরের প্রতি আকুল সমর্পণ। নজরুলের গানের চর্চা একজন শিল্পীকে একই সাথে আত্মমর্যাদাবোধ ও গভীর সুরচেতনায় ঋদ্ধ করে।`,
    tags: ['Kazi Nazrul Islam', 'Nazrul Sangeet', 'Classical Ragas', 'Music'],
    featured: true,
    hasFullText: true,
  },
  {
    id: 'w-mus-1',
    slug: 'bhawaiya-and-classical-modes',
    title: 'Bhawaiya and the Classical Ragas: Melodic Dialectics of Northern Bengal',
    titleBn: 'ভাওয়াইয়া সুর ও শাস্ত্রীয় রাগ: উত্তর জনপদের সুরের ব্যাকরণ',
    category: 'Music',
    categoryBn: 'সঙ্গীত',
    publishedDate: 'December 2005',
    publicationVenue: 'Rangpur Sangeet Academy Journal',
    readTime: '8 min read',
    excerpt:
      'A musicological study exploring the shared microtonal contours and emotive curves between regional Bhawaiya folk songs and classical Ragas Kafi and Khamaj.',
    body: `উত্তরবঙ্গের ঐতিহ্যবাহী ভাওয়াইয়া গান কোনো অসচেতন আঞ্চলিক সুর নয়; এর মধ্যে নিহিত রয়েছে সুসংহত এক সুরকাঠামো। দোতরার মিষ্টি বোল এবং কণ্ঠের দীর্ঘ ভাঙন বা 'টান' শাস্ত্রীয় সঙ্গীতের মীড় ও গমকের সাথে বিস্ময়কর সাদৃশ্য বহন করে।

তিস্তার বিস্তীর্ণ চরে মহিষাল বন্ধুর বিরহে গাওয়া গান যখন দূর থেকে ভেসে আসে, তখন রাগ কাফির বিষাদ ও আশাবরী রাগের আর্তি যেন একাকার হয়ে যায়। এই সুর উত্তরবঙ্গের মাটির দীর্ঘশ্বাসেরই সঙ্গীতায়ন।`,
    tags: ['Bhawaiya', 'Classical Music', 'Rangpur Sangeet Academy', 'Folk'],
    featured: true,
    hasFullText: true,
  },
  {
    id: 'w-bio-1',
    slug: 'notable-physicians-of-rangpur',
    title: 'Pioneering Physicians of Colonial and Post-Liberation Rangpur',
    titleBn: 'রংপুরের চিকিৎসা ঐতিহ্যের পুরোধা ব্যক্তিত্ব ও তাঁদের কর্ম',
    category: 'Biographies',
    categoryBn: 'জীবনী',
    publishedDate: 'October 2019',
    publicationVenue: 'Sthasyasebar Itihase Rangpur Excerpt',
    readTime: '7 min read',
    excerpt:
      'Biographical vignettes of memorable physicians who dedicated their lives to charitable clinics and epidemic control in northern Bengal.',
    body: `রংপুরের চিকিৎসা ইতিহাস কেবল ইমারত ও হাসপাতালের ইতিহাস নয়; এটি মূলত কিছু নিঃস্বার্থ মানুষের জীবনপণ সেবার ইতিহাস। উপনিবেশিক আমলে যখন কালাজ্বর ও কলেরার প্রাদুর্ভাবে একের পর এক গ্রাম উজাড় হয়ে যেত, তখন অল্প কয়েকজন চিকিৎসক ঘোড়ার পিঠে চড়ে কিংবা পায়ে হেঁটে দুর্গম গ্রামে গ্রামে ঔষধ পৌঁছে দিতেন।

পরবর্তীতে রংপুর মেডিকেল কলেজ প্রতিষ্ঠার পর একদল নিবেদিতপ্রাণ শিক্ষক ও চিকিৎসক তৈরি হন, যাঁরা অর্থলিপ্সা ত্যাগ করে এই উত্তর জনপদের দরিদ্র মানুষদের জীবন বাঁচাতে আত্মনিয়োগ করেছিলেন। তাঁদের সেই আদর্শিক ত্যাগ আজকের নতুন প্রজন্মের চিকিৎসকদের জন্য এক চিরন্তন পাথেয়।`,
    tags: ['Biographies', 'Rangpur Medical College', 'Medical History'],
    featured: false,
    hasFullText: true,
  },
  {
    id: 'w-med-1',
    slug: 'bedside-listening-in-family-medicine',
    title: 'The Art of Attentive Listening in Family Practice: Diagnostic and Ethical Value',
    titleBn: 'পারিবারিক চিকিৎসায় রোগীর কথা শোনার শিল্প: নৈতিক ও রোগনির্ণয়মূলক মূল্য',
    category: 'Medical Science',
    categoryBn: 'চিকিৎসাবিজ্ঞান',
    publishedDate: 'February 2012',
    publicationVenue: 'Bangladesh Health & Ethics Review',
    readTime: '6 min read',
    excerpt:
      'Clinical observations demonstrating why compassionate, unhurried patient narrative history remains the primary instrument in family medicine.',
    body: `আধুনিক প্রযুক্তিনির্ভর চিকিৎসায় ল্যাবরেটরি টেস্ট ও যন্ত্রপাতির প্রাচুর্য চিকিৎসকের মনস্তত্ত্বকে যান্ত্রিক করে তুলছে। অথচ পারিবারিক চিকিৎসায় একজন দক্ষ চিকিৎসকের প্রধান হাতিয়ার হলো ধৈর্য ধরে রোগীর দুঃখগাথা শোনা।

রোগী যখন বুঝতে পারে চিকিৎসক তাকে কেবল একটি রোগের কেস হিসেবে দেখছেন না, বরং একজন মানুষ হিসেবে তার উদ্বেগ অনুভব করছেন, তখনই চিকিৎসার প্রকৃত আরোগ্যপ্রক্রিয়া শুরু হয়। পারিবারিক চিকিৎসক তাই কেবল প্রেসক্রিপশন লেখক নন, তিনি পরিবারের মানসিক সুস্থতারও আশ্রয়স্থল।`,
    tags: ['Medical Science', 'Family Practice', 'Ethics', 'Clinical Listening'],
    featured: true,
    hasFullText: true,
  },
  {
    id: 'w-sat-1',
    slug: 'laughter-and-the-prescription-pad',
    title: 'Prescription for Society: Humour and Social Satire in Everyday Life',
    titleBn: 'প্রেসক্রিপশন ও সমাজ: দৈনন্দিন জীবনের রম্য ও অসঙ্গতি',
    category: 'Satire & Humour',
    categoryBn: 'রম্য ও ব্যঙ্গরচনা',
    publishedDate: 'September 2015',
    publicationVenue: 'Rangpur Sahitya Patrika',
    readTime: '5 min read',
    excerpt:
      'Lighthearted yet incisive satirical observations on bureaucratic absurdities, societal pretensions, and medical eccentricities.',
    body: `হাস্যরস হলো মানুষের অহংকার দূর করার শ্রেষ্ঠ টনিক। আমরা প্রতিদিন সমাজে যে কৃত্রিম গাম্ভীর্য ও ভড়ং দেখি, একটু হাসির আলোয় তাকালেই তার অসাড়তা স্পষ্ট হয়ে ওঠে।

হাসপাতালের ভিড়ে রোগী ও ডাক্তারের নানা ভুল বোঝাবুঝি, চিকিৎসকদের হাতের অপাঠ্য লেখা এবং আধুনিক মানুষের অহেতুক ব্যস্ততা নিয়ে একটু নির্দোষ হাসাহাসি মানুষকে জীবনের ক্লান্তি ভুলতে সাহায্য করে।`,
    tags: ['Satire', 'Humour', 'Society', 'Everyday Life'],
    featured: false,
    hasFullText: true,
  },
  {
    id: 'w-trv-1',
    slug: 'travels-in-persia-cities-of-rose-and-tile',
    title: 'City of Turquoise and Desert Wind: Reflections on Eight Years in Iran',
    titleBn: 'ফিরোজা রঙা গম্বুজ ও মরুভূমির বাতাস: ইরানে আট বছরের স্মৃতি',
    category: 'Travel Writing',
    categoryBn: 'ভ্রমণকাহিনী',
    publishedDate: 'July 2011',
    publicationVenue: 'Smritir Jolchobi Manuscript Archive',
    readTime: '8 min read',
    excerpt:
      'Memories of medical service in Iran (1984–1992), traveling through Isfahan, Shiraz, and desert provinces, reflecting on Persian poetry and architecture.',
    body: `১৯৮৪ সালে যখন প্রথমবারের মতো ইরানে চিকিৎসা সেবায় যোগ দিতে যাই, তখন সেই প্রাচীন ভূখণ্ডের ভাষা ও সংস্কৃতির সঙ্গে এক অপূর্ব পরিচয় ঘটে। হাসপাতাল ডিউটির ফাঁকে ফাঁকে ইসফাহানের ফিরোজা রঙা মসজিদ, সিরাজের গোলাপবাগান আর হাফিজ ও সাদির মাজার দর্শন আমার চিন্তার জগৎকে নতুন ব্যাপ্তি দিয়েছিল।

পারস্যের চিকিৎসকরা চিকিৎসাবিজ্ঞানের পাশাপাশি কাব্য ও দর্শনের যে চর্চা ধরে রেখেছিলেন, তা আমাকে নিজের দেশে ফিরে একই সাথে চিকিৎসা ও সাহিত্যচর্চা অব্যাহত রাখতে গভীরভাবে অনুপ্রাণিত করেছিল।`,
    tags: ['Travel Writing', 'Iran', 'Persia', 'Memoir'],
    featured: true,
    hasFullText: true,
  },
  {
    id: 'w-unsupplied-1',
    slug: 'folklore-of-the-teesta-shoals',
    title: 'Folklore and Oral Traditions of the Teesta River Shoals',
    titleBn: 'তিস্তার চরের লোককথা ও মৌখিক ঐতিহ্যের সন্ধানে',
    category: 'Other Essays',
    categoryBn: 'অন্যান্য প্রবন্ধ',
    publishedDate: '1999',
    publicationVenue: 'North Bengal Folk Heritage Series',
    readTime: 'Estimated 5 min',
    excerpt:
      'An archival essay documenting oral tales, boatmen chants, and folk beliefs collected during medical journeys across rural Chars.',
    body: undefined,
    tags: ['Folklore', 'Teesta', 'Oral History', 'North Bengal'],
    featured: false,
    hasFullText: false,
    unsuppliedNotice:
      'Original full manuscript text is currently undergoing physical archival scanning and transcription from the author’s study records. The bibliographic entry, abstract, and thematic indexing are cataloged here.',
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'res-1',
    slug: 'evolution-of-healthcare-rangpur',
    title: 'Evolution of Healthcare Delivery, Charitable Dispensaries, and Hospitals in Rangpur',
    titleBn: 'রংপুরে আধুনিক স্বাস্থ্যসেবার প্রাতিষ্ঠানিক বিকাশ ও জনস্বাস্থ্যের রূপরেখা',
    year: 2020,
    journal: 'Northern Bangladesh Historical & Medical Review',
    field: 'Rangpur History',
    fieldBn: 'রংপুরের ইতিহাস',
    authors: ['Dr. Md. Mofizul Islam Mantu'],
    abstract:
      'A documented historical study examining the growth of modern medicine in Rangpur district from 19th-century colonial dispensaries through to the foundation of Rangpur Medical College, detailing community responses to historical epidemics.',
    locationFocus: 'Rangpur District',
    citations: 18,
    relatedBookSlug: 'sthasyasebar-itihase-rangpur',
    hasFullText: true,
  },
  {
    id: 'res-2',
    slug: 'cultural-struggles-in-liberation-war-sector-6',
    title: 'Cultural Resistance and Language Movements in Northern Districts during the 1971 Liberation War',
    titleBn: '১৯৭১-এর মুক্তিযুদ্ধে উত্তর জনপদের ভাষা ও সাংস্কৃতিক প্রতিরোধের স্বরূপ',
    year: 2020,
    journal: 'Studies on the Bengali Liberation Movement',
    field: 'The Liberation War',
    fieldBn: 'বাঙালির মুক্তিযুদ্ধ',
    authors: ['Dr. Md. Mofizul Islam Mantu'],
    abstract:
      'Analyzes how regional literary clubs, folk singers, and grassroots cultural activists in Rangpur mobilized civil resistance during the Bengali national liberation struggle.',
    locationFocus: 'North Bengal, Sector 6',
    citations: 24,
    relatedBookSlug: 'bangalir-muktijuddho-bhasha-sanskritir-songram',
    hasFullText: true,
  },
  {
    id: 'res-3',
    slug: 'linguistic-heritage-of-kamrupi-and-bengali-dialects',
    title: 'Vernacular Idioms and Linguistic Continuities: Northern Bengali Dialects and Literature',
    titleBn: 'উত্তরবঙ্গের আঞ্চলিক উপভাষা, লোকসাহিত্য ও ভাষার বিবর্তন',
    year: 2017,
    journal: 'Bhasha O Sahitya Patrika',
    field: 'Language & Culture',
    fieldBn: 'ভাষা ও সংস্কৃতি',
    authors: ['Dr. Md. Mofizul Islam Mantu'],
    abstract:
      'A linguistic and sociolinguistic survey investigating colloquial phonetic variations, proverbs, and vernacular syntax in Rangpur and Kurigram, comparing them with classic literary Bengali standards.',
    locationFocus: 'Rangpur and Teesta Basin',
    citations: 14,
    hasFullText: true,
  },
  {
    id: 'res-4',
    slug: 'monographs-on-pioneering-personalities-of-rangpur',
    title: 'Biographical Chronicles: Polymaths, Reformers, and Physicians of Northern Bengal',
    titleBn: 'উত্তর জনপদের স্মরণীয় মনীষী ও সমাজসংস্কারকবৃন্দের জীবন সমীক্ষা',
    year: 2019,
    journal: 'Rangpur Sahitya Parishad Research Folio',
    field: 'Biographies of Notable Personalities',
    fieldBn: 'গুণীজন পরিচিতি',
    authors: ['Dr. Md. Mofizul Islam Mantu'],
    abstract:
      'Comprehensive biographical dossiers on pioneering social reformers, educationists, and medical figures of Rangpur who laid the foundations of cultural institutions in the late 19th and mid-20th centuries.',
    locationFocus: 'Rangpur Region',
    citations: 16,
    hasFullText: true,
  },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 'm-1',
    year: '1953',
    periodBn: '১৯৫৩',
    title: 'Birth in Rangpur',
    titleBn: 'রংপুরে জন্মগ্রহণ',
    category: 'Life',
    location: 'Rangpur, East Bengal',
    locationBn: 'রংপুর, পূর্ব বাংলা',
    description:
      'Born in Rangpur in 1953. Note: An official certificate records a variant date.',
    descriptionBn:
      '১৯৫৩ সালে রংপুরে জন্ম (দাপ্তরিক সনদে ভিন্ন একটি তারিখও রয়েছে)।',
  },
  {
    id: 'm-2',
    year: '1960s',
    periodBn: '১৯৬০-এর দশক',
    title: 'Secondary & Higher Secondary Education',
    titleBn: 'রংপুর জিলা স্কুল ও কারমাইকেল কলেজে পাঠ গ্রহণ',
    category: 'Life',
    location: 'Rangpur',
    locationBn: 'রংপুর',
    description:
      'Completed secondary education at Rangpur High School and higher secondary studies in science at Carmichael College, Rangpur.',
    descriptionBn:
      'রংপুর উচ্চ বিদ্যালয় (রংপুর জিলা স্কুল) থেকে মাধ্যমিক এবং কারমাইকেল কলেজ থেকে উচ্চ মাধ্যমিক শিক্ষা সম্পন্ন করেন।',
  },
  {
    id: 'm-3',
    year: '1968–1976',
    periodBn: '১৯৬৮–১৯৭৬',
    title: 'Musical Education at Rangpur Sangeet Academy',
    titleBn: 'রংপুর সঙ্গীত একাডেমিতে শাস্ত্রীয় ও সঙ্গীত তালিম',
    category: 'Musical',
    location: 'Rangpur Sangeet Academy',
    locationBn: 'রংপুর সঙ্গীত একাডেমি',
    description:
      'Eight years of formal discipleship studying classical vocal music, harmonium accompaniment, and traditional ragas under regional ustads.',
    descriptionBn:
      'রংপুর সঙ্গীত একাডেমিতে ওস্তাদদের সান্নিধ্যে আট বছর শাস্ত্রীয় কণ্ঠসঙ্গীত, খেয়াল ও হারমোনিয়ামের নিবিড় তালিম গ্রহণ।',
  },
  {
    id: 'm-4',
    year: '1971–1976',
    periodBn: '১৯৭১–১৯৭৬',
    title: 'Medical Education at Rangpur Medical College',
    titleBn: 'রংপুর মেডিকেল কলেজে চিকিৎসাবিজ্ঞান পাঠ (এমবিবিএস)',
    category: 'Medical',
    location: 'Rangpur Medical College',
    locationBn: 'রংপুর মেডিকেল কলেজ',
    description:
      'Studied medicine at Rangpur Medical College through the historic period of Bangladesh’s birth, graduating with an MBBS degree.',
    descriptionBn:
      'স্বাধীন বাংলাদেশের জন্মলগ্ন ঐতিহাসিক পর্বে রংপুর মেডিকেল কলেজে চিকিৎসাবিজ্ঞান পাঠ ও এমবিবিএস ডিগ্রি অর্জন।',
  },
  {
    id: 'm-5',
    year: '1978',
    periodBn: '১৯৭৮',
    title: 'Commencement of Medical Service in Bangladesh',
    titleBn: 'বাংলাদেশে সরকারি ও পেশাগত চিকিৎসা সেবার সূচনা',
    category: 'Medical',
    location: 'Northern Bangladesh',
    locationBn: 'উত্তরবঙ্গ',
    description:
      'Began professional clinical service dedicated to community health, rural dispensaries, and public medical care.',
    descriptionBn:
      'গ্রামীণ ডিসপেনসারি ও কমিউনিটি স্বাস্থ্যসেবায় আত্মনিয়োগের মধ্য দিয়ে সরকারি ও পেশাগত চিকিৎসা কর্মজীবনের সূচনা।',
  },
  {
    id: 'm-6',
    year: '1984–1992',
    periodBn: '১৯৮৪–১৯৯২',
    title: 'Medical Practice in Iran',
    titleBn: 'ইরানে পেশাগত চিকিৎসা সেবা পরিচালনা',
    category: 'Medical',
    location: 'Iran',
    locationBn: 'ইরান',
    description:
      'Served as an international physician practicing medicine abroad in Iran across an eight-year tenure, gaining cross-cultural clinical experience.',
    descriptionBn:
      'ইরানের হাসপাতালসমূহে আট বছর চিকিৎসক হিসেবে আন্তর্জাতিক সেবা প্রদান এবং বহুমাত্রিক ক্লিনিক্যাল অভিজ্ঞতা অর্জন।',
  },
  {
    id: 'm-7',
    year: '1992',
    periodBn: '১৯৯২',
    title: 'Return to Private Family Medicine in Rangpur',
    titleBn: 'রংপুরে পারিবারিক চিকিৎসা সেবায় প্রত্যাবর্তন',
    category: 'Medical',
    location: 'Rangpur',
    locationBn: 'রংপুর',
    description:
      'Returned to his hometown of Rangpur to establish private family medicine practice, providing compassionate primary care to generations of regional families.',
    descriptionBn:
      'স্বদেশ রংপুরে ফিরে রাধাবল্লভে পারিবারিক চিকিৎসা চেম্বার প্রতিষ্ঠা এবং সাধারণ রোগীদের মানবিক সেবা প্রদান।',
  },
  {
    id: 'm-8',
    year: '2004–2009',
    periodBn: '২০০৪–২০০৯',
    title: 'Healthcare Advisory Work in Rangpur',
    titleBn: 'রংপুরে স্বাস্থ্যসেবা উপদেষ্টা হিসেবে দায়িত্ব পালন',
    category: 'Medical',
    location: 'Rangpur District',
    locationBn: 'রংপুর জেলা',
    description:
      'Engaged as a healthcare advisor in Rangpur, assisting institutional initiatives in public health, rural clinic standards, and preventive care.',
    descriptionBn:
      'রংপুরে জনস্বাস্থ্য, গ্রামীণ ক্লিনিক মানোন্নয়ন এবং প্রতিরোধমূলক চিকিৎসায় প্রাতিষ্ঠানিক উপদেষ্টা হিসেবে ভূমিকা পালন।',
  },
  {
    id: 'm-9',
    year: '2010–2020',
    periodBn: '২০১০–২০২০',
    title: 'Academic & Clinical Teaching Roles',
    titleBn: 'চিকিৎসাবিজ্ঞান শিক্ষকতা ও মেন্টরিং',
    category: 'Medical',
    location: 'Medical Institutions, Rangpur',
    locationBn: 'রংপুরের চিকিৎসা প্রতিষ্ঠানসমূহ',
    description:
      'Taught and mentored medical students, interns, and young doctors across a decade of dedicated educational contribution.',
    descriptionBn:
      'এক দশক ধরে মেডিকেল শিক্ষার্থী ও শিক্ষানবিস চিকিৎসকদের ক্লিনিক্যাল শিক্ষা ও মানবিক মূল্যবোধের দিকনির্দেশনা প্রদান।',
  },
  {
    id: 'm-10',
    year: 'Multi-Decade',
    periodBn: 'বহু দশক ব্যাপী',
    title: 'Literary & Historical Research Publications',
    titleBn: 'কাব্য, আঞ্চলিক ইতিহাস ও গবেষণা প্রকাশনা',
    category: 'Literary',
    location: 'Rangpur & Dhaka',
    locationBn: 'রংপুর ও ঢাকা',
    description:
      'Published poetry, children’s rhymes, reflective essays, satire, and seminal historical research on Rangpur and the Liberation War.',
    descriptionBn:
      'চার দশক ধরে কাব্যগ্রন্থ, শিশুতোষ ছড়া, প্রবন্ধ এবং রংপুর ও মুক্তিযুদ্ধের ইতিহাস গবেষণা গ্রন্থ প্রকাশ।',
  },
];

export const AFFILIATION_RECORDS: AffiliationRecord[] = [
  {
    id: 'aff-awd-1',
    title: 'Rangpur Sahitya-Sanskriti Parishad Medal',
    titleBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ পদক',
    organization: 'Rangpur Sahitya-Sanskriti Parishad',
    organizationBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ',
    yearOrPeriod: '2012',
    type: 'Award',
    category: 'Literature',
    citationOrRole:
      'Conferred in 2012 honoring distinguished lifelong poetic contributions and cultural dedication to the Rangpur region.',
  },
  {
    id: 'aff-awd-2',
    title: 'Rangpur Rotary Club Honour in Social Service',
    titleBn: 'রোটারি ক্লাব রংপুর সম্মাননা — সমাজসেবা',
    organization: 'Rotary Club of Rangpur',
    organizationBn: 'রোটারি ক্লাব অব রংপুর',
    yearOrPeriod: '2012',
    type: 'Award',
    category: 'Public Service',
    citationOrRole:
      'Conferred in 2012 for exemplary compassionate community medical service and social welfare initiatives across northern districts.',
  },
  {
    id: 'aff-awd-3',
    title: 'Best Organizer, Rangpur Shilpakala Academy',
    titleBn: 'শ্রেষ্ঠ সংগঠক — জেলা শিল্পকla একাডেমি, রংপুর',
    organization: 'Rangpur District Shilpakala Academy',
    organizationBn: 'জেলা শিল্পকলা একাডেমি, রংপুর',
    yearOrPeriod: '2022',
    type: 'Award',
    category: 'Culture',
    citationOrRole:
      'Conferred in 2022 in recognition of outstanding leadership in organizing regional cultural conferences and performing arts programs.',
  },
  {
    id: 'aff-mem-1',
    title: 'Life Member',
    titleBn: 'আজীবন সদস্য',
    organization: 'Bangladesh Medical Association (BMA)',
    organizationBn: 'বাংলাদেশ মেডিকেল অ্যাসোসিয়েশন (রংপুর জেলা শাখা)',
    yearOrPeriod: '1978 – Present',
    type: 'Life Membership',
    category: 'Medicine',
    citationOrRole:
      'Lifelong professional member advocating for medical ethics, rural doctor support, and continuing medical education in northern districts.',
  },
  {
    id: 'aff-mem-2',
    title: 'Life Member & Literary Fellow',
    titleBn: 'আজীবন সদস্য ও ফেলো',
    organization: 'Rangpur Public Library & Literary Archive',
    organizationBn: 'রংপুর পাবলিক লাইব্রেরি',
    yearOrPeriod: '1982 – Present',
    type: 'Life Membership',
    category: 'Literature',
    citationOrRole:
      'Permanent member supporting the acquisition and preservation of rare Bengali manuscripts and northern regional periodicals.',
  },
  {
    id: 'aff-pos-1',
    title: 'Former Executive Committee Member',
    titleBn: 'সাবেক কার্যনির্বাহী সদস্য',
    organization: 'Rangpur Sahitya-Sanskriti Parishad',
    organizationBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ',
    yearOrPeriod: 'Former Tenure',
    type: 'Former Position',
    category: 'Culture',
    citationOrRole:
      'Served on executive committees organizing regional poetry festivals, literary seminars, and commemorative publications.',
  },
  {
    id: 'aff-pos-2',
    title: 'Former Student & Cultural Secretary',
    titleBn: 'প্রাক্তন শিক্ষার্থী ও সাংস্কৃতিক সম্পাদক',
    organization: 'Rangpur Sangeet Academy',
    organizationBn: 'রংপুর সঙ্গীত একাডেমি',
    yearOrPeriod: '1968–1976 / Alumni Role',
    type: 'Former Position',
    category: 'Culture',
    citationOrRole:
      'Completed eight years of formal classical vocal discipleship and subsequently helped coordinate musical gatherings and recitals.',
  },
  {
    id: 'aff-fnd-1',
    title: 'Founding Member & Honorary Trustee',
    titleBn: 'প্রতিষ্ঠাতা সদস্য ও ট্রাস্টি',
    organization: 'Teesta Ecological & Cultural Preservation Forum',
    organizationBn: 'তিস্তা পরিবেশ ও সাংস্কৃতিক পরিষদ',
    yearOrPeriod: '2001 – Present',
    type: 'Founding Member',
    category: 'Public Service',
    citationOrRole:
      'Co-founded a civic forum bringing together physicians, writers, and educators to highlight the human and ecological challenges of the Teesta basin.',
  },
  {
    id: 'aff-adv-1',
    title: 'Healthcare Advisor (Rangpur Region)',
    titleBn: 'স্বাস্থ্যসেবা উপদেষ্টা',
    organization: 'Regional Healthcare Advisory Committee',
    organizationBn: 'রংপুর আঞ্চলিক স্বাস্থ্যসেবা উপদেষ্টা কমিটি',
    yearOrPeriod: '2004–2009',
    type: 'Advisory Affiliation',
    category: 'Medicine',
    citationOrRole:
      'Advised regional healthcare programs on public clinic standards, rural community outreach, and preventive health campaigns.',
  },
];

export const AWARDS_DATA: Award[] = [
  {
    id: 'aw-1',
    title: 'Rangpur Sahitya-Sanskriti Parishad Medal',
    titleBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ পদক',
    organization: 'Rangpur Sahitya-Sanskriti Parishad',
    organizationBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ',
    year: 2012,
    category: 'Literature',
    citation:
      'Awarded in 2012 in recognition of distinguished literary contributions and cultural dedication to the Rangpur region.',
  },
  {
    id: 'aw-2',
    title: 'Rangpur Rotary Club Honour in Social Service',
    titleBn: 'রোটারি ক্লাব রংপুর সম্মাননা — সমাজসেবা',
    organization: 'Rotary Club of Rangpur',
    organizationBn: 'রোটারি ক্লাব অব রংপুর',
    year: 2012,
    category: 'Civic Honor',
    citation:
      'Conferred in 2012 for exemplary compassionate community medical service and social welfare initiatives.',
  },
  {
    id: 'aw-3',
    title: 'Best Organizer, Rangpur Shilpakala Academy',
    titleBn: 'শ্রেষ্ঠ সংগঠক — জেলা শিল্পকলা একাডেমি, রংপুর',
    organization: 'Rangpur District Shilpakala Academy',
    organizationBn: 'জেলা শিল্পকলা একাডেমি, রংপুর',
    year: 2022,
    category: 'Cultural Service',
    citation:
      'Conferred in 2022 honoring excellence in cultural leadership, event stewardship, and preservation of performing arts.',
  },
];

export const CULTURAL_PROJECTS: CulturalProject[] = [
  {
    id: 'cp-1',
    title: 'Formal Discipleship at Rangpur Sangeet Academy (1968–1976)',
    titleBn: 'রংপুর সঙ্গীত একাডেমিতে আট বছরের উচ্চাঙ্গ সঙ্গীত তালিম',
    role: 'Vocal Disciple & Harmonium Exponent',
    year: '1968–1976',
    type: 'Classical Vocal',
    raga: 'Bhairav, Todi, Bilawal, Yaman',
    venue: 'Rangpur Sangeet Academy',
    description:
      'Eight years of systematic classical vocal discipleship studying khayal grammar, swara sadhana, and harmonium accompaniment under regional masters.',
  },
  {
    id: 'cp-2',
    title: 'Nazrul Sangeet and Classical Ragas Interpretation',
    titleBn: 'নজরুল সঙ্গীত ও রাগভিত্তিক গীতিচর্চা',
    role: 'Performer & Analytical Speaker',
    year: '1995–Present',
    type: 'Nazrul Sangeet',
    venue: 'Rangpur Town Hall & Cultural Forums',
    description:
      'Demonstrated the deep classical modal roots of Nazrul’s compositions, showing their direct connections with Hindustani classical ragas.',
  },
  {
    id: 'cp-3',
    title: 'Rabindra Sangeet & The Philosophy of Rivers',
    titleBn: 'রবীন্দ্রসঙ্গীত ও নদীমাতৃক বাংলার সুর',
    role: 'Vocal Contributor',
    year: '2001–Present',
    type: 'Rabindra Sangeet',
    venue: 'Literary & Musical Recitals, Rangpur',
    description:
      'Presented thematic recitals on Tagore’s Padma and Teesta basin compositions, emphasizing nature, solace, and spiritual yearning.',
  },
  {
    id: 'cp-4',
    title: 'Bhawaiya and Lalon Song Research & Cultural Preservation',
    titleBn: 'ভাওয়াইয়া ও লালন সঙ্গীতের অন্তর্নিহিত সুরের সন্ধান',
    role: 'Researcher & Cultural Advisor',
    year: '2005–Present',
    type: 'Bhawaiya & Lalon',
    venue: 'District Shilpakala Academy, Rangpur',
    description:
      'Documented the modal and philosophical bridges connecting indigenous Bhawaiya folk melodies and Baul-Lalon philosophy with classical ragas.',
  },
];

export const GALLERY_ITEMS: GalleryItemData[] = [
  {
    id: 'gal-1',
    title: 'Archival Clinical Ledger: Early Medical Practice (1978)',
    titleBn: 'চিকিৎসা সেবার ঐতিহাসিক নিবন্ধন খাতা (১৯৭৮)',
    year: '1978',
    category: 'Medical Memorabilia',
    accessionNo: 'ACC-MED-1978-01',
    caption:
      'Archival registry documenting the commencement of professional clinical medical service in Bangladesh following graduation from Rangpur Medical College.',
    medium: 'Preserved official registration ledger',
    aspectRatio: '4:3',
    isPlaceholder: true,
  },
  {
    id: 'gal-2',
    title: 'Preserved Handwritten Manuscript Folio: Oronne Tiye Pakhi Gaan',
    titleBn: '"অরণ্যে টিয়ে পাখি গান" কাব্যগ্রন্থের হস্তলিখিত খসড়া',
    year: 'circa 1995',
    category: 'Manuscripts',
    accessionNo: 'ACC-MSS-1995-04',
    caption:
      'Early handwritten manuscript draft written in fountain pen ink on laid paper, featuring initial stanzas and editorial emendations.',
    medium: 'Iron gall ink on vintage wove paper',
    aspectRatio: '4:3',
    isPlaceholder: true,
  },
  {
    id: 'gal-3',
    title: 'Rangpur Sangeet Academy Commemorative Plaque (1976)',
    titleBn: 'রংপুর সঙ্গীত একাডেমি শিক্ষাপর্ব সমাপ্তির স্মারক (১৯৭৬)',
    year: '1976',
    category: 'Musical Memorabilia',
    accessionNo: 'ACC-MUS-1976-02',
    caption:
      'Commemorative archival token celebrating the completion of eight years of formal musical discipleship (1968–1976).',
    medium: 'Engraved brass plaque on polished teak mount',
    aspectRatio: '3:4',
    isPlaceholder: true,
  },
  {
    id: 'gal-4',
    title: 'Historic Medical Service Register from Iran (1984–1992)',
    titleBn: 'ইরানে চিকিৎসা সেবার ঐতিহাসিক প্রশাসনিক নথি (১৯৮৪–১৯৯২)',
    year: '1988',
    category: 'Medical Memorabilia',
    accessionNo: 'ACC-MED-1988-09',
    caption:
      'Clinical dossier and certificate documenting his eight years of international medical practice as a physician in Iran.',
    medium: 'Printed and stamped administrative ledger',
    aspectRatio: '4:3',
    isPlaceholder: true,
  },
  {
    id: 'gal-5',
    title: 'Rangpur Sahitya-Sanskriti Parishad Medal (2012)',
    titleBn: 'রংপুর সাহিত্য-সংস্কৃতি পরিষদ পদক (২০১২)',
    year: '2012',
    category: 'Awards & Plaquettes',
    accessionNo: 'ACC-AWD-2012-01',
    caption:
      'The regional literary and cultural distinction conferred in 2012 honoring lifetime creative dedication in Rangpur.',
    medium: 'Cast commemorative bronze medallion',
    aspectRatio: '1:1',
    isPlaceholder: true,
  },
  {
    id: 'gal-6',
    title: 'Best Organizer Award Plaque, Shilpakala Academy (2022)',
    titleBn: 'শ্রেষ্ঠ সংগঠক স্মারক — জেলা শিল্পকলা একাডেমি, রংপুর (২০২২)',
    year: '2022',
    category: 'Awards & Plaquettes',
    accessionNo: 'ACC-AWD-2022-03',
    caption:
      'Presented by the District Administration and Rangpur Shilpakala Academy in recognition of outstanding cultural stewardship.',
    medium: 'Silver relief plate on finished mahogany wood',
    aspectRatio: '3:4',
    isPlaceholder: true,
  },
];
