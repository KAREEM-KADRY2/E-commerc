import React, { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
];

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  
  const currentLangCode = i18n.language || window.localStorage.getItem('i18nextLng') || 'en';
  const initialLang = languages.find(l => l.code.startsWith(currentLangCode.substring(0,2))) || languages[0];

  const [currentLanguage, setCurrentLanguageState] = useState(initialLang);

  useEffect(() => {
    const lang = languages.find(l => l.code.startsWith((i18n.language || 'en').substring(0,2))) || languages[0];
    setCurrentLanguageState(lang);
  }, [i18n.language]);

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    i18n.changeLanguage(lang.code);
  };

  return (
    <LanguageContext.Provider value={{ 
      isLanguageModalOpen, 
      setIsLanguageModalOpen,
      currentLanguage,
      setCurrentLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
