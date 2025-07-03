import React from 'react';
import { ArrowLeft, ArrowRight, Download, Save, Search } from 'lucide-react';

interface ActionButtonsProps {
  currentStep: number;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSaveList: () => void;
  onSaveFilter: () => void;
  dataCount: number;
  isLoading: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentStep,
  canProceed,
  onNext,
  onPrevious,
  onSaveList,
  onSaveFilter,
  dataCount,
  isLoading
}) => {
  const getNextButtonText = () => {
    switch (currentStep) {
      case 0:
        return 'Find & Continue';
      case 1:
        return 'Add Contacts';
      case 2:
        return 'Finalize';
      default:
        return 'Next';
    }
  };

  const getNextButtonIcon = () => {
    switch (currentStep) {
      case 0:
        return <Search className="h-5 w-5 ml-2" />;
      default:
        return <ArrowRight className="h-5 w-5 ml-2" />;
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Previous Button */}
      <div>
        {currentStep > 0 && (
          <button
            onClick={onPrevious}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </button>
        )}
      </div>

      {/* Center - Save Buttons */}
      <div className="flex items-center space-x-4">
        {currentStep >= 1 && (
          <>
            <button
              onClick={onSaveFilter}
              className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Filter
            </button>

            {dataCount > 0 && (
              <button
                onClick={onSaveList}
                className="flex items-center px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Save List ({dataCount})
              </button>
            )}
          </>
        )}
      </div>

      {/* Next Button */}
      <div>
        {currentStep < 2 && (
          <button
            onClick={onNext}
            disabled={!canProceed || isLoading}
            className="flex items-center px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Searching...
              </>
            ) : (
              <>
                {getNextButtonText()}
                {getNextButtonIcon()}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};