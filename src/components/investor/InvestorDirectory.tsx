// client/src/pages/InvestorDirectory.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define Investor type 
interface Investor {
  _id: string;
  userId: string;
  name: string;
  position: string;
  organization: string;
  bio: string;
  profileImage?: string;
  investmentFocus: string[];
  preferredStages: string[];
  preferredSectors: string[];
  preferredCountries: string[];
  minInvestmentRange: number;
  maxInvestmentRange: number;
  contactDetails: {
    email?: string;
    phone?: string;
    website?: string;
  };
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
  };
  portfolio: Array<{
    startupId?: string;
    startupName: string;
    investmentStage: string;
    investmentDate: string;
    description?: string;
  }>;
}

// Mock data for investors
const mockInvestors: Investor[] = [
  {
    _id: '1',
    userId: 'user1',
    name: 'Jessica Anderson',
    position: 'Managing Partner',
    organization: 'Horizon Ventures',
    bio: 'Serial entrepreneur turned investor with a passion for tech innovations that address real-world problems. I focus on early-stage startups with strong technical foundations and clear market opportunities.',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    investmentFocus: ['B2B SaaS', 'Enterprise Software', 'Deep Tech'],
    preferredStages: ['Seed', 'Series A'],
    preferredSectors: ['Fintech', 'Healthtech', 'Climate Tech', 'AI & ML'],
    preferredCountries: ['United States', 'Canada', 'United Kingdom', 'Germany'],
    minInvestmentRange: 250000,
    maxInvestmentRange: 2000000,
    contactDetails: {
      email: 'jessica@horizonventures.com',
      phone: '+1-555-123-4567',
      website: 'https://www.horizonventures.com'
    },
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/jessicaanderson',
      twitter: 'https://twitter.com/jessanderson'
    },
    portfolio: [
      {
        startupId: '101',
        startupName: 'NeuraTech',
        investmentStage: 'Seed',
        investmentDate: '2023-05-10T00:00:00.000Z',
        description: 'AI-driven medical diagnostics platform'
      },
      {
        startupId: '102',
        startupName: 'EcoGrid',
        investmentStage: 'Series A',
        investmentDate: '2022-11-22T00:00:00.000Z',
        description: 'Smart energy management system for commercial buildings'
      }
    ]
  },
  {
    _id: '2',
    userId: 'user2',
    name: 'Michael Chen',
    position: 'Principal',
    organization: 'BlueOcean Capital',
    bio: 'Technology investor with 15+ years experience in scaling SaaS businesses. Previously founded two tech startups and served as CTO for a Y Combinator alum.',
    profileImage: 'https://randomuser.me/api/portraits/men/36.jpg',
    investmentFocus: ['SaaS', 'Marketplace', 'Consumer Tech'],
    preferredStages: ['Pre-seed', 'Seed'],
    preferredSectors: ['E-commerce', 'EdTech', 'PropTech', 'Logistics'],
    preferredCountries: ['United States', 'Singapore', 'Australia', 'Israel'],
    minInvestmentRange: 100000,
    maxInvestmentRange: 1000000,
    contactDetails: {
      email: 'mchen@blueocean.vc',
      phone: '+1-555-987-6543',
      website: 'https://www.blueocean.vc'
    },
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/mchen_vc'
    },
    portfolio: [
      {
        startupId: '201',
        startupName: 'LearnLoop',
        investmentStage: 'Pre-seed',
        investmentDate: '2023-02-05T00:00:00.000Z',
        description: 'Adaptive learning platform for K-12 education'
      }
    ]
  },
  {
    _id: '3',
    userId: 'user3',
    name: 'Sarah Johnson',
    position: 'Investment Director',
    organization: 'TechFund Africa',
    bio: 'Passionate about supporting entrepreneurs across Africa. I seek innovative solutions to local challenges with global potential.',
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    investmentFocus: ['Impact Tech', 'Consumer Tech', 'Infrastructure'],
    preferredStages: ['Seed', 'Series A'],
    preferredSectors: ['Fintech', 'Agritech', 'Healthtech', 'Clean Energy'],
    preferredCountries: ['Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Rwanda'],
    minInvestmentRange: 150000,
    maxInvestmentRange: 1500000,
    contactDetails: {
      email: 'sarah@techfundafrica.com',
      phone: '+254-700-123-456',
      website: 'https://www.techfundafrica.com'
    },
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahj_investor'
    },
    portfolio: [
      {
        startupId: '301',
        startupName: 'PayFast',
        investmentStage: 'Seed',
        investmentDate: '2023-07-12T00:00:00.000Z', 
        description: 'Mobile payment solution for African markets'
      },
      {
        startupId: '302',
        startupName: 'Agri-Connect',
        investmentStage: 'Series A',
        investmentDate: '2022-09-08T00:00:00.000Z',
        description: 'Platform connecting farmers to markets and resources'
      }
    ]
  },
  {
    _id: '4',
    userId: 'user4',
    name: 'Ahmed Hassan',
    position: 'Founding Partner',
    organization: 'MENA Ventures',
    bio: 'Focused on backing exceptional founders building innovative solutions for the Middle East and North Africa region.',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    investmentFocus: ['Regional Solutions', 'Tech Enablement', 'B2C'],
    preferredStages: ['Pre-seed', 'Seed', 'Series A'],
    preferredSectors: ['Logistics', 'E-commerce', 'Fintech', 'Edtech'],
    preferredCountries: ['Egypt', 'UAE', 'Saudi Arabia', 'Jordan', 'Morocco'],
    minInvestmentRange: 200000,
    maxInvestmentRange: 2500000,
    contactDetails: {
      email: 'ahmed@menaventures.com',
      phone: '+20-100-123-4567',
      website: 'https://www.menaventures.com'
    },
    socialProfiles: {
      linkedin: 'https://www.linkedin.com/in/ahmedhassan',
      twitter: 'https://twitter.com/ahmedhassan_vc'
    },
    portfolio: [
      {
        startupId: '401',
        startupName: 'DeliverNow',
        investmentStage: 'Series A',
        investmentDate: '2023-03-15T00:00:00.000Z',
        description: 'Last-mile delivery platform for urban centers'
      }
    ]
  }
];

