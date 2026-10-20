import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Archive Pages
import { HomePage } from './pages/HomePage';
import { BiographyPage } from './pages/BiographyPage';
import { BooksPage } from './pages/BooksPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { WritingsPage } from './pages/WritingsPage';
import { WritingDetailPage } from './pages/WritingDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { MedicalCareerPage } from './pages/MedicalCareerPage';
import { MusicCulturePage } from './pages/MusicCulturePage';
import { GalleryPage } from './pages/GalleryPage';
import { AwardsAffiliationsPage } from './pages/AwardsAffiliationsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminContentPage } from './pages/admin/AdminContentPage';
import { AdminBooksPage } from './pages/admin/AdminBooksPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';

import { AdminProvider } from './context/AdminContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AdminProvider>
          <Routes>
        {/* Public Legacy Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/biography" element={<BiographyPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:slug" element={<BookDetailPage />} />
        <Route path="/writings" element={<WritingsPage />} />
        <Route path="/writings/:slug" element={<WritingDetailPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/medical-career" element={<MedicalCareerPage />} />
        <Route path="/music-culture" element={<MusicCulturePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/awards-affiliations" element={<AwardsAffiliationsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Management Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminOverviewPage />} />
        <Route path="/admin/content" element={<AdminContentPage />} />
        <Route path="/admin/books" element={<AdminBooksPage />} />
        <Route path="/admin/media" element={<AdminMediaPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AdminProvider>
  </LanguageProvider>
</BrowserRouter>
  );
}
