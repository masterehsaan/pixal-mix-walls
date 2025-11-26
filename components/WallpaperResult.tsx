import React from 'react';
import { Download, Maximize2, Trash2 } from 'lucide-react';
import { GeneratedImage } from '../types';

interface Props {
  image: GeneratedImage;
  onFullscreen: (img: GeneratedImage) => void;
  onDelete: (id: string) => void;
}

export const WallpaperResult: React.FC<Props> = ({ image, onFullscreen, onDelete }) => {
  const isMobile = image.aspectRatio === '9:16';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `pixelgen-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`relative group rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-violet-900/20 ${isMobile ? 'aspect-[9/16]' : 'aspect-video'}`}>
      <img
        src={image.url}
        alt={image.prompt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm line-clamp-2 mb-4 font-light opacity-90">{image.prompt}</p>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-sm py-2 rounded-lg transition-colors border border-white/10"
            title="Download Wallpaper"
          >
            <Download size={16} /> Save
          </button>
          <button
            onClick={() => onFullscreen(image)}
            className="flex items-center justify-center w-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-lg transition-colors border border-white/10"
            title="View Fullscreen"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if(confirm('Delete this wallpaper?')) {
                onDelete(image.id);
              }
            }}
            className="flex items-center justify-center w-10 bg-red-500/20 backdrop-blur-md hover:bg-red-500/40 text-red-100 rounded-lg transition-colors border border-red-500/20 group/delete"
            title="Delete Wallpaper"
          >
            <Trash2 size={16} className="group-hover/delete:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};