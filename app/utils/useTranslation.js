'use client';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export function useTranslation() {
  const { language } = useLanguage();
  const currentLanguage = language || 'en';
  const t = translations[currentLanguage] || translations.en;
  
  return { t, language: currentLanguage };
} 