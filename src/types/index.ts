export interface FilterCriteria {
  industry: string[];
  cities: string[];
  locationRange: string;
  industrySpecific: string[];
  contacts: string[];
}

export interface ColumnConfig {
  id: string;
  label: string;
  category: 'basic' | 'industry' | 'contact';
  selected: boolean;
}

export interface CompanyData {
  id: string;
  companyName: string;
  industry: string;
  city: string;
  state: string;
  country: string;
  companySize: string;
  revenue: string;
  employees: string;
  website: string;
  founded: string;
  type: string;
  description: string;
  technologies: string[];
  bedsNumber?: string;
  licenseType?: string;
  licenseExpiryDate?: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  contactLinkedIn: string;
  directEmail: string;
  workEmail: string;
  department: string;
  // Dynamic contact fields based on department selection
  marketingContacts?: string;
  salesContacts?: string;
  engineeringContacts?: string;
  operationsContacts?: string;
  financeContacts?: string;
  hrContacts?: string;
  customerSuccessContacts?: string;
  productManagementContacts?: string;
}

export interface FeedbackData {
  recordId: string;
  type: 'like' | 'dislike';
  selectedColumns: string[];
  comment: string;
}

export type FlowType = 'single' | 'three-stage';
export type StageType = 'icp' | 'industry-columns' | 'contact-columns';