// client/src/pages/InvestorDirectory.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInvestor } from '../../context/InvestorContext';
import { Investor } from '../../types';

// Available filter options (imported or defined elsewhere in your app)
const sectorOptions = ['Fintech', 'Healthtech', 'Edtech', 'Agritech', 'E-commerce', 'Clean Energy', 'Logistics', 'AI & ML', 'PropTech', 'Climate Tech'];
const countryOptions = ['Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana', 'Rwanda', 'Ethiopia', 'Senegal', 'United States', 'United Kingdom', 'UAE', 'Canada', 'Germany', 'Singapore', 'Australia', 'Israel', 'Saudi Arabia', 'Jordan', 'Morocco'];
const stageOptions = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Later Stage', 'All Stages'];

const InvestorCard: React.FC<{ investor: Investor }> = ({ investor }) => {
  return (
    <Link to={`/investor/${investor._id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow">
        <div className="p-5">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden flex-shrink-0 mr-3">
              <img 
                src={investor.profileImage || '/assets/images/placeholder-avatar.svg'} 
                alt={investor.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/placeholder-avatar.svg';
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{investor.name}</h3>
              <p className="text-sm text-gray-600">{investor.position} at {investor.organization}</p>
            </div>
          </div>
          
          <div className="mb-4 border-b border-gray-100 pb-4">
            <p className="text-gray-600 text-sm line-clamp-2">
              {investor.bio}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {investor.preferredSectors.slice(0, 2).map((sector, index) => (
              <span key={index} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                {sector}
              </span>
            ))}
            {investor.preferredSectors.length > 2 && (
              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                +{investor.preferredSectors.length - 2} more
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {investor.preferredStages.slice(0, 2).map((stage, index) => (
              <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                {stage}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const InvestorDirectory: React.FC = () => {
  // Use the investor context
  const { 
    investors, 
    loading, 
    error, 
    getInvestors, 
    searchInvestors,
    clearError 
  } = useInvestor();

  const [filters, setFilters] = useState({
    sector: '',
    stage: '',
    country: '',
    searchTerm: ''
  });

  useEffect(() => {
    // Get all investors when component mounts
    getInvestors();
    
    // Clean up function to clear any errors when component unmounts
    return () => {
      clearError();
    };
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare search criteria based on filters
    const searchCriteria: any = {};
    
    if (filters.searchTerm) {
      searchCriteria.query = filters.searchTerm;
    }
    
    if (filters.sector) {
      searchCriteria.sectors = [filters.sector];
    }
    
    if (filters.country) {
      searchCriteria.countries = [filters.country];
    }
    
    if (filters.stage && filters.stage !== 'All Stages') {
      searchCriteria.stages = [filters.stage];
    }
    
    // If we have any search criteria, use searchInvestors
    if (Object.keys(searchCriteria).length > 0) {
      searchInvestors(searchCriteria);
    } else {
      // Otherwise, get all investors
      getInvestors();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Investor Directory</h1>
        
        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            <button 
              onClick={clearError}
              className="text-red-600 underline text-sm"
            >
              Dismiss
            </button>
          </div>
        )}
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search investors..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div>
              <select
                name="sector"
                value={filters.sector}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Sectors</option>
                {sectorOptions.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Countries</option>
                {countryOptions.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                name="stage"
                value={filters.stage}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Stages</option>
                {stageOptions.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="md:col-span-4 lg:col-span-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </form>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {investors.length} {investors.length === 1 ? 'investor' : 'investors'} found
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investors.map((investor) => (
                <InvestorCard key={investor._id} investor={investor} />
              ))}
            </div>
            
            {investors.length === 0 && !loading && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-medium text-gray-600 mb-2">No investors found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorDirectory;