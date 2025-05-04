'use client';

import Image from 'next/image';
import { useTranslation } from '../utils/useTranslation';

export default function DrinkCard({ drink, onSelect }) {
  const { t } = useTranslation();
  
  return (
    <div 
      className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative h-48 w-full">
        {drink.image ? (
          <Image
            src={drink.image}
            alt={drink.name}
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
        <h3 className="text-lg font-bold text-textPrimary mb-2">{drink.name}</h3>
        
        <div className="flex justify-between">
          <div>
            <div className="text-sm text-textSecondary mb-1">Medium (M)</div>
            <div className="text-md font-bold text-textPrimary">{drink.priceM.toFixed(2)} ₼</div>
          </div>
          
          <div>
            <div className="text-sm text-textSecondary mb-1">Large (L)</div>
            <div className="text-md font-bold text-textPrimary">{drink.priceL.toFixed(2)} ₼</div>
          </div>
        </div>
        
        <button 
          className="mt-4 w-full py-2 bg-tertiary text-textPrimary rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {t.drinkInfo?.customize || 'Customize'}
        </button>
      </div>
    </div>
  );
} 