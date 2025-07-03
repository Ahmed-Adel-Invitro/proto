import React from 'react';
import { CompanyData, ColumnConfig } from '../types';
import { Search, Building2 } from 'lucide-react';

interface ResultsViewProps {
  data: CompanyData[];
  columns: ColumnConfig[];
  isLoading: boolean;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  data,
  columns,
  isLoading
}) => {
  const selectedColumns = columns.filter(col => col.selected);

  const getCellValue = (item: CompanyData, columnId: string) => {
    const value = item[columnId as keyof CompanyData];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value?.toString() || '';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <Search className="h-8 w-8 text-blue-600 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Companies</h3>
        <p className="text-gray-600">Searching for companies that match your criteria...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <Building2 className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {data.length} Companies Found
            </h3>
            <p className="text-sm text-gray-600">
              Companies matching your criteria
            </p>
          </div>
        </div>
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