'use client';

import { useState, useEffect } from 'react';
import { drinksData } from '../data/drinksData';
import Image from 'next/image';
import { useTranslation } from '../utils/useTranslation';

export default function MochiMenu({ onAddToCart }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState('cream');
  const { t } = useTranslation();

  const handleMochiSelect = (mochi) => {
    // When a mochi is selected, add it directly to the cart (no customization needed)
    onAddToCart({
      id: `${mochi.id}-${Date.now()}`,
      name: mochi.name,
      price: mochi.price,
      image: mochi.image,
      quantity: 1,
      className: 'animate-fade-in'
    });
  };

  const renderSubcategoryButton = (subcategory, label) => (
    <button
      className={`py-2 px-4 text-sm font-medium rounded-full ${
        selectedSubcategory === subcategory 
          ? 'bg-tertiary text-textPrimary shadow-md' 
          : 'bg-secondary text-textSecondary hover:bg-tertiary hover:text-textPrimary'
      }`}
      onClick={() => setSelectedSubcategory(subcategory)}
    >
      {t.teaCategories?.[subcategory] || label}
    </button>
  );

  return (
    <div className="relative">
      {/* Subcategory selector */}
      <div className="flex space-x-2 mb-6 px-2">
        {renderSubcategoryButton('cream', 'Cream')}
        {renderSubcategoryButton('iceCream', 'Ice Cream')}
      </div>

      {/* Category description */}
      <div className="mb-6 p-4 bg-secondary rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-tertiary rounded-full py-1 px-2 mr-3">
            <span className="text-lg">ⓘ</span>
          </div>
          <p className="text-textPrimary">
            <span className="font-bold">{t.categories?.mochi || 'Mochi'}</span> - {t.teaCategories?.[selectedSubcategory] || (selectedSubcategory === 'cream' ? 'Cream' : 'Ice Cream')} {selectedSubcategory === 'cream' ? 'filled with delicious cream' : 'filled with refreshing ice cream'}. {t.drinkInfo?.mochiDesc || 'A Japanese rice cake made with glutinous rice filled with sweet filling.'}
          </p>
        </div>
      </div>

      {/* Mochi list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinksData.mochi[selectedSubcategory].map((mochi) => (
          <div 
            key={mochi.id}
            className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleMochiSelect(mochi)}
          >
            <div className="relative h-48 w-full">
              {mochi.image ? (
                <Image
                  src={mochi.image}
                  alt={mochi.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-textPrimary mb-2">{mochi.name}</h3>
              
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-textPrimary">{mochi.price.toFixed(2)} ₼</div>
                
                <button 
                  className="py-2 px-4 bg-tertiary text-textPrimary rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMochiSelect(mochi);
                  }}
                >
                  {t.cart?.addToCart || 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 