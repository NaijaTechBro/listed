import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useVerification } from '../../../context/VerificationContext';
import ProfilePictureUploader from './ProfilePictureUploader';

interface HeaderProps {
  isLargeScreen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLargeScreen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { status, isVerified } = useVerification();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleUploadModal = () => {
    setUploadModalOpen(!uploadModalOpen);
    setProfileDropdownOpen(false);
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
    <>
      {/* Mobile Header */}
      {!isLargeScreen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-2 hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
      )}

      {/* Desktop Header */}
      {isLargeScreen && (
        <div className="hidden lg:flex items-center justify-between bg-white border-b border-gray-100 px-6 py-3">
          <div className="flex-1">
            <div className="relative w-96">
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
            
            {/* Profile Picture Dropdown */}
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
              
              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded-md py-1 z-10 w-56">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="font-medium text-sm truncate">{user?.email || ''}</p>
                  </div>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={toggleUploadModal}
                  >
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
      )}

      {/* Profile Picture Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Update Profile Picture</h3>
              <button 
                onClick={toggleUploadModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <ProfilePictureUploader />
            </div>
            <div className="flex justify-end">
              <button 
                onClick={toggleUploadModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;