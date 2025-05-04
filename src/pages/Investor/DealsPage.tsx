import React from 'react';

const DealsPage: React.FC = () => {
  // Active deals data
  const dealsData = [
    { 
      startup: "EcoTech", 
      amount: "$500K", 
      equity: "8%", 
      status: "Due Diligence",
      date: "2025-04-20"
    },
    { 
      startup: "PayFast", 
      amount: "$300K", 
      equity: "5%", 
      status: "Term Sheet",
      date: "2025-04-15"
    },
    { 
      startup: "MediConnect", 
      amount: "$1M", 
      equity: "12%", 
      status: "Closed",
      date: "2025-03-30"
    },
    { 
      startup: "EduLearn", 
      amount: "$250K", 
      equity: "10%", 
      status: "Negotiation",
      date: "2025-04-25"
    }
  ];

  // Function to determine status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Due Diligence":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium";
      case "Term Sheet":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium";
      case "Closed":
        return "bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium";
      case "Negotiation":
        return "bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium";
    }
  };

  // Function to handle "New Deal" button click
  const handleNewDeal = () => {
    console.log("New Deal button clicked");
    // This would typically open a modal or navigate to a new deal form
  };

  // Function to handle "View" action click
  const handleView = (startup: string) => {
    console.log(`View details for ${startup}`);
    // This would typically navigate to the deal details page
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Active Deals</h1>
        <p className="text-gray-600">Track and manage your investment pipeline</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Deal Pipeline</h2>
          <button 
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
            onClick={handleNewDeal}
          >
            <span className="mr-1">+</span> New Deal
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Startup</th>
                <th className="text-left py-3 font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 font-medium text-gray-600">Equity</th>
                <th className="text-left py-3 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dealsData.map((deal, index) => (
                <tr key={index} className="border-b border-gray-200">
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
                  <td className="py-4">{deal.date}</td>
                  <td className="py-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => handleView(deal.startup)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;