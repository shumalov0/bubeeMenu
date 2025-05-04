'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { useTranslation } from '../utils/useTranslation';

export default function CartDetailsBottomSheet({ 
  isOpen, 
  onClose, 
  cartItems, 
  total, 
  onRemoveItem, 
  onResetCart,
  selectedLanguage 
}) {
  const { t } = useTranslation(selectedLanguage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shake, setShake] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Disable scrolling on body when panel is open
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      // Re-enable scrolling when panel is closed or component unmounts
      document.body.style.overflow = 'auto';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleRemoveItem = (itemId) => {
    onRemoveItem(itemId);
  };
  
  const handleResetCart = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
      onResetCart();
    }, 500);
  };
  
  if (!isAnimating && !isOpen) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${isOpen ? 'animate-fade-in' : 'opacity-0'}`}
      onClick={onClose}
      style={{ overflow: 'hidden' }}
    >
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-primary rounded-t-3xl p-4 shadow-lg ${
          isOpen ? 'animate-slide-up' : 'transform translate-y-full'
        }`}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-tertiary">
          <h2 className="text-2xl font-bold text-textPrimary">{t.cart.details || 'Your Cart'}</h2>
          <button 
            className="p-2 bg-tertiary rounded-full shadow-md"
            onClick={onClose}
          >
            <IoCloseOutline size={24} className="text-textPrimary" />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="py-8 text-center text-textSecondary">
            {t.cart.empty}
          </div>
        ) : (
          <>
            <div className={`mb-6 space-y-4 ${shake ? 'cart-shake' : ''}`}>
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 p-3 bg-secondary rounded-lg shadow-sm cart-item-enter"
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg relative overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-md font-semibold text-textPrimary">{item.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-textSecondary">
                        {item.quantity} × {item.price.toFixed(2)} ₼
                      </span>
                      <span className="font-bold text-textPrimary">
                        {(item.quantity * item.price).toFixed(2)} ₼
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="p-2 bg-secondary rounded-full hover:bg-tertiary transition-colors"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <IoTrashOutline size={20} className="text-textSecondary" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center border-t border-b border-tertiary py-3 mb-4">
              <span className="text-lg font-bold text-textPrimary">{t.cart.total}</span>
              <span className="text-xl font-bold text-textPrimary">{total.toFixed(2)} ₼</span>
            </div>
            
            <div className="mb-6">
              <button 
                className="w-full py-3 bg-secondary text-textPrimary rounded-lg font-bold hover:bg-tertiary transition-colors"
                onClick={handleResetCart}
              >
                {t.cart.resetTotal || 'Reset Total'}
              </button>
            </div>
          </>
        )}
        
        <div className="p-4 bg-tertiary rounded-lg text-center text-textPrimary mb-4">
          {t.cart.checkoutMessage || 'Please bring your selected items to the checkout counter and confirm your order.'}
        </div>
        
        <button 
          className="w-full py-3 bg-tertiary text-textPrimary rounded-lg font-bold shadow-md hover:bg-yellow-400 transition-colors"
          onClick={onClose}
        >
          {t.cart.continueButton || 'Continue'}
        </button>
      </div>
    </div>
  );
} 