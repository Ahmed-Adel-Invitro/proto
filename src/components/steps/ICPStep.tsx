import React from 'react';
import { FilterCriteria } from '../../types';
import { filterOptions } from '../../data/mockData';
import { Building2, MapPin } from 'lucide-react';

interface ICPStepProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
}

export const ICPStep: React.FC<ICPStepProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleIndustryToggle = (industry: string) => {
    const newIndustries = filters.industry.includes(industry)
      ? filters.industry.filter(i => i !== industry)
      : [...filters.industry, industry];
    
    onFiltersChange({ ...filters, industry: newIndustries });
  };

  const handleCityToggle = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter(c => c !== city)
      : [...filters.cities, city];
    
    onFiltersChange({ ...filters, cities: newCities });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Define Your Ideal Customer Profile</h2>
        <p className="text-gray-600">Select the industries and locations that match your target market</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Industries */}
        <div>
          <div className="flex items-center mb-6">
            <Building2 className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Industries</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filterOptions.industries.map((industry) => (
              <label
                key={industry}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  filters.industry.includes(industry)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.industry.includes(industry)}
                  onChange={() => handleIndustryToggle(industry)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-4"
                />
                <span className="text-gray-900 font-medium">{industry}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div>
          <div className="flex items-center mb-6">
            <MapPin className="h-6 w-6 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Locations</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {filterOptions.cities.map((city) => (
              <label
                key={city}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  filters.cities.includes(city)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.cities.includes(city)}
                  onChange={() => handleCityToggle(city)}
                  className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 mr-4"
                />
                <span className="text-gray-900 font-medium">{city}</span>
              </label>
            ))}
          </div>

          {/* Location Range */}
          {filters.cities.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Search Radius</h4>
              <div className="grid grid-cols-2 gap-3">
                {filterOptions.locationRanges.map((range) => (
                  <label
                    key={range}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      filters.locationRange === range
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="locationRange"
                      checked={filters.locationRange === range}
                      onChange={() => onFiltersChange({ ...filters, locationRange: range })}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 mr-3"
                    />
                    <span className="text-gray-900 font-medium">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};