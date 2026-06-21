import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json?v=' + Date.now(),
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  if (lng.startsWith('ar') || lng.startsWith('ur')) {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
});

// Set initial direction
const initialLng = i18n.language || window.localStorage.getItem('i18nextLng') || 'en';
if (initialLng.startsWith('ar') || initialLng.startsWith('ur')) {
  document.documentElement.dir = 'rtl';
} else {
  document.documentElement.dir = 'ltr';
}

export default i18n;
