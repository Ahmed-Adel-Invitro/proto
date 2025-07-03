import React, { useState, useEffect } from 'react';
import { FilterCriteria, ColumnConfig, CompanyData } from './types';
import { mockCompanies, availableColumns } from './data/mockData';
import { SmartFilterWizard } from './components/SmartFilterWizard';
import { IntelligentResultsView } from './components/IntelligentResultsView';
import { FloatingActionPanel } from './components/FloatingActionPanel';
import { ProgressIndicator } from './components/ProgressIndicator';
import { InsightsSidebar } from './components/InsightsSidebar';
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
  const [insights, setInsights] = useState({
    totalCompanies: 0,
    topIndustries: [] as string[],
    averageCompanySize: '',
    geographicSpread: 0
  });

  const steps = [
    { id: 'target', title: 'Define Target', description: 'Who are you looking for?' },
    { id: 'discover', title: 'Discover Data', description: 'What data matters most?' },
    { id: 'refine', title: 'Refine Results', description: 'Perfect your selection' },
    { id: 'export', title: 'Export & Save', description: 'Get your data ready' }
  ];

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
    
    // Generate insights
    const industries = [...new Set(filteredData.map(c => c.industry))];
    setInsights({
      totalCompanies: filteredData.length,
      topIndustries: industries.slice(0, 3),
      averageCompanySize: '150-300 employees',
      geographicSpread: [...new Set(filteredData.map(c => c.city))].length
    });
    
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
    if (currentStep < steps.length - 1) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smart CRM Discovery</h1>
              <p className="text-sm text-gray-600 mt-1">AI-powered company research and data collection</p>
            </div>
            <ProgressIndicator 
              steps={steps} 
              currentStep={currentStep} 
              onStepClick={setCurrentStep}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="col-span-8">
            {currentStep === 0 && (
              <SmartFilterWizard
                filters={filters}
                onFiltersChange={setFilters}
                onNext={handleNextStep}
                canProceed={canProceedToNextStep()}
              />
            )}
            
            {currentStep >= 1 && (
              <IntelligentResultsView
                data={data}
                columns={columns}
                onColumnsChange={setColumns}
                filters={filters}
                onFiltersChange={setFilters}
                isLoading={isLoading}
                currentStep={currentStep}
                insights={insights}
              />
            )}
          </div>

          {/* Insights Sidebar */}
          <div className="col-span-4">
            <InsightsSidebar
              insights={insights}
              filters={filters}
              dataCount={data.length}
              currentStep={currentStep}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Panel */}
      <FloatingActionPanel
        currentStep={currentStep}
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
        dataCount={data.length}
        isLoading={isLoading}
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