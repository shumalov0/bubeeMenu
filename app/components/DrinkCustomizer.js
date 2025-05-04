'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { useTranslation } from '../utils/useTranslation';

export default function DrinkCustomizer({ drink, toppings, onClose, onAddToCart }) {
  const { t } = useTranslation();
  const [size, setSize] = useState('M');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price whenever size or toppings change
  useEffect(() => {
    const basePrice = size === 'M' ? drink.priceM : drink.priceL;
    const toppingsPrice = selectedToppings.length * 2.5;
    setTotalPrice(basePrice + toppingsPrice);
  }, [size, selectedToppings, drink]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    // Save the original body overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleToggleTopping = (toppingId) => {
    setSelectedToppings(prev => {
      if (prev.includes(toppingId)) {
        return prev.filter(id => id !== toppingId);
      } else {
        return [...prev, toppingId];
      }
    });
  };

  const handleAddToCart = () => {
    // Create a customized drink object to add to cart
    const selectedToppingItems = toppings.filter(topping => selectedToppings.includes(topping.id));
    
    const customizedDrink = {
      id: `${drink.id}-${size}-${Date.now()}`, // Generate a unique ID
      name: `${drink.name} (${size})`, 
      price: totalPrice,
      image: drink.image,
      size: size,
      toppings: selectedToppingItems,
      quantity: 1,
      className: 'animate-fade-in' // Add animation class
    };
    
    // Add to cart through the provided callback
    onAddToCart(customizedDrink);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ overflow: 'hidden' }}>
      <div className="bg-primary rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-tertiary">
          <h2 className="text-2xl font-bold text-textPrimary">{t.drinkInfo?.customizeTitle || 'Customize Your Drink'}</h2>
          <button 
            className="p-2 bg-tertiary rounded-full shadow-md"
            onClick={onClose}
          >
            <IoCloseOutline size={24} className="text-textPrimary" />
          </button>
        </div>

        <div className="p-4">
          {/* Drink details */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative h-40 w-full md:w-40 rounded-lg overflow-hidden flex-shrink-0">
              {drink.image ? (
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">{t.drinkInfo?.noImage || 'No image'}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-textPrimary mb-2">{drink.name}</h3>
              
              {drink.hasPearls ? (
                <div className="bg-tertiary text-textPrimary text-sm py-1 px-2 rounded-full inline-block mb-3">
                  {t.drinkInfo?.includesPearls || 'Includes Pearls'}
                </div>
              ) : (
                <div className="bg-secondary text-textSecondary text-sm py-1 px-2 rounded-full inline-block mb-3">
                  {t.drinkInfo?.noPearls || 'No Pearls Included'}
                </div>
              )}
              
              {drink.hasCoconutJelly && (
                <div className="bg-tertiary text-textPrimary text-sm py-1 px-2 rounded-full inline-block mb-3 ml-4">
                  {t.drinkInfo?.includesCoconutJelly || 'Includes Coconut Jelly'}
                </div>
              )}
              
              <p className="text-textSecondary">
                {t.drinkInfo?.customizeInstructions || 'Select your preferred size and add extra toppings to customize your drink.'}
              </p>
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-textPrimary mb-3">{t.drinkInfo?.selectSize || 'Select Size'}</h4>
            <div className="flex gap-4">
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-bold ${
                  size === 'M'
                    ? 'bg-tertiary text-textPrimary'
                    : 'bg-secondary text-textSecondary'
                }`}
                onClick={() => setSize('M')}
              >
                {t.drinkInfo?.medium || 'Medium (M)'} - {drink.priceM.toFixed(2)} ₼
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-bold ${
                  size === 'L'
                    ? 'bg-tertiary text-textPrimary'
                    : 'bg-secondary text-textSecondary'
                }`}
                onClick={() => setSize('L')}
              >
                {t.drinkInfo?.large || 'Large (L)'} - {drink.priceL.toFixed(2)} ₼
              </button>
            </div>
          </div>

          {/* Toppings selector */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-textPrimary mb-3">{t.drinkInfo?.addToppings || 'Add Toppings'}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {toppings.map(topping => (
                <button
                  key={topping.id}
                  className={`p-3 rounded-lg border-2 flex items-center ${
                    selectedToppings.includes(topping.id)
                      ? 'border-tertiary bg-secondary'
                      : 'border-transparent bg-secondary opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => handleToggleTopping(topping.id)}
                >
                  <div className="w-6 h-6 mr-2 flex items-center justify-center">
                    {selectedToppings.includes(topping.id) && (
                      <div className="w-4 h-4 bg-tertiary rounded-full"></div>
                    )}
                  </div>
                  <span className="text-textPrimary">{topping.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-secondary p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-textSecondary">{t.drinkInfo?.basePrice || 'Base Price'}</span>
              <span className="text-textPrimary font-medium">
                {(size === 'M' ? drink.priceM : drink.priceL).toFixed(2)} ₼
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-textSecondary">{t.filter?.toppings || 'Toppings'}</span>
              <span className="text-textPrimary font-medium">
                {(selectedToppings.length * 2.5).toFixed(2)} ₼
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-tertiary mt-2">
              <span className="text-textPrimary font-bold">{t.cart?.total || 'Total'}</span>
              <span className="text-textPrimary font-bold">{totalPrice.toFixed(2)} ₼</span>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            className="w-full py-3 bg-tertiary text-textPrimary rounded-lg font-bold shadow-md hover:bg-yellow-400 transition-colors"
            onClick={handleAddToCart}
          >
            {t.cart?.addToCart || 'Add to Cart'} - {totalPrice.toFixed(2)} ₼
          </button>
        </div>
      </div>
    </div>
  );
} 