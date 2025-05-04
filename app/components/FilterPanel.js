'use client';

import { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useTranslation } from '../utils/useTranslation';
import { drinksData, toppings } from '../data/drinksData';

export default function FilterPanel({ isOpen, onClose, onApplyFilters, drinkOnly = false }) {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedTeaType, setSelectedTeaType] = useState('all');
  const [selectedToppings, setSelectedToppings] = useState([]);
  
  // Generate tea types dynamically from drinksData
  const teaTypes = [
    { id: 'all', label: 'All Types' },
    ...Object.keys(drinksData).map(type => ({
      id: type,
      label: type === 'milkTea' ? 'Milk Tea' : 
            type === 'bubbleTea' ? 'Bubble Tea' : 
            type === 'fruitTea' ? 'Fruit Tea' : 
            type === 'mochi' ? 'Mochi' : 
            type === 'chocolate' ? 'Chocolate' : type
    }))
  ];

  // Generate toppings dynamically from toppings data
  const availableToppings = toppings.map(topping => ({
    id: topping.id,
    label: topping.name
  }));
  
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
  
  const handleApplyFilters = () => {
    // Apply filters to drinks
    onApplyFilters({
      priceRange: 'all', // Always set to 'all' since price range is removed
      teaType: selectedTeaType,
      toppings: selectedToppings
    });
    onClose();
  };
  
  const handleResetFilters = () => {
    setSelectedTeaType('all');
    setSelectedToppings([]);
  };

  const toggleTopping = (toppingId) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter(id => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
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
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-textPrimary">{t.filter?.title || 'Filters'}</h2>
          <button 
            className="p-2 bg-tertiary rounded-full shadow-md"
            onClick={onClose}
          >
            <IoCloseOutline size={24} className="text-textPrimary" />
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-textPrimary">{t.filter?.teaType || 'Tea Type'}</h3>
          <div className="space-y-2">
            {teaTypes.map(type => (
              <div 
                key={type.id}
                className={`py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedTeaType === type.id 
                    ? 'bg-tertiary text-textPrimary' 
                    : 'bg-secondary text-textSecondary hover:bg-tertiary hover:text-textPrimary'
                }`}
                onClick={() => setSelectedTeaType(type.id)}
              >
                {type.id === 'all' ? type.label : t.categories?.[type.id] || type.label}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-textPrimary">{t.filter?.toppings || 'Toppings'}</h3>
          <div className="grid grid-cols-2 gap-2">
            {availableToppings.map(topping => (
              <div 
                key={topping.id}
                className={`py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedToppings.includes(topping.id) 
                    ? 'bg-tertiary text-textPrimary' 
                    : 'bg-secondary text-textSecondary hover:bg-tertiary hover:text-textPrimary'
                }`}
                onClick={() => toggleTopping(topping.id)}
              >
                {topping.label}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            className="flex-1 py-3 bg-secondary text-textPrimary rounded-lg font-bold shadow-md"
            onClick={handleResetFilters}
          >
            {t.filter?.reset || 'Reset'}
          </button>
          <button 
            className="flex-1 py-3 bg-tertiary text-textPrimary rounded-lg font-bold shadow-md hover:bg-yellow-400 transition-colors duration-200"
            onClick={handleApplyFilters}
          >
            {t.filter?.apply || 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
} 