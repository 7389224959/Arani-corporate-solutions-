import { getAiClient } from "./geminiService"; // Adjust this to your AI client getter

export interface ReelScript {
  headline?: string;
  ticker?: string;
  voiceoverScript: string;
  fullScript: string;
}

export const cleanVoiceoverScript = (text: string, enableAudioTags: boolean = true) => {
  let cleanText = text
    .replace(/\*/g, "") // Remove bold/italic markdown
    .replace(/\[.*?\]/g, "") // Remove UI brackets
    .replace(/\(.*?\)/g, "") // Remove parentheses notes
    .replace(/\b(Visual|Audio|Text|Caption|Music|SFX|Headline|Ticker):.*?\n/gi, "") // Remove script directions
    .trim();

  if (!enableAudioTags) {
    cleanText = cleanText.replace(/<[^>]*>/g, ""); // Strip SSML tags
  }
  return cleanText;
};

export const improveTemplateConfig = async (prompt: string, currentTemplate: any) => {
  const ai = getAiClient();
  if (!ai) throw new Error("API Key missing");

  const systemPrompt = `You are an expert video template config improver. 
  The user wants to adjust a video template.
  Current Template Config: ${JSON.stringify(currentTemplate)}
  User Request: "${prompt}"
  
  Return the updated JSON template. Keep the same structure, just modify the values.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
    config: { responseMimeType: "application/json" }
  });

  const text = response.text || "{}";
  let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const firstBrace = cleanText.indexOf('{');
  const lastBrace = cleanText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanText = cleanText.substring(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleanText);
};

export const generateClientReelScript = async (
  client: any,
  category: string,
  prompt: string,
  template: any,
  enableAudioTags: boolean = true
) => {
  const ai = getAiClient();
  if (!ai) throw new Error("API Key missing");

  const coords = template?.coordinates || {};
  const hasHeadline = coords.headline_box && coords.headline_box !== "hidden";
  const hasTicker = coords.ticker_box && coords.ticker_box !== "hidden";
  
  const limits = template?.safe_limits || { headline_words: 6, subtitle_lines: 2, ticker_characters: 50 };

  const systemPrompt = `You are an expert marketing copywriter and video script creator for businesses.
We are creating a ${category} reel for our client:
- Business Name: ${client.business_name}
- Category: ${client.category}
- Services: ${client.services}
- Special Offer: ${client.offer || 'N/A'}
- Owner Name: ${client.owner_name}

The user's specific prompt for this reel is: "${prompt}"

Generate the script components for a 15-30 second reel.
${hasHeadline ? `- \`headline\`: A very short, punchy headline text for the video (Max ${limits.headline_words} words).` : ''}
${hasTicker ? `- \`ticker\`: A short scrolling text (Max ${limits.ticker_characters} chars) highlighting the CTA or offer.` : ''}
- \`voiceoverScript\`: The spoken audio script. Must sound natural, persuasive, and fit the brand. Use SSML if helpful, but plain text is fine.
- \`fullScript\`: A plain text transcript of the voiceover.

Output as pure JSON, with keys: ${hasHeadline ? '"headline", ' : ''}${hasTicker ? '"ticker", ' : ''}"voiceoverScript", "fullScript".`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
    config: {
      temperature: 0.7,
      responseMimeType: "application/json"
    }
  });

  let text = response.text || '';
  try {
    let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }
    const result = JSON.parse(cleanText);
    if (result.voiceoverScript) {
        result.voiceoverScript = cleanVoiceoverScript(result.voiceoverScript, enableAudioTags);
    }
    return result;
  } catch (e) {
    console.error("Failed to parse JSON response:", text);
    throw new Error("Failed to generate client reel script");
  }
};
