import React from 'react';
import { WallpaperStyle } from '../types';
import { WALLPAPER_STYLES } from '../constants';

interface Props {
  selectedStyleId: string;
  onSelect: (id: string) => void;
}

export const StyleSelector: React.FC<Props> = ({ selectedStyleId, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Style Category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {WALLPAPER_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`
              relative p-3 rounded-xl border text-left transition-all duration-200
              flex flex-col justify-between h-20 overflow-hidden group
              ${
                selectedStyleId === style.id
                  ? 'bg-violet-600/20 border-violet-500 ring-1 ring-violet-500 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700/50 hover:border-slate-500 hover:text-slate-200'
              }
            `}
          >
            <span className="relative z-10 text-sm font-medium leading-tight">{style.name}</span>
            <div className={`
              absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300
              ${selectedStyleId === style.id ? 'opacity-20 from-violet-500 to-fuchsia-500' : 'group-hover:opacity-10 from-white to-transparent'}
            `} />
          </button>
        ))}
      </div>
    </div>
  );
};