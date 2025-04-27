import React, { useState, useEffect } from 'react';
import { useStartup } from '../../context/StartupContext';
import StartupCard from '../../components/startup/StartupCard';
import Navbar from '../../components/common/Navbar';
import { StartupFilter } from '../../types';

const StartupDirectory: React.FC = () => {
  const { startups, getStartups, loading, count, pagination } = useStartup();
  
  // Filter state
  const [filters, setFilters] = useState<StartupFilter>({
    searchTerm: '',
    category: '',
    country: '',
    stage: '',
    fundingRange: { min: undefined, max: undefined },
    employeeCount: { min: undefined, max: undefined }
  });
  
  // Form input state (for controlled components)
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [stageInput, setStageInput] = useState('');
  const [fundingMinInput, setFundingMinInput] = useState('');
  const [fundingMaxInput, setFundingMaxInput] = useState('');
  const [employeeMinInput, setEmployeeMinInput] = useState('');
  const [employeeMaxInput, setEmployeeMaxInput] = useState('');
  const [sort, setSort] = useState('-createdAt'); // Default sort by newest
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Results per page
  
  // Load startups on mount and when filters change
  useEffect(() => {
    loadStartups();
  }, [currentPage, sort]);
  
  const loadStartups = async () => {
    try {
      await getStartups(filters, currentPage, limit);
    } catch (error) {
      console.error('Error loading startups:', error);
    }
  };
  
  // Handle filter application
  const applyFilters = () => {
    const newFilters: StartupFilter = {
      searchTerm: searchInput,
      category: categoryInput,
      country: countryInput,
      stage: stageInput,
      fundingRange: {
        min: fundingMinInput ? parseInt(fundingMinInput) : undefined,
        max: fundingMaxInput ? parseInt(fundingMaxInput) : undefined
      },
      employeeCount: {
        min: employeeMinInput ? parseInt(employeeMinInput) : undefined,
        max: employeeMaxInput ? parseInt(employeeMaxInput) : undefined
      },
      sort: sort
    };
    
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    getStartups(newFilters, 1, limit);
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSearchInput('');
    setCategoryInput('');
    setCountryInput('');
    setStageInput('');
    setFundingMinInput('');
    setFundingMaxInput('');
    setEmployeeMinInput('');
    setEmployeeMaxInput('');
    setFilters({
      searchTerm: '',
      category: '',
      country: '',
      stage: '',
      fundingRange: { min: undefined, max: undefined },
      employeeCount: { min: undefined, max: undefined }
    });
    setCurrentPage(1);
    setSort('-createdAt');
    getStartups({}, 1, limit);
  };
  
  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">African Startup Directory</h1>
          <p className="text-gray-600">Discover innovative startups across Africa</p>
        </div>
        
        {/* Filters section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search input */}
            <div className="md:col-span-4">
              <input
                type="text"
                placeholder="Search startups..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            
            {/* Category dropdown */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Fintech">Fintech</option>
                <option value="Healthtech">Healthtech</option>
                <option value="Edtech">Edtech</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Agritech">Agritech</option>
                <option value="Cleantech">Cleantech</option>
                <option value="Logistics">Logistics</option>
                <option value="SaaS">SaaS</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Blockchain">Blockchain</option>
                <option value="IoT">IoT</option>
                <option value="Mobility">Mobility</option>
                <option value="Food Tech">Food Tech</option>
                <option value="Proptech">Proptech</option>
                <option value="Insurtech">Insurtech</option>
              </select>
            </div>
            
            {/* Country dropdown */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={countryInput}
                onChange={(e) => setCountryInput(e.target.value)}
              >
                <option value="">All Countries</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Egypt">Egypt</option>
                <option value="Ghana">Ghana</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Senegal">Senegal</option>
                <option value="Morocco">Morocco</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Angola">Angola</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Uganda">Uganda</option>
              </select>
            </div>
            
            {/* Stage dropdown */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={stageInput}
                onChange={(e) => setStageInput(e.target.value)}
              >
                <option value="">All Stages</option>
                <option value="Idea">Idea</option>
                <option value="Pre-seed">Pre-seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Series C">Series C</option>
                <option value="Growth">Growth</option>
                <option value="Established">Established</option>
                <option value="Acquired">Acquired</option>
                <option value="IPO">IPO</option>
                <option value="MVP">MVP</option>
              </select>
            </div>
          </div>
          
          {/* Funding range and employee count */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Funding Range (USD)</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={fundingMinInput}
                  onChange={(e) => setFundingMinInput(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={fundingMaxInput}
                  onChange={(e) => setFundingMaxInput(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={employeeMinInput}
                  onChange={(e) => setEmployeeMinInput(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={employeeMaxInput}
                  onChange={(e) => setEmployeeMaxInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Filter buttons */}
          <div className="flex justify-start">
            <button
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
            <button
              className="ml-3 text-gray-700 bg-gray-100 px-5 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Results section */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">{count} startups found</p>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Sort by:</span>
            <select
              className="px-3 py-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="-name">Name Z-A</option>
              <option value="-metrics.fundingTotal">Highest Funding</option>
              <option value="metrics.fundingTotal">Lowest Funding</option>
              <option value="-metrics.employees">Most Employees</option>
              <option value="metrics.employees">Fewest Employees</option>
            </select>
          </div>
        </div>
        
        {/* Startups grid */}
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="loader text-indigo-600">Loading...</div>
          </div>
        ) : startups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map((startup) => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No startups found matching your filters.</p>
            <button
              className="mt-4 text-indigo-600 hover:text-indigo-800"
              onClick={resetFilters}
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {count > limit && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!pagination?.prev}
                className={`px-3 py-1 rounded-md mr-2 ${
                  pagination?.prev
                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Previous
              </button>
              
              <span className="text-gray-600 mx-2">
                Page {currentPage} of {Math.ceil(count / limit)}
              </span>
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!pagination?.next}
                className={`px-3 py-1 rounded-md ml-2 ${
                  pagination?.next
                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default StartupDirectory;