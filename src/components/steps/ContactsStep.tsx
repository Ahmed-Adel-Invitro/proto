import React from 'react';
import { FilterCriteria } from '../../types';
import { filterOptions } from '../../data/mockData';
import { Users } from 'lucide-react';

interface ContactsStepProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
}

export const ContactsStep: React.FC<ContactsStepProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleContactChange = (contact: string) => {
    const newContacts = filters.contacts.includes(contact)
      ? filters.contacts.filter(c => c !== contact)
      : [...filters.contacts, contact];
    
    onFiltersChange({ ...filters, contacts: newContacts });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Contact Information</h2>
        <p className="text-gray-600">Select the types of contacts you want to include in your results</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filterOptions.contactFunctions.map((contact) => (
          <label
            key={contact}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              filters.contacts.includes(contact)
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={filters.contacts.includes(contact)}
              onChange={() => handleContactChange(contact)}
              className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 mr-4"
            />
            <span className="text-gray-900 font-medium">{contact}</span>
          </label>
        ))}
      </div>
    </div>
  );
};