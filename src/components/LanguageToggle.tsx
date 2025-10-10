// components/LanguageToggle.tsx
import { useState } from "react";
import { translateText } from "@/utils/autoTranslate";

export default function LanguageToggle() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [loading, setLoading] = useState(false);

  const switchLanguage = async (target: "en" | "hi") => {
    if (loading || lang === target) return;
    setLoading(true);

    const elements = document.querySelectorAll("body *:not(script):not(style)");
    for (const el of Array.from(elements)) {
      const node = el.childNodes;
      for (const n of Array.from(node)) {
        if (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) {
          const originalText = n.textContent.trim();
          const translated = await translateText(originalText, target);
          n.textContent = translated;
        }
      }
    }

    setLang(target);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        onClick={() => switchLanguage("en")}
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        English
      </button>
      <button
        disabled={loading}
        onClick={() => switchLanguage("hi")}
        className={`px-2 py-1 rounded ${lang === "hi" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        हिन्दी
      </button>
    </div>
  );
}
