import React, { useState, useEffect } from 'react';
import { FilterCriteria, ColumnConfig, CompanyData } from './types';
import { mockCompanies, availableColumns } from './data/mockData';
import { MultiStepFlow } from './components/MultiStepFlow';
import { SaveModal } from './components/SaveModal';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [filters, setFilters] = useState<FilterCriteria>({
    industry: [],
    cities: [],
    locationRange: '+ 50 Miles',
    industrySpecific: [],
    contacts: []
  });
  const [columns, setColumns] = useState<ColumnConfig[]>(availableColumns);
  const [data, setData] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveModalType, setSaveModalType] = useState<'list' | 'filter'>('list');

  const simulateDataFetch = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    let filteredData = mockCompanies;
    
    if (filters.industry.length > 0) {
      filteredData = filteredData.filter(company => 
        filters.industry.includes(company.industry)
      );
    }
    
    if (filters.cities.length > 0) {
      filteredData = filteredData.filter(company => 
        filters.cities.includes(company.city)
      );
    }
    
    setData(filteredData);
    setIsLoading(false);
  };

  const updateColumnsBasedOnFilters = () => {
    const updatedColumns = columns.map(col => {
      if (col.category === 'industry') {
        const shouldSelect = filters.industrySpecific.some(filter => 
          col.label.toLowerCase().includes(filter.toLowerCase()) ||
          filter.toLowerCase().includes(col.label.toLowerCase())
        );
        return { ...col, selected: shouldSelect };
      }
      
      if (col.category === 'contact') {
        const contactMapping: { [key: string]: string } = {
          'Marketing': 'marketingContacts',
          'Sales': 'salesContacts',
          'Engineering': 'engineeringContacts',
          'Operations': 'operationsContacts',
          'Finance': 'financeContacts',
          'HR': 'hrContacts',
          'Customer Success': 'customerSuccessContacts',
          'Product Management': 'productManagementContacts'
        };
        
        const shouldSelect = filters.contacts.some(contact => 
          contactMapping[contact] === col.id
        );
        return { ...col, selected: shouldSelect };
      }
      
      return col;
    });
    setColumns(updatedColumns);
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 0: // Target definition
        return filters.industry.length > 0 && filters.cities.length > 0;
      case 1: // Data discovery
        return filters.industrySpecific.length > 0 || filters.contacts.length > 0;
      case 2: // Refine results
        return data.length > 0;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (currentStep === 0 && canProceedToNextStep()) {
      simulateDataFetch();
    }
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    updateColumnsBasedOnFilters();
  }, [filters.industrySpecific, filters.contacts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MultiStepFlow
        currentStep={currentStep}
        filters={filters}
        onFiltersChange={setFilters}
        columns={columns}
        onColumnsChange={setColumns}
        data={data}
        isLoading={isLoading}
        canProceed={canProceedToNextStep()}
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        onSaveList={() => {
          setSaveModalType('list');
          setShowSaveModal(true);
        }}
        onSaveFilter={() => {
          setSaveModalType('filter');
          setShowSaveModal(true);
        }}
      />

      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        recordCount={data.length}
        type={saveModalType}
      />
    </div>
  );
}

export default App;