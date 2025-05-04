'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoCloseOutline, IoTimeOutline } from 'react-icons/io5';
import { useTranslation } from '../utils/useTranslation';

export default function ProductDetail({ product, isOpen, onClose, onAddToCart }) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset quantity when opening a new product
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity: quantity
    });
    onClose();
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${isOpen ? 'animate-fade-in' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-primary rounded-t-3xl p-4 shadow-lg ${
          isOpen ? 'animate-slide-up' : 'transform translate-y-full'
        }`}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button 
          className="absolute right-4 top-4 p-2 bg-tertiary rounded-full shadow-md"
          onClick={onClose}
        >
          <IoCloseOutline size={24} className="text-textPrimary" />
        </button>

        <div className="mt-4 mb-8">
          <div className="relative h-64 w-full mb-4 rounded-xl overflow-hidden shadow-md">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-secondary flex items-center justify-center">
                <span className="text-textSecondary">{t.product?.noImage || 'No image available'}</span>
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2 text-textPrimary">{product.name}</h2>
          <p className="text-xl mb-4 text-textSecondary font-bold">{product.price.toFixed(2)} ₼</p>
          
          {product.prepTime && (
            <div className="flex items-center mb-6 text-textSecondary">
              <IoTimeOutline className="mr-1" />
              <span>{product.prepTime} {t.time}</span>
            </div>
          )}

          {product.description && (
            <p className="text-textSecondary mb-6">{product.description}</p>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center bg-secondary rounded-lg overflow-hidden shadow-md">
              <button 
                className="px-4 py-2 text-xl font-bold hover:bg-tertiary transition-colors duration-200 text-textPrimary"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="px-4 py-2 text-xl text-textPrimary">{quantity}</span>
              <button 
                className="px-4 py-2 text-xl font-bold hover:bg-tertiary transition-colors duration-200 text-textPrimary"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <div className="text-xl font-bold text-textPrimary">
              {(product.price * quantity).toFixed(2)} ₼
            </div>
          </div>

          <button 
            className="w-full py-3 bg-tertiary text-textPrimary rounded-lg text-lg font-bold shadow-md hover:bg-yellow-400 transition-colors duration-200"
            onClick={handleAddToCart}
          >
            {t.cart?.addToCart || 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
} 