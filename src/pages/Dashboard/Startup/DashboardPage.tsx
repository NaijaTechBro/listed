import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useStartup } from '../../../context/StartupContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { loading, getStartupsByUser, userStartups } = useStartup();
  const [stats, setStats] = useState({
    totalStartups: 0,
    pendingVerification: 0,
    views: 0,
    connections: 0
  });

  // Fetch user's startups when component mounts
  useEffect(() => {
    const fetchUserStartups = async () => {
      if (user?._id) {
        try {
          await getStartupsByUser();
        } catch (error) {
          console.error('Error fetching user startups:', error);
        }
      }
    };

    fetchUserStartups();
  }, [user, getStartupsByUser]);

  // Update stats based on user startups
  useEffect(() => {
    if (userStartups.length > 0) {
      setStats({
        totalStartups: userStartups.length,
        pendingVerification: userStartups.filter(s => !s.isVerified).length,
        views: userStartups.reduce((sum, startup) => sum + (startup.metrics?.views || 0), 0),
        connections: userStartups.reduce((sum, startup) => sum + (startup.metrics?.connections || 0), 0)
      });
    }
  }, [userStartups]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Get initial letter for avatar placeholder
  const getInitialLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'S';
  };

  // Format numbers
  const formatNumber = (num: number): string => {
    return num.toString();
  };

  // Status component
  const StatusBadge = ({ verified }: { verified: boolean }) => {
    return verified ? 
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Verified</span> :
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
  };

  // Determine background color for avatar
  const getAvatarBgColor = (index: number) => {
    const colors = ['bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-red-500', 'bg-indigo-500'];
    return colors[index % colors.length];
  };

  // New getLogoUrl function to handle different logo types
  const getLogoUrl = (logo: any): string => {
    // Default placeholder image
    const placeholderUrl = '/assets/images/placeholder-logo.svg';
    
    // If logo is undefined or null, return placeholder
    if (!logo) return placeholderUrl;
    
    // If logo is an object, try to access its url property
    if (typeof logo === 'object' && logo !== null) {
      // Safely access potential url property without assuming its existence
      return (logo as any).url || placeholderUrl;
    }
    
    // If logo is a string (direct URL), return it
    if (typeof logo === 'string') {
      return logo;
    }
    
    // Fallback to placeholder for any other unexpected types
    return placeholderUrl;
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome to GetListed, {user?.firstName || 'Founder'}🎉</h1>
        <p className="text-gray-600 mt-2">Here are your startup overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Startups */}
        <div className="bg-black text-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Startups</span>
            <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded-full">All</span>
          </div>
          <div className="text-3xl font-bold">{stats.totalStartups}</div>
        </div>

        {/* Profile Views */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Profile Views</span>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">30 Days</span>
          </div>
          <div className="text-3xl font-bold">{formatNumber(stats.views)}</div>
          <div className="text-red-500 text-sm mt-2">- Decreased 9.4% today</div>
        </div>

        {/* Connections */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Connections</span>
            <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">Total</span>
          </div>
          <div className="text-3xl font-bold">{formatNumber(stats.connections)}</div>
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
                <h3 className="font-medium text-gray-900 mb-2">Add Startup</h3>
                <p className="text-sm text-gray-500">List a new startup on GetListed</p>
              </div>
            </div>
          </Link>

          {/* Manage Startup */}
          <Link to="/dashboard/my-startups" className="block">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Manage Startup</h3>
                <p className="text-sm text-gray-500">Update your startup listings</p>
              </div>
            </div>
          </Link>

          {/* Browse Directory */}
          <Link to="/startups" className="block">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Browse Directory</h3>
                <p className="text-sm text-gray-500">Discover other African Startups</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Startups */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Your Recent Startups</h2>
          <Link to="/dashboard/my-startups" className="text-blue-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>

        {userStartups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="h-24 w-24 mx-auto mb-6 text-gray-400">
              <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No startups yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't added any startups to GetListed. Create your first one to get started!</p>
            <Link
              to="/dashboard/add-startup"
              className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Your First Startup
            </Link>
          </div>
        ) : (
          // Responsive table container with horizontal scrolling on mobile
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Startup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userStartups.map((startup, index) => (
                    <tr key={startup._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 flex-shrink-0 rounded-full ${getAvatarBgColor(index)} flex items-center justify-center text-white font-medium mr-3`}>
                            {startup.logo ? (
                              <img 
                                src={getLogoUrl(startup.logo)} 
                                alt={startup.name} 
                                className="h-10 w-10 rounded-full object-cover"
                                onError={(e) => {
                                  console.error(`Failed to load logo for ${startup.name}`);
                                  (e.target as HTMLImageElement).src = '/assets/images/placeholder-logo.svg';
                                }}
                              />
                            ) : (
                              getInitialLetter(startup.name)
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{startup.name}</div>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <svg className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="truncate max-w-[120px]">
                                {startup.city || ''}{startup.city && startup.country ? ', ' : ''}{startup.country || 'Location not specified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{startup.category || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge verified={startup.isVerified || false} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{startup.metrics?.views || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link to={`/startup-profile/${startup._id}`} className="p-1 text-blue-600 hover:text-blue-800">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link to={`/dashboard/edit-startup/${startup._id}`} className="p-1 text-green-600 hover:text-green-800">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;