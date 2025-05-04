










 import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useStartup } from '../../../context/StartupContext'; 
import { useVerification } from '../../../context/VerificationContext'; // Import VerificationContext

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { startups, loading, getStartups } = useStartup(); 
  const { status, isVerified } = useVerification(); // Get verification status from context
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use the getStartups method from context instead of direct API call
    getStartups();
  }, [getStartups]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      
      // Auto-open sidebar on large screens
      if (largeScreen && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (!isLargeScreen) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isLargeScreen]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  const isSidebarLinkActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Function to render verification button based on status
  const renderVerificationButton = () => {
    if (isVerified) {
      return (
        <div className="flex items-center justify-center px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-sm">
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Verified</span>
        </div>
      );
    }

    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center justify-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm">
            <svg className="h-4 w-4 mr-1.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Pending Review</span>
          </div>
        );
      case 'rejected':
        return (
          <Link 
            to="/request-verification" 
            className="flex items-center justify-center px-3 py-1.5 bg-red-50 text-red-700 rounded-md text-sm hover:bg-red-100 transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Re-submit Verification</span>
          </Link>
        );
      default:
        return (
          <Link 
            to="/request-verification" 
            className="flex items-center justify-center px-3 py-1.5 bg-amber-50 text-amber-700 rounded-md text-sm hover:bg-amber-100 transition-colors"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-medium">Request Verification</span>
          </Link>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Header with toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm h-16 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <div className="ml-4 flex items-center">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="11" fill="black" />
              <circle cx="12" cy="12" r="8" fill="white" />
              <circle cx="12" cy="12" r="4" fill="black" />
            </svg>
            <Link to="/">
              <span className="ml-2 font-bold text-lg">GetListed</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && !isLargeScreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-20 bg-white border-r border-gray-100 w-64 flex flex-col ${isLargeScreen ? 'lg:sticky' : 'lg:relative'}`}
      >
        {/* Top Logo Section */}
        <div className="px-6 py-6 flex items-center justify-between border-b border-gray-100">
               <div className="mr-4 sm:mr-8 flex items-center">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="11" fill="black" />
                        <circle cx="12" cy="12" r="8" fill="white" />
                        <circle cx="12" cy="12" r="4" fill="black" />
                      </svg>
                      <Link to="/">
                        <span className="ml-2 font-bold text-lg sm:text-xl">GetListed</span>
                      </Link>
                    </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="hidden sm:block px-6 py-5 border-b border-gray-100">
  <div className="flex items-center space-x-4">
    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
      {user?.firstName ? user.firstName.charAt(0) : 'U'}
    </div>
    <div>
      <p className="font-medium text-gray-900">{user?.firstName || 'User'}</p>
      <p className="text-sm text-gray-500 truncate max-w-[180px]">{user?.email || ''}</p>
    </div>
  </div>
</div>

                
        {/* Profile Section in Sidebar (only visible on mobile) */}
        <div className="border-t border-gray-100 mt-auto lg:hidden">
          <div 
            className="p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={toggleProfileDropdown}
          >
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="font-medium text-gray-700">{user?.firstName?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{user?.firstName || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
            </div>
            <svg 
              className={`h-4 w-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {/* Profile Dropdown for mobile */}
          {profileDropdownOpen && (
            <div className="bg-white border-t border-gray-100 py-1">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-500">Signed in as</p>
                <p className="font-medium text-sm truncate">{user?.email || ''}</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Upload Picture
              </button>
              <Link to="/dashboard/settings" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Themes
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
              >
                <svg className="h-4 w-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {/* Main Navigation Links */}
          <div className="space-y-1">
            <Link
              to="/investor/dashboard"
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                isSidebarLinkActive('/investor/dashboard')
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Overview</span>
            </Link>
          </div>

          {/* STARTUP Section */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">STARTUP</h3>
            <div className="mt-2 space-y-1">
              <Link
                to="/investor/dashboard/marketplace"
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                  isSidebarLinkActive('/investor/dashboard/marketplace')
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {/* Marketplace Icon */}
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11v6M15 11v6" />
                </svg>
                <span>MarketPlace</span>
              </Link>
              
              <Link
                to="/investor/dashboard/founder"
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                  isSidebarLinkActive('/investor/dashboard/founder')
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {/* Founders Icon */}
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Founders</span>
              </Link>
            </div>
          </div>

        
          {/* TOOLS Section */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">TOOLS</h3>
            <div className="mt-2 space-y-1">
              <Link
                to="/investor/dashboard/deals-room"
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                  isSidebarLinkActive('/investor/dashboard/deals-room')
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {/* Deals Icon */}
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-6" />
                </svg>
                <span>Deals</span>
              </Link>
            </div>
            <div className="mt-2 space-y-1">
              <Link
                to="/coming-soon"
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                  isSidebarLinkActive('/coming-soon')
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {/* Portfolio Icon */}
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Portfolio</span>
              </Link>
            </div>
            <div className="mt-2 space-y-1">
              <Link
                to="/coming-soon"
                className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                  isSidebarLinkActive('/coming-soon')
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {/* Watchlist Icon */}
                <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>WatchList</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pt-0 lg:pt-0">
        {/* Mobile padding for fixed header */}
        <div className="lg:hidden h-16"></div>
        
        {/* Top bar for larger screens */}
        <div className="hidden lg:flex items-center justify-between bg-white border-b border-gray-100 px-6 py-3">
          <div className="flex-1">
            <div className="relative w-96"> {/* Increased width from w-64 to w-96 */}
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
              <svg className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dynamic verification button based on status */}
            {renderVerificationButton()}
            
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile Picture on top bar with dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <div 
                className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-700 font-medium">
                    {user?.firstName?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown on top bar */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded-md py-1 z-10 w-56">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="font-medium text-sm truncate">{user?.email || ''}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Upload Picture
                  </button>
                  <Link to="/dashboard/settings" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">


                  <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     Settings
                   </Link>
                   <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                     <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                     </svg>
                     Themes
                   </button>
                   <div className="border-t border-gray-100 my-1"></div>
                   <button 
                     onClick={handleLogout}
                     className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                   >
                     <svg className="h-4 w-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                     </svg>
                     Logout
                   </button>
                 </div>
               )}
            </div>
          </div>
      
 </div>
        
         <div className="container mx-auto px-4 py-6">
           <Outlet context={{ userStartups: startups, fetchUserStartups: getStartups, loading }} />
         </div>
       </div>
     </div>
   );
 };

 export default Sidebar;


