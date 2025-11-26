import { WallpaperStyle, ColorPalette } from './types';

export const WALLPAPER_STYLES: WallpaperStyle[] = [
  { id: 'minimal_landscape', name: 'Minimal Landscape', description: 'Clean lines, vector art, simple geometry', promptModifier: 'minimalist vector art landscape, flat design, clean lines, simple geometry, serene atmosphere, gradient sky' },
  { id: 'vibrant', name: 'Vibrant', description: 'High saturation, punchy colors', promptModifier: 'vibrant aesthetic, high saturation, neon accents, colorful, energetic, punchy contrast, digital art' },
  { id: 'smooth', name: 'Smooth', description: 'Soft gradients, blurry, glassy', promptModifier: 'smooth gradients, soft gaussian blur, glassmorphism, ethereal, dreamy, fluid liquid shapes, soothing' },
  { id: 'contrasty', name: 'Contrasty', description: 'High contrast, dramatic light', promptModifier: 'high contrast black and white or color, dramatic chiaroscuro lighting, deep shadows, bright highlights, intense atmosphere' },
  { id: 'fantasy', name: 'Fantasy', description: 'Magical, mythical, otherworldly', promptModifier: 'fantasy concept art, magical forest, floating islands, glowing runes, mythical creatures, epic scale, detailed matte painting' },
  { id: 'horror_nightmare', name: 'Horror / Nightmare', description: 'Dark, eerie, unsettled', promptModifier: 'dark fantasy horror, nightmare aesthetic, eerie atmosphere, unsettling shadows, gothic architecture, misty, mysterious' },
  { id: 'superheros', name: 'Superhero', description: 'Comic style, action pose', promptModifier: 'modern comic book art style, superhero theme, epic action pose, dynamic cinematic lighting, bold strokes, heroic composition' },
  { id: 'amoled', name: 'AMOLED / Dark', description: 'Pure blacks, neon pops', promptModifier: 'amoled wallpaper, true pitch black background, neon light strips, glowing minimalist shapes, high contrast, OLED optimization' },
  { id: 'flat_simple', name: 'Flat Simple', description: '2D, no gradients, clean', promptModifier: 'flat design illustration, 2D vector art, no gradients, solid colors, iconographic style, bauhaus minimalist' },
  { id: 'watercolor', name: 'Watercolor Art', description: 'Wet brush, artistic bleed', promptModifier: 'watercolor painting style, wet on wet technique, paper texture, artistic color bleeding, soft edges, ink wash' },
  { id: 'cute', name: 'Cute', description: 'Kawaii, pastel, soft shapes', promptModifier: 'cute kawaii aesthetic, soft round shapes, pastel colors, adorable character design, playful, charming, 3d render style' },
  { id: 'patterns', name: 'Patterns', description: 'Repeating, geometric', promptModifier: 'seamless geometric pattern, textile design, abstract texture repetition, symmetrical, complex ornate design' },
  { id: 'artistic_nature', name: 'Artistic Nature', description: 'Stylized plants, organic', promptModifier: 'stylized botanical art, macro photography feel, organic shapes, leaves and vines, golden hour lighting, nature texture' },
  { id: 'antique_dots', name: 'Antique Dots', description: 'Vintage pointillism, stippling', promptModifier: 'antique aesthetic, vintage paper texture, pointillism art style, stippling dots, halftone pattern, retro illustration, sepia tones' },
  { id: 'abstract', name: 'Abstract', description: 'Shapes, feelings, modern', promptModifier: 'modern abstract art, non-representational, chaotic yet balanced, expressionism, fluid acrylic pour style, digital masterpiece' },
  { id: 'pastel_stroke', name: 'Pastel Stroke', description: 'Chalky, soft strokes', promptModifier: 'soft pastel chalk strokes, textured painterly style, impressionism, gentle hues, artistic sketch' },
];

export const COLOR_PALETTES: ColorPalette[] = [
  { id: 'none', name: 'AI Choice', hexColors: ['#ffffff', '#000000'], promptModifier: 'balanced harmonious colors' },
  { id: 'sunset', name: 'Sunset Glow', hexColors: ['#f97316', '#db2777', '#7c3aed'], promptModifier: 'warm sunset color palette, orange, magenta, deep purple gradients' },
  { id: 'ocean', name: 'Deep Ocean', hexColors: ['#0f172a', '#1e40af', '#38bdf8'], promptModifier: 'deep ocean blue palette, teal, aquamarine, midnight blue' },
  { id: 'forest', name: 'Mystic Forest', hexColors: ['#064e3b', '#10b981', '#a7f3d0'], promptModifier: 'lush forest greens, emerald, sage, mossy dark tones' },
  { id: 'monochrome', name: 'Monochrome', hexColors: ['#000000', '#737373', '#ffffff'], promptModifier: 'monochromatic, black and white, grayscale, metallic silver' },
  { id: 'cyberpunk', name: 'Cyberpunk', hexColors: ['#f472b6', '#22d3ee', '#111827'], promptModifier: 'cyberpunk neon palette, hot pink, electric blue, dark futuristic background' },
  { id: 'pastel', name: 'Soft Pastels', hexColors: ['#fca5a5', '#fde047', '#93c5fd'], promptModifier: 'soft pastel color palette, baby blue, millennial pink, cream, light yellow' },
  { id: 'royal', name: 'Royal Gold', hexColors: ['#451a03', '#b45309', '#fcd34d'], promptModifier: 'luxurious royal palette, gold, bronze, deep brown, velvet texture' },
  { id: 'pixel_signature', name: 'Pixel Pop', hexColors: ['#c084fc', '#fb7185', '#e879f9'], promptModifier: 'google pixel signature colors, playful pop, coral, lilac, mint, soft vibrancy' },
];