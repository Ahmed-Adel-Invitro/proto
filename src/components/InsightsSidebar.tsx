import React from 'react';
import { FilterCriteria } from '../types';
import { 
  TrendingUp, Users, MapPin, Building2, Target, 
  Lightbulb, Star, AlertCircle, CheckCircle 
} from 'lucide-react';

interface InsightsSidebarProps {
  insights: {
    totalCompanies: number;
    topIndustries: string[];
    averageCompanySize: string;
    geographicSpread: number;
  };
  filters: FilterCriteria;
  dataCount: number;
  currentStep: number;
  isLoading: boolean;
}

export const InsightsSidebar: React.FC<InsightsSidebarProps> = ({
  insights,
  filters,
  dataCount,
  currentStep,
  isLoading
}) => {
  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  const recommendations = [
    {
      title: 'Expand Geographic Reach',
      description: 'Consider adding Austin and Seattle to capture more tech companies',
      icon: MapPin,
      priority: 'high'
    },
    {
      title: 'Industry Focus',
      description: 'Healthcare tech shows 40% higher engagement rates',
      icon: TrendingUp,
      priority: 'medium'
    },
    {
      title: 'Company Size Sweet Spot',
      description: '50-200 employee companies have the highest conversion',
      icon: Users,
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Target className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
        </div>
        
        <div className="space-y-3">
          <div className={`flex items-center p-3 rounded-lg ${
            getStepStatus(0) === 'completed' ? 'bg-green-50 border border-green-200' :
            getStepStatus(0) === 'current' ? 'bg-blue-50 border border-blue-200' :
            'bg-gray-50 border border-gray-200'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              getStepStatus(0) === 'completed' ? 'bg-green-500' :
              getStepStatus(0) === 'current' ? 'bg-blue-500' :
              'bg-gray-300'
            }`}>
              {getStepStatus(0) === 'completed' ? (
                <CheckCircle className="h-4 w-4 text-white" />
              ) : (
                <span className="text-xs font-medium text-white">1</span>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Target Defined</div>
              <div className="text-xs text-gray-500">
                {filters.industry.length} industries, {filters.cities.length} cities
              </div>
            </div>
          </div>

          <div className={`flex items-center p-3 rounded-lg ${
            getStepStatus(1) === 'completed' ? 'bg-green-50 border border-green-200' :
            getStepStatus(1) === 'current' ? 'bg-blue-50 border border-blue-200' :
            'bg-gray-50 border border-gray-200'
          }`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
              getStepStatus(1) === 'completed' ? 'bg-green-500' :
              getStepStatus(1) === 'current' ? 'bg-blue-500' :
              'bg-gray-300'
            }`}>
              {getStepStatus(1) === 'completed' ? (
                <CheckCircle className="h-4 w-4 text-white" />
              ) : (
                <span className="text-xs font-medium text-white">2</span>
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Data Discovered</div>
              <div className="text-xs text-gray-500">
                {dataCount} companies found
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      {dataCount > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Industry Distribution</div>
                <div className="text-xs text-gray-500 mt-1">
                  {insights.topIndustries.slice(0, 2).join(', ')} dominate your results
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Geographic Spread</div>
                <div className="text-xs text-gray-500 mt-1">
                  Companies across {insights.geographicSpread} major cities
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Company Size</div>
                <div className="text-xs text-gray-500 mt-1">
                  Average: {insights.averageCompanySize}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 border border-gray-100 rounded-lg">
              <div className="flex items-start">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-3 ${
                  rec.priority === 'high' ? 'bg-red-100' :
                  rec.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  <rec.icon className={`h-3 w-3 ${
                    rec.priority === 'high' ? 'text-red-600' :
                    rec.priority === 'medium' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{rec.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{rec.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors">
            <div className="text-sm font-medium">Export to CSV</div>
            <div className="text-xs opacity-80">Download current results</div>
          </button>
          <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors">
            <div className="text-sm font-medium">Save as Template</div>
            <div className="text-xs opacity-80">Reuse these filters</div>
          </button>
          <button className="w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors">
            <div className="text-sm font-medium">Schedule Updates</div>
            <div className="text-xs opacity-80">Get notified of new matches</div>
          </button>
        </div>
      </div>
    </div>
  );
};