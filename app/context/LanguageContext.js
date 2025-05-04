'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if language is stored in localStorage
    const storedLanguage = localStorage.getItem('bubee-menu-language');
    
    if (storedLanguage) {
      setLanguage(storedLanguage);
      setShowLanguageSelector(false);
    } else {
      setShowLanguageSelector(true);
    }
    
    setIsLoading(false);
  }, []);

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('bubee-menu-language', lang);
    setShowLanguageSelector(false);
  };

  const resetLanguage = () => {
    setShowLanguageSelector(true);
    localStorage.removeItem('bubee-menu-language');
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        selectLanguage, 
        resetLanguage, 
        showLanguageSelector, 
        setShowLanguageSelector,
        isLoading
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 