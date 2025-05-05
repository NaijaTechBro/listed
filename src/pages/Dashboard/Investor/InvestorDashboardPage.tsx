


import React from 'react';
import { Link } from 'react-router-dom';

const InvestorDashboardPage: React.FC = () => {
  // Dashboard data
  const summaryData = {
    totalInvested: "$4.2M",
    numberOfStartups: 12,
    averageROI: "3.5x",
    activeDeals: 5
  };

  const activeDealsData = [
    { startup: "EcoTech", amount: "$500K", equity: "8%", status: "Due Diligence" },
    { startup: "PayFast", amount: "$300K", equity: "5%", status: "Term Sheet" },
    { startup: "MediConnect", amount: "$1M", equity: "12%", status: "Closed" }
  ];

  const recentActivityData = [
    { 
      title: "EcoTech shared new financial projections", 
      timeAgo: "2 hours ago" 
    },
    { 
      title: "New startup in EdTech vertical", 
      timeAgo: "5 hours ago" 
    },
    { 
      title: "Term sheet signed with PayFast", 
      timeAgo: "Yesterday" 
    }
  ];

  // Function to determine status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Due Diligence":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium";
      case "Term Sheet":
        return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium";
      case "Closed":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  return (
    <div className="">
  
        
        {/* Main Content */}
          <div className="flex justify-between items-center mb-8">
                {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome to GetListed, Investor 🎉</h1>
        <p className="text-gray-600 mt-2">Welcome back, here's what's happening with your investments</p>
      </div>
            {/* <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back, here's what's happening with your investments</p>
            </div> */}
            
        
          </div>
              {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Startups */}
        <div className="bg-black text-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Invested</span>
            <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded-full">All</span>
          </div>
          <div className="text-3xl font-bold">{summaryData.totalInvested}</div>
        </div>

        {/* Profile Views */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Number of Startups</span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">30 Days</span>
          </div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-red-500 text-sm mt-2">- Decreased 9.4% today</div>
        </div>

        {/* Connections */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Active Deals</span>
            <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">Total</span>
          </div>
          <div className="text-3xl font-bold">5</div>
          <div className="text-green-500 text-sm mt-2">+ Increased 39.4% today</div>
        </div>
      </div>

         {/* Quick Actions */}
         <div className="mb-12">
        <h2 className="text-xl font-medium mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Startup */}
          <Link to="/dashboard/add-startup" className="block">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">New Investment</h3>
                <p className="text-sm text-gray-500">Add a new startup to your portfolios</p>
              </div>
            </div>
          </Link>

          {/* Manage Startup */}
          <Link to="/dashboard/my-startups" className="block">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Update Documents</h3>
                <p className="text-sm text-gray-500">Manage your investment documents</p>
              </div>
            </div>
          </Link>

          {/* Browse Directory */}
          <Link to="/investor/dashboard/marketplace" className="block">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Browse Directory</h3>
                <p className="text-sm text-gray-500">Discover new investment opportunities</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

          {/* Two Column Layout for Deals and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Deals Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Active Deals</h2>
                <a href="#" className="text-blue-600 text-sm hover:underline">View All</a>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left pb-3 font-medium text-gray-500 text-sm">Startup</th>
                      <th className="text-left pb-3 font-medium text-gray-500 text-sm">Amount</th>
                      <th className="text-left pb-3 font-medium text-gray-500 text-sm">Equity</th>
                      <th className="text-left pb-3 font-medium text-gray-500 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDealsData.map((deal, index) => (
                      <tr key={index} className={index !== activeDealsData.length - 1 ? "border-b border-gray-100" : ""}>
                        <td className="py-4">
                          <span className="text-blue-600 font-medium">{deal.startup}</span>
                        </td>
                        <td className="py-4">{deal.amount}</td>
                        <td className="py-4">{deal.equity}</td>
                        <td className="py-4">
                          <span className={getStatusStyle(deal.status)}>
                            {deal.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivityData.map((activity, index) => (
                  <div key={index} className="border border-gray-100 p-4 rounded-md">
                    <p className="font-medium text-blue-600">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timeAgo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  );
};

export default InvestorDashboardPage;