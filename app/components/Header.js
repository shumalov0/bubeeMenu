'use client';

import { IoFilterOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoLanguageOutline } from 'react-icons/io5';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../utils/useTranslation';
import Link from 'next/link';

export default function Header({ onFilterClick, onSearchClick }) {
  const { resetLanguage } = useLanguage();
  const { t } = useTranslation();
  
  return (
    <header className="sticky top-0 z-10 bg-primary py-4 px-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
            <Link href='#'>
          <img src="/images/flags/logos.png" alt="Bubee Logo" className="h-10 mr-3" />
            </Link>
          {/* <h1 className="text-2xl font-bold text-textPrimary">
            <span className="text-tertiary">Bubble</span> Tea
          </h1> */}
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-textPrimary" onClick={resetLanguage}>
            <IoLanguageOutline size={24} />
          </button>
          <button className="p-2 text-textPrimary" onClick={onFilterClick}>
            <IoFilterOutline size={24} />
          </button>
          <button className="p-2 text-textPrimary" onClick={onSearchClick}>
            <IoSearchOutline size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
