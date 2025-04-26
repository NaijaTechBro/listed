import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VerifyResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { isAuthenticated, verifyAndLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // If success with token, store it and auto-login
    const handleTokenLogin = async () => {
      if (status === 'success' && token) {
        try {
          setIsLoading(true);
          // Use the new verifyAndLogin method from context
          await verifyAndLogin(token);
        } catch (err) {
          console.error('Auto-login failed:', err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Auto-login failed. Please try logging in manually.');
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    handleTokenLogin();
  }, [status, token, verifyAndLogin]);
  
  // Redirect already authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="mb-6">Setting up your account...</p>
        </>
      );
    }
    
    if (error) {
      return (
        <>
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Error Logging In</h2>
          <p className="mb-6">{error}</p>
          <Link 
            to="/login" 
            className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
          >
            Go to Login
          </Link>
        </>
      );
    }
    
    switch (status) {
      case 'success':
        return (
          <>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Email Verified Successfully!</h2>
            <p className="mb-6">Your email has been successfully verified.</p>
            {isAuthenticated ? (
              <p>Redirecting you to your dashboard...</p>
            ) : (
              <Link 
                to="/login" 
                className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
              >
                Log In
              </Link>
            )}
          </>
        );
        
      case 'expired':
        return (
          <>
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Link Expired</h2>
            <p className="mb-6">This verification link has expired. Please request a new verification email.</p>
            <Link 
              to="/resend-verification" 
              className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
            >
              Request New Verification
            </Link>
          </>
        );
        
      case 'invalid':
      default:
        return (
          <>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
            <p className="mb-6">This verification link is invalid or has already been used.</p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
              <Link 
                to="/resend-verification" 
                className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
              >
                Request New Verification
              </Link>
              <Link 
                to="/login" 
                className="inline-block bg-white border border-black text-black py-2 px-6 rounded-md hover:bg-gray-50"
              >
                Back to Login
              </Link>
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="flex items-center justify-center mb-6">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="black" />
          <circle cx="12" cy="12" r="8" fill="white" />
          <circle cx="12" cy="12" r="4" fill="black" />
        </svg>
        <Link to="/"><span className="ml-2 font-bold text-xl">GetListed</span></Link>
      </div>
      <div className="bg-white p-8 shadow-md rounded-lg text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default VerifyResultPage;