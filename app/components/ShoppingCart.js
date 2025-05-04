"use client";

import { useState, useEffect, useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useTranslation } from '../utils/useTranslation';
import CartDetailsBottomSheet from './CartDetailsBottomSheet';

export default function ShoppingCart({ cartItems, total, onRemoveItem, onResetCart, selectedLanguage }) {
  const { t } = useTranslation(selectedLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const prevCartItemsLength = useRef(0);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  useEffect(() => {
    const currentCartItemsLength = Object.keys(cartItems).length;
    if (currentCartItemsLength > prevCartItemsLength.current) {
      setIsAnimating(true);
      setIsBouncing(true);
      setTimeout(() => setIsAnimating(false), 300);
      setTimeout(() => setIsBouncing(false), 300);
    }
    prevCartItemsLength.current = currentCartItemsLength;
  }, [cartItems]);
  
  return (
    <>
      <div className="relative z-10">
        <button 
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg bg-tertiary 
            transition-all hover:bg-yellow-400 hover:scale-105 active:scale-95 
            ${isAnimating ? 'cart-shake' : ''} ${isBouncing ? 'cart-bounce' : ''}`}
        >
          <FaShoppingCart className="text-textPrimary text-2xl" />
          {cartCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-primary text-textPrimary w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold border-2 border-yellow-400">
              {cartCount}
            </div>
          )}
        </button>
        
        {cartCount > 0 && (
          <div className="fixed bottom-20 right-6 bg-tertiary text-textPrimary px-3 py-2 rounded-lg shadow-md animate-fade-in">
            <div className="font-bold">{total.toFixed(2)} ₼</div>
          </div>
        )}
      </div>
      
      <CartDetailsBottomSheet 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        cartItems={cartItems} 
        total={total}
        onRemoveItem={onRemoveItem}
        onResetCart={onResetCart}
        selectedLanguage={selectedLanguage}
      />
    </>
  );
}
