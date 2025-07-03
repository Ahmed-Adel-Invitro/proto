import React from 'react';
import { StageType } from '../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StageNavigationProps {
  currentStage: StageType;
  onStageChange: (stage: StageType) => void;
  canProceed: boolean;
}

export const StageNavigation: React.FC<StageNavigationProps> = ({
  currentStage,
  onStageChange,
  canProceed
}) => {
  const stages: StageType[] = ['icp', 'industry-columns', 'contact-columns'];
  const currentIndex = stages.indexOf(currentStage);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onStageChange(stages[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < stages.length - 1 && canProceed) {
      onStageChange(stages[currentIndex + 1]);
    }
  };

  const stageLabels = {
    'icp': 'Define ICP',
    'industry-columns': 'Industry Data',
    'contact-columns': 'Contact Details'
  };

  const stageDescriptions = {
    'icp': 'Set your ideal customer profile and query companies',
    'industry-columns': 'Select industry-specific data columns to display',
    'contact-columns': 'Choose contact information columns to include'
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        <div className="flex items-center space-x-2">
          {stages.map((stage, index) => (
            <div key={stage} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">
            {stageLabels[currentStage]}
          </div>
          <div className="text-xs text-gray-500">
            {stageDescriptions[currentStage]}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === stages.length - 1 || !canProceed}
          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStage === 'icp' ? 'Find and Continue' : 'Next'}
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};