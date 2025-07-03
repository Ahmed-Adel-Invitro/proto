import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep
}) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
              isCompleted
                ? 'bg-green-500 text-white'
                : isCurrent
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}>
              {isCompleted ? (
                <Check className="h-6 w-6" />
              ) : (
                <span className="text-lg font-semibold">{index + 1}</span>
              )}
            </div>
            
            {/* Step Info */}
            <div className="ml-4 mr-8">
              <div className={`text-lg font-semibold ${
                isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
              <div className="text-sm text-gray-500">{step.description}</div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-4 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};