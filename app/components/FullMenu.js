'use client';

import { useRef, useEffect } from 'react';
import DrinkMenu from './DrinkMenu';
import MochiMenu from './MochiMenu';
import ChocolateMenu from './ChocolateMenu';
import { useTranslation } from '../utils/useTranslation';

export default function FullMenu({ onAddToCart, filters, onVisibleCategoryChange }) {
  const { t } = useTranslation();
  
  // Create refs for each category section
  const milkTeaRef = useRef(null);
  const bubbleTeaRef = useRef(null);
  const fruitTeaRef = useRef(null);
  const mochiRef = useRef(null);
  const chocolateRef = useRef(null);
  
  // Track which section is currently visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const category = entry.target.getAttribute('data-category');
          onVisibleCategoryChange(category);
        }
      });
    }, { threshold: 0.3 }); // Consider section visible when 30% is in viewport
    
    // Observe all category sections
    if (milkTeaRef.current) observer.observe(milkTeaRef.current);
    if (bubbleTeaRef.current) observer.observe(bubbleTeaRef.current);
    if (fruitTeaRef.current) observer.observe(fruitTeaRef.current);
    if (mochiRef.current) observer.observe(mochiRef.current);
    if (chocolateRef.current) observer.observe(chocolateRef.current);
    
    return () => {
      // Clean up observers when component unmounts
      if (milkTeaRef.current) observer.unobserve(milkTeaRef.current);
      if (bubbleTeaRef.current) observer.unobserve(bubbleTeaRef.current);
      if (fruitTeaRef.current) observer.unobserve(fruitTeaRef.current);
      if (mochiRef.current) observer.unobserve(mochiRef.current);
      if (chocolateRef.current) observer.unobserve(chocolateRef.current);
    };
  }, [onVisibleCategoryChange]);

  return (
    <div className="px-4 py-4">
      {/* Milk Tea Section */}
      <div 
        id="milk-tea-section" 
        ref={milkTeaRef} 
        data-category="milkTea"
        className="mb-12 pt-6 pb-6 rounded-lg transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-textPrimary px-2 pb-2 border-b border-tertiary">
          {t.categories?.milkTea || 'Milk Tea'}
        </h2>
        <DrinkMenu onAddToCart={onAddToCart} category="milkTea" filters={filters} />
      </div>

      {/* Bubble Tea Section */}
      <div 
        id="bubble-tea-section" 
        ref={bubbleTeaRef} 
        data-category="bubbleTea"
        className="mb-12 pt-6 pb-6 rounded-lg transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-textPrimary px-2 pb-2 border-b border-tertiary">
          {t.categories?.bubbleTea || 'Bubble Tea'}
        </h2>
        <DrinkMenu onAddToCart={onAddToCart} category="bubbleTea" filters={filters} />
      </div>

      {/* Fruit Tea Section */}
      <div 
        id="fruit-tea-section" 
        ref={fruitTeaRef} 
        data-category="fruitTea"
        className="mb-12 pt-6 pb-6 rounded-lg transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-textPrimary px-2 pb-2 border-b border-tertiary">
          {t.categories?.fruitTea || 'Fruit Tea'}
        </h2>
        <DrinkMenu onAddToCart={onAddToCart} category="fruitTea" filters={filters} />
      </div>

      {/* Mochi Section */}
      <div 
        id="mochi-section" 
        ref={mochiRef} 
        data-category="mochi"
        className="mb-12 pt-6 pb-6 rounded-lg transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-textPrimary px-2 pb-2 border-b border-tertiary">
          {t.categories?.mochi || 'Mochi'}
        </h2>
        <MochiMenu onAddToCart={onAddToCart} />
      </div>

      {/* Chocolate Section */}
      <div 
        id="chocolate-section" 
        ref={chocolateRef} 
        data-category="chocolate"
        className="mb-12 pt-6 pb-6 rounded-lg transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-textPrimary px-2 pb-2 border-b border-tertiary">
          {t.categories?.chocolate || 'Chocolate'}
        </h2>
        <ChocolateMenu onAddToCart={onAddToCart} />
      </div>
    </div>
  );
} 