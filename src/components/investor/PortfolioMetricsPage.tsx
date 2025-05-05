// // // client/src/components/investor/PortfolioMetrics.tsx
// // import React from 'react';
// // import { Startup } from '../../types/index';

// // interface PortfolioMetricsProps {
// //   startups: Startup[];
// // }

// // /**
// //  * Component that displays key metrics and insights about an investor's portfolio
// //  */
// // const PortfolioMetrics: React.FC<PortfolioMetricsProps> = ({ startups }) => {
// //   // Calculate total invested amount
// //   const totalInvested = startups.reduce((total, startup) => {
// //     // Sum all funding rounds where the current investor participated
// //     const investedAmount = startup.fundingRounds ? startup.fundingRounds.reduce((sum, round) => {
// //       // In a real app, you would check if the current investor's ID is in the investors array
// //       // For simplicity, we're assuming all rounds in the portfolio are from the current investor
// //       return sum + round.amount;
// //     }, 0) : 0;
    
// //     return total + investedAmount;
// //   }, 0);
  
// //   // Count startups by stage
// //   const startupsByStage = startups.reduce((acc: Record<string, number>, startup) => {
// //     acc[startup.stage] = (acc[startup.stage] || 0) + 1;
// //     return acc;
// //   }, {});
  
// //   // Count startups by Category
// //   const startupsByCategory = startups.reduce((acc: Record<string, number>, startup) => {
// //     // Check if category is a string or an array
// //     if (Array.isArray(startup.category)) {
// //       startup.category.forEach((category: string) => {
// //         acc[category] = (acc[category] || 0) + 1;
// //       });
// //     } else {
// //       // Handle as single string
// //       const category = startup.category;
// //       acc[category] = (acc[category] || 0) + 1;
// //     }
// //     return acc;
// //   }, {});
  
// //   // Format currency
// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('en-US', {
// //       style: 'currency',
// //       currency: 'USD',
// //       notation: 'compact',
// //       maximumFractionDigits: 1
// //     }).format(amount);
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-md p-6 mb-8">
// //       <h2 className="text-xl font-semibold mb-6">Portfolio Overview</h2>
      
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <div className="bg-indigo-50 rounded-lg p-4">
// //           <p className="text-indigo-700 text-sm font-medium">Total Companies</p>
// //           <p className="text-3xl font-bold text-indigo-900">{startups.length}</p>
// //         </div>
        
// //         <div className="bg-green-50 rounded-lg p-4">
// //           <p className="text-green-700 text-sm font-medium">Total Invested</p>
// //           <p className="text-3xl font-bold text-green-900">{formatCurrency(totalInvested)}</p>
// //         </div>
        
// //         <div className="bg-purple-50 rounded-lg p-4">
// //           <p className="text-purple-700 text-sm font-medium">Avg. Investment</p>
// //           <p className="text-3xl font-bold text-purple-900">
// //             {startups.length > 0 ? formatCurrency(totalInvested / startups.length) : '$0'}
// //           </p>
// //         </div>
// //       </div>
      
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
// //         <div>
// //           <h3 className="text-lg font-medium mb-3">Investments by Stage</h3>
// //           <div className="space-y-2">
// //             {Object.entries(startupsByStage).map(([stage, count]) => (
// //               <div key={stage} className="flex justify-between items-center">
// //                 <div className="flex items-center">
// //                   <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium">
// //                     {stage}
// //                   </span>
// //                 </div>
// //                 <span className="text-gray-700 font-medium">{count} startup{count !== 1 ? 's' : ''}</span>
// //               </div>
// //             ))}
// //             {Object.keys(startupsByStage).length === 0 && (
// //               <p className="text-gray-500">No stage data available</p>
// //             )}
// //           </div>
// //         </div>
        
// //         <div>
// //           <h3 className="text-lg font-medium mb-3">Investments by Category</h3>
// //           <div className="space-y-2">
// //             {Object.entries(startupsByCategory)
// //               .sort((a, b) => b[1] - a[1])
// //               .slice(0, 5)
// //               .map(([category, count]) => (
// //                 <div key={category} className="flex justify-between items-center">
// //                   <div className="flex items-center">
// //                     <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
// //                       {category}
// //                     </span>
// //                   </div>
// //                   <span className="text-gray-700 font-medium">{count} startup{count !== 1 ? 's' : ''}</span>
// //                 </div>
// //               ))}
// //             {Object.keys(startupsByCategory).length === 0 && (
// //               <p className="text-gray-500">No category data available</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Additional Portfolio Insights */}
// //       {startups.length > 0 && (
// //         <div className="mt-6 pt-6 border-t border-gray-100">
// //           <h3 className="text-lg font-medium mb-3">Portfolio Insights</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div className="bg-blue-50 p-4 rounded-lg">
// //               <p className="text-blue-700 text-sm font-medium">Average Team Size</p>
// //               <p className="text-2xl font-bold text-blue-900">
// //                 {Math.round(startups.reduce((sum, startup) => {
// //                   // Convert string to number or use 0 if undefined
// //                   const teamSize = typeof startup.teamSize === 'string' 
// //                     ? parseInt(startup.teamSize, 10) || 0 
// //                     : startup.teamSize || 0;
// //                   return sum + teamSize;
// //                 }, 0) / startups.length)}
// //               </p>
// //             </div>

