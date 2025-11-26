import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../types';

interface Props {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export const ThemeSelector: React.FC<Props> = ({ theme, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Wallpaper Theme</h3>
      <div className="flex bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50">
        <button
          onClick={() => onChange('dark')}
          className={`
            relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
            ${theme === 'dark'
              ? 'bg-slate-700 text-white shadow-lg ring-1 ring-white/10 translate-y-0'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }
          `}
        >
          <Moon size={18} className={theme === 'dark' ? 'fill-current' : ''} />
          <span>Dark Mode</span>
        </button>
        <button
          onClick={() => onChange('light')}
          className={`
            relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
            ${theme === 'light'
              ? 'bg-slate-200 text-slate-900 shadow-lg shadow-white/10 translate-y-0'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
            }
          `}
        >
          <Sun size={18} className={theme === 'light' ? 'fill-current' : ''} />
          <span>Light Mode</span>
        </button>
      </div>
    </div>
  );
};