'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoAddCircle } from 'react-icons/io5';
import { IoTimeOutline } from 'react-icons/io5';
import { useTranslation } from '../utils/useTranslation';
import ProductDetail from './ProductDetail';

export default function MenuItem({ item, onAddToCart }) {
  const { t } = useTranslation();
  const [showDetail, setShowDetail] = useState(false);
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(item);
  };
  
  const handleItemClick = () => {
    setShowDetail(true);
  };
  
  return (
    <>
      <div 
        className="flex justify-between pb-5 border-b border-tertiary rounded-lg p-3 hover:bg-secondary transition-colors duration-200 cursor-pointer"
        onClick={handleItemClick}
      >
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-1 text-textPrimary">{item.name}</h3>
          <p className="text-2xl font-bold text-textSecondary">{item.price.toFixed(2)} ₼</p>
          {item.prepTime && (
            <div className="flex items-center mt-2 text-textSecondary">
              <IoTimeOutline className="mr-1" />
              <span className="text-sm">{item.prepTime} {t.time}</span>
            </div>
          )}
        </div>
        <div className="relative min-w-[120px] h-[80px] rounded-lg overflow-hidden">
          {item.image && (
            <div className="relative h-full w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
              <button 
                className="absolute bottom-2 right-2 text-white"
                onClick={handleAddToCart}
              >
                <IoAddCircle size={32} className="bg-tertiary text-textPrimary rounded-full shadow-md" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <ProductDetail 
        product={item}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
} 