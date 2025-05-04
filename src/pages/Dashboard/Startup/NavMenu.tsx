import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavMenuProps {
  // You can add any props that might be needed
}

const NavMenu: React.FC<NavMenuProps> = () => {
  const location = useLocation();
  
  const isSidebarLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto">
      {/* Main Navigation Links */}
      <div className="space-y-1">
        <Link
          to="/dashboard"
          className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
            isSidebarLinkActive('/dashboard')
              ? 'bg-gray-100 text-gray-900 font-medium'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </Link>
      </div>

      {/* STARTUP Section */}
      <div className="mt-8">
        <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">STARTUP</h3>
        <div className="mt-2 space-y-1">
          <Link
            to="/dashboard/add-startup"
            className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
              isSidebarLinkActive('/dashboard/add-startup')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span>Add Startup</span>
          </Link>
          
          <Link
            to="/dashboard/my-startups"
            className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
              isSidebarLinkActive('/dashboard/my-startups')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>My Startups</span>
          </Link>
        </div>
      </div>

      {/* TOOLS Section */}
      <div className="mt-8">
        <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">TOOLS</h3>
        <div className="mt-2 space-y-1">
          <Link
            to="/coming-soon"
            className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
              isSidebarLinkActive('/coming-soon')
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Pitch Deck</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;