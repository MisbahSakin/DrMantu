import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Input, Textarea, Select } from '../components/ui/FormControls';
import { Button } from '../components/ui/Button';
import {
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Send,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { isBn, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    inquiryType: 'academic',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Transmission failure');
      }
    } catch {
      setStatus('error');
      setErrorMessage(t('contact.errorMsg'));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      affiliation: '',
      inquiryType: 'academic',
      subject: '',
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  const mailtoLink = `mailto:archive@drmofizulmantu.org?subject=${encodeURIComponent(
    `[Archive Inquiry] ${formData.subject || 'Scholarly Consultation'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nAffiliation: ${formData.affiliation || 'N/A'}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <Layout>
      <PageHeader
        kicker={t('contact.kicker')}
        title={t('contact.title')}
        titleBn="গবেষণা ও মহাফেজখানা অনুসন্ধান"
        description={t('contact.desc')}
        breadcrumbs={[{ label: t('nav.contact') }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column: Inquiry Submission Form (7 cols) */}
        <div className="lg:col-span-7 bg-white/80 border border-[#211F1C]/15 p-6 sm:p-10 rounded-xs space-y-6">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#A84E36]/15 text-[#A84E36] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h3 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                {t('contact.successTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-[#625D52] max-w-md mx-auto leading-relaxed font-sans">
                {t('contact.successMsg')}
              </p>
              <div className="pt-4">
                <Button variant="secondary" size="sm" onClick={handleReset}>
                  {t('contact.testAnother')}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-[#211F1C]/10 pb-3">
                <h2 className={`text-xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                  {t('contact.formTitle')}
                </h2>
                <p className="text-xs text-[#8A8375] font-sans mt-0.5">
                  {t('contact.formSub')}
                </p>
              </div>

              {/* Error Alert with Email Direct Action if API fails */}
              {status === 'error' && (
                <div className="p-4 bg-[#FBEAE5] border border-[#A84E36]/30 rounded-xs space-y-3 text-xs font-sans">
                  <div className="flex items-start gap-2.5 text-[#A84E36]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block text-sm">{t('contact.errorTitle')}</strong>
                      <p className="text-[#625D52] mt-0.5 leading-relaxed">{errorMessage}</p>
                    </div>
                  </div>
                  <div className="pt-1 flex items-center gap-3">
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A84E36] hover:bg-[#8D3F2B] text-white rounded-xs text-xs font-medium transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{t('contact.directEmail')}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-xs text-[#625D52] hover:text-[#211F1C] underline"
                    >
                      {isBn ? 'পুনরায় চেষ্টা করুন' : 'Retry Form'}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('contact.name')}
                  labelBn={isBn ? 'আপনার পূর্ণ নাম' : undefined}
                  required
                  placeholder={isBn ? 'উদাঃ ড. নুরুল হুদা' : 'e.g., Dr. Nurul Huda'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label={t('contact.email')}
                  labelBn={isBn ? 'ইমেইল ঠিকানা' : undefined}
                  type="email"
                  required
                  placeholder="researcher@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('contact.affiliation')}
                  placeholder={isBn ? 'উদাঃ ইতিহাস বিভাগ, রাজশাহী বিশ্ববিদ্যালয়' : 'e.g., Department of History, Rajshahi University'}
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                />
                <Select
                  label={t('contact.inquiryType')}
                  options={[
                    { value: 'academic', label: t('contact.fieldAcademic') },
                    { value: 'manuscripts', label: t('contact.fieldManuscripts') },
                    { value: 'medical', label: t('contact.fieldMedical') },
                    { value: 'music', label: t('contact.fieldMusic') },
                    { value: 'general', label: t('contact.fieldGeneral') },
                  ]}
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                />
              </div>

              <Input
                label={t('contact.inquirySubject')}
                required
                placeholder={isBn ? 'উদাঃ ১৯৭১ সালের চিকিৎসাসেবা ও ঐতিহাসিক গবেষণা প্রসঙ্গে' : 'e.g., Inquiry regarding 1971 medical service and historical papers'}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />

              <Textarea
                label={t('contact.message')}
                labelBn={isBn ? 'বিস্তারিত বার্তা / গবেষণার বিষয়বস্তু' : undefined}
                required
                rows={5}
                placeholder={isBn ? 'আপনার গবেষণার উদ্দেশ্য, প্রয়োজনীয় নথিপত্র এবং বিবরণ উল্লেখ করুন...' : 'State your academic purpose, required archival references, and details...'}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-[#8A8375] font-sans">
                  {t('contact.inquiryNote')}
                </span>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting' || !formData.name || !formData.email || !formData.subject || !formData.message}
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Approved Contact Information & Access Rules (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-4 text-xs font-sans">
            <h3 className={`text-lg font-semibold text-[#211F1C] border-b border-[#211F1C]/10 pb-2 ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {t('contact.approvedEstateDetails')}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A84E36] shrink-0 mt-0.5" />
                <div>
                  <strong className={`block text-sm font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                    {t('contact.addressTitle')}
                  </strong>
                  <span className="text-[#625D52] block">
                    {t('contact.addressLocation')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A84E36] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#211F1C] block">
                    {t('contact.correspondenceAddress')}
                  </strong>
                  <a
                    href="mailto:archive@drmofizulmantu.org"
                    className="text-[#A84E36] hover:underline font-medium"
                  >
                    archive@drmofizulmantu.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#A84E36] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-[#211F1C] block">
                    {t('contact.visitingHoursTitle')}
                  </strong>
                  <span className="text-[#625D52]">
                    {t('contact.visitingHours')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Research Visitation Guidelines */}
          <div className="p-6 bg-[#EAE4D8]/50 border border-[#211F1C]/15 rounded-xs space-y-3 text-xs font-sans">
            <div className="flex items-center gap-2 text-[#A84E36] font-semibold uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('contact.scholarsGuidelines')}</span>
            </div>
            <ul className="space-y-2 text-[#625D52] list-disc list-inside">
              <li>{t('contact.guideline1')}</li>
              <li>{t('contact.guideline2')}</li>
              <li>{t('contact.guideline3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
