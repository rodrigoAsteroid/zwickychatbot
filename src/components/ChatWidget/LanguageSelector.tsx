"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-selector flex items-center justify-center space-x-2 p-2">
      <span className="text-white text-xs mr-1">{t('language.change')}:</span>
      <button
        className={`text-xs px-2 py-1 rounded ${i18n.language === 'es' ? 'bg-[#FF4E00] text-white' : 'bg-[#2E223B] text-white border border-[#FF4E00]'}`}
        onClick={() => changeLanguage('es')}
        title={t('language.es')}
        aria-label={t('language.es')}
        aria-pressed={i18n.language === 'es'}
      >
        ES
      </button>
      <button
        className={`text-xs px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-[#FF4E00] text-white' : 'bg-[#2E223B] text-white border border-[#FF4E00]'}`}
        onClick={() => changeLanguage('en')}
        title={t('language.en')}
        aria-label={t('language.en')}
        aria-pressed={i18n.language === 'en'}
      >
        EN
      </button>
      <button
        className={`text-xs px-2 py-1 rounded ${i18n.language === 'fr' ? 'bg-[#FF4E00] text-white' : 'bg-[#2E223B] text-white border border-[#FF4E00]'}`}
        onClick={() => changeLanguage('fr')}
        title={t('language.fr')}
        aria-label={t('language.fr')}
        aria-pressed={i18n.language === 'fr'}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSelector;