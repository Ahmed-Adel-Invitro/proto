import React, { useState, useEffect } from 'react';
import { FlowType, StageType, FilterCriteria, ColumnConfig, CompanyData } from './types';
import { mockCompanies, availableColumns } from './data/mockData';
import { FilterPanel } from './components/FilterPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { FlowToggle } from './components/FlowToggle';
import { StageNavigation } from './components/StageNavigation';
import { SaveModal } from './components/SaveModal';

function App() {
  const [currentFlow, setCurrentFlow] = useState<FlowType>('single');
  const [currentStage, setCurrentStage] = useState<StageType>('icp');
  const [filters, setFilters] = useState<FilterCriteria>({
    industry: [],
    cities: [],
    locationRange: '+ 50 Miles',
    industrySpecific: [],
    contacts: []
  });
  const [columns, setColumns] = useState<ColumnConfig[]>(availableColumns);
  const [previewData, setPreviewData] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveModalType, setSaveModalType] = useState<'list' | 'filter'>('list');
  const [hasPreviewedOnce, setHasPreviewedOnce] = useState(false);
  const [hasQueriedInMultiStage, setHasQueriedInMultiStage] = useState(false);

  const simulateDataFetch = async () => {
    setIsLoading(true);
    setHasPreviewedOnce(true);
    
    // For multi-stage flow, mark that we've queried
    if (currentFlow === 'three-stage') {
      setHasQueriedInMultiStage(true);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let filteredData = mockCompanies.slice(0, 10); // Always show exactly 10 records
    
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
    
    // Ensure we always have 10 records for demo purposes
    if (filteredData.length < 10) {
      const additionalRecords = mockCompanies.slice(filteredData.length, 10);
      filteredData = [...filteredData, ...additionalRecords];
    }
    
    setPreviewData(filteredData.slice(0, 10));
    setIsLoading(false);
  };

  const updateColumnsBasedOnFilters = () => {
    const updatedColumns = columns.map(col => {
      // Handle industry-specific columns
      if (col.category === 'industry') {
        const shouldSelect = filters.industrySpecific.some(filter => 
          col.label.toLowerCase().includes(filter.toLowerCase()) ||
          filter.toLowerCase().includes(col.label.toLowerCase())
        );
        return { ...col, selected: shouldSelect };
      }
      
      // Handle contact columns - map contact functions to specific contact columns
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

  const canProceed = () => {
    switch (currentStage) {
      case 'icp':
        return filters.industry.length > 0 && filters.cities.length > 0;
      case 'industry-columns':
        return filters.industrySpecific.length > 0;
      case 'contact-columns':
        return filters.contacts.length > 0;
      default:
        return true;
    }
  };

  const handleSaveList = () => {
    setSaveModalType('list');
    setShowSaveModal(true);
  };

  const handleSaveFilterGroup = () => {
    setSaveModalType('filter');
    setShowSaveModal(true);
  };

  const resetFlow = () => {
    setCurrentStage('icp');
    setFilters({
      industry: [],
      cities: [],
      locationRange: '+ 50 Miles',
      industrySpecific: [],
      contacts: []
    });
    setColumns(availableColumns);
    setPreviewData([]);
    setHasPreviewedOnce(false);
    setHasQueriedInMultiStage(false);
  };

  const handleStageChange = (newStage: StageType) => {
    // If moving from ICP stage to industry-columns and we have data, auto-query
    if (currentStage === 'icp' && newStage === 'industry-columns' && canProceed() && !hasQueriedInMultiStage) {
      setCurrentStage(newStage);
      simulateDataFetch();
    } else {
      setCurrentStage(newStage);
    }
  };

  useEffect(() => {
    resetFlow();
  }, [currentFlow]);

  useEffect(() => {
    updateColumnsBasedOnFilters();
  }, [filters.industrySpecific, filters.contacts]);

  // Show data in multi-stage flow once we have it
  const shouldShowData = () => {
    if (currentFlow === 'single') {
      return hasPreviewedOnce;
    } else {
      // For three-stage flow, show data from industry-columns stage onwards if we've queried
      return hasQueriedInMultiStage && (currentStage === 'industry-columns' || currentStage === 'contact-columns');
    }
  };

  const shouldShowEmptyState = () => {
    if (currentFlow === 'single') {
      return !hasPreviewedOnce;
    } else {
      // For three-stage flow, show empty state only on ICP stage or if we haven't queried yet
      return currentStage === 'icp' || !hasQueriedInMultiStage;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <FlowToggle currentFlow={currentFlow} onFlowChange={setCurrentFlow} />
      
      {currentFlow === 'three-stage' && (
        <StageNavigation
          currentStage={currentStage}
          onStageChange={handleStageChange}
          canProceed={canProceed()}
        />
      )}

      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        currentFlow={currentFlow}
        currentStage={currentStage}
      />
      
      <ResultsPanel
        data={shouldShowData() ? previewData : []}
        columns={columns}
        isLoading={isLoading}
        onSaveList={handleSaveList}
        onSaveFilterGroup={handleSaveFilterGroup}
        showEmptyState={shouldShowEmptyState()}
      />

      {/* Preview button - only show for single flow */}
      {currentFlow === 'single' && (
        <div className="fixed bottom-6 left-6">
          <button
            onClick={() => simulateDataFetch()}
            disabled={isLoading || !canProceed()}
            className="w-80 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Loading...' : 'Preview Companies'}
          </button>
        </div>
      )}

      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        recordCount={previewData.length}
        type={saveModalType}
      />
    </div>
  );
}

export default App;