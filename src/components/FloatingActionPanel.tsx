import React from 'react';
import { ArrowLeft, ArrowRight, Download, Save, Search } from 'lucide-react';

interface FloatingActionPanelProps {
  currentStep: number;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSaveList: () => void;
  onSaveFilter: () => void;
  dataCount: number;
  isLoading: boolean;
}

export const FloatingActionPanel: React.FC<FloatingActionPanelProps> = ({
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
        return <Search className="h-4 w-4 ml-2" />;
      default:
        return <ArrowRight className="h-4 w-4 ml-2" />;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          {currentStep > 0 && (
            <button
              onClick={onPrevious}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>
          )}

          {/* Save Buttons */}
          {currentStep >= 1 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onSaveFilter}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Filter
              </button>

              {dataCount > 0 && (
                <button
                  onClick={onSaveList}
                  className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save List ({dataCount})
                </button>
              )}
            </div>
          )}

          {/* Next Button */}
          {currentStep < 2 && (
            <button
              onClick={onNext}
              disabled={!canProceed || isLoading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
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
    </div>
  );
};