import React, { useState } from 'react';
import { X, Check, Download } from 'lucide-react';

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordCount: number;
  type: 'list' | 'filter';
}

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, recordCount, type }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsSaved(true);
    
    setTimeout(() => {
      onClose();
      setIsSaved(false);
    }, 2000);
  };

  if (!isOpen) return null;

  const title = type === 'list' ? 'Save List to CRM' : 'Save Filter Group';
  const description = type === 'list' 
    ? `Ready to save ${recordCount} companies to your CRM? This will create new contacts and update existing ones.`
    : 'Save this filter configuration for future use.';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {!isSaved ? (
          <>
            <p className="text-gray-600 mb-6">{description}</p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    {type === 'list' ? 'Save to CRM' : 'Save Filter'}
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Successfully Saved!</h4>
            <p className="text-gray-600">
              {type === 'list' 
                ? `${recordCount} companies have been saved to your CRM.`
                : 'Filter group has been saved for future use.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};