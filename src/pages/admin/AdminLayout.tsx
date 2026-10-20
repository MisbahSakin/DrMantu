import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Shield,
  User,
  LogOut,
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher';
import { AdminLoginPage } from './AdminLoginPage';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
  actions?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs = [],
  actions,
}) => {
  const location = useLocation();
  const {
    isAuthenticated,
    logout,
    isSidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    setMobileMenuOpen,
    toast,
    settings,
  } = useAdmin();
  const { isBn, t } = useLanguage();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Lock body scroll when admin mobile drawer is active
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  const navItems = [
    { label: 'Dashboard', labelBn: 'ড্যাশবোর্ড', path: '/admin', icon: LayoutDashboard },
    { label: 'Content Manager', labelBn: 'কনটেন্ট ম্যানেজার', path: '/admin/content', icon: FileText },
    { label: 'Books Catalog', labelBn: 'গ্রন্থতালিকা', path: '/admin/books', icon: BookOpen },
    { label: 'Media Library', labelBn: 'মিডিয়া লাইব্রেরি', path: '/admin/media', icon: ImageIcon },
    { label: 'Site Settings', labelBn: 'সেটিংস', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#211F1C] flex flex-col font-sans selection:bg-[#A84E36] selection:text-white">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div
            role="status"
            className={`flex items-center gap-3 px-4 py-3 rounded-xs border text-xs shadow-md ${
              toast.type === 'error'
                ? 'bg-[#933420] text-white border-[#752817]'
                : toast.type === 'warning'
                ? 'bg-[#E39832] text-[#211F1C] border-[#BF7C21]'
                : toast.type === 'info'
                ? 'bg-[#2E4A62] text-white border-[#1E3345]'
                : 'bg-[#2A4736] text-white border-[#1E3426]'
            }`}
          >
            {toast.type === 'error' || toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Admin Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {/* ===================================================================
            DESKTOP SIDEBAR (Collapsible)
           =================================================================== */}
        <aside
          className={`hidden md:flex flex-col border-r border-[#211F1C]/15 bg-[#EFECE4] transition-all duration-300 ease-in-out shrink-0 select-none ${
            isSidebarCollapsed ? 'w-18' : 'w-64'
          }`}
        >
          {/* Sidebar Brand Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#211F1C]/10">
            <Link
              to="/admin"
              className="flex items-center gap-3 overflow-hidden text-left"
              title="Dr. Mantu Archive Admin"
            >
              <div className="w-9 h-9 rounded-xs bg-[#211F1C] text-[#F7F4ED] flex items-center justify-center font-serif text-lg font-bold shrink-0">
                ম
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#A84E36] font-sans truncate">
                    Archival Console
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#211F1C] truncate">
                    Dr. Mantu Estate
                  </div>
                </div>
              )}
            </Link>

            <button
              onClick={toggleSidebar}
              className="p-1.5 text-[#625D52] hover:text-[#211F1C] hover:bg-[#E2DDD2] rounded-xs transition-colors shrink-0"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
            <div
              className={`text-[10px] uppercase font-bold tracking-widest text-[#8A8375] px-3 py-1 ${
                isSidebarCollapsed ? 'text-center' : ''
              }`}
            >
              {isSidebarCollapsed ? 'Nav' : 'Management'}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);
              const itemLabel = isBn ? item.labelBn : item.label;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={isSidebarCollapsed ? itemLabel : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#211F1C] text-white shadow-2xs font-semibold'
                      : 'text-[#504C44] hover:bg-[#E5E0D5] hover:text-[#211F1C]'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#D9826C]' : 'text-[#625D52]'
                    }`}
                  />
                  {!isSidebarCollapsed && <span className="truncate">{itemLabel}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Sidebar Utility */}
          <div className="p-3 border-t border-[#211F1C]/10 space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2 rounded-xs text-xs text-[#625D52] hover:text-[#211F1C] hover:bg-[#E5E0D5] transition-colors ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
              title="Return to Public Archive"
            >
              <ExternalLink className="w-4 h-4 shrink-0 text-[#8A8375]" />
              {!isSidebarCollapsed && <span className="truncate">Public Archive</span>}
            </Link>
          </div>
        </aside>

        {/* ===================================================================
            MOBILE DRAWER (Slide-out navigation for small screens)
           =================================================================== */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden flex"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-4/5 max-w-xs bg-[#EFECE4] border-r border-[#211F1C]/20 h-full p-4 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#211F1C]/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xs bg-[#211F1C] text-[#F7F4ED] flex items-center justify-center font-serif font-bold">
                      ম
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#A84E36]">
                        Archival Console
                      </div>
                      <div className="font-serif text-sm font-semibold text-[#211F1C]">
                        Dr. Mantu Estate
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-[#625D52] hover:text-[#211F1C]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.path === '/admin'
                        ? location.pathname === '/admin'
                        : location.pathname.startsWith(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#211F1C] text-white font-semibold'
                            : 'text-[#504C44] hover:bg-[#E5E0D5] hover:text-[#211F1C]'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{isBn ? item.labelBn : item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#211F1C]/10 space-y-2 text-xs">
                <div className="px-3 py-1 flex items-center justify-between">
                  <span className="text-[11px] text-[#8A8375] font-semibold">{isBn ? 'ভাষা নির্বাচন' : 'Language'}:</span>
                  <LanguageSwitcher />
                </div>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xs bg-[#E5E0D5] text-[#211F1C] font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isBn ? 'পাবলিক আর্কাইভে ফিরুন' : 'Return to Public Archive'}</span>
                </Link>
                <div className="text-[11px] text-[#8A8375] px-2 text-center">
                  Dr. Md. Mofizul Islam Mantu Archive
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            CONTENT AREA & TOP BAR
           =================================================================== */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar */}
          <header className="h-16 bg-[#F7F4ED] border-b border-[#211F1C]/15 px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
            {/* Left: Mobile hamburger & Breadcrumbs */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden min-h-[44px] min-w-[44px] p-2 text-[#625D52] hover:text-[#211F1C] active:bg-[#EAE4D8] rounded-xs flex items-center justify-center"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#8A8375] font-sans truncate">
                <Link to="/admin" className="hover:text-[#211F1C] transition-colors font-medium">
                  Admin
                </Link>
                {breadcrumbs.map((b, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[#8A8375]/50">/</span>
                    {b.path ? (
                      <Link to={b.path} className="hover:text-[#211F1C] transition-colors">
                        {b.label}
                      </Link>
                    ) : (
                      <span className="text-[#211F1C] font-semibold truncate">{b.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right: Console Status, Language Switcher & Administrator Profile */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Language Switcher in Admin */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Status Indicator */}
              <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-2xs bg-[#EAE4D8]/70 border border-[#211F1C]/10 text-[11px] text-[#625D52]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A4736]" />
                <span>{isBn ? 'প্রশাসনিক সেশন' : 'Admin Console'}</span>
              </div>

              {/* View Public Website */}
              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#211F1C]/20 hover:border-[#211F1C] text-xs font-medium text-[#211F1C] hover:bg-[#EAE4D8]/50 transition-colors"
              >
                <span>{isBn ? 'ওয়েবসাইট দেখুন' : 'View Website'}</span>
                <ExternalLink className="w-3 h-3 text-[#8A8375]" />
              </Link>

              {/* Administrator Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xs hover:bg-[#EAE4D8]/60 transition-colors focus:outline-none focus:ring-1 focus:ring-[#A84E36]"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-[#36493E] text-white flex items-center justify-center font-serif text-xs font-semibold shadow-2xs">
                    MS
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-medium text-[#211F1C] leading-tight">
                      Misbah Sakin
                    </div>
                    <div className="text-[10px] text-[#8A8375]">Curator Lead</div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-[#F7F4ED] border border-[#211F1C]/15 rounded-xs shadow-xl p-3 z-50 text-xs font-sans space-y-3">
                      <div className="pb-2 border-b border-[#211F1C]/10">
                        <div className="font-semibold text-[#211F1C]">Misbah Sakin</div>
                        <div className="text-[11px] text-[#625D52]">misbahsakin1@gmail.com</div>
                        <div className="text-[10px] text-[#A84E36] mt-0.5 font-medium">
                          Lead Archive Curator · Rangpur
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/admin/settings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-2xs text-[#625D52] hover:bg-[#EAE4D8] hover:text-[#211F1C] transition-colors"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span>Archive Configuration</span>
                        </Link>
                      </div>

                      <div className="pt-2 border-t border-[#211F1C]/10">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] text-[#8A8375] hover:text-[#A84E36] transition-colors"
                        >
                          <span>{isBn ? 'লগ আউট' : 'Sign Out'}</span>
                          <LogOut className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Main Viewport Content */}
          <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* Viewport Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#211F1C]/10">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#211F1C]">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-[#625D52] mt-1 font-sans">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">{actions}</div>}
            </div>

            {/* Page Children */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
