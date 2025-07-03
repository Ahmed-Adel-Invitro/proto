import React from 'react';
import { CompanyData, ColumnConfig } from '../types';

interface DataPreviewProps {
  data: CompanyData[];
  columns: ColumnConfig[];
  isLoading: boolean;
  onSaveToCRM: () => void;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data, columns, isLoading, onSaveToCRM }) => {
  const selectedColumns = columns.filter(col => col.selected);
  
  const getCellValue = (item: CompanyData, columnId: string) => {
    const value = item[columnId as keyof CompanyData];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value?.toString() || '';
  };

  const getColumnsByCategory = () => {
    const basic = selectedColumns.filter(col => col.category === 'basic');
    const industry = selectedColumns.filter(col => col.category === 'industry');
    const contact = selectedColumns.filter(col => col.category === 'contact');
    return { basic, industry, contact };
  };

  const { basic, industry, contact } = getColumnsByCategory();

  const SkeletonRow = () => (
    <tr className="border-b border-gray-200">
      {selectedColumns.map((_, index) => (
        <td key={index} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  );

  const CategoryHeader = ({ title }: { title: string }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-l-2 border-blue-200">
      {title}
    </th>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Data Preview</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {isLoading ? '...' : data.length} records matching your criteria
          </p>
        </div>
        <button
          onClick={onSaveToCRM}
          disabled={isLoading || data.length === 0}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Save to CRM
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {basic.length > 0 && <CategoryHeader title="Basic Info" />}
              {basic.slice(1).map((column) => (
                <th key={column.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              
              {industry.length > 0 && <CategoryHeader title="Industry Data" />}
              {industry.slice(1).map((column) => (
                <th key={column.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              
              {contact.length > 0 && <CategoryHeader title="Contact Info" />}
              {contact.slice(1).map((column) => (
                <th key={column.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array(5).fill(0).map((_, index) => <SkeletonRow key={index} />)
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {selectedColumns.map((column, index) => {
                    const isFirstInCategory = 
                      (column.category === 'industry' && index === basic.length) ||
                      (column.category === 'contact' && index === basic.length + industry.length);
                    
                    return (
                      <td
                        key={column.id}
                        className={`px-4 py-3 text-sm text-gray-900 ${
                          isFirstInCategory ? 'border-l-2 border-blue-200' : ''
                        }`}
                      >
                        {getCellValue(item, column.id)}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};