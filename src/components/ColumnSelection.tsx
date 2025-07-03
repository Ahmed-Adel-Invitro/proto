import React from 'react';
import { ColumnConfig } from '../types';

interface ColumnSelectionProps {
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  category?: 'industry' | 'contact';
  title?: string;
  description?: string;
}

export const ColumnSelection: React.FC<ColumnSelectionProps> = ({ 
  columns, 
  onColumnsChange, 
  category,
  title,
  description
}) => {
  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = columns.map(col => 
      col.id === columnId ? { ...col, selected: !col.selected } : col
    );
    onColumnsChange(updatedColumns);
  };

  const filteredColumns = category 
    ? columns.filter(col => col.category === category)
    : columns;

  const groupedColumns = filteredColumns.reduce((acc, col) => {
    if (!acc[col.category]) {
      acc[col.category] = [];
    }
    acc[col.category].push(col);
    return acc;
  }, {} as Record<string, ColumnConfig[]>);

  const categoryLabels = {
    basic: 'Basic Company Information',
    industry: 'Industry-Specific Data',
    contact: 'Contact Information'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {title || 'Select Data Columns'}
      </h2>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      
      <div className="space-y-6">
        {Object.entries(groupedColumns).map(([categoryKey, categoryColumns]) => (
          <div key={categoryKey} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">
              {categoryLabels[categoryKey as keyof typeof categoryLabels]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryColumns.map((column) => (
                <label key={column.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={column.selected}
                    onChange={() => handleColumnToggle(column.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};