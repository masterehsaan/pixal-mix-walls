import { GoogleGenAI } from "@google/genai";
import { AspectRatio, ThemeMode } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash-image (Nano Banana) as requested for free/fast generation
const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateWallpaperImage = async (
  userPrompt: string,
  styleModifier: string,
  colorModifier: string,
  themeMode: ThemeMode,
  aspectRatio: AspectRatio
): Promise<string | null> => {
  try {
    const themePrompt = themeMode === 'dark'
      ? 'dark mode aesthetic, deep shadows, low key lighting, dark background, amoled friendly, moody atmosphere'
      : 'light mode aesthetic, bright illumination, high key lighting, white or light background, airy, clean, daytime atmosphere';

    // Construct a highly detailed prompt to emulate "Pixel-like" generative wallpapers
    // The flash-image model responds well to descriptive stylistic instructions.
    const fullPrompt = `
      Create a unique, high-fidelity abstract wallpaper.
      
      Theme: ${themePrompt}
      Visual Style: ${styleModifier}
      Color Palette: ${colorModifier}
      Subject: ${userPrompt || 'Abstract forms and textures'}
      
      Directives:
      - Aesthetic: Mimic high-end smartphone generative AI wallpapers (clean, artistic, premium).
      - Composition: Balanced and uncluttered.
      - Quality: Sharp details, professional lighting, 4K render feel.
      - Contrast: Ensure the image strictly adheres to the ${themeMode} theme.
      - Format: 
        - If Mobile (9:16), ensure the focal point is vertically centered.
        - If Desktop (16:9), ensure a panoramic flow.
      - Negative Prompt: No text, no watermarks, no blurry artifacts, no low-poly (unless specified), no distortions.
    `.trim();

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio, // Supported by gemini-2.5-flash-image
          // imageSize is NOT supported by gemini-2.5-flash-image
        },
      },
    });

    // Extract image from response
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64Data}`;
        }
      }
    }
    
    return null;

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};