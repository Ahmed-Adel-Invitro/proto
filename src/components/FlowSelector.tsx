import React from 'react';
import { FlowType } from '../types';

interface FlowSelectorProps {
  currentFlow: FlowType;
  onFlowChange: (flow: FlowType) => void;
}

export const FlowSelector: React.FC<FlowSelectorProps> = ({ currentFlow, onFlowChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Select UX Flow to Test</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => onFlowChange('single')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentFlow === 'single'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Single Stage Flow
          <div className="text-sm mt-1 opacity-80">
            Preview once - All filters & columns at once
          </div>
        </button>
        <button
          onClick={() => onFlowChange('three-stage')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            currentFlow === 'three-stage'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Three Stage Flow
          <div className="text-sm mt-1 opacity-80">
            ICP → Industry Columns → Contact Columns
          </div>
        </button>
      </div>
    </div>
  );
};