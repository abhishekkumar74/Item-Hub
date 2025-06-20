import React, { useState } from 'react';
import { useItems } from '../context/ItemContext';
import { useNavigate } from 'react-router-dom';
import { ItemType } from '../types';
import { SuccessNotification } from '../components/SuccessNotification';
import { Upload, X, Plus } from 'lucide-react';

const ITEM_TYPES: ItemType[] = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Jacket', 'Dress', 'Other'];

export function AddItems() {
  const { addItem } = useItems();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '' as ItemType,
    description: '',
    coverImage: '',
    additionalImages: [] as string[]
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean = false) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (isCover) {
            setFormData(prev => ({
              ...prev,
              coverImage: result
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              additionalImages: [...prev.additionalImages, result]
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newItem = {
      ...formData,
      additionalImages: formData.coverImage ? [formData.coverImage, ...formData.additionalImages] : formData.additionalImages
    };

    addItem(newItem);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      type: '' as ItemType,
      description: '',
      coverImage: '',
      additionalImages: []
    });
    
    setIsSubmitting(false);
  };

  const isFormValid = formData.name.trim() && formData.type && formData.description.trim();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
        <p className="text-gray-600">Fill in the details to add a new item to your collection</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter item name"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Item Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select item type</option>
              {ITEM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Item Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Describe your item in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image
          </label>
          <div className="space-y-4">
            {formData.coverImage ? (
              <div className="relative inline-block">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload cover image</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Images
          </label>
          <div className="space-y-4">
            {formData.additionalImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.additionalImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Additional ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Add more images</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, false)}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Adding Item...' : 'Add Item'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>

      <SuccessNotification
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Item successfully added"
      />
    </div>
  );
}