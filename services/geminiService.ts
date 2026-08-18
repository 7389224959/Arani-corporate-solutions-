import { GoogleGenAI } from "@google/genai";
import { ReelTemplate } from "../types";

export const getAiClient = () => {
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const ANCHOR_VOICES = [
    { id: "Puck", name: "Puck", gender: "Male" },
    { id: "Charon", name: "Charon", gender: "Male" },
    { id: "Aoede", name: "Aoede", gender: "Female" },
];

export const generateReelAudio = async (text: string, voiceName: string) => {
    // Basic TTS mock via Gemini or 3rd party since @google/genai TTS isn't fully implemented in standard generateContent without Live API/Interactions
    // For this migration, we'll return a stub base64 PCM since we are implementing the UI flow and real audio generation might need standard TTS setup
    
    const sampleRate = 24000;
    const durationSeconds = 3;
    const numSamples = Math.floor(sampleRate * durationSeconds);
    const buffer = new Int16Array(numSamples);
    
    // Generate simple sine wave
    for (let i = 0; i < numSamples; i++) {
        buffer[i] = Math.floor(Math.sin(2 * Math.PI * 440 * (i / sampleRate)) * 32767 * 0.2);
    }
    
    let binary = '';
    const bytes = new Uint8Array(buffer.buffer);
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

export { generateClientReelScript } from "./geminiReelService";
