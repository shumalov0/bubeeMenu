'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import FullMenu from './components/FullMenu';
import ShoppingCart from './components/ShoppingCart';
import LanguageSelector from './components/LanguageSelector';
import SearchPanel from './components/SearchPanel';
import FilterPanel from './components/FilterPanel';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('milkTea'); // Default to milk tea
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: 'all',
    teaType: 'all',
    toppings: []
  });
  
  const { language, selectLanguage, showLanguageSelector, setShowLanguageSelector, isLoading } = useLanguage();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // This will be called by the IntersectionObserver in FullMenu
  const handleVisibleCategoryChange = (visibleCategory) => {
    setSelectedCategory(visibleCategory);
  };

  const addToCart = (item) => {
    const quantity = item.quantity || 1;
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity } 
          : cartItem
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
    
    setCartTotal(cartTotal + (item.price * quantity));
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    
    if (!itemToRemove) return;
    
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    setCartTotal(cartTotal - (itemToRemove.price * itemToRemove.quantity));
  };

  const resetCart = () => {
    setCartItems([]);
    setCartTotal(0);
  };

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleFilterClick = () => {
    setShowFilter(true);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  // Handle hydration errors by only rendering client-side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-50">
        <div className="bee-container">
          <div className="bee">
            <div className="bee-body">
              <div className="bee-line"></div>
            </div>
            <div>
              <div className="bee-wing-right"></div>
              <div className="bee-wing-left"></div>
            </div>
            <div className="bee-path">
              <div className="bee-pollen"></div>
              <div className="bee-pollen"></div>
              <div className="bee-pollen"></div>
              <div className="bee-pollen"></div>
              <div className="bee-pollen"></div>
              <div className="bee-pollen"></div>
            </div>
          </div>
        </div>
        
        <p className="text-tertiary mt-8 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (showLanguageSelector) {
    return (
      <LanguageSelector 
        onSelectLanguage={selectLanguage} 
        onClose={() => setShowLanguageSelector(false)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSearchClick={handleSearchClick}
        onFilterClick={handleFilterClick}
      />
      <CategoryList 
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <div className="flex-grow pb-24">
        <FullMenu 
          onAddToCart={addToCart}
          filters={activeFilters}
          onVisibleCategoryChange={handleVisibleCategoryChange}
        />
      </div>
      <ShoppingCart 
        cartItems={cartItems}
        total={cartTotal}
        onRemoveItem={removeFromCart}
        onResetCart={resetCart}
        selectedLanguage={language}
      />
      
      <SearchPanel 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onAddToCart={addToCart}
        drinkOnly={true}
      />
      
      <FilterPanel
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilters={handleApplyFilters}
        drinkOnly={true}
      />
    </div>
  );
}

// Simulate loading by adding a delay
export const dynamic = 'force-dynamic'; 