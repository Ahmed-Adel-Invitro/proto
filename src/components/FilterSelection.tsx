import React from 'react';
import { FilterCriteria } from '../types';
import { filterOptions } from '../data/mockData';
import { ChevronDown } from 'lucide-react';

interface FilterSelectionProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
}

export const FilterSelection: React.FC<FilterSelectionProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (filterType: keyof FilterCriteria, value: string) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const renderFilterSection = (title: string, filterType: keyof FilterCriteria, options: string[]) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium text-gray-900 mb-3 flex items-center">
        {title}
        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
      </h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters[filterType].includes(option)}
              onChange={() => handleFilterChange(filterType, option)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Define Your ICP (Ideal Customer Profile)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderFilterSection('Industry', 'industry', filterOptions.industry)}
        {renderFilterSection('Company Size', 'companySize', filterOptions.companySize)}
        {renderFilterSection('Location', 'location', filterOptions.location)}
        {renderFilterSection('Revenue', 'revenue', filterOptions.revenue)}
        {renderFilterSection('Employees', 'employees', filterOptions.employees)}
      </div>
    </div>
  );
};