// Available filter options
const sectorOptions = ['Fintech', 'Healthtech', 'Edtech', 'Agritech', 'E-commerce', 'Clean Energy', 'Logistics', 'AI & ML', 'PropTech', 'Climate Tech'];
const countryOptions = ['Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana', 'Rwanda', 'Ethiopia', 'Senegal', 'United States', 'United Kingdom', 'UAE', 'Canada', 'Germany', 'Singapore', 'Australia', 'Israel', 'Saudi Arabia', 'Jordan', 'Morocco'];
const stageOptions = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Later Stage', 'All Stages'];

const InvestorCard: React.FC<{ investor: Investor }> = ({ investor }) => {
  return (
    <Link to={`/investor/${investor._id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow">
        <div className="p-5">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden flex-shrink-0 mr-3">
              <img 
                src={investor.profileImage || '/assets/images/placeholder-avatar.svg'} 
                alt={investor.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/placeholder-avatar.svg';
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{investor.name}</h3>
              <p className="text-sm text-gray-600">{investor.position} at {investor.organization}</p>
            </div>
          </div>
          
          <div className="mb-4 border-b border-gray-100 pb-4">
            <p className="text-gray-600 text-sm line-clamp-2">
              {investor.bio}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {investor.preferredSectors.slice(0, 2).map((sector, index) => (
              <span key={index} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                {sector}
              </span>
            ))}
            {investor.preferredSectors.length > 2 && (
              <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                +{investor.preferredSectors.length - 2} more
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {investor.preferredStages.slice(0, 2).map((stage, index) => (
              <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                {stage}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const InvestorDirectory: React.FC = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    sector: '',
    stage: '',
    country: '',
    searchTerm: ''
  });

  useEffect(() => {
    fetchInvestors();
  }, []);

  // Mock implementation of the API call
  const fetchInvestors = () => {
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Filter the mock data based on search criteria
        let filteredInvestors = [...mockInvestors];
        
        if (filters.searchTerm) {
          const searchTermLower = filters.searchTerm.toLowerCase();
          filteredInvestors = filteredInvestors.filter(investor => 
            investor.name.toLowerCase().includes(searchTermLower) ||
            investor.organization.toLowerCase().includes(searchTermLower) ||
            investor.bio.toLowerCase().includes(searchTermLower)
          );
        }
        
        if (filters.sector) {
          filteredInvestors = filteredInvestors.filter(investor => 
            investor.preferredSectors.some(sector => 
              sector.toLowerCase() === filters.sector.toLowerCase())
          );
        }
        
        if (filters.country) {
          filteredInvestors = filteredInvestors.filter(investor => 
            investor.preferredCountries.some(country => 
              country.toLowerCase() === filters.country.toLowerCase())
          );
        }
        
        if (filters.stage && filters.stage !== 'All Stages') {
          filteredInvestors = filteredInvestors.filter(investor => 
            investor.preferredStages.some(stage => 
              stage === filters.stage)
          );
        }
        
        setInvestors(filteredInvestors);
      } catch (error) {
        console.error('Error filtering investors:', error);
        setInvestors([]);
      } finally {
        setLoading(false);
      }
    }, 600); // Simulate network delay of 600ms
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInvestors();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Investor Directory</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search investors..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div>
              <select
                name="sector"
                value={filters.sector}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Sectors</option>
                {sectorOptions.map(sector => (
                  <option key={sector} value={sector.toLowerCase()}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Countries</option>
                {countryOptions.map(country => (
                  <option key={country} value={country.toLowerCase()}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                name="stage"
                value={filters.stage}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Stages</option>
                {stageOptions.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="md:hidden mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </form>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              {investors.length} {investors.length === 1 ? 'investor' : 'investors'} found
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investors.map((investor) => (
                <InvestorCard key={investor._id} investor={investor} />
              ))}
            </div>
            
            {investors.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-medium text-gray-600 mb-2">No investors found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorDirectory;