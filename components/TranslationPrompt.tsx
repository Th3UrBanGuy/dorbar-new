"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe2, X, Sparkles, Languages } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const SUPPORTED_LANGUAGES = [
  { code: "bn", name: "বাংলা", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
];

export default function TranslationPrompt() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>("bn");
  const [isInjecting, setIsInjecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !navigator) return;

    // Inject CSS to completely nuke Google Translate branding
    const styleId = "hide-google-translate-css";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        body { top: 0 !important; }
        .goog-te-banner-frame { display: none !important; }
        #google_translate_element { display: none !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
        .skiptranslate { display: none !important; }
        .skiptranslate iframe { display: none !important; visibility: hidden !important; }
      `;
      document.head.appendChild(style);
    }

    const savedPref = localStorage.getItem("darbar_lang_pref");
    
    if (savedPref && savedPref !== "bn") {
      setSelectedLang(savedPref);
      loadGoogleTranslate(savedPref);
    } else if (!savedPref) {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang !== "bn") {
         // Optionally you could auto open it here, but user wants it always as a button
      } else {
         localStorage.setItem("darbar_lang_pref", "bn");
      }
    }
  }, []);

  const loadGoogleTranslate = (targetLang: string) => {
    setIsInjecting(true);

    document.cookie = `googtrans=/bn/${targetLang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/bn/${targetLang}; path=/;`;

    if (document.getElementById("google-translate-script")) {
       const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
       if (select) {
         select.value = targetLang;
         select.dispatchEvent(new Event("change"));
       } else {
         window.location.reload(); 
       }
       setIsInjecting(false);
       return;
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { 
          pageLanguage: 'bn',
          autoDisplay: false,
          includedLanguages: 'en,bn,ar,ur,hi'
        },
        'google_translate_element'
      );
      setIsInjecting(false);
    };

    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.display = "none";
    document.body.appendChild(div);

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  };

  const handleSelectLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    localStorage.setItem("darbar_lang_pref", langCode);
    
    if (langCode === "bn") {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      window.location.reload();
    } else {
      loadGoogleTranslate(langCode);
      setTimeout(() => setIsExpanded(false), 800);
    }
  };

  return (
    <div className="fixed bottom-[100px] md:bottom-8 right-4 md:right-8 z-[999] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Expanded Panel (Pop-up above the FAB) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="bg-white/95 backdrop-blur-3xl p-3 sm:p-4 rounded-[2rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.8)] pointer-events-auto flex flex-col items-center w-[280px] sm:w-[320px]"
          >
            <div className="flex items-center justify-between w-full px-2 mb-3">
              <div className="flex items-center gap-2">
                 <Languages className="w-4 h-4 text-emerald-600" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">App Language</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors shadow-sm"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 w-full">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    disabled={isInjecting}
                    className="flex flex-col items-center gap-1.5 group relative"
                  >
                    <div className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-[1rem] flex items-center justify-center text-xl sm:text-2xl transition-all shadow-sm
                      bg-gradient-to-b border border-white
                      ${isSelected 
                        ? 'from-emerald-400 to-emerald-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_12px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500 ring-offset-2 scale-105' 
                        : 'from-slate-50 to-slate-100/50 shadow-[0_4px_10px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-md'
                      }
                    `}>
                      {isSelected && <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-emerald-100 z-10 animate-pulse" />}
                      <span className="relative z-0 drop-shadow-md">{lang.flag}</span>
                    </div>
                    <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-colors ${isSelected ? 'text-emerald-600 drop-shadow-sm' : 'text-slate-400 group-hover:text-slate-700'}`}>
                      {lang.code}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isInjecting && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-white/70 backdrop-blur-[2px] rounded-[2rem] flex items-center justify-center"
                >
                   <div className="flex bg-white shadow-xl px-5 py-2.5 rounded-full items-center gap-3 border border-white/50">
                     <div className="w-4 h-4 border-2 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                     <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Applying...</span>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Button */}
      <motion.button 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-gradient-to-b from-white to-slate-50 shadow-[0_12px_24px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,1)] border border-slate-200/50 flex items-center justify-center pointer-events-auto group hover:scale-110 active:scale-95 transition-all relative z-50 backdrop-blur-3xl ring-4 ring-white/30"
        whileTap={{ scale: 0.9 }}
        title="Translate Website"
      >
        <Globe2 className="w-6 h-6 text-emerald-600 drop-shadow-md group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
        
        {/* Glow behind globe */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none"></div>

        {/* Small indicator if a foreign language is active */}
        {selectedLang !== "bn" && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white bg-emerald-500 shadow-sm"></span>
          </span>
        )}
      </motion.button>

    </div>
  );
}
