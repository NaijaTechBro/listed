import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ResendVerificationPage: React.FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { resendVerification, isAuthenticated, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Initialize email from location state if available
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Clear auth errors when component unmounts
    return () => {
      if (error) clearError();
    };
  }, [isAuthenticated, navigate, error, clearError]);

  // Set form error if auth error exists
  useEffect(() => {
    if (error) {
      setFormError(error);
      setSuccessMessage('');
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    if (!email.trim()) {
      setFormError('Please enter your email address');
      return;
    }
    
    try {
      await resendVerification(email);
      setSuccessMessage('Verification email has been sent. Please check your inbox.');
      // Clear the form
      setEmail('');
    } catch (err) {
      // Error is handled in AuthContext and set to the error state
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
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Resend Verification Email</h2>
        
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {formError}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-black hover:text-gray-800">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResendVerificationPage;