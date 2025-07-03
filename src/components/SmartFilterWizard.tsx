import React, { useState } from 'react';
import { FilterCriteria, ColumnConfig } from '../types';
import { filterOptions, getIndustrySpecificOptions } from '../data/mockData';
import { ChevronDown, ChevronRight, Building2, MapPin, Database, Users } from 'lucide-react';

interface SmartFilterWizardProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  currentStep: number;
}

export const SmartFilterWizard: React.FC<SmartFilterWizardProps> = ({
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  currentStep
}) => {
  const [expandedSections, setExpandedSections] = useState({
    icp: true,
    industry: currentStep >= 1,
    contacts: currentStep >= 2
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const handleIndustrySpecificChange = (item: string) => {
    const newItems = filters.industrySpecific.includes(item)
      ? filters.industrySpecific.filter(i => i !== item)
      : [...filters.industrySpecific, item];
    
    onFiltersChange({ ...filters, industrySpecific: newItems });
  };

  const handleContactChange = (contact: string) => {
    const newContacts = filters.contacts.includes(contact)
      ? filters.contacts.filter(c => c !== contact)
      : [...filters.contacts, contact];
    
    onFiltersChange({ ...filters, contacts: newContacts });
  };

  const getAvailableIndustryOptions = () => {
    if (filters.industry.length === 0) return [];
    const allOptions = filters.industry.flatMap(industry => 
      getIndustrySpecificOptions(industry)
    );
    return [...new Set(allOptions)];
  };

  return (
    <div className="space-y-6">
      {/* ICP Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <button
          onClick={() => toggleSection('icp')}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
        >
          <div className="flex items-center">
            <Building2 className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ICP Definition</h3>
              <p className="text-sm text-gray-500">Industry & Location</p>
            </div>
          </div>
          {expandedSections.icp ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSections.icp && (
          <div className="px-6 pb-6 space-y-6">
            {/* Industries */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Industries</h4>
              <div className="grid grid-cols-1 gap-2">
                {filterOptions.industries.map((industry) => (
                  <label
                    key={industry}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.industry.includes(industry)}
                      onChange={() => handleIndustryToggle(industry)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
                    />
                    <span className="text-sm text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Cities</h4>
              <div className="grid grid-cols-1 gap-2">
                {filterOptions.cities.map((city) => (
                  <label
                    key={city}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.cities.includes(city)}
                      onChange={() => handleCityToggle(city)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
                    />
                    <span className="text-sm text-gray-700">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Range */}
            {filters.cities.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Search Radius</h4>
                <div className="grid grid-cols-1 gap-2">
                  {filterOptions.locationRanges.map((range) => (
                    <label
                      key={range}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="locationRange"
                        checked={filters.locationRange === range}
                        onChange={() => onFiltersChange({ ...filters, locationRange: range })}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                      />
                      <span className="text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Industry Specific Section */}
      {currentStep >= 1 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            onClick={() => toggleSection('industry')}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Database className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Industry Specific</h3>
                <p className="text-sm text-gray-500">Specialized data fields</p>
              </div>
            </div>
            {expandedSections.industry ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSections.industry && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 gap-2">
                {getAvailableIndustryOptions().map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.industrySpecific.includes(option)}
                      onChange={() => handleIndustrySpecificChange(option)}
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 mr-3"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contacts Section */}
      {currentStep >= 2 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <button
            onClick={() => toggleSection('contacts')}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <p className="text-sm text-gray-500">Department contacts</p>
              </div>
            </div>
            {expandedSections.contacts ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSections.contacts && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 gap-2">
                {filterOptions.contactFunctions.map((contact) => (
                  <label
                    key={contact}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.contacts.includes(contact)}
                      onChange={() => handleContactChange(contact)}
                      className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 mr-3"
                    />
                    <span className="text-sm text-gray-700">{contact}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};