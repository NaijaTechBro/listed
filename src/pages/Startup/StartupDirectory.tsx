// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import StartupCard from '../../components/startup/StartupCard';
// import Navbar from '../../components/common/Navbar';
// import { StartupFilter } from '../../types';
// import { useStartup } from '../../context/StartupContext';

// const StartupDirectory: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { startups, loading, getStartups, count } = useStartup();
  
//   const [filters, setFilters] = useState<StartupFilter>({
//     category: '',
//     country: '',
//     stage: '',
//     searchTerm: '',
//     fundingRange: {
//       min: undefined,
//       max: undefined
//     },
//     employeeCount: {
//       min: undefined,
//       max: undefined
//     }
//   });

//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [sortOption, setSortOption] = useState<string>('newest');
//   const ITEMS_PER_PAGE = 12;

//   useEffect(() => {
//     // Parse query parameters
//     const searchParams = new URLSearchParams(location.search);
//     const newFilters: StartupFilter = {
//       category: searchParams.get('category') || '',
//       country: searchParams.get('country') || '',
//       stage: searchParams.get('stage') || '',
//       searchTerm: searchParams.get('search') || '',
//       fundingRange: {
//         min: searchParams.get('minFunding') ? Number(searchParams.get('minFunding')) : undefined,
//         max: searchParams.get('maxFunding') ? Number(searchParams.get('maxFunding')) : undefined
//       },
//       employeeCount: {
//         min: searchParams.get('minEmployees') ? Number(searchParams.get('minEmployees')) : undefined,
//         max: searchParams.get('maxEmployees') ? Number(searchParams.get('maxEmployees')) : undefined
//       }
//     };
    
//     const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
//     const sort = searchParams.get('sort') || 'newest';
    
//     setFilters(newFilters);
//     setCurrentPage(page);
//     setSortOption(sort);
    
//     fetchStartups(newFilters, page, sort);
//   }, [location.search]);

//   const fetchStartups = async (filterParams: StartupFilter = filters, page: number = currentPage, sort: string = sortOption) => {
//     try {
//       // Add sorting to the filter params if needed
//       const filtersWithSort = {
//         ...filterParams,
//         sort: sort
//       };
      
//       await getStartups(filtersWithSort, page, ITEMS_PER_PAGE);
//     } catch (error) {
//       console.error('Error fetching startups:', error);
//     }
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
//   };

//   const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const [rangeType, boundType] = name.split('-');
    
//     const numValue = value === '' ? undefined : Number(value);
    
//     setFilters(prev => ({
//       ...prev,
//       [rangeType === 'funding' ? 'fundingRange' : 'employeeCount']: {
//         ...prev[rangeType === 'funding' ? 'fundingRange' : 'employeeCount'],
//         [boundType]: numValue
//       }
//     }));
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newSortOption = e.target.value;
//     setSortOption(newSortOption);
    
//     // Make sure the sorting value is what the backend expects
//     updateUrlAndFetch(currentPage, newSortOption);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateUrlAndFetch(1); // Reset to first page when applying new filters
//   };

//   const handlePageChange = (newPage: number) => {
//     updateUrlAndFetch(newPage);
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: '',
//       country: '',
//       stage: '',
//       searchTerm: '',
//       fundingRange: {
//         min: undefined,
//         max: undefined
//       },
//       employeeCount: {
//         min: undefined,
//         max: undefined
//       }
//     });
    
//     // Clear URL params and fetch all startups
//     navigate(location.pathname);
//     fetchStartups({
//       category: '',
//       country: '',
//       stage: '',
//       searchTerm: '',
//       fundingRange: { min: undefined, max: undefined },
//       employeeCount: { min: undefined, max: undefined }
//     }, 1);
//   };

// // In StartupDirectory.tsx
// const updateUrlAndFetch = (page: number, sort: string = sortOption) => {
//   // Build query parameters
//   const params = new URLSearchParams();
  
