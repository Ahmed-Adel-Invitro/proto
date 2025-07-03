import React from 'react';
import { FilterCriteria } from '../../types';
import { getIndustrySpecificOptions } from '../../data/mockData';
import { Database } from 'lucide-react';

interface IndustryDataStepProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
}

export const IndustryDataStep: React.FC<IndustryDataStepProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleIndustrySpecificChange = (item: string) => {
    const newItems = filters.industrySpecific.includes(item)
      ? filters.industrySpecific.filter(i => i !== item)
      : [...filters.industrySpecific, item];
    
    onFiltersChange({ ...filters, industrySpecific: newItems });
  };

  const getAvailableIndustryOptions = () => {
    if (filters.industry.length === 0) return [];
    const allOptions = filters.industry.flatMap(industry => 
      getIndustrySpecificOptions(industry)
    );
    return [...new Set(allOptions)];
  };

  const availableOptions = getAvailableIndustryOptions();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Industry-Specific Data</h2>
        <p className="text-gray-600">Choose the specialized data fields relevant to your selected industries</p>
      </div>

      {availableOptions.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {availableOptions.map((option) => (
            <label
              key={option}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                filters.industrySpecific.includes(option)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={filters.industrySpecific.includes(option)}
                onChange={() => handleIndustrySpecificChange(option)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-4"
              />
              <span className="text-gray-900 font-medium">{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Database className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Industries Selected</h3>
          <p className="text-gray-600">Please go back and select at least one industry to see available data fields</p>
        </div>
      )}
    </div>
  );
};