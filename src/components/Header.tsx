import React from 'react';
import { Wifi, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`h-16 px-4 flex items-center justify-between shadow-md transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-800 text-white' 
        : 'bg-white text-slate-900'
    }`}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
          <Wifi size={20} />
        </div>
        <h1 className="text-xl font-semibold">GPS Spoofing System</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button 
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;