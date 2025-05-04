'use client';

import DrinkMenu from './DrinkMenu';
import MochiMenu from './MochiMenu';
import ChocolateMenu from './ChocolateMenu';
import { useTranslation } from '../utils/useTranslation';

export default function MenuSection({ category, onAddToCart, filters = { priceRange: 'all', teaType: 'all', toppings: [] } }) {
  const { t } = useTranslation();

  return (
    <div className="px-4 py-4">
      <div id="section-Içkilər" className="mb-12 pt-6 pb-6 rounded-lg transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6 text-textPrimary px-2 pb-2 border-b border-tertiary">
          {t.categories[category] || (category === 'milkTea' ? 'Milk Tea' : category === 'bubbleTea' ? 'Bubble Tea' : category === 'fruitTea' ? 'Fruit Tea' : category === 'mochi' ? 'Mochi' : 'Chocolate')}
        </h2>
        {category === 'mochi' ? (
          <MochiMenu onAddToCart={onAddToCart} />
        ) : category === 'chocolate' ? (
          <ChocolateMenu onAddToCart={onAddToCart} />
        ) : (
          <DrinkMenu onAddToCart={onAddToCart} category={category} filters={filters} />
        )}
      </div>
    </div>
  );
} 