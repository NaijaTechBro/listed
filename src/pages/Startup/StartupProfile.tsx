import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStartup } from '../../context/StartupContext';
import { formatDate } from '../../utils/helpers';
import Navbar from '../../components/common/Navbar';

const StartupProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    startup, 
    loading, 
    error, 
    getStartup, 
    clearStartup,
    deleteStartup,
    clearStartupError
  } = useStartup();
  
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Handle logo URL with proper type checking
  const getLogoUrl = (logo: any): string => {
    if (!logo) return '/assets/images/placeholder-logo.svg';
    
    // If logo is an object with url property
    if (typeof logo === 'object' && logo !== null && 'url' in logo) {
      return logo.url as string;
    }
    
    // If logo is a string (direct URL)
    if (typeof logo === 'string') {
      return logo;
    }
    
    return '/assets/images/placeholder-logo.svg';
  };

  // Function to get the correct social media icon based on platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        );
      case 'twitter':
      case 'x':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.058 2.71.123 3.976 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.047 1.37-.058 4.04-.058zm0 3.063a5.136 5.136 0 100 10.27 5.136 5.136 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2.3C.172 2.3 0 3.174 0 10s.172 7.7 10 7.7 10-.874 10-7.7-.172-7.7-10-7.7zm3.205 8.034l-4.49 2.096c-.393.182-.715-.022-.715-.456V8.026c0-.433.322-.638.715-.456l4.49 2.096c.393.183.393.485 0 .668z" />
          </svg>
        );
      default:
        // Default social icon
        return (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Function to fetch startup with retry logic
  const fetchStartupWithRetry = useCallback(async () => {
    if (!id) return;
    
    setIsRetrying(true);
    setLocalError(null);
    
    try {
      await getStartup(id);
      setIsRetrying(false);
    } catch (err: any) {
      console.error('Error fetching startup details:', err);
      setIsRetrying(false);
      
      // Set a user-friendly error message
      if (err.message === 'Network Error') {
        setLocalError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setLocalError(err.response?.data?.message || 'Failed to load startup details.');
      }
    }
  }, [id, getStartup]);

  // Initial fetch on component mount
  useEffect(() => {
    if (id) {
      fetchStartupWithRetry();
    }
    
    // Clean up by clearing startup data when component unmounts
    return () => {
      clearStartup();
      clearStartupError();
    };
  }, [id, fetchStartupWithRetry, clearStartup, clearStartupError]);

  // Retry mechanism when the button is clicked
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchStartupWithRetry();
  };

  // Check if the current user is the owner of this startup
  const isOwner = user && startup && user._id === startup.createdBy;

  // Handle delete action
  const handleDeleteConfirm = async () => {
    if (!id) return;
    
    try {
      await deleteStartup(id);
      setShowDeleteModal(false);
      navigate('/startups', { state: { message: 'Startup deleted successfully' } });
    } catch (err: any) {
      console.error('Error deleting startup:', err);
      if (err.message === 'Network Error') {
        setLocalError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setLocalError(err.response?.data?.message || 'Failed to delete startup.');
      }
    }
  };

  // Format funding amount for display
  const formatFunding = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  // Loading state
  if (loading || isRetrying) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 text-base">
          {isRetrying ? 'Retrying connection...' : 'Loading startup details...'}
        </p>
      </div>
    );
  }

  // Error state
  if (error || localError || !startup) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 p-6 rounded-lg text-center shadow">
          <div>
            <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Oops!</h2>
          <p className="text-red-700 mb-4">{localError || error || 'Startup not found'}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <button 
              onClick={handleRetry}
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors shadow"
            >
              Retry Loading
            </button>
            
            <Link 
              to="/startups" 
              className="bg-white text-indigo-600 border border-indigo-600 py-2 px-4 rounded hover:bg-indigo-50 transition-colors inline-block shadow"
            >
              Back to Directory
            </Link>
          </div>
          
          {retryCount > 0 && (
            <p className="text-sm text-gray-600 mt-6">
              If the problem persists, the server might be down or experiencing issues. Please try again later.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Sort funding rounds by date (newest first)
  const sortedFundingRounds = startup.fundingRounds 
    ? [...startup.fundingRounds].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ) 
    : [];

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 mr-4 border border-gray-200">
                <img 
                  src={getLogoUrl(startup.logo)}
                  alt={startup.name} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/placeholder-logo.svg';
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
                <div className="flex text-gray-500 text-sm">
                  <span>{startup.city ? `${startup.city}, ` : ''}{startup.country}</span>
                  {startup.foundingDate && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Founded {new Date(startup.foundingDate).getFullYear()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {isOwner && (
              <div className="flex space-x-3">
                <Link 
                  to={`/dashboard/edit-startup/${startup._id}`} 
                  className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded hover:bg-red-50 transition-colors font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {startup.category && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                {startup.category}
              </span>
            )}
            {startup.subCategory && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                {startup.subCategory}
              </span>
            )}
            {startup.stage && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                {startup.stage}
              </span>
            )}
          </div>
          
          {startup.tagline && (
            <p className="text-lg text-gray-700 mt-4 italic">
              {startup.tagline}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            {startup.website && (
              <a 
                href={startup.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-black hover:text-gray text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Website
              </a>
            )}
            
            {startup.socialProfiles && Object.entries(startup.socialProfiles).map(([platform, url]) => {
              if (!url) return null;
              
              return (
                <a 
                  key={platform}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-black hover:text-gray text-sm"
                >
                  {getSocialIcon(platform)}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4 text-gray-900">About</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{startup.description}</p>
              </div>
            </div>
            
            {/* Team */}
            {startup.founders && startup.founders.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-lg font-bold mb-4 text-gray-900">Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {startup.founders.map((founder, index) => (
                    <div 
                      key={index} 
                      className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                        {founder.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{founder.name}</h3>
                        {founder.role && (
                          <p className="text-indigo-600 text-sm font-medium">{founder.role}</p>
                        )}
                        {founder.bio && (
                          <p className="text-gray-600 text-xs mt-1">{founder.bio}</p>
                        )}
                        {founder.linkedin && (
                          <a 
                            href={founder.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center mt-1"
                          >
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                            </svg>
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Funding Rounds */}
            {sortedFundingRounds.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-lg font-bold mb-4 text-gray-900">Funding History</h2>
                <div className="space-y-4">
                  {sortedFundingRounds.map((round, index) => (
                    <div 
                      key={index} 
                      className="border-l-2 border-indigo-500 pl-4 py-2"
                    >
                      <div className="flex justify-between items-start flex-wrap">
                        <span className="text-sm font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mb-1">{round.stage} Round</span>
                        <span className="text-gray-500 text-xs">{formatDate(round.date)}</span>
                      </div>
                      <p className="text-base font-bold text-gray-900 my-1">
                        ${(round.amount / 1000000).toFixed(2)}M
                        {round.valuation && (
                          <span className="text-xs font-normal text-gray-500 ml-2">
                            at ${(round.valuation / 1000000).toFixed(1)}M valuation
                          </span>
                        )}
                      </p>
                      {round.investors && round.investors.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs font-medium text-gray-600">Investors:</p>
                          <p className="text-xs text-gray-700">{round.investors.join(', ')}</p>
                        </div>
                      )}
                      {round.notes && (
                        <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">{round.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )} 
            {/* Products Section */}
            {startup.products && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-lg font-bold mb-4 text-gray-900">Products & Services</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{startup.products}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metrics */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Metrics</h2>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Funding Total</p>
                  <p className="text-base font-semibold text-gray-900">
                    {startup.metrics?.fundingTotal > 0 
                      ? formatFunding(startup.metrics.fundingTotal)
                      : 'Not disclosed'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Employees</p>
                  <p className="text-base font-semibold text-gray-900">{startup.metrics?.employees || 'Not disclosed'}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Revenue Range</p>
                  <p className="text-base font-semibold text-gray-900">{startup.metrics?.revenue ? `$${startup.metrics.revenue}` : 'Not disclosed'}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Connections</p>
                  <p className="text-base font-semibold text-gray-900">{startup.metrics?.connections || 0}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-1">Profile Views</p>
                  <p className="text-base font-semibold text-gray-900">{startup.metrics?.views || 0}</p>
                </div>
              </div>
            </div>
            
            {/* Contact */}
            <div className="bg-black rounded-lg shadow p-6 border border-black text-white">
              <h2 className="text-lg font-bold mb-3">Contact</h2>
              <p className="text-indigo-100 text-sm mb-4">
                Interested in connecting with {startup.name}?
              </p>
              <button className="w-full bg-white text-black py-2 px-4 rounded hover:bg-gray-50 transition-colors font-medium text-sm">
                Request Introduction
              </button>
            </div>
            
            {/* Similar Startups */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Similar Startups</h2>
              <div className="bg-gray-50 rounded p-4 text-center border border-gray-200">
                <p className="text-gray-500 text-sm">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex justify-center mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6 text-center text-sm">
              Are you sure you want to delete <span className="font-semibold">{startup.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default StartupProfile;