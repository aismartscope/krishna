import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTranslation } from "@/lib/translations";

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (englishText: string, tamilText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('restaurant-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('restaurant-language', language);
    
    // Update document class for styling if needed
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(current => current === 'en' ? 'ta' : 'en');
  };

  // Translation function - uses explicit Tamil text if provided, otherwise looks up in translations
  const t = (englishText: string, tamilText?: string): string => {
    if (language === 'ta' && tamilText) {
      return tamilText;
    }
    
    if (language === 'ta') {
      return getTranslation(englishText, 'ta');
    }
    
    return englishText;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
