import React, { useState } from 'react';
import { FilterCriteria } from '../types';
import { filterOptions, getIndustrySpecificOptions } from '../data/mockData';
import { Search, MapPin, Building2, Target, Sparkles, X, Plus } from 'lucide-react';

interface SmartFilterWizardProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  onNext: () => void;
  canProceed: boolean;
}

export const SmartFilterWizard: React.FC<SmartFilterWizardProps> = ({
  filters,
  onFiltersChange,
  onNext,
  canProceed
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'industry' | 'location'>('industry');

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

  const filteredIndustries = filterOptions.industries.filter(industry =>
    industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCities = filterOptions.cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quickPresets = [
    {
      name: 'Healthcare Tech',
      industries: ['Health Care'],
      cities: ['San Francisco', 'Boston', 'New York'],
      icon: '🏥'
    },
    {
      name: 'Fintech Startups',
      industries: ['Financial Technology'],
      cities: ['San Francisco', 'New York', 'London'],
      icon: '💰'
    },
    {
      name: 'SaaS Companies',
      industries: ['Software Development'],
      cities: ['San Francisco', 'Seattle', 'Austin'],
      icon: '💻'
    }
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    onFiltersChange({
      ...filters,
      industry: preset.industries,
      cities: preset.cities
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
          <Target className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Define Your Ideal Customer</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start by selecting the industries and locations that match your target market. 
          Our AI will help you discover the most relevant companies.
        </p>
      </div>

      {/* Quick Presets */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Quick Start Templates</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {quickPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="text-2xl mb-2">{preset.icon}</div>
              <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                {preset.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {preset.industries.join(', ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Filter Interface */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('industry')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'industry'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 className="h-4 w-4 inline mr-2" />
              Industries ({filters.industry.length})
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'location'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MapPin className="h-4 w-4 inline mr-2" />
              Locations ({filters.cities.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'industry' ? 'industries' : 'cities'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Selected Items */}
          {((activeTab === 'industry' && filters.industry.length > 0) || 
            (activeTab === 'location' && filters.cities.length > 0)) && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Selected:</h4>
              <div className="flex flex-wrap gap-2">
                {activeTab === 'industry' 
                  ? filters.industry.map((industry) => (
                      <span
                        key={industry}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {industry}
                        <button
                          onClick={() => handleIndustryToggle(industry)}
                          className="ml-2 hover:text-blue-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                  : filters.cities.map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {city}
                        <button
                          onClick={() => handleCityToggle(city)}
                          className="ml-2 hover:text-green-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))
                }
              </div>
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {activeTab === 'industry' 
              ? filteredIndustries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => handleIndustryToggle(industry)}
                    className={`p-4 text-left border rounded-xl transition-all ${
                      filters.industry.includes(industry)
                        ? 'border-blue-300 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{industry}</span>
                      {filters.industry.includes(industry) ? (
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      ) : (
                        <Plus className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                ))
              : filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityToggle(city)}
                    className={`p-4 text-left border rounded-xl transition-all ${
                      filters.cities.includes(city)
                        ? 'border-green-300 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{city}</span>
                      {filters.cities.includes(city) ? (
                        <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      ) : (
                        <Plus className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                ))
            }
          </div>
        </div>
      </div>

      {/* Location Range */}
      {activeTab === 'location' && filters.cities.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Radius</h3>
          <div className="grid grid-cols-5 gap-3">
            {filterOptions.locationRanges.map((range) => (
              <button
                key={range}
                onClick={() => onFiltersChange({ ...filters, locationRange: range })}
                className={`p-3 text-center border rounded-lg transition-all ${
                  filters.locationRange === range
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">{range}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};