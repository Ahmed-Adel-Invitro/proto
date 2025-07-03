import React from 'react';
import { FlowType } from '../types';
import { Grid3X3, Workflow } from 'lucide-react';

interface FlowToggleProps {
  currentFlow: FlowType;
  onFlowChange: (flow: FlowType) => void;
}

export const FlowToggle: React.FC<FlowToggleProps> = ({ currentFlow, onFlowChange }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
      <div className="flex space-x-1">
        <button
          onClick={() => onFlowChange('single')}
          className={`p-2 rounded-md transition-colors ${
            currentFlow === 'single'
              ? 'bg-blue-100 text-blue-900'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Single Flow"
        >
          <Grid3X3 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onFlowChange('three-stage')}
          className={`p-2 rounded-md transition-colors ${
            currentFlow === 'three-stage'
              ? 'bg-blue-100 text-blue-900'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Three Stage Flow"
        >
          <Workflow className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};