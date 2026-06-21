import { useTranslation } from "react-i18next";
import React from 'react';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
const languages = [{
  code: 'SA',
  name: 'العربية',
  nativeName: 'Arabic',
  flag: ''
}, {
  code: 'US',
  name: 'English',
  nativeName: 'English',
  flag: ''
}, {
  code: 'FR',
  name: 'Français',
  nativeName: 'French',
  flag: '🇫🇷'
}, {
  code: 'ES',
  name: 'Español',
  nativeName: 'Spanish',
  flag: '🇪🇸'
}, {
  code: 'IN',
  name: 'الهندية',
  nativeName: 'Hindi',
  flag: '🇮🇳'
}];
const LanguageModal = () => {
  const {
    t
  } = useTranslation();
  const {
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    currentLanguage,
    setCurrentLanguage
  } = useLanguage();
  if (!isLanguageModalOpen) return null;
  const handleSelectLanguage = lang => {
    setCurrentLanguage(lang);
    setIsLanguageModalOpen(false);
  };
  return <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  }}>
      <div style={{
      width: '100%',
      maxWidth: '500px',
      background: 'white',
      borderTopLeftRadius: '24px',
      borderTopRightRadius: '24px',
      padding: '24px',
      paddingBottom: '40px',
      fontFamily: 'Inter, sans-serif'
    }}>
        
        <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
          <h2 style={{
          fontSize: '22px',
          fontWeight: 'bold',
          margin: 0,
          color: '#003b46'
        }}>{t("Language")}</h2>
          <button onClick={() => setIsLanguageModalOpen(false)} style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: '#f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
            <X size={18} color="#4a5568" />
          </button>
        </div>

        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
          {languages.map(lang => {
          const {
            t
          } = useTranslation();
          const isSelected = currentLanguage.code === lang.code;
          return <div key={lang.code} onClick={() => handleSelectLanguage(lang)} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderRadius: '16px',
            cursor: 'pointer',
            border: isSelected ? '1.5px solid #008b8b' : '1px solid #e2e8f0',
            background: isSelected ? '#e6f9f5' : 'white',
            transition: 'all 0.2s'
          }}>
                <div style={{
              fontSize: '24px',
              marginRight: '16px',
              width: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                  {lang.flag}
                </div>
                <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
                  <span style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#003b46',
                marginBottom: '2px'
              }}>{lang.name}</span>
                  <span style={{
                fontSize: '12px',
                color: '#a0aec0'
              }}>{lang.nativeName}</span>
                </div>
                {isSelected && <Check size={20} color="#008b8b" />}
              </div>;
        })}
        </div>
      </div>
    </div>;
};
export default LanguageModal;