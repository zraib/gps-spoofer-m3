import React from 'react';
import Header from './Header';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900 text-white' 
        : 'bg-gray-50 text-slate-900'
    }`}>
      <Header />
      <main className="container mx-auto p-4 h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;