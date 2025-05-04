import React from 'react';

const FoundersPage: React.FC = () => {
  // Founders data
  const foundersData = [
    {
      name: "Amara Okafor",
      avatar: "/api/placeholder/64/64",
      country: "Kenya",
      company: "EcoTech",
      companyTag: "bg-green-100 text-green-800"
    },
    {
      name: "Kofi Mensah",
      avatar: "/api/placeholder/64/64",
      country: "Nigeria",
      company: "PayFast",
      companyTag: "bg-blue-100 text-blue-800"
    },
    {
      name: "Thabo Ndlovu",
      avatar: "/api/placeholder/64/64",
      country: "South Africa",
      company: "MediConnect",
      companyTag: "bg-indigo-100 text-indigo-800"
    },
    {
      name: "Nia Kimathi",
      avatar: "/api/placeholder/64/64",
      country: "Ghana",
      company: "EduLearn",
      companyTag: "bg-purple-100 text-purple-800"
    }
  ];

  // Handler functions
  const handleMessage = (founderName: string) => {
    console.log(`Message ${founderName}`);
    // This would typically open a messaging interface
  };

  const handleConnect = (founderName: string) => {
    console.log(`Connect with ${founderName}`);
    // This would typically send a connection request
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Founders Network</h1>
        <p className="text-gray-600">Connect with innovative entrepreneurs from across Africa</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foundersData.map((founder, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="mb-2">
              <img 
                src={founder.avatar} 
                alt={founder.name} 
                className="w-16 h-16 rounded-full"
              />
            </div>
            
            <h3 className="font-bold text-lg text-center mt-2">{founder.name}</h3>
            <p className="text-gray-500 text-sm text-center">{founder.country}</p>
            
            <div className="mt-2 mb-4">
              <span className={`${founder.companyTag} px-3 py-1 rounded-full text-xs font-medium`}>
                {founder.company}
              </span>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200 w-full flex justify-center space-x-4">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={() => handleMessage(founder.name)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
                Message
              </button>
              
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={() => handleConnect(founder.name)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundersPage;