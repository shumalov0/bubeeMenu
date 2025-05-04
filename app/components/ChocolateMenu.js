'use client';

import { useState } from 'react';
import { drinksData } from '../data/drinksData';
import Image from 'next/image';
import { useTranslation } from '../utils/useTranslation';

export default function ChocolateMenu({ onAddToCart }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState('dubai');
  const { t } = useTranslation();

  const handleChocolateSelect = (chocolate) => {
    // When a chocolate is selected, add it directly to the cart (no customization needed)
    onAddToCart({
      id: `${chocolate.id}-${Date.now()}`,
      name: chocolate.name,
      price: chocolate.price,
      image: chocolate.image,
      quantity: 1,
      className: 'animate-fade-in'
    });
  };

  return (
    <div className="relative">
      {/* Category description */}
      <div className="mb-6 p-4 bg-secondary rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-tertiary rounded-full px-2 py-1 mr-3">
            <span className="text-lg">ⓘ</span>
          </div>
          <p className="text-textPrimary">
            <span className="font-bold">{t.categories?.chocolate || 'Chocolate'}</span> - {t.teaCategories?.dubai || 'Dubai'} {t.drinkInfo?.chocolateDesc || 'Premium chocolate from Dubai, known for its rich and smooth flavor.'}
          </p>
        </div>
      </div>

      {/* Chocolate list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinksData.chocolate[selectedSubcategory].map((chocolate) => (
          <div 
            key={chocolate.id}
            className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleChocolateSelect(chocolate)}
          >
            <div className="relative h-48 w-full">
              {chocolate.image ? (
                <Image
                  src={chocolate.image}
                  alt={chocolate.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">{t.drinkInfo?.noImage || 'No image'}</span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-textPrimary mb-2">{chocolate.name}</h3>
              
              <div className="flex justify-between items-center">
                <div className="text-md font-bold text-textPrimary">{chocolate.price.toFixed(2)} ₼</div>
                
                <button 
                  className="py-2 px-4 bg-tertiary text-textPrimary rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChocolateSelect(chocolate);
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