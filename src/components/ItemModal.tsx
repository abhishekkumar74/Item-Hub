import React from 'react';
import { X, Mail } from 'lucide-react';
import { Item } from '../types';
import { ImageCarousel } from './ImageCarousel';

interface ItemModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemModal({ item, isOpen, onClose }: ItemModalProps) {
  if (!isOpen) return null;

  const handleEnquire = () => {
    // In a real application, this would send an email
    alert(`Enquiry sent for "${item.name}"! We'll get back to you soon.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <ImageCarousel images={item.additionalImages} alt={item.name} />
            
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Type</h3>
                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {item.type}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Added</h3>
                <p className="text-gray-700 mt-1">{item.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleEnquire}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                <span>Enquire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}