'use client';

import { useState, useEffect } from 'react';
import { drinksData, toppings } from '../data/drinksData';
import DrinkCard from './DrinkCard';
import DrinkCustomizer from './DrinkCustomizer';
import { useTranslation } from '../utils/useTranslation';

export default function DrinkMenu({ onAddToCart, category, filters = { priceRange: 'all', teaType: 'all', toppings: [] } }) {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || 'milkTea');
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    category === 'milkTea' ? 'classic' :
    category === 'bubbleTea' ? 'rockSalt' :
    category === 'fruitTea' ? 'classic' : 'classic'
  );
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const { t } = useTranslation();

  // Update selected category when parent component changes it
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      // Set default subcategory based on category
      if (category === 'milkTea') {
        setSelectedSubcategory('classic');
      } else if (category === 'bubbleTea') {
        setSelectedSubcategory('rockSalt');
      } else if (category === 'fruitTea') {
        setSelectedSubcategory('classic');
      }
    }
  }, [category]);

  // Apply filters when they change
  useEffect(() => {
    if (!drinksData[selectedCategory] || !drinksData[selectedCategory][selectedSubcategory]) {
      // If the category or subcategory doesn't exist, set empty array
      setFilteredDrinks([]);
      return;
    }
    
    let drinks = [...drinksData[selectedCategory][selectedSubcategory]];
    
    // Apply tea type filter
    if (filters.teaType !== 'all' && filters.teaType !== selectedCategory) {
      drinks = [];
    }
    
    // Apply topping filters
    if (filters.toppings && filters.toppings.length > 0) {
      filters.toppings.forEach(toppingId => {
        // Get the topping details
        const toppingDetails = toppings.find(t => t.id === toppingId);
        
        if (toppingDetails) {
          const toppingName = toppingDetails.name.toLowerCase();
          
          if (toppingName.includes('pearl') || toppingName.includes('bubble')) {
            // Filter for drinks with pearls
            drinks = drinks.filter(drink => drink.hasPearls);
          } else if (toppingName.includes('coconut') || toppingName.includes('jelly')) {
            // Filter for drinks with coconut jelly
            drinks = drinks.filter(drink => drink.hasCoconutJelly);
          } else if (toppingName.includes('oreo')) {
            // If oreo topping is selected, prefer cream cheese category if available
            if ((selectedCategory === 'milkTea' || selectedCategory === 'bubbleTea') && 
                drinksData[selectedCategory]['creamCheese']) {
              setSelectedSubcategory('creamCheese');
            }
          } else if (toppingName.includes('rock') || toppingName.includes('salt')) {
            // If rock salt is selected, prefer rock salt category if available
            if ((selectedCategory === 'milkTea' || selectedCategory === 'bubbleTea') && 
                drinksData[selectedCategory]['rockSalt']) {
              setSelectedSubcategory('rockSalt');
            }
          }
        }
      });
    }
    
    setFilteredDrinks(drinks);
  }, [filters, selectedCategory, selectedSubcategory]);

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    setIsCustomizing(true);
  };

  const handleCloseCustomizer = () => {
    setIsCustomizing(false);
  };

  const handleAddToCart = (customizedDrink) => {
    onAddToCart(customizedDrink);
    setIsCustomizing(false);
  };

  const renderSubcategoryButton = (subcategory, label) => (
    <button
      className={`py-2 px-4 text-sm font-medium rounded-full ${
        selectedSubcategory === subcategory 
          ? 'bg-tertiary text-textPrimary shadow-md' 
          : 'bg-secondary text-textSecondary hover:bg-tertiary hover:text-textPrimary'
      }`}
      onClick={() => setSelectedSubcategory(subcategory)}
    >
      {t.teaCategories?.[subcategory] || label}
    </button>
  );

  // Get the drinks to display (filtered or all)
  const drinksToDisplay = filteredDrinks.length > 0 ? 
    filteredDrinks : 
    (drinksData[selectedCategory] && drinksData[selectedCategory][selectedSubcategory] ? 
      drinksData[selectedCategory][selectedSubcategory] : []);

  return (
    <div className="relative">
      {/* Subcategory selector */}
      <div className="flex space-x-2 mb-6 px-2">
        {selectedCategory === 'milkTea' ? (
          <>
            {renderSubcategoryButton('classic', 'Classic')}
            {renderSubcategoryButton('rockSalt', 'Rock Salt')}
            {renderSubcategoryButton('creamCheese', 'Cream Cheese')}
          </>
        ) : selectedCategory === 'bubbleTea' ? (
          <>
            {renderSubcategoryButton('rockSalt', 'Rock Salt')}
            {renderSubcategoryButton('creamCheese', 'Cream Cheese')}
          </>
        ) : selectedCategory === 'fruitTea' ? (
          // For fruitTea, no subcategories needed as we only have classic now
          <div className="py-2 px-4 text-sm font-medium rounded-full bg-tertiary text-textPrimary shadow-md">
            {t.teaCategories?.classic || 'Classic'}
          </div>
        ) : (
          <div className="py-2 px-4 text-sm font-medium rounded-full bg-tertiary text-textPrimary shadow-md">
            {t.teaCategories?.classic || 'Classic'}
          </div>
        )}
      </div>

      {/* Category description */}
      <div className="mb-6 p-4 bg-secondary rounded-lg">
        {selectedCategory === 'milkTea' ? (
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-tertiary rounded-full px-2 py-1 mr-3">
              <span className="text-lg">ⓘ</span>
            </div>
            <p className="text-textPrimary">
              <span className="font-bold">{t.categories?.milkTea || 'Milk Tea'}</span> {t.drinkInfo?.noPearlsDesc || 'drinks do not include bubble (tapioca pearls) by default. You can add pearls as a topping for an additional charge.'}
            </p>
          </div>
        ) : selectedCategory === 'bubbleTea' ? (
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-tertiary rounded-full px-2 py-1 mr-3">
              <span className="text-lg">ⓘ</span>
            </div>
            <p className="text-textPrimary">
              <span className="font-bold">{t.categories?.bubbleTea || 'Bubble Tea'}</span> {t.drinkInfo?.pearlsIncludedDesc || 'drinks come with bubble (tapioca pearls) included. Additional toppings can be added for extra flavor.'}
            </p>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-tertiary rounded-full px-2 py-1 mr-3">
              <span className="text-lg">ⓘ</span>
            </div>
            <p className="text-textPrimary">
              <span className="font-bold">{t.categories?.fruitTea || 'Fruit Tea'}</span> {t.drinkInfo?.fruitTeaDesc || 'drinks include tapioca pearls and coconut jelly by default. Enjoy the refreshing taste without milk.'}
            </p>
          </div>
        )}
      </div>

      {/* Drink list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drinksToDisplay.map((drink) => (
          <DrinkCard 
            key={drink.id}
            drink={drink}
            onSelect={() => handleDrinkSelect(drink)}
          />
        ))}
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