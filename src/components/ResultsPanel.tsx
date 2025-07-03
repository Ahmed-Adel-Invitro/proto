import React, { useState } from 'react';
import { CompanyData, ColumnConfig, FeedbackData } from '../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';

interface ResultsPanelProps {
  data: CompanyData[];
  columns: ColumnConfig[];
  isLoading: boolean;
  onSaveList: () => void;
  onSaveFilterGroup: () => void;
  showEmptyState?: boolean;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  data, 
  columns, 
  isLoading, 
  onSaveList,
  onSaveFilterGroup,
  showEmptyState = false
}) => {
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    recordId: string;
    type: 'like' | 'dislike';
  }>({
    isOpen: false,
    recordId: '',
    type: 'like'
  });

  const selectedColumns = columns.filter(col => col.selected);
  
  const getCellValue = (item: CompanyData, columnId: string) => {
    const value = item[columnId as keyof CompanyData];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value?.toString() || '';
  };

  const getCategoryBorder = (column: ColumnConfig, index: number) => {
    const prevColumn = selectedColumns[index - 1];
    if (!prevColumn) return '';
    
    if (column.category !== prevColumn.category) {
      return 'border-l-2 border-blue-200';
    }
    return '';
  };

  const handleFeedback = (recordId: string, type: 'like' | 'dislike') => {
    setFeedbackModal({
      isOpen: true,
      recordId,
      type
    });
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    console.log('Feedback submitted:', feedback);
    // Here you would typically send the feedback to your backend
  };

  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {selectedColumns.map((_, index) => (
        <td key={index} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </td>
      ))}
      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </td>
    </tr>
  );

  const EmptyState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-lg mx-auto p-8">
        <div className="bg-gray-100 rounded-lg p-8 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create a list of companies</h3>
          <div className="text-left space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="font-medium mr-2">1.</span>
              <span>Define your ICP or apply filters — start with company size, location, or other firmographics</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium mr-2">2.</span>
              <span>Choose the industry-specific data you'd like to view</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium mr-2">3.</span>
              <span>Select the types of contacts you'd like to include in your list</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium mr-2">4.</span>
              <span>Once satisfied, save the full list into your Needles database</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 p-6 min-w-0">
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Query Results</h2>
              <p className="text-sm text-gray-500 mt-1">
                {showEmptyState ? 'Configure your filters and preview companies' : 
                 isLoading ? 'Loading...' : `${data.length} matching companies`}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onSaveFilterGroup}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save filter group
              </button>
              <button
                onClick={onSaveList}
                disabled={isLoading || data.length === 0 || showEmptyState}
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Save List
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {showEmptyState ? (
            <EmptyState />
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {selectedColumns.map((column, index) => (
                    <th
                      key={column.id}
                      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${getCategoryBorder(column, index)}`}
                    >
                      {column.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  Array(10).fill(0).map((_, index) => <SkeletonRow key={index} />)
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {selectedColumns.map((column, index) => (
                        <td
                          key={column.id}
                          className={`px-4 py-3 text-sm text-gray-900 ${getCategoryBorder(column, index)}`}
                        >
                          {getCellValue(item, column.id)}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleFeedback(item.id, 'like')}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Like this record"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleFeedback(item.id, 'dislike')}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Dislike this record"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ ...feedbackModal, isOpen: false })}
        onSubmit={handleFeedbackSubmit}
        recordId={feedbackModal.recordId}
        type={feedbackModal.type}
        availableColumns={selectedColumns}
      />
    </div>
  );
};