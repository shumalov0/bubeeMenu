'use client';

import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { translations } from '../data/translations';
import { useState } from 'react';

export default function LanguageSelector({ onSelectLanguage, onClose }) {
  const languages = [
    { code: 'az', name: 'Azərbaycanca', flag: '/images/flags/azerbaijan.png' },
    { code: 'ar', name: 'عربي', flag: '/images/flags/arab.webp' },
    { code: 'tr', name: 'Türkçe', flag: '/images/flags/Turkey.webp' },
    { code: 'pl', name: 'Polski', flag: '/images/flags/poland.webp' },
    { code: 'en', name: 'English', flag: '/images/flags/uk.webp' },
    { code: 'ru', name: 'Русский', flag: '/images/flags/russia.webp' },
    { code: 'uz', name: 'Uzbek', flag: '/images/flags/uzbek.webp' },
  ];

  const [selectedLang, setSelectedLang] = useState('en');

  const handleSelectLanguage = (langCode) => {
    setSelectedLang(langCode);
  };

  const confirmLanguage = () => {
    onSelectLanguage(selectedLang);
  };

  return (
    <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-center flex-1">{translations.en.language.select}</h1>
          <button onClick={onClose} className="p-2">
            <IoCloseOutline size={28} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`bg-secondary rounded-lg p-4 flex flex-col items-center justify-center h-32 ${
                selectedLang === lang.code ? 'ring-4 ring-[#FFB300]' : ''
              }`}
              onClick={() => handleSelectLanguage(lang.code)}
            >
              <div className="w-24 h-14 relative mb-4">
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-lg">{lang.name}</span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={confirmLanguage} 
          className="w-full mt-10 py-4 bg-[#FFB300] rounded-lg text-xl font-semibold"
        >
          {translations.en.language.confirm}
        </button>
      </div>
    </div>
  );
} 