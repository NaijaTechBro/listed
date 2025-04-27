import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStartup } from '../../context/StartupContext';
import { motion, AnimatePresence } from 'framer-motion';

const MyStartups: React.FC = () => {
  const { 
    userStartups, 
    loading, 
    deleteStartup, 
    getStartupsByUser 
  } = useStartup();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [startupToDelete, setStartupToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Fetch user startups on component mount
  useEffect(() => {
    getStartupsByUser();
  }, [getStartupsByUser]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const openDeleteModal = (startup_id: string) => {
    setStartupToDelete(startup_id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setStartupToDelete(null);
  };

  const handleDeleteStartup = async () => {
    if (!startupToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteStartup(startupToDelete);
      await getStartupsByUser();
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting startup:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredStartups = userStartups.filter(startup => 
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (startup.category && startup.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (startup.country && startup.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get initial letter for avatar placeholder
  const getInitialLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'S';
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

  // Status component
  const StatusBadge = ({ verified }: { verified: boolean }) => {
    return verified ? 
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Verified</span> :
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 bg-gray-50"
    >
      <motion.div 
        variants={itemVariants}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">My Startups</h1>
          <p className="text-gray-600 mt-2">Manage your startup listings on GetListed</p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to="/dashboard/add-startup"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Startup
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8"
      >
        <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
          <div className="relative rounded-md shadow-sm max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search startups by name, category or country..."
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className="h-8 w-8 bg-white rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ) : filteredStartups.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              {searchTerm ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-16 w-16 mx-auto mb-4 text-gray-400">
                    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No startups found</h3>
                  <p className="text-gray-500 mx-auto max-w-xs">No results match your search criteria. Try adjusting your search terms.</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear search
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-24 w-24 mx-auto mb-6 text-gray-400">
                    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No startups yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">Get started by adding your first startup to showcase on GetListed</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/dashboard/add-startup"
                      className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Your First Startup
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop view - Table */}
              <table className="w-full hidden md:table">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Startup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Metrics</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStartups.map((startup, index) => (
                    <motion.tr 
                      key={startup._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
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
                              <span className="truncate max-w-xs">
                                {startup.city || ''}{startup.city && startup.country ? ', ' : ''}{startup.country || 'Location not specified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {startup.category && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            {startup.category}
                          </span>
                        )}
                        {startup.stage && (
                          <div className="mt-1 text-xs text-gray-500 flex items-center">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            {startup.stage}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {startup.country || 'Not specified'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge verified={startup.isVerified || false} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {startup.metrics?.views || 0} views
                          </div>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {startup.metrics?.connections || 0} connections
                          </div>
                        </div>
                      </td>
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
                          <button 
                            onClick={() => openDeleteModal(startup._id)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile view - Cards */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredStartups.map((startup, index) => (
                  <motion.div 
                    key={startup._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full ${getAvatarBgColor(index)} flex items-center justify-center text-white font-medium mr-3`}>
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
                          <div className="font-medium text-gray-900">{startup.name}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <svg className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate max-w-xs">
                              {startup.city || ''}{startup.city && startup.country ? ', ' : ''}{startup.country || 'Location not specified'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <StatusBadge verified={startup.isVerified || false} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <div className="mt-1">
                          {startup.category && (
                            <span className="px-2 py-1 inline-flex text-xs leading-4 font-medium rounded-full bg-gray-100 text-gray-800">
                              {startup.category}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Stage:</span>
                        <div className="mt-1 text-gray-800">
                          {startup.stage || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Views:</span>
                        <div className="mt-1 text-gray-800 flex items-center">
                          <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {startup.metrics?.views || 0}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Connections:</span>
                        <div className="mt-1 text-gray-800 flex items-center">
                          <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {startup.metrics?.connections || 0}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <Link
                        to={`/startup-profile/${startup._id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center text-sm font-medium"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Profile
                      </Link>
                      <Link
                        to={`/dashboard/edit-startup/${startup._id}`}
                        className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <button 
                        onClick={() => openDeleteModal(startup._id)}
                        className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete

                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Startup</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this startup? This action cannot be undone and all associated data will be permanently removed.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteStartup} 
                >
                  {isDeleting ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"></path>
                    </svg>
                  ) : (
                    'Delete'
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDeleteModal}
                >
                  Cancel    
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MyStartups;
