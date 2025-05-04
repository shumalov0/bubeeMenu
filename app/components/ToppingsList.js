'use client';

import Image from 'next/image';

export default function ToppingsList({ toppings }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-textPrimary mb-4">Add Extra Toppings</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {toppings.map((topping) => (
          <div 
            key={topping.id}
            className="bg-secondary rounded-lg p-3 flex flex-col items-center text-center hover:shadow-md transition-shadow"
          >
            <div className="relative h-20 w-20 mb-2">
              {topping.image ? (
                <Image
                  src={topping.image}
                  alt={topping.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm text-gray-500">No image</span>
                </div>
              )}
            </div>
            <h3 className="font-medium text-textPrimary mb-1">{topping.name}</h3>
            <p className="text-textSecondary text-sm">€2.50</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-secondary rounded-lg">
        <p className="text-textSecondary text-sm">
          All toppings can be added to any drink for an additional €2.50 each. 
          Select a drink first, then customize it with your favorite toppings.
        </p>
      </div>
    </div>
  );
} 