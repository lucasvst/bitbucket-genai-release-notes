import { GoogleGenAI, Type, Modality } from '@google/genai'

export const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
export {
  Type,
  Modality,
}
