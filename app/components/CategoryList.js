'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../utils/useTranslation';

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const { t } = useTranslation();
  const [pulsing, setPulsing] = useState(null);

  const categories = [
    'milkTea',
    'bubbleTea',
    'fruitTea',
    'mochi',
    'chocolate'
  ];

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category);
    
    // Add pulse animation to the clicked button
    setPulsing(category);
    setTimeout(() => setPulsing(null), 500);
    
    onSelectCategory(category);
    
    // Scroll to the selected category section
    // Convert camelCase to kebab-case for the ID
    const sectionId = category.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '-section';
    console.log('Scrolling to section:', sectionId);
    const sectionElement = document.getElementById(sectionId);
    
    if (sectionElement) {
      console.log('Section element found, scrolling...');
      sectionElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.log('Section element not found');
    }
  };

  return (
    <div className="sticky top-16 z-10 bg-primary py-2 border-b border-tertiary shadow-sm">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 px-4 py-1 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              className={`py-2 px-4 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-200 
                ${selectedCategory === category
                  ? 'bg-tertiary text-textPrimary shadow-md'
                  : 'bg-secondary text-textSecondary hover:bg-tertiary hover:text-textPrimary'
                } ${pulsing === category ? 'category-pulse' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category === 'milkTea' ? t.categories?.milkTea || 'Milk Tea' : 
               category === 'bubbleTea' ? t.categories?.bubbleTea || 'Bubble Tea' : 
               category === 'fruitTea' ? t.categories?.fruitTea || 'Fruit Tea' :
               category === 'mochi' ? t.categories?.mochi || 'Mochi' :
               t.categories?.chocolate || 'Chocolate'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 