// // client/src/components/investor/StartupCard.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Startup } from '../../types';

// interface StartupCardProps {
//   startup: Startup;
//   totalInvested: number;
// }

// const StartupCard: React.FC<StartupCardProps> = ({ startup, totalInvested }) => {
//   // Format currency
//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       notation: 'compact',
//       maximumFractionDigits: 1
//     }).format(amount);
//   };

//   // Format the founding date
//   const foundingYear = typeof startup.foundedYear === 'number' 
//     ? startup.foundedYear 
//     : (startup.foundingDate ? new Date(startup.foundingDate).getFullYear() : 'N/A');

//   // Get the main category for display
//   const mainCategory = Array.isArray(startup.category) 
//     ? startup.category[0] 
//     : typeof startup.category === 'string' ? startup.category : 'Tech';

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="p-6">
//         <div className="flex items-center mb-4">
//           <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden mr-4">
//             {startup.logo ? (
//               <img 
//                 src={startup.logo} 
//                 alt={`${startup.name} logo`} 
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="text-2xl font-bold text-gray-400">
//                 {startup.name.charAt(0)}
//               </div>
//             )}
//           </div>
          
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">{startup.name}</h3>
//             <p className="text-gray-500 text-sm">{startup.tagline}</p>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <p className="text-sm text-gray-500">Category</p>
//             <p className="font-medium">{mainCategory}</p>
//           </div>
          
//           <div>
//             <p className="text-sm text-gray-500">Founded</p>
//             <p className="font-medium">{foundingYear}</p>
//           </div>
          
//           <div>
//             <p className="text-sm text-gray-500">Stage</p>
//             <p className="font-medium">{startup.stage}</p>
//           </div>
          
//           <div>
//             <p className="text-sm text-gray-500">Location</p>
//             <p className="font-medium">{startup.location || `${startup.city || ''}, ${startup.country || 'N/A'}`}</p>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-100 pt-4 mb-4">
//           <div className="flex justify-between mb-2">
//             <span className="text-sm text-gray-500">Your Investment</span>
//             <span className="font-semibold text-indigo-600">{formatCurrency(totalInvested)}</span>
//           </div>
          
//           <div className="flex justify-between mb-2">
//             <span className="text-sm text-gray-500">Total Funding</span>
//             <span className="font-medium">{formatCurrency(startup.metrics.fundingTotal)}</span>
//           </div>
          
//           <div className="flex justify-between">
//             <span className="text-sm text-gray-500">Team Size</span>
//             <span className="font-medium">{startup.teamSize || startup.metrics.employees} people</span>
//           </div>
//         </div>
        
//         <div className="flex space-x-3">
//           <Link 
//             to={`/startup/${startup._id}`}
//             className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center"
//           >
//             View Details
//           </Link>
          
//           <a 
//             href={startup.website} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex items-center justify-center bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StartupCard;