import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/FormControls';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAdmin();
  const { isBn } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      // Server is the only authority on credentials
      let authenticated = false;
      let serverError = '';
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        authenticated = true;
        if (data.token) {
          try {
            localStorage.setItem('mantu_admin_token', data.token);
          } catch {}
        }
      } else {
        serverError = data.error || '';
      }

      if (authenticated) {
        login(password);
        navigate('/admin');
      } else {
        setErrorMessage(
          serverError && res.status !== 401
            ? serverError
            : isBn
            ? 'প্রবেশাধিকার যাচাই ব্যর্থ হয়েছে। অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড সঠিকভাবে পরীক্ষা করুন।'
            : 'Authentication failed. Please verify your administrator credentials.'
        );
      }
    } catch {
      setErrorMessage(
        isBn
          ? 'সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
          : 'Unable to communicate with the authentication server. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#211F1C] flex flex-col justify-between selection:bg-[#A84E36] selection:text-white font-sans">
      {/* Top Bar */}
      <header className="h-16 border-b border-[#211F1C]/10 px-4 sm:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#625D52] hover:text-[#211F1C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? 'পাবলিক আর্কাইভে ফিরুন' : 'Return to Public Archive'}</span>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white/90 border border-[#211F1C]/15 rounded-xs p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#211F1C] text-[#F7F4ED] flex items-center justify-center font-serif text-xl font-bold mx-auto mb-3">
              ম
            </div>
            <div className="text-[11px] uppercase tracking-widest text-[#A84E36] font-bold">
              {isBn ? 'আর্কাইভ প্রশাসন' : 'Archival Administration'}
            </div>
            <h1 className={`text-2xl font-semibold text-[#211F1C] ${isBn ? 'font-bengali-heading' : 'font-serif'}`}>
              {isBn ? 'প্রশাসনিক প্যানেল প্রবেশ' : 'Sign In to Archive Console'}
            </h1>
            <p className="text-xs text-[#625D52] max-w-xs mx-auto">
              {isBn
                ? 'ডা. মোঃ মফিজুল ইসলাম মান্টু স্মৃতি সংরক্ষণ তহবিল ও ক্যাটালগ নিয়ন্ত্রণ ব্যবস্থা।'
                : 'Authorized curatorial access for Dr. Md. Mofizul Islam Mantu Archive.'}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-[#933420]/10 border border-[#933420]/20 rounded-xs text-xs text-[#933420] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={isBn ? 'প্রশাসক ইমেইল' : 'Administrator Email'}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@drmofizulmantu.org"
            />

            <Input
              label={isBn ? 'গোপন পাসওয়ার্ড' : 'Security Passkey'}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting || !email || !password}
                className="w-full justify-center"
                icon={<Lock className="w-3.5 h-3.5" />}
              >
                {isSubmitting
                  ? (isBn ? 'যাচাই করা হচ্ছে...' : 'Authenticating...')
                  : (isBn ? 'প্রবেশ করুন' : 'Sign In')}
              </Button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-[#211F1C]/10 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A8375]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2A4736]" />
              <span>
                {isBn
                  ? 'এনক্রিপ্টকৃত ও পরিবেশ-সুরক্ষিত প্রশাসন সেশন'
                  : 'Encrypted & Environment-Protected Console'}
              </span>
            </div>
            <p className="text-[10px] text-[#8A8375] leading-relaxed">
              {isBn
                ? 'অননুমোদিত প্রবেশাধিকার প্রচেষ্টা সিস্টেম অডিট লগে লিপিবদ্ধ হয়।'
                : 'Unauthorized access attempts are audited according to archive security standards.'}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-[#8A8375] border-t border-[#211F1C]/10">
        © {new Date().getFullYear()} Dr. Md. Mofizul Islam Mantu Archive · Rangpur, Bangladesh
      </footer>
    </div>
  );
};
