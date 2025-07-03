import React from 'react';
import { StageType } from '../types';
import { Check } from 'lucide-react';

interface StageIndicatorProps {
  currentStage: StageType;
  completedStages: StageType[];
}

export const StageIndicator: React.FC<StageIndicatorProps> = ({ currentStage, completedStages }) => {
  const stages = [
    { key: 'filters', label: 'Define ICP', description: 'Set your ideal customer profile' },
    { key: 'industry-columns', label: 'Industry Data', description: 'Select industry-specific columns' },
    { key: 'contact-columns', label: 'Contact Details', description: 'Choose contact information' },
    { key: 'preview', label: 'Preview & Save', description: 'Review and save to CRM' }
  ];

  const getStageStatus = (stageKey: string) => {
    if (completedStages.includes(stageKey as StageType)) return 'completed';
    if (currentStage === stageKey) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.key);
            const isLast = index === stages.length - 1;
            
            return (
              <li key={stage.key} className={`relative ${!isLast ? 'flex-1' : ''}`}>
                <div className="flex items-center">
                  <div className={`
                    relative flex items-center justify-center w-8 h-8 rounded-full
                    ${status === 'completed' 
                      ? 'bg-green-600' 
                      : status === 'current' 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }
                  `}>
                    {status === 'completed' ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <span className={`text-sm font-medium ${
                        status === 'current' ? 'text-white' : 'text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className={`text-sm font-medium ${
                      status === 'current' ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {stage.label}
                    </p>
                    <p className="text-xs text-gray-500">{stage.description}</p>
                  </div>
                </div>
                {!isLast && (
                  <div className="absolute top-4 left-8 ml-4 h-0.5 w-full bg-gray-200">
                    <div 
                      className={`h-0.5 bg-green-600 transition-all duration-300 ${
                        completedStages.includes(stage.key as StageType) ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};