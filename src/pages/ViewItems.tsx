import React, { useState } from 'react';
import { useItems } from '../context/ItemContext';
import { ItemModal } from '../components/ItemModal';
import { Item } from '../types';
import { Package } from 'lucide-react';

export function ViewItems() {
  const { items } = useItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <Package className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No items yet</h2>
        <p className="text-gray-600 max-w-md">
          Start building your inventory by adding your first item. Click "Add Items" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">View Items</h1>
        <p className="text-gray-600">Browse and explore your item collection</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] border border-gray-100 overflow-hidden group"
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={item.coverImage}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {item.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={closeModal}
        />
      )}
    </div>
  );
}