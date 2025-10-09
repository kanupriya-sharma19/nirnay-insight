import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Global init function
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "hi",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      
      // Hide the text initially, show only logo
      setTimeout(() => {
        const translateElement = document.getElementById('google_translate_element');
        if (translateElement) {
          // Hide the "Select Language" text
          const spans = translateElement.getElementsByTagName('span');
          for (let span of spans) {
            if (span.textContent?.includes('Select Language') || span.textContent?.includes('Website Translator')) {
              span.style.display = 'none';
            }
          }
          
          // Hide the dropdown arrow initially
          const arrows = translateElement.getElementsByClassName('goog-te-menu-value-indicator');
          for (let arrow of arrows) {
            (arrow as HTMLElement).style.opacity = '0';
          }
        }
        setIsLoaded(true);
      }, 1000);
    };

    // Load Google Translate script dynamically
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Add custom styles
    const style = document.createElement('style');
    style.textContent = `
      #google_translate_element .goog-te-gadget {
        font-size: 0 !important;
      }
      #google_translate_element .goog-te-gadget-simple {
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        cursor: pointer !important;
      }
      #google_translate_element .goog-te-menu-value {
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
      }
      #google_translate_element .goog-te-menu-value span {
        display: none !important;
      }
      #google_translate_element .goog-te-gadget-icon {
        margin: 0 !important;
        width: 20px !important;
        height: 20px !important;
      }
      .goog-te-menu2 {
        font-size: 12px !important;
        min-width: 120px !important;
        margin-top: 5px !important;
      }
      .goog-te-menu2-item div {
        padding: 8px 12px !important;
      }
      
      /* Show text on hover */
      #google_translate_element:hover .goog-te-menu-value span {
        display: inline !important;
        font-size: 12px !important;
        color: #333 !important;
      }
      #google_translate_element:hover .goog-te-menu-value-indicator {
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="fixed  top-2 right-1 z-50">
      <div
        id="google_translate_element"
        className="bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}