// //             <div className="bg-amber-50 p-4 rounded-lg">
// //               <p className="text-amber-700 text-sm font-medium">Avg. Company Age</p>
// //               <p className="text-2xl font-bold text-amber-900">
// //                 {Math.round(startups.reduce((sum, startup) => {
// //                   const currentYear = new Date().getFullYear();
// //                   // Extract year from foundingDate string
// //                   const foundingYear = startup.foundingDate 
// //                     ? new Date(startup.foundingDate).getFullYear() 
// //                     : currentYear;
                  
// //                   return sum + (currentYear - foundingYear);
// //                 }, 0) / startups.length)} years
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PortfolioMetrics;

// // client/src/components/investor/PortfolioMetricsPage.tsx
// import React, { useMemo } from 'react';
// import { Startup } from '../../types';

// interface PortfolioMetricsPageProps {
//   startups: Startup[];
// }

// const PortfolioMetricsPage: React.FC<PortfolioMetricsPageProps> = ({ startups }) => {
//   // Calculate portfolio metrics
//   const metrics = useMemo(() => {
//     const totalInvested = startups.reduce((sum, startup) => {
//       const investmentTotal = startup.fundingRounds.reduce((roundSum, round) => roundSum + round.amount, 0);
//       return sum + investmentTotal;
//     }, 0);
    
//     const totalCompanies = startups.length;
    
//     // Find the earliest and latest investments
//     let earliestInvestment = new Date();
//     let latestInvestment = new Date(0);
    
//     startups.forEach(startup => {
//       startup.fundingRounds.forEach(round => {
//         const roundDate = new Date(round.date);
//         if (roundDate < earliestInvestment) {
//           earliestInvestment = roundDate;
//         }
//         if (roundDate > latestInvestment) {
//           latestInvestment = roundDate;
//         }
//       });
//     });
    
//     // Calculate average per company
//     const averageInvestment = totalCompanies > 0 ? totalInvested / totalCompanies : 0;
    
//     // Calculate investment by stage
//     const investmentByStage: Record<string, number> = {};
//     startups.forEach(startup => {
//       startup.fundingRounds.forEach(round => {
//         if (!investmentByStage[round.stage]) {
//           investmentByStage[round.stage] = 0;
//         }
//         investmentByStage[round.stage] += round.amount;
//       });
//     });
    
//     // Calculate portfolio value (for a real app, this would be based on current valuations)
//     // For now, we'll just use a multiplier on total invested as an example
//     const estimatedPortfolioValue = totalInvested * 1.5;
    
//     return {
//       totalInvested,
//       totalCompanies,
//       averageInvestment,
//       earliestInvestment,
//       latestInvestment,
//       investmentByStage,
//       estimatedPortfolioValue
//     };
//   }, [startups]);
  
//   // Format currency
//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       notation: 'compact',
//       maximumFractionDigits: 1
//     }).format(amount);
//   };
  
//   // Format date to just show the year
//   const formatYear = (date: Date): string => {
//     return date.getFullYear().toString();
//   };
  
//   // Calculate time range of investments
//   const investmentTimeRange = metrics.earliestInvestment && metrics.latestInvestment ? 
//     `${formatYear(metrics.earliestInvestment)} - ${formatYear(metrics.latestInvestment)}` : 
//     'N/A';

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//       <h2 className="text-xl font-semibold mb-6">Portfolio Overview</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-500 text-sm">Total Invested</p>
//           <p className="text-2xl font-bold text-indigo-600">{formatCurrency(metrics.totalInvested)}</p>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-500 text-sm">Number of Companies</p>
//           <p className="text-2xl font-bold text-indigo-600">{metrics.totalCompanies}</p>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-500 text-sm">Average Investment</p>
//           <p className="text-2xl font-bold text-indigo-600">{formatCurrency(metrics.averageInvestment)}</p>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="text-gray-500 text-sm">Investment Period</p>
//           <p className="text-2xl font-bold text-indigo-600">{investmentTimeRange}</p>
//         </div>
//       </div>
      
//       <div className="mt-8">
//         <h3 className="text-lg font-medium mb-4">Investment by Stage</h3>
        
//         <div className="space-y-3">
//           {Object.entries(metrics.investmentByStage).map(([stage, amount]) => (
//             <div key={stage} className="flex items-center">
//               <div className="w-32 text-gray-600">{stage}</div>
//               <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2">
//                 <div 
//                   className="bg-indigo-500 h-4 rounded-full" 
//                   style={{ width: `${Math.min(100, (amount / metrics.totalInvested) * 100)}%` }}
//                 ></div>
//               </div>
//               <div className="w-24 text-right font-medium">{formatCurrency(amount)}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PortfolioMetricsPage;