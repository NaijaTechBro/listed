import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ResendVerificationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { resendVerification, error, clearError } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setStatus('loading');
    
    try {
      const response = await resendVerification(email);
      setStatus('success');
      setMessage(response.message || 'Verification email has been sent to your inbox.');
    } catch (err) {
      setStatus('error');
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('Failed to send verification email. Please try again later.');
      }
    }
  };
  
  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Email Sent!</h2>
            <p className="mb-6">{message}</p>
            <Link 
              to="/login" 
              className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
            >
              Back to Login
            </Link>
          </>
        );
        
      case 'error':
        return (
          <>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
            <p className="mb-6">{message || error}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="inline-block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
            >
              Try Again
            </button>
          </>
        );
      
      case 'loading':
        return (
          <>
            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Sending Verification Email</h2>
            <p className="mb-6">Please wait...</p>
          </>
        );
        
      case 'idle':
      default:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Resend Verification Email</h2>
            <p className="mb-6">Enter your email address to receive a new verification link.</p>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
              >
                Send Verification Link
              </button>
            </form>
            <div className="flex justify-center">
              <Link 
                to="/login" 
                className="text-black hover:underline"
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

export default ResendVerificationPage;