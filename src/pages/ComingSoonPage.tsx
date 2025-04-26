import React, { useState } from 'react';

const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple Navbar */}
      <nav className="bg-white py-4 px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="11" fill="black" />
              <circle cx="12" cy="12" r="8" fill="white" />
              <circle cx="12" cy="12" r="4" fill="black" />
            </svg>
            <span className="ml-2 font-bold text-xl">GetListed</span>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center bg-white py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-green-100 text-green-800 font-medium px-4 py-1 rounded-full text-sm mb-6">Coming Soon</span>
          <h1 className="text-5xl font-bold mb-6">We're Building Something Amazing</h1>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600">
            GetListed will connect investors with promising African startups across all sectors and stages.
            Be the first to know when we launch.
          </p>
          
          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-16">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
                Thank you! We'll notify you when we launch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
          
          {/* Coming Soon Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Discover Startups',
                description: 'Find innovative African startups across all sectors and stages.',
                icon: '🔍'
              },
              {
                title: 'Make Connections',
                description: 'Connect directly with founders and investors in the ecosystem.',
                icon: '🤝'
              },
              {
                title: 'Grow Together',
                description: 'Access resources and partners to accelerate your growth.',
                icon: '📈'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Contact Info */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Have questions? Reach out to us:</p>
            <a href="mailto:info@getlisted.africa" className="text-black font-medium hover:underline">info@getlisted.africa</a>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-8 px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-8 flex items-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="11" fill="black" />
                  <circle cx="12" cy="12" r="8" fill="white" />
                  <circle cx="12" cy="12" r="4" fill="black" />
                </svg>
                <span className="ml-2 font-bold">GetListed</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://instagram.com/getlistedAfrica" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://twitter.com/getlistedAfrica" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/getlistedAfrica" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-sm text-center md:text-left mt-4">
            © 2025 GetListed Technologies, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoonPage;