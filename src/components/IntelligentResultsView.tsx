import React from 'react';
import { CompanyData, ColumnConfig } from '../types';
import { Search } from 'lucide-react';

interface IntelligentResultsViewProps {
  data: CompanyData[];
  columns: ColumnConfig[];
  isLoading: boolean;
  currentStep: number;
}

export const IntelligentResultsView: React.FC<IntelligentResultsViewProps> = ({
  data,
  columns,
  isLoading,
  currentStep
}) => {
  const selectedColumns = columns.filter(col => col.selected);

  const getCellValue = (item: CompanyData, columnId: string) => {
    const value = item[columnId as keyof CompanyData];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value?.toString() || '';
  };

  const LoadingState = () => (
    <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
        <Search className="h-8 w-8 text-blue-600 animate-pulse" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Companies</h3>
      <p className="text-gray-600">Searching for companies that match your criteria...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
      <div className="text-gray-400 mb-4">
        <Search className="h-16 w-16 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Search</h3>
      <p className="text-gray-600">
        {currentStep === 0 
          ? "Select industries and cities to start finding companies"
          : "Configure your filters and click 'Find & Continue' to discover companies"
        }
      </p>
    </div>
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {data.length} Companies Found
        </h2>
        <p className="text-gray-600 mt-1">
          Companies matching your criteria
        </p>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {selectedColumns.map((column) => (
                <th
                  key={column.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {selectedColumns.map((column) => (
                  <td
                    key={column.id}
                    className="px-6 py-4 text-sm text-gray-900"
                  >
                    {getCellValue(item, column.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};