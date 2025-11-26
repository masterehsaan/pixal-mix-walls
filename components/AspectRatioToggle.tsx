import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { AspectRatio } from '../types';

interface Props {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

export const AspectRatioToggle: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex bg-slate-800 p-1 rounded-full border border-slate-700/50">
      <button
        onClick={() => onChange('9:16')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          value === '9:16'
            ? 'bg-slate-600 text-white shadow-lg'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Smartphone size={16} />
        Mobile
      </button>
      <button
        onClick={() => onChange('16:9')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          value === '16:9'
            ? 'bg-slate-600 text-white shadow-lg'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Monitor size={16} />
        Desktop
      </button>
    </div>
  );
};