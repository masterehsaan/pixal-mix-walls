import React, { useState, useEffect } from 'react';
import { Sparkles, Dice5, Image as ImageIcon, Wand2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import { AspectRatio, GeneratedImage, ThemeMode } from './types';
import { WALLPAPER_STYLES, COLOR_PALETTES } from './constants';
import { generateWallpaperImage } from './services/geminiService';

import { Button } from './components/Button';
import { AspectRatioToggle } from './components/AspectRatioToggle';
import { StyleSelector } from './components/StyleSelector';
import { ColorPicker } from './components/ColorPicker';
import { ThemeSelector } from './components/ThemeSelector';
import { WallpaperResult } from './components/WallpaperResult';

function App() {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [selectedStyleId, setSelectedStyleId] = useState<string>(WALLPAPER_STYLES[0].id);
  const [selectedColorId, setSelectedColorId] = useState<string>(COLOR_PALETTES[0].id);
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [prompt, setPrompt] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState<GeneratedImage | null>(null);

  // Initialize with correct aspect ratio based on device window
  useEffect(() => {
    if (window.innerWidth > 768) {
      setAspectRatio('16:9');
    }
  }, []);

  const handleRandomize = () => {
    const randomStyle = WALLPAPER_STYLES[Math.floor(Math.random() * WALLPAPER_STYLES.length)];
    const randomColor = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
    const randomTheme = Math.random() > 0.5 ? 'dark' : 'light';
    
    setSelectedStyleId(randomStyle.id);
    setSelectedColorId(randomColor.id);
    setThemeMode(randomTheme);
  };

  const handleDelete = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const style = WALLPAPER_STYLES.find(s => s.id === selectedStyleId) || WALLPAPER_STYLES[0];
      const color = COLOR_PALETTES.find(c => c.id === selectedColorId) || COLOR_PALETTES[0];

      const imageUrl = await generateWallpaperImage(
        prompt,
        style.promptModifier,
        color.promptModifier,
        themeMode,
        aspectRatio
      );

      if (imageUrl) {
        const newImage: GeneratedImage = {
          id: uuidv4(),
          url: imageUrl,
          prompt: prompt || `${style.name} Wallpaper`,
          aspectRatio,
          style: style.name,
          theme: themeMode,
          date: Date.now()
        };
        setGeneratedImages(prev => [newImage, ...prev]);
      }
    } catch (error) {
      alert("Failed to generate wallpaper. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-violet-950/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] bg-indigo-950/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-blue-950/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 animate-in fade-in duration-700 slide-in-from-top-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-slate-400 drop-shadow-sm">
              PixelGen Walls
            </h1>
            <p className="text-slate-400 font-light text-lg">
              Create unique AI wallpapers in seconds.
            </p>
          </div>
          <AspectRatioToggle value={aspectRatio} onChange={setAspectRatio} />
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Controls Sidebar / Top Section on Mobile */}
          <div className="lg:col-span-4 space-y-8 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl space-y-8 ring-1 ring-inset ring-white/5">
              
              {/* Prompt Input */}
              <div className="space-y-3 group">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-between">
                  <span className="flex items-center gap-2"><Sparkles className="w-3 h-3 text-violet-400" /> Description</span>
                </label>
                <div className="relative transition-all duration-300 group-focus-within:scale-[1.01]">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your idea (e.g., A minimalist geometric mountain range at dawn)..."
                    className="w-full bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:bg-slate-800/80 outline-none transition-all resize-none h-28 text-sm leading-relaxed scrollbar-hide shadow-inner"
                  />
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <Wand2 className="text-violet-500/30 w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Theme Selector (Dark/Light) */}
              <ThemeSelector theme={themeMode} onChange={setThemeMode} />

              {/* Style Grid */}
              <StyleSelector selectedStyleId={selectedStyleId} onSelect={setSelectedStyleId} />

              {/* Color Picker */}
              <ColorPicker selectedColorId={selectedColorId} onSelect={setSelectedColorId} />

              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent w-full"></div>
                <div className="flex gap-3">
                  <button
                    onClick={handleRandomize}
                    className="group relative overflow-hidden p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/80 hover:border-slate-600 transition-all duration-300 hover:shadow-lg active:scale-95"
                    title="Randomize All Settings"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Dice5 size={24} className="relative z-10 transition-transform duration-500 group-hover:rotate-180" />
                  </button>
                  
                  <Button 
                    onClick={handleGenerate} 
                    isLoading={isGenerating} 
                    className="flex-1 text-lg h-auto py-4 shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.5)] active:scale-[0.98]"
                  >
                    Generate Wallpapers
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-8 slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
               <div className="flex items-center gap-4 opacity-80">
                 <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-800"></div>
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                   {generatedImages.length > 0 ? 'Gallery' : 'Preview Area'}
                 </span>
                 <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-800"></div>
               </div>

              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-slate-600 bg-slate-900/20 rounded-3xl border-2 border-slate-800/30 border-dashed animate-pulse">
                  <div className="bg-slate-800/30 p-8 rounded-full mb-6 ring-1 ring-white/5">
                    <ImageIcon size={64} className="opacity-30 text-violet-300" />
                  </div>
                  <p className="text-xl font-medium text-slate-500">Your canvas is empty</p>
                  <p className="text-sm mt-2 opacity-60">Select a style and color to begin creating</p>
                </div>
              ) : (
                <div className={`grid gap-6 ${aspectRatio === '9:16' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {generatedImages.map((img, index) => (
                    <div key={img.id} className="scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <WallpaperResult 
                        image={img} 
                        onFullscreen={setFullscreenImage}
                        onDelete={handleDelete}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          <button className="absolute top-6 right-6 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all hover:rotate-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <img 
            src={fullscreenImage.url} 
            alt="Fullscreen preview" 
            className={`
              max-w-full max-h-[92vh] rounded-md shadow-2xl select-none 
              ${fullscreenImage.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}
              animate-in zoom-in-95 duration-300
            `}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default App;