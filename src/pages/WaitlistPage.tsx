import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const WaitlistPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log({ email, companyName, category });
    setSubmitted(true);
  };

  const categories = ['Fintech', 'Healthtech', 'Edtech', 'Agritech', 'E-commerce', 'Clean Energy', 'Logistics', 'AI & ML'];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white py-16 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6 max-w-4xl mx-auto">Join the GetListed Waitlist</h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Be among the first to get access when we launch. Sign up now to secure your spot.
        </p>
      </div>

      {/* Waitlist Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {!submitted ? (
            <>
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Get Early Access</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="companyName" className="block text-gray-700 mb-2 font-medium">Company Name</label>
                    <input 
                      type="text" 
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your Startup Name"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="category" className="block text-gray-700 mb-2 font-medium">Category</label>
                    <select 
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center"
                  >
                    Join the Waitlist
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <svg className="mx-auto mb-4 text-green-500" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10B981" />
                <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">You're on the list!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for joining our waitlist. We'll notify you when GetListed launches.
              </p>
              <Link to="/" className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Join GetListed?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Investor Access',
                description: 'Connect with a curated network of investors looking for African startups.',
                icon: '💼'
              },
              {
                title: 'Increased Visibility',
                description: 'Showcase your startup to a targeted audience of partners and supporters.',
                icon: '👁️'
              },
              {
                title: 'Exclusive Resources',
                description: 'Get early access to funding opportunities, events, and resources.',
                icon: '🚀'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">A Sneak Peek of What's Coming</h2>
          <div className="max-w-5xl mx-auto">
            <svg width="100%" height="100%" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
              {/* Main Dashboard Container */}
              <rect x="10" y="10" width="980" height="580" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
              
              {/* Sidebar */}
              <rect x="10" y="10" width="200" height="580" fill="#111827" rx="8 0 0 8" />
              
              {/* Sidebar Menu Items */}
              <rect x="30" y="80" width="160" height="40" rx="4" fill="#1F2937" />
              <rect x="50" y="95" width="100" height="10" rx="2" fill="#6B7280" />
              
              <rect x="30" y="130" width="160" height="40" rx="4" fill="transparent" />
              <rect x="50" y="145" width="120" height="10" rx="2" fill="#9CA3AF" />
              
              <rect x="30" y="180" width="160" height="40" rx="4" fill="transparent" />

              <rect x="50" y="195" width="80" height="10" rx="2" fill="#9CA3AF" />
              
              <rect x="30" y="230" width="160" height="40" rx="4" fill="transparent" />
              <rect x="50" y="245" width="110" height="10" rx="2" fill="#9CA3AF" />
              
              {/* Logo */}
              <rect x="40" y="30" width="120" height="30" rx="4" fill="#4F46E5" />
              <text x="55" y="52" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="white">GetListed</text>
              
              {/* Top Bar */}
              <rect x="210" y="10" width="780" height="60" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
              
              {/* Search Bar */}
              <rect x="230" y="25" width="300" height="30" rx="6" fill="white" stroke="#D1D5DB" strokeWidth="1" />
              <circle cx="250" cy="40" r="7" fill="none" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="255" y1="45" x2="260" y2="50" stroke="#9CA3AF" strokeWidth="2" />
              <text x="265" y="45" fontFamily="Arial" fontSize="12" fill="#9CA3AF">Search startups...</text>
              
              {/* Profile */}
              <circle cx="950" cy="40" r="20" fill="#E5E7EB" />
              <circle cx="950" cy="30" r="6" fill="#9CA3AF" />
              <path d="M935 55 A15 15 0 0 0 965 55" fill="#9CA3AF" />
              
              {/* Dashboard Title */}
              <text x="230" y="110" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#111827">Dashboard Overview</text>
              
              {/* Stats Cards */}
              <rect x="230" y="130" width="230" height="120" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
              <text x="250" y="160" fontFamily="Arial" fontSize="14" fill="#6B7280">Total Startups</text>
              <text x="250" y="200" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#111827">246</text>
              <rect x="390" y="170" width="40" height="40" rx="20" fill="#DEF7EC" />
              <path d="M400 190 L410 180 L420 200" stroke="#059669" strokeWidth="2" fill="none" />
              
              <rect x="480" y="130" width="230" height="120" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
              <text x="500" y="160" fontFamily="Arial" fontSize="14" fill="#6B7280">Connections</text>
              <text x="500" y="200" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#111827">52</text>
              <rect x="640" y="170" width="40" height="40" rx="20" fill="#E0F2FE" />
              <path d="M650 180 L660 200 L670 170" stroke="#0284C7" strokeWidth="2" fill="none" />
              
              <rect x="730" y="130" width="230" height="120" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
              <text x="750" y="160" fontFamily="Arial" fontSize="14" fill="#6B7280">Profile Views</text>
              <text x="750" y="200" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#111827">1,284</text>
              <rect x="890" y="170" width="40" height="40" rx="20" fill="#FEF3C7" />
              <path d="M900 190 L910 170 L920 180 L930 165" stroke="#D97706" strokeWidth="2" fill="none" />
              
              {/* Chart Area */}
              <rect x="230" y="270" width="730" height="300" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1" />
              <text x="250" y="300" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#111827">Monthly Activity</text>
              
              {/* Chart Lines */}
              <line x1="250" y1="520" x2="940" y2="520" stroke="#E5E7EB" strokeWidth="1" />
              <line x1="250" y1="330" x2="250" y2="520" stroke="#E5E7EB" strokeWidth="1" />
              
              {/* Chart Data */}
              <path d="M270 480 L350 460 L430 420 L510 440 L590 380 L670 350 L750 370 L830 340 L910 320" 
                    stroke="#4F46E5" strokeWidth="3" fill="none" />
              <path d="M270 480 L350 460 L430 420 L510 440 L590 380 L670 350 L750 370 L830 340 L910 320" 
                    stroke="transparent" fill="url(#gradientBlue)" />
              <path d="M270 500 L350 490 L430 470 L510 480 L590 450 L670 430 L750 440 L830 420 L910 410" 
                    stroke="#10B981" strokeWidth="3" fill="none" />
              <path d="M270 500 L350 490 L430 470 L510 480 L590 450 L670 430 L750 440 L830 420 L910 410" 
                    stroke="transparent" fill="url(#gradientGreen)" />
                    
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "When will GetListed launch?",
                answer: "We're targeting a launch in Q2 2025. Waitlist members will be the first to know and get early access."
              },
              {
                question: "Is there a cost to join GetListed?",
                answer: "We'll have both free and premium tiers. Waitlist members will receive special pricing on premium features."
              },
              {
                question: "What kind of startups can join?",
                answer: "GetListed is open to all African startups, from pre-seed to Series B and beyond. We welcome startups from all sectors and countries across the continent."
              },
              {
                question: "How do investors get verified?",
                answer: "We have a thorough verification process for investors that includes background checks and references to ensure they are legitimate and have the means to invest."
              },
              {
                question: "Can I update my startup profile after creating it?",
                answer: "Absolutely! We encourage startups to keep their profiles updated with the latest metrics, achievements, and funding needs."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-purple-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Early Testers Say</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "GetListed has helped us connect with investors we wouldn't have found otherwise. The platform is intuitive and focused on metrics that matter.",
                name: "Adeola Johnson",
                title: "Founder, TechAgri Solutions",
                avatar: "AJ"
              },
              {
                quote: "As an angel investor, I appreciate how GetListed vets startups and presents data in a clear, standardized format. It's saved me hours of research.",
                name: "Michael Kwame",
                title: "Angel Investor",
                avatar: "MK"
              },
              {
                quote: "The quality of connections we've made through GetListed's beta has exceeded our expectations. We've already secured meetings with two VCs.",
                name: "Sarah Ndiaye",
                title: "CEO, HealthConnect",
                avatar: "SN"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-gray-600 italic">"{testimonial.quote}"</div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Don't miss out on your spot</h2>
          <p className="text-xl mb-8">
            Spots on our waitlist are limited. Join now to secure early access and exclusive benefits.
          </p>
          <Link to="#waitlist-form" className="bg-white text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-200 inline-flex items-center">
            Join the Waitlist
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WaitlistPage;