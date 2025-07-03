import React from 'react';
import { FilterCriteria, ColumnConfig, CompanyData } from '../types';
import { StepIndicator } from './StepIndicator';
import { ICPStep } from './steps/ICPStep';
import { IndustryDataStep } from './steps/IndustryDataStep';
import { ContactsStep } from './steps/ContactsStep';
import { ResultsView } from './ResultsView';
import { ActionButtons } from './ActionButtons';

interface MultiStepFlowProps {
  currentStep: number;
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
  data: CompanyData[];
  isLoading: boolean;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSaveList: () => void;
  onSaveFilter: () => void;
}

export const MultiStepFlow: React.FC<MultiStepFlowProps> = ({
  currentStep,
  filters,
  onFiltersChange,
  columns,
  onColumnsChange,
  data,
  isLoading,
  canProceed,
  onNext,
  onPrevious,
  onSaveList,
  onSaveFilter
}) => {
  const steps = [
    { id: 'icp', title: 'Define Target', description: 'Industry & Location' },
    { id: 'data', title: 'Select Data', description: 'Industry-specific fields' },
    { id: 'contacts', title: 'Add Contacts', description: 'Department contacts' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Discovery</h1>
        <p className="text-gray-600">Find and filter companies that match your criteria</p>
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Main Content Area */}
      <div className="mt-8 space-y-8">
        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {currentStep === 0 && (
            <ICPStep
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          )}
          
          {currentStep === 1 && (
            <IndustryDataStep
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          )}
          
          {currentStep === 2 && (
            <ContactsStep
              filters={filters}
              onFiltersChange={onFiltersChange}
            />
          )}
        </div>

        {/* Results */}
        {(data.length > 0 || isLoading) && (
          <ResultsView
            data={data}
            columns={columns}
            isLoading={isLoading}
          />
        )}

        {/* Action Buttons */}
        <ActionButtons
          currentStep={currentStep}
          canProceed={canProceed}
          onNext={onNext}
          onPrevious={onPrevious}
          onSaveList={onSaveList}
          onSaveFilter={onSaveFilter}
          dataCount={data.length}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};