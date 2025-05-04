'use client';

import { useState, useEffect } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { useTranslation } from '../utils/useTranslation';
import { drinksData, toppings } from '../data/drinksData';
import DrinkCard from './DrinkCard';
import DrinkCustomizer from './DrinkCustomizer';

export default function SearchPanel({ isOpen, onClose, onAddToCart, drinkOnly = true }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Flatten all drinks into a single array
  const allDrinks = [
    ...drinksData.milkTea.classic, 
    ...drinksData.milkTea.rockSalt, 
    ...drinksData.milkTea.creamCheese,
    ...drinksData.bubbleTea.rockSalt,
    ...drinksData.bubbleTea.creamCheese,
    ...drinksData.fruitTea.classic,
    // Add mochi products with transformed price structure to match drinks
    ...drinksData.mochi.cream.map(mochi => ({
      ...mochi,
      priceM: mochi.price,
      priceL: mochi.price
    })),
    ...drinksData.mochi.iceCream.map(mochi => ({
      ...mochi,
      priceM: mochi.price,
      priceL: mochi.price
    })),
    // Add chocolate products
    ...drinksData.chocolate.dubai.map(chocolate => ({
      ...chocolate,
      priceM: chocolate.price,
      priceL: chocolate.price
    }))
  ];
  
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Clear search when opening
      setSearchQuery('');
      setSearchResults([]);
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
  
  useEffect(() => {
    // Search logic
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = allDrinks.filter(drink => 
      drink.name.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery]);

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    setIsCustomizing(true);
  };

  const handleCloseCustomizer = () => {
    setIsCustomizing(false);
    setSelectedDrink(null);
  };

  const handleAddToCart = (customizedDrink) => {
    onAddToCart(customizedDrink);
    setIsCustomizing(false);
    setSelectedDrink(null);
  };
  
  if (!isAnimating && !isOpen) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 bg-primary ${isOpen ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ overflow: isOpen ? 'auto' : 'hidden' }}
    >
      <div className="p-4 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-textPrimary">{t.search?.title || 'Search'}</h2>
          <button 
            className="p-2 bg-tertiary rounded-full shadow-md"
            onClick={onClose}
          >
            <IoCloseOutline size={24} className="text-textPrimary" />
          </button>
        </div>
        
        <div className="relative mb-6">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search?.placeholder || "Search drinks..."}
            className="w-full py-3 px-4 pr-10 bg-secondary rounded-lg text-textPrimary placeholder-textSecondary outline-none focus:ring-2 focus:ring-tertiary"
          />
          <IoSearchOutline 
            size={24} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textSecondary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {searchResults.length === 0 && searchQuery.trim() !== '' ? (
            <p className="text-center text-textSecondary py-8 col-span-full">
              {t.search?.noResults || "No results found"}
            </p>
          ) : (
            searchResults.map(drink => (
              <DrinkCard 
                key={drink.id}
                drink={drink}
                onSelect={() => handleDrinkSelect(drink)}
              />
            ))
          )}
        </div>
      </div>

      {/* Drink customizer overlay */}
      {isCustomizing && selectedDrink && (
        <DrinkCustomizer 
          drink={selectedDrink}
          toppings={toppings}
          onClose={handleCloseCustomizer}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
} 