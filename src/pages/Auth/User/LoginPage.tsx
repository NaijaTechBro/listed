import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  
  const { login, isAuthenticated, loading, error, clearError, userRole } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated based on role
  useEffect(() => {
    if (isAuthenticated) {
      // Role-based navigation
      switch (userRole) {
        case 'investor':
          navigate('/investor/dashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
        case 'founder':
          navigate('/dashboard');
          break;
        default:
          // Fallback for any other role or if role is not set
          navigate('/dashboard');
      }
    }
    
    // Clear auth errors when component unmounts
    return () => {
      if (error) clearError();
    };
  }, [isAuthenticated, navigate, error, clearError, userRole]);

  // Set form error if auth error exists and check for unverified email
  useEffect(() => {
    if (error) {
      setFormError(error);
      
      // More comprehensive check for email verification errors
      // Check for common patterns in verification error messages
      const verificationErrorPatterns = [
        'verify your email',
        'email not verified',
        'verification required',
        'needs verification',
        'please verify'
      ];
      
      const isVerificationError = verificationErrorPatterns.some(pattern => 
        error.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (isVerificationError) {
        setUnverifiedEmail(email);
      } else {
        setUnverifiedEmail('');
      }
    }
  }, [error, email]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setUnverifiedEmail('');
    
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      // Login successful, redirect will happen via the useEffect
    } catch (err) {
      // Error is handled in AuthContext and set to the error state
      // No need to set formError here as it's done in the useEffect
    }
  };

  const handleResendVerification = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/resend-verification', { state: { email: unverifiedEmail } });
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
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        
        {formError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {formError}
            {unverifiedEmail && (
              <div className="mt-2">
                <span>Didn't receive verification email? </span>
                <button
                  onClick={handleResendVerification}
                  className="text-black hover:text-gray font-medium"
                >
                  Click here to resend
                </button>
              </div>
            )}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button 
                type="button" 
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-black border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <Link to="/forgot-password" className="text-sm text-black hover:text-gray-800">
              Forgot password?
            </Link>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-black hover:text-gray-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;