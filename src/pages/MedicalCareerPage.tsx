import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import {
  GraduationCap,
  Stethoscope,
  Globe,
  Home,
  ShieldCheck,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export const MedicalCareerPage: React.FC = () => {
  const { isBn, t } = useLanguage();
  const { getPublishedSectionImage } = useAdmin();

  // Retrieve published medical career photograph if assigned & published by administrator
  const publishedMedicalImage = getPublishedSectionImage('medical');

  const medicalChronology = [
    {
      period: '1971–1976',
      periodBn: '১৯৭১–১৯৭৬',
      role: 'Medical Education (MBBS)',
      roleBn: 'চিকিৎসাবিজ্ঞানে স্নাতক (এমবিবিএস)',
      institution: 'Rangpur Medical College',
      institutionBn: 'রংপুর মেডিকেল কলেজ',
      location: 'Rangpur, Bangladesh',
      locationBn: 'রংপুর, বাংলাদেশ',
      icon: GraduationCap,
      description:
        'Completed MBBS training in inpatient clinical wards, pathology, and community medicine during Bangladesh’s independence era.',
      descriptionBn:
        'স্বাধীন বাংলাদেশের সূচনা পর্বে রংপুর মেডিকেল কলেজে অভ্যন্তরীণ ক্লিনিক্যাল ওয়ার্ড, প্যাথলজি ও কমিউনিটি চিকিৎসায় প্রশিক্ষণ সমাপন।',
    },
    {
      period: 'From 1978',
      periodBn: '১৯৭৮ থেকে',
      role: 'Clinical Service in Bangladesh',
      roleBn: 'বাংলাদেশে পেশাগত চিকিৎসা সেবা',
      institution: 'Public Dispensary & Primary Care',
      institutionBn: 'সরকারি ডিসপেনসারি ও প্রাথমিক চিকিৎসা',
      location: 'Northern Bangladesh',
      locationBn: 'উত্তরবঙ্গ',
      icon: Stethoscope,
      description:
        'Commenced professional medical service in Bangladesh, treating rural communities and seasonal outbreaks.',
      descriptionBn:
        'উত্তরবঙ্গের গ্রামীণ জনপদে সাধারণ মানুষের চিকিৎসা ও মৌসুমি মহামারি প্রতিরোধে নিবেদিত চিকিৎসা সেবার সূচনা।',
    },
    {
      period: '1984–1992',
      periodBn: '১৯৮৪–১৯৯২',
      role: 'Hospital Practice in Iran',
      roleBn: 'ইরানে আট বছরের আন্তর্জাতিক চিকিৎসা সেবা',
      institution: 'Regional Hospital Systems',
      institutionBn: 'আঞ্চলিক হাসপাতাল ব্যবস্থা, ইরান',
      location: 'Iran',
      locationBn: 'ইরান',
      icon: Globe,
      description:
        'Served eight years abroad as a hospital physician in Iran, managing diverse inpatient and outpatient populations.',
      descriptionBn:
        'ইরানের বিভিন্ন সরকারি হাসপাতালে আট বছর চিকিৎসক হিসেবে আন্তর্জাতিক সেবা এবং বহুমাত্রিক ক্লিনিক্যাল দক্ষতা অর্জন।',
    },
    {
      period: 'From 1992',
      periodBn: '১৯৯২ থেকে',
      role: 'Private Family Medicine in Rangpur',
      roleBn: 'রংপুরে পারিবারিক চিকিৎসা চেম্বার',
      institution: 'Radhaballabh Family Medicine Chamber',
      institutionBn: 'রাধাবল্লভ ফ্যামিলি মেডিসিন চেম্বার',
      location: 'Rangpur, Bangladesh',
      locationBn: 'রংপুর, বাংলাদেশ',
      icon: Home,
      description:
        'Established private family practice in Rangpur, providing continuous, compassionate primary care across multiple generations.',
      descriptionBn:
        'স্বদেশ রংপুরে ফিরে রাধাবল্লভে ব্যক্তিগত পারিবারিক চেম্বার প্রতিষ্ঠা এবং তিন দশক ধরে রোগীদের পরম যত্নে চিকিৎসা সেবা প্রদান।',
    },
    {
      period: '2004–2009',
      periodBn: '২০০৪–২০০৯',
      role: 'Regional Healthcare Advisory',
      roleBn: 'আঞ্চলিক স্বাস্থ্যসেবা উপদেষ্টা',
      institution: 'Community Health Programs',
      institutionBn: 'কমিউনিটি স্বাস্থ্য কর্মসূচি',
      location: 'Rangpur District',
      locationBn: 'রংপুর জেলা',
      icon: ShieldCheck,
      description:
        'Advised public health standards, clinical sanitation, and rural preventive maternal-child care initiatives.',
      descriptionBn:
        'রংপুরে জনস্বাস্থ্য মানোন্নয়ন, গ্রামীণ ক্লিনিক সেনিটেশন এবং মা ও শিশুর প্রতিরোধমূলক স্বাস্থ্যসেবায় দিকনির্দেশনা প্রদান।',
    },
    {
      period: '2010–2020',
      periodBn: '২০১০–২০২০',
      role: 'Academic & Clinical Teaching',
      roleBn: 'চিকিৎসাবিজ্ঞান শিক্ষকতা ও দিকনির্দেশনা',
      institution: 'Medical Training Institutions',
      institutionBn: 'চিকিৎসা প্রশিক্ষণ প্রতিষ্ঠানসমূহ',
      location: 'Rangpur',
      locationBn: 'রংপুর',
      icon: BookOpen,
      description:
        'Instructed and mentored medical students, interns, and nursing practitioners across a dedicated decade.',
      descriptionBn:
        'এক দশক ধরে তরুণ মেডিকেল শিক্ষার্থী, ইন্টার্ন চিকিৎসক ও নার্সিং কর্মীদের ক্লিনিক্যাল নীতিশাস্ত্র ও মানবিক দিকনির্দেশনা প্রদান।',
    },
  ];

  return (
    <Layout>
      <PageHeader
        kicker={t('medical.kicker')}
        title={t('medical.title')}
        titleBn="চিকিৎসা জীবন ও মানবসেবা"
        description={t('medical.desc')}
        breadcrumbs={[{ label: t('nav.medical') }]}
        actions={
          <Button
            to="/books/sthasyasebar-itihase-rangpur"
            variant="secondary"
            size="sm"
            icon={<BookOpen className="w-3.5 h-3.5" />}
          >
            {t('medical.buttonBook')}
          </Button>
        }
      />

      {/* Brief Introduction & Published Archival Image (if published by admin) */}
      <div className={`grid grid-cols-1 ${publishedMedicalImage ? 'lg:grid-cols-12 gap-8' : ''} mb-12 items-start`}>
        <div className={publishedMedicalImage ? 'lg:col-span-7 space-y-3' : 'max-w-3xl space-y-3'}>
          <h2 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {t('medical.introTitle')}
          </h2>
          <p className="text-base text-[#625D52] leading-relaxed font-sans">
            {t('medical.introText')}
          </p>
        </div>

        {publishedMedicalImage && (
          <div className="lg:col-span-5 p-3.5 bg-white/80 border border-[#211F1C]/15 rounded-xs space-y-2 shadow-2xs">
            <div className="relative aspect-[16/10] bg-[#EAE4D8]/50 rounded-2xs overflow-hidden border border-[#211F1C]/10">
              <img
                src={publishedMedicalImage.url}
                alt={isBn ? publishedMedicalImage.altTextBn || publishedMedicalImage.altText : publishedMedicalImage.altText}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-2 border border-white/30 rounded-3xs pointer-events-none" />
            </div>
            <div className="text-[11px] text-[#625D52] font-serif italic text-center px-1">
              {isBn ? publishedMedicalImage.captionBn || publishedMedicalImage.caption : publishedMedicalImage.caption}
            </div>
          </div>
        )}
      </div>

      {/* Career Milestones */}
      <div className="space-y-6 mb-16">
        <div className="border-b border-[#211F1C]/10 pb-3">
          <h3 className={`text-xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
            {t('medical.timelineTitle')}
          </h3>
          <p className="text-xs text-[#8A8375] font-sans mt-0.5">
            {t('medical.timelineSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicalChronology.map((item, idx) => {
            const IconComponent = item.icon;
            const mainRole = isBn ? item.roleBn : item.role;
            const subRole = isBn ? item.role : item.roleBn;
            const displayPeriod = isBn ? item.periodBn : item.period;
            const displayLoc = isBn ? item.locationBn : item.location;
            const displayInst = isBn ? item.institutionBn : item.institution;
            const displayDesc = isBn ? item.descriptionBn : item.description;

            return (
              <div
                key={idx}
                className="p-5 bg-white/70 border border-[#211F1C]/12 rounded-xs hover:border-[#211F1C]/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2 font-sans">
                    <span className="font-mono font-bold text-[#A84E36]">{displayPeriod}</span>
                    <span className="flex items-center gap-1 text-[#8A8375]">
                      <MapPin className="w-3 h-3 text-[#A84E36]" />
                      {displayLoc}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EAE4D8] text-[#211F1C] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4 text-[#A84E36]" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold text-[#211F1C] leading-snug ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
                        {mainRole}
                      </h4>
                      <p className={`text-xs text-[#625D52] mt-0.5 ${isBn ? 'font-serif italic' : 'font-bengali-text'}`}>
                        {subRole}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#625D52] mt-3 leading-relaxed font-sans">
                    {displayDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#211F1C]/10 text-[11px] text-[#8A8375] font-sans">
                  {displayInst}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
