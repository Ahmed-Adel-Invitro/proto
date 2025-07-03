import React, { useState } from 'react';
import { CompanyData, ColumnConfig, FilterCriteria } from '../types';
import { getIndustrySpecificOptions, filterOptions } from '../data/mockData';
import { 
  Eye, EyeOff, Filter, Columns, ThumbsUp, ThumbsDown, 
  Download, Share, Bookmark, Zap, TrendingUp, Users, MapPin 
} from 'lucide-react';

interface IntelligentResultsViewProps {
  data: CompanyData[];
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  isLoading: boolean;
  currentStep: number;
  insights: {
    totalCompanies: number;
    topIndustries: string[];
    averageCompanySize: string;
    geographicSpread: number;
  };
}

export const IntelligentResultsView: React.FC<IntelligentResultsViewProps> = ({
  data,
  columns,
  onColumnsChange,
  filters,
  onFiltersChange,
  isLoading,
  currentStep,
  insights
}) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const selectedColumns = columns.filter(col => col.selected);

  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = columns.map(col =>
      col.id === columnId ? { ...col, selected: !col.selected } : col
    );
    onColumnsChange(updatedColumns);
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

  const getCellValue = (item: CompanyData, columnId: string) => {
    const value = item[columnId as keyof CompanyData];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value?.toString() || '';
  };

  const LoadingState = () => (
    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6">
        <Zap className="h-8 w-8 text-white animate-pulse" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Discovering Companies</h3>
      <p className="text-gray-600 mb-6">Our AI is analyzing millions of companies to find your perfect matches...</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" style={{ width: '70%' }} />
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {data.length} Companies Found
            </h2>
            <p className="text-gray-600">
              Matching your criteria across {insights.geographicSpread} locations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {viewMode === 'table' ? 'Card View' : 'Table View'}
            </button>
            <button
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Columns className="h-4 w-4 mr-2" />
              Customize Columns
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <div className="text-sm text-blue-600 font-medium">Top Industry</div>
                <div className="text-lg font-semibold text-blue-900">
                  {insights.topIndustries[0] || 'N/A'}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <div className="text-sm text-green-600 font-medium">Avg. Size</div>
                <div className="text-lg font-semibold text-green-900">
                  {insights.averageCompanySize}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-600 mr-2" />
              <div>
                <div className="text-sm text-purple-600 font-medium">Locations</div>
                <div className="text-lg font-semibold text-purple-900">
                  {insights.geographicSpread} cities
                </div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center">
              <Bookmark className="h-5 w-5 text-orange-600 mr-2" />
              <div>
                <div className="text-sm text-orange-600 font-medium">Selected</div>
                <div className="text-lg font-semibold text-orange-900">
                  {selectedRows.length} companies
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Selector */}
      {showColumnSelector && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize Your Data View</h3>
          
          {/* Industry-Specific Columns */}
          {currentStep >= 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Industry-Specific Data</h4>
              <div className="flex flex-wrap gap-2">
                {getAvailableIndustryOptions().map((option) => (
                  <button
                    key={option}
                    onClick={() => handleIndustrySpecificChange(option)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.industrySpecific.includes(option)
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Columns */}
          {currentStep >= 2 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.contactFunctions.map((contact) => (
                  <button
                    key={contact}
                    onClick={() => handleContactChange(contact)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.contacts.includes(contact)
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {contact}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Columns */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">All Available Columns</h4>
            <div className="grid grid-cols-3 gap-3">
              {columns.map((column) => (
                <label
                  key={column.id}
                  className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={column.selected}
                    onChange={() => handleColumnToggle(column.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{column.label}</span>
                  {column.selected && <Eye className="h-3 w-3 text-green-500 ml-auto" />}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(data.map(item => item.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
                {selectedColumns.map((column) => (
                  <th
                    key={column.id}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedRows.includes(item.id) ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, item.id]);
                        } else {
                          setSelectedRows(selectedRows.filter(id => id !== item.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                  {selectedColumns.map((column) => (
                    <td
                      key={column.id}
                      className="px-6 py-4 text-sm text-gray-900"
                    >
                      {getCellValue(item, column.id)}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};