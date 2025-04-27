import React from 'react';
import { Link } from 'react-router-dom';
import StartupShowcase from '../components/startup/StartupShowcase';
import dashboardPreview from '../assets/dashboard.png';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Navbar />
      <div className="bg-white py-16 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6 max-w-4xl mx-auto">Discover African Startups Ready to Change the World</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          GetListed connects investors with promising African startups across all sectors and stages.
        </p>
        <Link to="/register" className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-800 inline-flex items-center">
          Try Beta Today
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>






         {/* Dashboard Image - Mobile Responsive */}
          <div className="max-w-5xl mx-auto mt-10">
          <img 
            src={dashboardPreview} 
            alt="GetListed Dashboard Preview" 
            className="w-full rounded-lg shadow-xl mx-auto"
            style={{maxWidth: '100%'}}
          />
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {['Fintech', 'Healthtech', 'Edtech', 'Agritech', 'E-commerce', 'Clean Energy', 'Logistics', 'AI & ML'].map((category) => (
              <Link 
                key={category}
                to={`/startups?category=${category.toLowerCase()}`} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-b-4 border-transparent hover:border-indigo-500"
              >
                <div className="text-xl font-medium text-indigo-700">{category}</div>
                <div className="text-sm text-gray-500 mt-1">Explore startups</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Startups - Updated with Green Background */}
      <section className="py-16 bg-green-200">
        <div className="container mx-auto px-4">
          <StartupShowcase />
        </div>
      </section>

      {/* For Investors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-50 rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-10">
                <h2 className="text-3xl font-bold mb-4">For Investors</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Discover promising African startups across various stages. Filter by sector, location, 
                  and metrics to find your next investment opportunity.
                </p>
                <Link to="/investor">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700">
                    Investor Access
                  </button>
                </Link>
              </div>
              <div className="md:w-1/3">
                <svg width="100%" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect x="0" y="0" width="400" height="300" rx="8" fill="#F3F4F6" />
                  
                  {/* Investor Dashboard */}
                  <rect x="40" y="40" width="320" height="220" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                  
                  {/* Charts */}
                  <rect x="60" y="80" width="120" height="80" rx="4" fill="#EEF2FF" />
                  <circle cx="120" cy="120" r="30" fill="none" stroke="#4F46E5" strokeWidth="12" strokeDasharray="150 188" />
                  <text x="110" y="125" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#111827">65%</text>
                  
                  <rect x="220" y="80" width="120" height="80" rx="4" fill="#F0FDFA" />
                  <rect x="230" y="140" width="20" height="10" fill="#0D9488" />
                  <rect x="260" y="130" width="20" height="20" fill="#0D9488" />
                  <rect x="290" y="110" width="20" height="40" fill="#0D9488" />
                  <rect x="320" y="90" width="20" height="60" fill="#0D9488" />
                  
                  {/* Documents */}
                  <rect x="60" y="180" width="280" height="15" rx="2" fill="#E5E7EB" />
                  <rect x="60" y="205" width="220" height="15" rx="2" fill="#E5E7EB" />
                  <rect x="60" y="230" width="180" height="15" rx="2" fill="#E5E7EB" />
                  
                  {/* Header */}
                  <rect x="40" y="40" width="320" height="30" rx="8 8 0 0" fill="#111827" />
                  <circle cx="60" cy="55" r="5" fill="#EF4444" />
                  <circle cx="75" cy="55" r="5" fill="#F59E0B" />
                  <circle cx="90" cy="55" r="5" fill="#10B981" />
                  <text x="200" y="60" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">INVESTOR PORTAL</text>
                  
                  {/* Money Icons */}
                  <circle cx="310" cy="190" r="25" fill="#FEF3C7" />
                  <text x="310" y="200" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#92400E" textAnchor="middle">$</text>
                  
                  <circle cx="340" cy="230" r="15" fill="#DBEAFE" />
                  <text x="340" y="236" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#1E40AF" textAnchor="middle">$</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Create Your Profile',
                description: 'Sign up and create your startup profile with comprehensive details that matter to investors.',
                icon: '📝'
              },
              {
                title: 'Get Discovered',
                description: 'Your startup becomes visible to our network of investors, partners, and users across Africa.',
                icon: '🔍'
              },
              {
                title: 'Make Connections',
                description: 'Receive interest directly from verified investors and potential partners.',
                icon: '🤝'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="bg-purple-200 py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
           
          </div>
          <h2 className="text-4xl font-bold mb-6">Ready to grow your startup with the right connections?</h2>
          <p className="text-xl mb-8">
            Join thousands of African startups already using GetListed to connect with investors and partners.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800">
                List Your Startup
              </button>
            </Link>
            <Link to="/contact">
              <button className="border border-black px-6 py-3 rounded-md bg-white font-medium hover:bg-gray-100">
                Talk to Our Team
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;