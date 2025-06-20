import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessNotification({ isVisible, onClose, message }: SuccessNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-green-100 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
}