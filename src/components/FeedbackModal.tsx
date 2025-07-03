import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { FeedbackData, ColumnConfig } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackData) => void;
  recordId: string;
  type: 'like' | 'dislike';
  availableColumns: ColumnConfig[];
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  recordId,
  type,
  availableColumns
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      recordId,
      type,
      selectedColumns,
      comment
    });
    
    // Reset form
    setSelectedColumns([]);
    setComment('');
    onClose();
  };

  const handleClose = () => {
    setSelectedColumns([]);
    setComment('');
    onClose();
  };

  if (!isOpen) return null;

  const selectedColumnsData = availableColumns.filter(col => col.selected);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            {type === 'like' ? (
              <ThumbsUp className="h-6 w-6 text-green-600" />
            ) : (
              <ThumbsDown className="h-6 w-6 text-red-600" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              What did you {type} about this record?
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Which columns influenced your {type === 'like' ? 'positive' : 'negative'} feedback?
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedColumnsData.map((column) => (
                <button
                  key={column.id}
                  onClick={() => handleColumnToggle(column.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedColumns.includes(column.id)
                      ? type === 'like'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {column.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Additional comments (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Tell us more about what you ${type === 'like' ? 'liked' : 'disliked'}...`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={selectedColumns.length === 0}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                type === 'like'
                  ? 'bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400'
                  : 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400'
              } disabled:cursor-not-allowed`}
            >
              Submit Feedback
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};