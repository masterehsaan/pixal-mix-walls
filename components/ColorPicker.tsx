import React from 'react';
import { COLOR_PALETTES } from '../constants';

interface Props {
  selectedColorId: string;
  onSelect: (id: string) => void;
}

export const ColorPicker: React.FC<Props> = ({ selectedColorId, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Color Filters</h3>
      <div className="flex flex-wrap gap-3">
        {COLOR_PALETTES.map((palette) => (
          <button
            key={palette.id}
            onClick={() => onSelect(palette.id)}
            className={`
              group relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
              ${
                selectedColorId === palette.id
                  ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'border-transparent hover:border-slate-500'
              }
            `}
            title={palette.name}
          >
            <div className="absolute inset-1 rounded-full overflow-hidden flex transform transition-transform group-hover:rotate-12">
              {palette.hexColors.map((hex, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: hex, width: `${100 / palette.hexColors.length}%` }}
                  className="h-full"
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};