//   // Make sure we're using the correct parameter name for search
//   if (filters.searchTerm) params.append('search', filters.searchTerm);
  
//   // Other parameters remain the same
//   if (filters.category) params.append('category', filters.category);
//   if (filters.country) params.append('country', filters.country);
//   if (filters.stage) params.append('stage', filters.stage);
  
//   // Add range filters
//   if (filters.fundingRange?.min !== undefined) 
//     params.append('minFunding', filters.fundingRange.min.toString());
//   if (filters.fundingRange?.max !== undefined) 
//     params.append('maxFunding', filters.fundingRange.max.toString());
//   if (filters.employeeCount?.min !== undefined) 
//     params.append('minEmployees', filters.employeeCount.min.toString());
//   if (filters.employeeCount?.max !== undefined) 
//     params.append('maxEmployees', filters.employeeCount.max.toString());
  
//   // Add sorting and pagination
//   params.append('sort', sort);
//   params.append('page', page.toString());
  
//   // Update URL without reloading the page
//   navigate(`${location.pathname}?${params.toString()}`);
  
//   // Also directly fetch the data
//   setCurrentPage(page);
//   setSortOption(sort);
//   fetchStartups(filters, page, sort);
// };
//   const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

//   // Check if any filters are active
//   const areFiltersActive = () => {
//     return filters.category !== '' || 
//            filters.country !== '' || 
//            filters.stage !== '' || 
//            filters.searchTerm !== '' || 
//            filters.fundingRange?.min !== undefined || 
//            filters.fundingRange?.max !== undefined || 
//            filters.employeeCount?.min !== undefined || 
//            filters.employeeCount?.max !== undefined;
//   };

//   // Generate country options
//   const countryOptions = [
//     'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana', 
//     'Rwanda', 'Ethiopia', 'Senegal', 'Uganda', 'Tanzania',
//     'Morocco', 'Tunisia', 'Côte d\'Ivoire', 'Cameroon', 'Angola'
//   ];

//   // Generate category options
//   const categoryOptions = [
//     'Fintech', 'Healthtech', 'Edtech', 'Agritech', 'E-commerce', 
//     'Clean Energy', 'Logistics', 'AI & ML', 'Blockchain', 'IoT',
//     'SaaS', 'Mobility', 'Food Tech', 'Proptech', 'Insurtech'
//   ];

//   // Generate stage options
//   const stageOptions = [
//     'Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B', 
//     'Series C', 'Growth', 'Established', 'Acquired', 'IPO'
//   ];

//   return (
//     <>
//     <Navbar />
//     <div className="bg-gray-50 min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h1 className="text-3xl font-bold">African Startup Directory</h1>
//           <p className="text-gray-600 mt-2 md:mt-0">
//             Discover innovative startups across Africa
//           </p>
//         </div>
        
//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//               <div className="md:col-span-2">
//                 <input
//                   type="text"
//                   placeholder="Search startups..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   value={filters.searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </div>
              
//               <div>
//                 <select
//                   name="category"
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">All Categories</option>
//                   {categoryOptions.map(cat => (
//                     <option key={cat} value={cat.toLowerCase()}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <select
//                   name="country"
//                   value={filters.country}
//                   onChange={handleFilterChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">All Countries</option>
//                   {countryOptions.map(country => (
//                     <option key={country} value={country.toLowerCase()}>{country}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <select
//                   name="stage"
//                   value={filters.stage}
//                   onChange={handleFilterChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 >
//                   <option value="">All Stages</option>
//                   {stageOptions.map(stage => (
//                     <option key={stage} value={stage.toLowerCase()}>{stage}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
            
//             {/* Additional Range Filters */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Funding Range (USD)</label>
//                 <div className="flex space-x-4">
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       name="funding-min"
//                       placeholder="Min"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       value={filters.fundingRange?.min || ''}
//                       onChange={handleRangeChange}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       name="funding-max"
//                       placeholder="Max"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       value={filters.fundingRange?.max || ''}
//                       onChange={handleRangeChange}
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
//                 <div className="flex space-x-4">
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       name="employeeCount-min"
//                       placeholder="Min"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       value={filters.employeeCount?.min || ''}
//                       onChange={handleRangeChange}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <input
//                       type="number"
//                       name="employeeCount-max"
//                       placeholder="Max"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                       value={filters.employeeCount?.max || ''}
//                       onChange={handleRangeChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex justify-between">
//               {areFiltersActive() && (
//                 <button
//                   type="button"
//                   onClick={clearFilters}
//                   className="text-indigo-600 hover:text-indigo-800 transition-colors"
//                 >
//                   Clear all filters
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </form>
//         </div>
        
//         {/* Results */}
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         ) : (
//           <>
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
//               <div className="text-gray-600 mb-4 md:mb-0">
//                 {count} {count === 1 ? 'startup' : 'startups'} found
//               </div>
              
//               {/* Sorting Options */}
//               <div className="flex items-center">
//                 <span className="mr-2 text-gray-600">Sort by:</span>
//                 <select 
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   value={sortOption}
//                   onChange={handleSortChange}
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="fundingHigh">Highest Funding</option>
//                   <option value="fundingLow">Lowest Funding</option>
//                   <option value="employeesHigh">Most Employees</option>
//                   <option value="employeesLow">Fewest Employees</option>
//                   <option value="nameAsc">Name (A-Z)</option>
//                   <option value="nameDesc">Name (Z-A)</option>
//                 </select>
//               </div>
//             </div>
            
//             {startups.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {startups.map((startup) => (
//                   <StartupCard key={startup._id} startup={startup} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16 bg-white rounded-lg shadow-md">
//                 <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                 </svg>
//                 <h3 className="mt-4 text-2xl font-medium text-gray-600">No startups found</h3>
//                 <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
//                 <button
//                   onClick={clearFilters}
//                   className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             )}
            
//             {/* Pagination */}
//             {count > ITEMS_PER_PAGE && (
//               <div className="mt-8 flex justify-center">
//                 <nav className="inline-flex rounded-md shadow">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`px-4 py-2 rounded-l-md border ${
//                       currentPage === 1 
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                         : 'bg-white text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     Previous
//                   </button>
                  
//                   {/* Generate page numbers */}
//                   {Array.from({ length: totalPages }, (_, i) => i + 1)
//                     .filter(page => 
//                       page === 1 || 
//                       page === totalPages || 
//                       Math.abs(page - currentPage) <= 1
//                     )
//                     .map((page, index, array) => {
//                       // Add ellipsis
//                       const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
//                       const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;
                      
//                       return (
//                         <React.Fragment key={page}>
//                           {showEllipsisBefore && (
//                             <span className="px-4 py-2 border bg-white text-gray-700">...</span>
//                           )}
                          
//                           <button
//                             onClick={() => handlePageChange(page)}
//                             className={`px-4 py-2 border ${
//                               currentPage === page
//                                 ? 'bg-indigo-600 text-white'
//                                 : 'bg-white text-gray-700 hover:bg-gray-50'
//                             }`}
//                           >
//                             {page}
//                           </button>
                          
//                           {showEllipsisAfter && (
//                             <span className="px-4 py-2 border bg-white text-gray-700">...</span>
//                           )}
//                         </React.Fragment>
//                       );
//                     })}
                  
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`px-4 py-2 rounded-r-md border ${
//                       currentPage === totalPages 
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                         : 'bg-white text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default StartupDirectory;










import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StartupCard from '../../components/startup/StartupCard';
import Navbar from '../../components/common/Navbar';
import { StartupFilter } from '../../types';
import { useStartup } from '../../context/StartupContext';

const StartupDirectory: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startups, loading, getStartups, count } = useStartup();
  
  const [filters, setFilters] = useState<StartupFilter>({
    category: '',
    country: '',
    stage: '',
    searchTerm: '',
    fundingRange: {
      min: undefined,
      max: undefined
    },
    employeeCount: {
      min: undefined,
      max: undefined
    }
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>('newest');
  const ITEMS_PER_PAGE = 12;


  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    
    // Extract sort with default value to ensure it's never undefined
    const sortValue = searchParams.get('sort') || 'newest';
    
    const newFilters: StartupFilter = {
      category: searchParams.get('category') || '',
      country: searchParams.get('country') || '',
      stage: searchParams.get('stage') || '',
      // Important: Get 'search' parameter from URL and map to searchTerm in filters
      searchTerm: searchParams.get('search') || '',
      fundingRange: {
        min: searchParams.get('minFunding') ? Number(searchParams.get('minFunding')) : undefined,
        max: searchParams.get('maxFunding') ? Number(searchParams.get('maxFunding')) : undefined
      },
      employeeCount: {
        min: searchParams.get('minEmployees') ? Number(searchParams.get('minEmployees')) : undefined,
        max: searchParams.get('maxEmployees') ? Number(searchParams.get('maxEmployees')) : undefined
      },
      // Add sort to the filter object, using the guaranteed non-undefined value
      sort: sortValue
    };
    
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    
    setFilters(newFilters);
    setCurrentPage(page);
    setSortOption(sortValue); // Using the guaranteed non-undefined value
    
    // Pass filters with all parameters to fetch startups
    fetchStartups(newFilters, page, sortValue);
  }, [location.search]);

  

  const fetchStartups = async (filterParams: StartupFilter = filters, page: number = currentPage, sort: string = sortOption) => {
    try {
      // Create a new filter object that includes the sort option
      const filtersWithSort: StartupFilter = {
        ...filterParams,
        sort: sort
      };
      
      await getStartups(filtersWithSort, page, ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching startups:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [rangeType, boundType] = name.split('-');
    
    const numValue = value === '' ? undefined : Number(value);
    
    setFilters(prev => ({
      ...prev,
      [rangeType === 'funding' ? 'fundingRange' : 'employeeCount']: {
        ...prev[rangeType === 'funding' ? 'fundingRange' : 'employeeCount'],
        [boundType]: numValue
      }
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    
    // Update with new sort option
    updateUrlAndFetch(currentPage, newSortOption);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlAndFetch(1); // Reset to first page when applying new filters
  };

  const handlePageChange = (newPage: number) => {
    updateUrlAndFetch(newPage);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      country: '',
      stage: '',
      searchTerm: '',
      fundingRange: {
        min: undefined,
        max: undefined
      },
      employeeCount: {
        min: undefined,
        max: undefined
      }
    });
    
    // Clear URL params and fetch all startups
    navigate(location.pathname);
    fetchStartups({
      category: '',
      country: '',
      stage: '',
      searchTerm: '',
      fundingRange: { min: undefined, max: undefined },
      employeeCount: { min: undefined, max: undefined }
    }, 1);
  };

  const updateUrlAndFetch = (page: number, sort: string = sortOption) => {
    // Build query parameters
    const params = new URLSearchParams();
    
    // Important: Use 'search' parameter for the backend
    if (filters.searchTerm) params.append('search', filters.searchTerm);
    
    // Other parameters remain the same
    if (filters.category) params.append('category', filters.category);
    if (filters.country) params.append('country', filters.country);
    if (filters.stage) params.append('stage', filters.stage);
    
    // Add range filters
    if (filters.fundingRange?.min !== undefined) 
      params.append('minFunding', filters.fundingRange.min.toString());
    if (filters.fundingRange?.max !== undefined) 
      params.append('maxFunding', filters.fundingRange.max.toString());
    if (filters.employeeCount?.min !== undefined) 
      params.append('minEmployees', filters.employeeCount.min.toString());
    if (filters.employeeCount?.max !== undefined) 
      params.append('maxEmployees', filters.employeeCount.max.toString());
    
    // Add sorting and pagination
    params.append('sort', sort);
    params.append('page', page.toString());
    
    // Update URL without reloading the page
    navigate(`${location.pathname}?${params.toString()}`);
    
    // Also directly fetch the data
    setCurrentPage(page);
    setSortOption(sort);
    fetchStartups(filters, page, sort);
  };

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  // Check if any filters are active
  const areFiltersActive = () => {
    return filters.category !== '' || 
           filters.country !== '' || 
           filters.stage !== '' || 
           filters.searchTerm !== '' || 
           filters.fundingRange?.min !== undefined || 
           filters.fundingRange?.max !== undefined || 
           filters.employeeCount?.min !== undefined || 
           filters.employeeCount?.max !== undefined;
  };

  // Generate country options
  const countryOptions = [
    'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana', 
    'Rwanda', 'Ethiopia', 'Senegal', 'Uganda', 'Tanzania',
    'Morocco', 'Tunisia', 'Côte d\'Ivoire', 'Cameroon', 'Angola'
  ];

  // Generate category options
  const categoryOptions = [
    'Fintech', 'Healthtech', 'Edtech', 'Agritech', 'E-commerce', 
    'Clean Energy', 'Logistics', 'AI & ML', 'Blockchain', 'IoT',
    'SaaS', 'Mobility', 'Food Tech', 'Proptech', 'Insurtech'
  ];

  // Generate stage options
  const stageOptions = [
    'Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B', 
    'Series C', 'Growth', 'Established', 'Acquired', 'IPO'
  ];

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold">African Startup Directory</h1>
          <p className="text-gray-600 mt-2 md:mt-0">
            Discover innovative startups across Africa
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={filters.searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
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
                    <option key={country} value={country.toLowerCase()}>{country}</option>
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
                    <option key={stage} value={stage.toLowerCase()}>{stage}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Additional Range Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Funding Range (USD)</label>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      name="funding-min"
                      placeholder="Min"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={filters.fundingRange?.min || ''}
                      onChange={handleRangeChange}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      name="funding-max"
                      placeholder="Max"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={filters.fundingRange?.max || ''}
                      onChange={handleRangeChange}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      name="employeeCount-min"
                      placeholder="Min"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={filters.employeeCount?.min || ''}
                      onChange={handleRangeChange}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      name="employeeCount-max"
                      placeholder="Max"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={filters.employeeCount?.max || ''}
                      onChange={handleRangeChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              {areFiltersActive() && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Clear all filters
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="text-gray-600 mb-4 md:mb-0">
                {count} {count === 1 ? 'startup' : 'startups'} found
              </div>
              
              {/* Sorting Options */}
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sort by:</span>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="fundingHigh">Highest Funding</option>
                  <option value="fundingLow">Lowest Funding</option>
                  <option value="employeesHigh">Most Employees</option>
                  <option value="employeesLow">Fewest Employees</option>
                  <option value="nameAsc">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                </select>
              </div>
            </div>
            
            {startups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startups.map((startup) => (
                  <StartupCard key={startup._id} startup={startup} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="mt-4 text-2xl font-medium text-gray-600">No startups found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {count > ITEMS_PER_PAGE && (
              <div className="mt-8 flex justify-center">
                <nav className="inline-flex rounded-md shadow">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-l-md border ${
                      currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Generate page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1
                    )
                    .map((page, index, array) => {
                      // Add ellipsis
                      const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                      const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <span className="px-4 py-2 border bg-white text-gray-700">...</span>
                          )}
                          
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border ${
                              currentPage === page
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                          
                          {showEllipsisAfter && (
                            <span className="px-4 py-2 border bg-white text-gray-700">...</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-r-md border ${
                      currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default StartupDirectory;