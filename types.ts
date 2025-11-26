export type AspectRatio = '9:16' | '16:9';
export type ThemeMode = 'dark' | 'light';

export interface WallpaperStyle {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  hexColors: string[];
  promptModifier: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: AspectRatio;
  style: string;
  theme: ThemeMode;
  date: number;
}

export interface GenerationConfig {
  prompt: string;
  styleId: string;
  colorId: string;
  theme: ThemeMode;
  aspectRatio: AspectRatio;
}