import React, { useState } from 'react';
import { FilterCriteria } from '../types';
import { filterOptions, getIndustrySpecificOptions } from '../data/mockData';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  currentFlow: 'single' | 'three-stage';
  currentStage: 'icp' | 'industry-columns' | 'contact-columns';
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFiltersChange, 
  currentFlow,
  currentStage 
}) => {
  const [collapsedSections, setCollapsedSections] = useState<{
    icp: boolean;
    industry: boolean;
    contacts: boolean;
  }>({
    icp: false,
    industry: false,
    contacts: false
  });

  const toggleSection = (section: 'icp' | 'industry' | 'contacts') => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleIndustryChange = (industry: string) => {
    const newIndustries = filters.industry.includes(industry)
      ? filters.industry.filter(i => i !== industry)
      : [...filters.industry, industry];
    
    // Clear industry-specific filters when industry changes
    onFiltersChange({ 
      ...filters, 
      industry: newIndustries,
      industrySpecific: [] // Reset industry-specific when industry changes
    });
  };

  const handleCityChange = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter(c => c !== city)
      : [...filters.cities, city];
    
    onFiltersChange({ ...filters, cities: newCities });
  };

  const handleLocationRangeChange = (range: string) => {
    onFiltersChange({ ...filters, locationRange: range });
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

  const removeIndustry = (industry: string) => {
    onFiltersChange({
      ...filters,
      industry: filters.industry.filter(i => i !== industry),
      industrySpecific: [] // Reset industry-specific when removing industry
    });
  };

  const removeCity = (city: string) => {
    onFiltersChange({
      ...filters,
      cities: filters.cities.filter(c => c !== city)
    });
  };

  const shouldShowSection = (section: string) => {
    if (currentFlow === 'single') return true;
    
    switch (section) {
      case 'icp':
        return currentStage === 'icp';
      case 'industry':
        return currentStage === 'industry-columns';
      case 'contacts':
        return currentStage === 'contact-columns';
      default:
        return true;
    }
  };

  // Get dynamic industry-specific options based on selected industries
  const getAvailableIndustryOptions = () => {
    if (filters.industry.length === 0) return [];
    
    // Get options for all selected industries
    const allOptions = filters.industry.flatMap(industry => 
      getIndustrySpecificOptions(industry)
    );
    
    // Remove duplicates
    return [...new Set(allOptions)];
  };

  const renderCollapsibleSection = (
    sectionKey: 'icp' | 'industry' | 'contacts',
    title: string,
    content: React.ReactNode
  ) => {
    const isCollapsed = collapsedSections[sectionKey];
    
    return (
      <div className="mb-6">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full mb-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
        >
          <h3 className="font-medium text-gray-900">{title}</h3>
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {!isCollapsed && (
          <div className="pl-2">
            {content}
          </div>
        )}
      </div>
    );
  };

  const icpContent = (
    <>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Select the main industry
        </label>
        <div className="space-y-2">
          {filters.industry.map((industry) => (
            <div key={industry} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
              <span className="text-sm">{industry}</span>
              <button
                onClick={() => removeIndustry(industry)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <select
            value=""
            onChange={(e) => e.target.value && handleIndustryChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Select industry...</option>
            {filterOptions.industries
              .filter(industry => !filters.industry.includes(industry))
              .map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Select one or more city
        </label>
        <div className="space-y-2">
          {filters.cities.map((city) => (
            <div key={city} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
              <span className="text-sm">{city}</span>
              <button
                onClick={() => removeCity(city)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <select
            value=""
            onChange={(e) => e.target.value && handleCityChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Select city...</option>
            {filterOptions.cities
              .filter(city => !filters.cities.includes(city))
              .map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Select location range or radius
        </label>
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <span className="text-sm">{filters.locationRange || '+ 50 Miles'}</span>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <select
          value={filters.locationRange}
          onChange={(e) => handleLocationRangeChange(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md text-sm"
        >
          {filterOptions.locationRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  const industryContent = (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-2">
        Select Industry specific data columns you want to see
      </label>
      {filters.industry.length === 0 ? (
        <div className="text-sm text-gray-500 italic p-3 bg-gray-50 rounded-md">
          Please select an industry in the ICP section first
        </div>
      ) : (
        <div className="space-y-2">
          {filters.industrySpecific.map((item) => (
            <div key={item} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
              <span className="text-sm">{item}</span>
              <button
                onClick={() => handleIndustrySpecificChange(item)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <select
            value=""
            onChange={(e) => e.target.value && handleIndustrySpecificChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Select data column...</option>
            {getAvailableIndustryOptions()
              .filter(item => !filters.industrySpecific.includes(item))
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
          {filters.industry.length > 0 && (
            <div className="text-xs text-gray-500 mt-2">
              Showing options for: {filters.industry.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const contactsContent = (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-2">
        Select Functions of the contacts you want to see
      </label>
      <div className="space-y-2">
        {filters.contacts.map((contact) => (
          <div key={contact} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
            <span className="text-sm">{contact}</span>
            <button
              onClick={() => handleContactChange(contact)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <select
          value=""
          onChange={(e) => e.target.value && handleContactChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select function...</option>
          {filterOptions.contactFunctions
            .filter(func => !filters.contacts.includes(func))
            .map((func) => (
              <option key={func} value={func}>
                {func}
              </option>
            ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button className="pb-2 border-b-2 border-black text-sm font-medium">
          New Filter
        </button>
        <button className="pb-2 text-sm text-gray-500">
          Saved Filters
        </button>
      </div>

      {shouldShowSection('icp') && renderCollapsibleSection('icp', 'ICP', icpContent)}
      {shouldShowSection('industry') && renderCollapsibleSection('industry', 'Industry Specific', industryContent)}
      {shouldShowSection('contacts') && renderCollapsibleSection('contacts', 'Contacts', contactsContent)}
    </div>
  );
};