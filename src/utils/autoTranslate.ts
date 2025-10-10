// utils/autoTranslate.ts
import axios from "axios";

export async function translateText(text: string, targetLang: "en" | "hi") {
  if (!text.trim()) return text;
  try {
    const res = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source: "auto",
      target: targetLang,
      format: "text"
    });
    return res.data.translatedText;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}
