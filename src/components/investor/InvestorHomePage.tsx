import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import InvestorShowcase from '../components/investor/InvestorShowcase';
// import PromisedStartups from '../components/investor/PromisedStartups';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import investorDashboardPreview from '../../assets/dashboard.png';
import { Search, Filter, TrendingUp, PieChart, Users, Globe, ChevronRight, Bell } from 'lucide-react';

const InvestorHomePage: React.FC = () => {
  const [startupCount, setStartupCount] = useState(0);
  const targetCount = 2547;
  
  // Animation for startup count
  useEffect(() => {
    const interval = setInterval(() => {
      setStartupCount(prevCount => {
        if (prevCount < targetCount) {
          return prevCount + Math.ceil((targetCount - prevCount) / 10);
        }
        clearInterval(interval);
        return targetCount;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section with dark background for investors */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-20 px-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold mb-6">Discover High-Growth African Startups</h1>
              <p className="text-xl mb-8 text-indigo-100">
                GetListed provides you with vetted investment opportunities across Africa's most innovative ventures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/investor/register" className="bg-white text-indigo-900 px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-100 inline-flex items-center justify-center">
                  Join as Investor
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/investor/dashboard" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-white/10 inline-flex items-center justify-center">
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <img 
                  src={investorDashboardPreview} 
                  alt="Investor Dashboard Preview" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-indigo-700 mb-2">{startupCount.toLocaleString()}</div>
              <div className="text-gray-600">Startups</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-indigo-700 mb-2">54</div>
              <div className="text-gray-600">African Countries</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-indigo-700 mb-2">$245M+</div>
              <div className="text-gray-600">Raised through platform</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-indigo-700 mb-2">18.4%</div>
              <div className="text-gray-600">Avg. ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Where Would You Like to Invest?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our curated categories of high-potential African startups that match your investment criteria
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Fintech', icon: <PieChart className="h-8 w-8 mb-3 text-indigo-600" />, count: 356 },
              { name: 'Healthtech', icon: <Users className="h-8 w-8 mb-3 text-green-600" />, count: 213 },
              { name: 'Agritech', icon: <Globe className="h-8 w-8 mb-3 text-emerald-600" />, count: 189 },
              { name: 'E-commerce', icon: <TrendingUp className="h-8 w-8 mb-3 text-orange-600" />, count: 278 },
              { name: 'Clean Energy', icon: <TrendingUp className="h-8 w-8 mb-3 text-blue-600" />, count: 127 },
              { name: 'Edtech', icon: <Users className="h-8 w-8 mb-3 text-purple-600" />, count: 165 },
              { name: 'Logistics', icon: <Globe className="h-8 w-8 mb-3 text-red-600" />, count: 94 },
              { name: 'AI & ML', icon: <PieChart className="h-8 w-8 mb-3 text-gray-600" />, count: 142 }
            ].map((category) => (
              <Link 
                key={category.name}
                to={`/investor/startups?category=${category.name.toLowerCase()}`} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-transparent hover:border-indigo-500 flex flex-col items-center text-center"
              >
                {category.icon}
                <div className="text-xl font-medium text-gray-800">{category.name}</div>
                <div className="text-sm text-gray-500 mt-1">{category.count} startups</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/investor/startups" className="text-indigo-600 font-medium hover:text-indigo-800 inline-flex items-center">
              View all categories
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Investment Opportunities */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full mb-4">
              Featured Opportunities
            </div>
            <h2 className="text-3xl font-bold mb-4">Trending Startups This Week</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These high-potential ventures have been vetted by our team and are actively seeking investment
            </p>
          </div>
          {/* <PromisedStartups /> */}
          <div className="text-center mt-12">
            <Link to="/investor/opportunities" className="bg-emerald-600 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-700 inline-flex items-center">
              See All Opportunities
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The GetListed Investor Advantage</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Gain exclusive access to Africa's most promising startups with our comprehensive investor tools
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Due Diligence Reports',
                  description: 'Access detailed financial data, market analysis, and founder background checks on all listed startups.',
                  icon: <Filter className="h-12 w-12 text-indigo-500 mb-4" />
                },
                {
                  title: 'Direct Founder Access',
                  description: 'Connect directly with pre-vetted founders and schedule pitch meetings through our secure platform.',
                  icon: <Users className="h-12 w-12 text-indigo-500 mb-4" />
                },
                {
                  title: 'Portfolio Management',
                  description: 'Track your investments, receive milestone updates, and monitor startup growth metrics in real-time.',
                  icon: <PieChart className="h-12 w-12 text-indigo-500 mb-4" />
                },
                {
                  title: 'Deal Flow Alerts',
                  description: 'Get notified when new startups matching your investment criteria join the platform.',
                  icon: <Bell className="h-12 w-12 text-indigo-500 mb-4" />
                },
                {
                  title: 'Co-Investment Opportunities',
                  description: 'Join syndicate deals with other investors on our platform to diversify your portfolio.',
                  icon: <TrendingUp className="h-12 w-12 text-indigo-500 mb-4" />
                },
                {
                  title: 'Market Intelligence',
                  description: 'Access proprietary reports on emerging sectors and investment trends across the African continent.',
                  icon: <Globe className="h-12 w-12 text-indigo-500 mb-4" />
                },
              ].map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    {benefit.icon}
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investor Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Investors Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from investors who have found valuable opportunities through our platform
            </p>
          </div>
          {/* <InvestorShowcase /> */}
        </div>
      </section>

      {/* Search overlay */}
      <section className="py-16 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-6">Find Your Next Investment</h2>
              <p className="text-xl mb-8 text-indigo-100">
                Use our advanced search to filter startups by criteria that matter to you
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search by startup name, industry or location..." 
                      className="pl-10 w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <Link to="/investor/search">
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 whitespace-nowrap">
                    Advanced Search
                  </button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 mr-2">Popular searches:</span>
                {['Pre-seed', 'Fintech', 'Nigeria', 'Women-led', 'Clean Energy', 'Kenya'].map((tag) => (
                  <Link 
                    key={tag} 
                    to={`/investor/search?tag=${tag.toLowerCase()}`}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Investor Membership</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the plan that matches your investment strategy and needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Explorer',
                price: 'Free',
                features: [
                  'Basic startup directory access',
                  'Limited search filters',
                  'Public startup profiles',
                  'Monthly newsletter'
                ],
                button: 'Get Started',
                highlighted: false
              },
              {
                title: 'Professional',
                price: '$149/month',
                features: [
                  'Full startup directory access',
                  'Advanced search and filters',
                  'Due diligence reports',
                  'Direct messaging with founders',
                  'Deal flow alerts',
                  'Quarterly market insights'
                ],
                button: 'Join Pro',
                highlighted: true
              },
              {
                title: 'Institutional',
                price: 'Contact Us',
                features: [
                  'All Professional features',
                  'API access',
                  'Custom deal flow',
                  'Co-investment opportunities',
                  'Dedicated account manager',
                  'Early access to top startups'
                ],
                button: 'Request Info',
                highlighted: false
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  plan.highlighted 
                    ? 'transform-gpu -translate-y-4 border-2 border-indigo-500 shadow-xl' 
                    : 'border border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`p-6 ${plan.highlighted ? 'bg-indigo-500 text-white' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
                  <div className="text-3xl font-bold">{plan.price}</div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/investor/membership/${plan.title.toLowerCase()}`}>
                    <button 
                      className={`w-full py-3 rounded-md font-medium ${
                        plan.highlighted 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {plan.button}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-800 py-16 px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to discover Africa's next unicorn?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of investors already funding the future of African innovation through GetListed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/investor/register">
              <button className="bg-white text-indigo-900 px-8 py-3 rounded-md font-medium hover:bg-indigo-100 w-full sm:w-auto">
                Register as Investor
              </button>
            </Link>
            <Link to="/investor/demo">
              <button className="border-2 border-white bg-transparent text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 w-full sm:w-auto">
                Schedule Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default InvestorHomePage;