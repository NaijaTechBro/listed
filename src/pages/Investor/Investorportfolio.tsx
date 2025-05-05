// // client/src/pages/InvestorPortfolio.tsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useInvestor } from '../../context/InvestorContext';
// import PortfolioMetricsPage from '../../components/investor/PortfolioMetricsPage';
// import StartupCard from '../../components/investor/StartupCard';
// import { Startup } from '../../types';

// // Main Portfolio Page Component
// const InvestorPortfolio: React.FC = () => {
//   // Use the investor context instead of local state for portfolio data
//   const { portfolioCompanies, loading, error, clearError, getInvestorPortfolio } = useInvestor();
  
//   // Local state for filters
//   const [filterStage, setFilterStage] = useState<string>('');
//   const [filterCategory, setFilterCategory] = useState<string>('');
//   const [searchTerm, setSearchTerm] = useState<string>('');
  
//   // Calculate investments made by the current investor for each startup
//   const calculateInvestment = (startup: Startup): number => {
//     // In a real app, you would check which funding rounds include the current investor's ID
//     // For simplicity, we're assuming all rounds in the portfolio are from the current investor
//     return startup.fundingRounds.reduce((sum, round) => sum + round.amount, 0);
//   };
  
//   useEffect(() => {
//     // Fetch portfolio data using the context function
//     getInvestorPortfolio();
//   }, [getInvestorPortfolio]);
  
//   // Filter portfolio based on selected filters and search term
//   const filteredPortfolio = portfolioCompanies.filter(startup => {
//     // Filter by stage
//     if (filterStage && startup.stage !== filterStage) {
//       return false;
//     }
    
//     // Filter by sector
//     if (filterCategory) {
//       // Handle both string and array category fields
//       if (Array.isArray(startup.category)) {
//         if (!startup.category.includes(filterCategory)) {
//           return false;
//         }
//       } else if (startup.category !== filterCategory) {
//         return false;
//       }
//     }
    
//     // Filter by search term
//     if (searchTerm && !startup.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !startup.description.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false;
//     }
    
//     return true;
//   });
  
//   // Get unique stages and categories for filters
//   const stages = Array.from(new Set(portfolioCompanies.map(startup => startup.stage)));
  
//   // Handle both string and array category fields
//   const categories = Array.from(new Set(
//     portfolioCompanies.flatMap(startup => 
//       Array.isArray(startup.category) ? startup.category : [startup.category]
//     ).filter(Boolean)
//   ));

//   return (
//     <div className="bg-gray-50 min-h-screen py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <h1 className="text-3xl font-bold">My Investment Portfolio</h1>
          
//           <Link 
//             to="/startups" 
//             className="mt-4 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Discover Startups
//           </Link>
//         </div>
        
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-8">
//             <p>{error}</p>
//             <button 
//               onClick={clearError}
//               className="text-red-600 underline text-sm"
//             >
//               Dismiss
//             </button>
//           </div>
//         )}
        
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         ) : (
//           <>
//             {portfolioCompanies.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-md p-10 text-center">
//                 <h3 className="text-2xl font-medium text-gray-700 mb-4">No investments yet</h3>
//                 <p className="text-gray-600 mb-6">Start building your portfolio by investing in promising startups</p>
//                 <Link 
//                   to="/startups" 
//                   className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
//                 >
//                   Browse Startups
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </Link>
//               </div>
//             ) : (
//               <>
//                 {/* Portfolio Metrics */}
//                 <PortfolioMetricsPage startups={portfolioCompanies} />
                
//                 {/* Filters */}
//                 <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <input
//                         type="text"
//                         placeholder="Search startups..."
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
                    
//                     <div>
//                       <select
//                         value={filterStage}
//                         onChange={(e) => setFilterStage(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       >
//                         <option value="">All Stages</option>
//                         {stages.map(stage => (
//                           <option key={stage} value={stage}>{stage}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     <div>
//                       <select
//                         value={filterCategory}
//                         onChange={(e) => setFilterCategory(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       >
//                         <option value="">All Sectors</option>
//                         {categories.map(category => (
//                           <option key={category} value={category}>{category}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Results */}
//                 <div className="mb-4 text-gray-600">
//                   {filteredPortfolio.length} {filteredPortfolio.length === 1 ? 'company' : 'companies'} in your portfolio
//                 </div>
                
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   {filteredPortfolio.map((startup) => (
//                     <StartupCard 
//                       key={startup._id} 
//                       startup={startup} 
//                       totalInvested={calculateInvestment(startup)} 
//                     />
//                   ))}
//                 </div>
                
//                 {filteredPortfolio.length === 0 && (
//                   <div className="text-center py-16">
//                     <h3 className="text-2xl font-medium text-gray-600 mb-2">No results match your filters</h3>
//                     <p className="text-gray-500">Try adjusting your filters to see more results</p>
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InvestorPortfolio;