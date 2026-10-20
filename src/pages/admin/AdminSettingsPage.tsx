import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { useAdmin } from '../../context/AdminContext';
import { Input, Textarea } from '../../components/ui/FormControls';
import { Button } from '../../components/ui/Button';
import {
  Settings,
  Save,
  RotateCcw,
  CheckCircle2,
  Info,
  Globe,
  Share2,
  Mail,
  Sliders,
  Sparkles,
  BookOpen,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings, books, contentItems } = useAdmin();
  const { isBn, t, formatNumber } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    'general' | 'navigation' | 'featured' | 'contact' | 'social' | 'footer'
  >('general');

  const [formState, setFormState] = useState(settings);
  const [hasSaved, setHasSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formState);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default baseline configuration?')) {
      resetSettings();
      setFormState(settings);
    }
  };

  const toggleFeaturedBook = (slug: string) => {
    const current = formState.featuredBookSlugs || [];
    const exists = current.includes(slug);
    const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
    setFormState({ ...formState, featuredBookSlugs: updated });
  };

  const toggleFeaturedWriting = (slug: string) => {
    const current = formState.featuredWritingSlugs || [];
    const exists = current.includes(slug);
    const updated = exists ? current.filter((s) => s !== slug) : [...current, slug];
    setFormState({ ...formState, featuredWritingSlugs: updated });
  };

  const tabs = [
    { id: 'general', label: isBn ? '১. পরিচিতি ও বিবরণ' : '1. Identity & Descriptions', icon: Globe },
    { id: 'navigation', label: isBn ? '২. নেভিগেশন লেবেল' : '2. Navigation Labels', icon: Sliders },
    { id: 'featured', label: isBn ? '৩. হোমপেজ হাইলাইটস' : '3. Homepage Highlights', icon: Sparkles },
    { id: 'contact', label: isBn ? '৪. যোগাযোগ ও দফতর' : '4. Contact & Secretariat', icon: Mail },
    { id: 'social', label: isBn ? '৫. সোশ্যাল ও বাহ্যিক লিঙ্ক' : '5. Archival & Social Links', icon: Share2 },
    { id: 'footer', label: isBn ? '৬. ফুটার ও কপিরাইট' : '6. Footer & Disclaimers', icon: FileText },
  ];

  return (
    <AdminLayout
      title={isBn ? 'আর্কাইভ কনফিগারেশন ও সাইট সেটিংস' : 'Archive Configuration & Site Settings'}
      subtitle={isBn ? 'পাবলিক দ্বিভাষিক মেটাডেটা, কাস্টম নেভিগেশন লেবেল, এবং যোগাযোগ তথ্য কনফিগার করুন।' : 'Configure public bilingual metadata, custom navigation labels, homepage highlights, and secretariat contact information.'}
      breadcrumbs={[{ label: isBn ? t('admin.settings') : 'Site Settings' }]}
      actions={
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            {isBn ? 'ডিফল্ট রিসেট' : 'Reset Defaults'}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSave}
            icon={<Save className="w-3.5 h-3.5" />}
          >
            {isBn ? 'সংরক্ষণ করুন' : 'Save Changes'}
          </Button>
        </div>
      }
    >
      {/* Success alert */}
      {hasSaved && (
        <div className="p-3.5 bg-[#2A4736] text-white border border-[#1E3426] rounded-xs text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{isBn ? 'আর্কাইভ কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে।' : 'Archive configuration saved successfully.'}</span>
        </div>
      )}

      {/* Main Settings Form with Tabs */}
      <div className="bg-white/80 border border-[#211F1C]/15 rounded-xs overflow-hidden shadow-2xs">
        {/* Horizontal Settings Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-[#211F1C]/10 bg-[#EAE4D8]/30 text-xs font-sans">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#A84E36] text-[#211F1C] bg-white font-semibold'
                    : 'border-transparent text-[#625D52] hover:text-[#211F1C] hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#A84E36]' : 'text-[#8A8375]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6">
          {/* 1. GENERAL IDENTITY */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Bilingual Identity & Nomenclature
                </h3>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  Primary titles displayed on headers, title tags, and search engine previews.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Name (English)"
                  value={formState.siteNameEn}
                  onChange={(e) => setFormState({ ...formState, siteNameEn: e.target.value })}
                  required
                />
                <Input
                  label="Official Name (Bengali / বাংলা)"
                  value={formState.siteNameBn}
                  onChange={(e) => setFormState({ ...formState, siteNameBn: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Editorial Tagline (English)"
                  value={formState.taglineEn}
                  onChange={(e) => setFormState({ ...formState, taglineEn: e.target.value })}
                />
                <Input
                  label="Editorial Tagline (Bengali)"
                  value={formState.taglineBn}
                  onChange={(e) => setFormState({ ...formState, taglineBn: e.target.value })}
                />
              </div>

              <Textarea
                label="Comprehensive Archival Description (English)"
                value={formState.descriptionEn}
                onChange={(e) => setFormState({ ...formState, descriptionEn: e.target.value })}
                rows={3}
              />

              <Textarea
                label="Comprehensive Archival Description (Bengali)"
                value={formState.descriptionBn}
                onChange={(e) => setFormState({ ...formState, descriptionBn: e.target.value })}
                rows={3}
              />
            </div>
          )}

          {/* 2. NAVIGATION LABELS */}
          {activeTab === 'navigation' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Navigation & Kicker Labels
                </h3>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  Customize the menu text presented to readers in desktop and mobile headers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Home Page Menu Label"
                  value={formState.navLabels.home}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, home: e.target.value },
                    })
                  }
                />
                <Input
                  label="Biography Menu Label"
                  value={formState.navLabels.biography}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, biography: e.target.value },
                    })
                  }
                />
                <Input
                  label="Books Library Label"
                  value={formState.navLabels.books}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, books: e.target.value },
                    })
                  }
                />
                <Input
                  label="Writings & Essays Label"
                  value={formState.navLabels.writings}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, writings: e.target.value },
                    })
                  }
                />
                <Input
                  label="Medical Career Label"
                  value={formState.navLabels.medicalCareer}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, medicalCareer: e.target.value },
                    })
                  }
                />
                <Input
                  label="Music & Culture Label"
                  value={formState.navLabels.musicCulture}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, musicCulture: e.target.value },
                    })
                  }
                />
                <Input
                  label="Historical Research Label"
                  value={formState.navLabels.research}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, research: e.target.value },
                    })
                  }
                />
                <Input
                  label="Archival Gallery Label"
                  value={formState.navLabels.gallery}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, gallery: e.target.value },
                    })
                  }
                />
                <Input
                  label="Awards & Affiliations Label"
                  value={formState.navLabels.awards}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, awards: e.target.value },
                    })
                  }
                />
                <Input
                  label="Contact & Inquiries Label"
                  value={formState.navLabels.contact}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      navLabels: { ...formState.navLabels, contact: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* 3. FEATURED HOMEPAGE ITEMS */}
          {activeTab === 'featured' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Homepage Curated Highlights
                </h3>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  Select which publications and essays are featured in prominent editorial positions on the homepage.
                </p>
              </div>

              {/* Books selector */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#211F1C]">
                  <BookOpen className="w-4 h-4 text-[#A84E36]" />
                  <span>Featured Publications ({formState.featuredBookSlugs.length} selected)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {books.map((book) => {
                    const isSelected = formState.featuredBookSlugs.includes(book.slug);
                    return (
                      <div
                        key={book.id}
                        onClick={() => toggleFeaturedBook(book.slug)}
                        className={`p-3 rounded-xs border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#A84E36]/10 border-[#A84E36] text-[#211F1C]'
                            : 'bg-white border-[#211F1C]/15 text-[#625D52] hover:border-[#211F1C]/35'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <strong className="block truncate">{book.title}</strong>
                          <span className="font-bengali-text text-[11px] block truncate">
                            {book.titleBn}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded-2xs text-[#A84E36] focus:ring-[#A84E36] pointer-events-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Writings selector */}
              <div className="space-y-3 pt-4 border-t border-[#211F1C]/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#211F1C]">
                  <FileText className="w-4 h-4 text-[#A84E36]" />
                  <span>Featured Writings & Essays ({formState.featuredWritingSlugs.length} selected)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {contentItems.slice(0, 10).map((item) => {
                    const isSelected = formState.featuredWritingSlugs.includes(item.slug);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleFeaturedWriting(item.slug)}
                        className={`p-3 rounded-xs border text-xs cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#A84E36]/10 border-[#A84E36] text-[#211F1C]'
                            : 'bg-white border-[#211F1C]/15 text-[#625D52] hover:border-[#211F1C]/35'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <strong className="block truncate">{item.title}</strong>
                          <span className="text-[10px] text-[#8A8375] uppercase block">
                            {item.category}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded-2xs text-[#A84E36] focus:ring-[#A84E36] pointer-events-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4. CONTACT & SECRETARIAT */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Secretariat & Researcher Access
                </h3>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  Official contact records provided to visiting historians and researchers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Curator Lead Name"
                  value={formState.curatorName}
                  onChange={(e) => setFormState({ ...formState, curatorName: e.target.value })}
                />
                <Input
                  label="Official Curator Email"
                  type="email"
                  value={formState.curatorEmail}
                  onChange={(e) => setFormState({ ...formState, curatorEmail: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Inquiries Telephone / Dispatch"
                  value={formState.curatorPhone}
                  onChange={(e) => setFormState({ ...formState, curatorPhone: e.target.value })}
                />
                <Input
                  label="Physical Location / Heritage Seat"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                />
              </div>

              <Input
                label="Archival Consultation Hours"
                value={formState.researchHours}
                onChange={(e) => setFormState({ ...formState, researchHours: e.target.value })}
              />

              <Textarea
                label="Archival Citation & Attribution Guidelines"
                value={formState.citationPolicy}
                onChange={(e) => setFormState({ ...formState, citationPolicy: e.target.value })}
                rows={3}
                helperText="Prescribed format for academic papers and literary publications."
              />
            </div>
          )}

          {/* 5. SOCIAL & ARCHIVAL LINKS */}
          {activeTab === 'social' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Scholarly Repositories & External Registers
                </h3>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  Direct links to academic networks, medical registries, and audiovisual archives.
                </p>
              </div>

              <Input
                label="ResearchGate Archive Profile URL"
                value={formState.socialLinks.researchGate || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    socialLinks: { ...formState.socialLinks, researchGate: e.target.value },
                  })
                }
              />

              <Input
                label="Academia.edu Monograph Library URL"
                value={formState.socialLinks.academia || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    socialLinks: { ...formState.socialLinks, academia: e.target.value },
                  })
                }
              />

              <Input
                label="Bangladesh Medical & Dental Council (BMDC) Registry Profile URL"
                value={formState.socialLinks.medicalRegistry || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    socialLinks: { ...formState.socialLinks, medicalRegistry: e.target.value },
                  })
                }
              />

              <Input
                label="Audiovisual Recordings & Recitals Archive (YouTube)"
                value={formState.socialLinks.youtubeArchive || ''}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    socialLinks: { ...formState.socialLinks, youtubeArchive: e.target.value },
                  })
                }
              />
            </div>
          )}

          {/* 6. FOOTER & NOTICES */}
          {activeTab === 'footer' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#211F1C]">
                  Footer Legal Notices & Heritage Credits
                </h3>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  Archival non-commercial disclaimers displayed in the public footer.
                </p>
              </div>

              <Textarea
                label="Footer Notice (English)"
                value={formState.footerNoticeEn}
                onChange={(e) => setFormState({ ...formState, footerNoticeEn: e.target.value })}
                rows={3}
              />

              <Textarea
                label="Footer Notice (Bengali / বাংলা)"
                value={formState.footerNoticeBn}
                onChange={(e) => setFormState({ ...formState, footerNoticeBn: e.target.value })}
                rows={3}
              />
            </div>
          )}

          {/* Submit action */}
          <div className="pt-6 border-t border-[#211F1C]/10 flex items-center justify-between">
            <span className="text-[11px] text-[#8A8375] font-sans">
              {isBn ? 'আর্কাইভ মেটাডাটা ও কনফিগারেশন সেটিংস।' : 'Global archive metadata and configuration controls.'}
            </span>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
                Save Settings
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
