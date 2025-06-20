import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Item } from '../types';

interface ItemContextType {
  items: Item[];
  addItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  getItemById: (id: string) => Item | undefined;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Sample data to start with
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    type: 'Shirt',
    description: 'A comfortable, high-quality cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    coverImage: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
    additionalImages: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8532595/pexels-photo-8532595.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Athletic Running Shoes',
    type: 'Shoes',
    description: 'Professional running shoes designed for comfort and performance. Features advanced cushioning technology and breathable mesh upper.',
    coverImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    additionalImages: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Slim Fit Denim Jeans',
    type: 'Pant',
    description: 'Premium denim jeans with a modern slim fit. Crafted from high-quality denim with stretch for comfort and durability.',
    coverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
    additionalImages: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    createdAt: new Date('2024-01-25')
  }
];

export function ItemProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(sampleItems);

  const addItem = (newItem: Omit<Item, 'id' | 'createdAt'>) => {
    const item: Item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setItems(prev => [...prev, item]);
  };

  const getItemById = (id: string) => {
    return items.find(item => item.id === id);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, getItemById }}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}