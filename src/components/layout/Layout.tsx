import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  containerWidth?: 'normal' | 'wide' | 'full';
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  containerWidth = 'normal',
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const widthClasses = {
    normal: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    full: 'w-full',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#211F1C]">
      <Header />
      <main className={`flex-1 py-8 sm:py-12 ${widthClasses[containerWidth]}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
