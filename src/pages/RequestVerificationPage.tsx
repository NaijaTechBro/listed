import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const RequestVerificationPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    isRoleVerified: false,
    roleVerificationStatus: '',
    roleVerificationSubmittedAt: null,
    roleVerificationApprovedAt: null,
    roleVerificationRejectedAt: null,
    roleVerificationRejectionReason: ''
  });
  const [files, setFiles] = useState({
    idDocument: null,
    businessRegistration: null,
    proofOfAddress: null,
    additionalDocuments: []
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch current verification status
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user?._id) return;
      
      try {
        setLoading(true);
        const response = await axios.get('/api/verification/status');
        setVerificationStatus(response.data.data);
      } catch (error) {
        console.error('Error fetching verification status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, [user]);

  // Check if user is eligible for verification
  const isEligible = () => {
    return user?.role === 'founder' || user?.role === 'investor';
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    
    if (name === 'additionalDocuments') {
      // Handle multiple files for additional documents
      setFiles(prev => ({
        ...prev,
        [name]: Array.from(selectedFiles)
      }));
    } else {
      // Handle single file
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0] || null
      }));
    }
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!files.idDocument) {
      newErrors['idDocument'] = 'ID document is required';
    }
    
    if (user?.role === 'founder' && !files.businessRegistration) {
      newErrors['businessRegistration'] = 'Business registration document is required for founders';
    }
    
    if (!files.proofOfAddress) {
      newErrors['proofOfAddress'] = 'Proof of address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create form data
      const formData = new FormData();
      
      // Append files to form data
      if (files.idDocument) {
        formData.append('idDocument', files.idDocument);
      }
      
      if (files.businessRegistration) {
        formData.append('businessRegistration', files.businessRegistration);
      }
      
      if (files.proofOfAddress) {
        formData.append('proofOfAddress', files.proofOfAddress);
      }
      
      // Append additional documents if any
      if (files.additionalDocuments.length > 0) {
        files.additionalDocuments.forEach(file => {
          formData.append('additionalDocuments', file);
        });
      }
      
      // Send request
      const response = await axios.post('/api/verification/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Handle success
      setSuccessMessage(response.data.message);
      
      // Refresh verification status
      const statusResponse = await axios.get('/api/verification/status');
      setVerificationStatus(statusResponse.data.data);
      
      // Reset form
      setFiles({
        idDocument: null,
        businessRegistration: null,
        proofOfAddress: null,
        additionalDocuments: []
      });
    } catch (error) {
      console.error('Error submitting verification:', error);
      
      // Handle specific error messages from API
      if (error.response?.data?.message) {
        setErrors({ form: error.response.data.message });
      } else {
        setErrors({ form: 'Something went wrong. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render status section based on current verification status
  const renderStatusSection = () => {
    const { roleVerificationStatus } = verificationStatus;
    
    if (roleVerificationStatus === 'pending') {
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">Verification in progress.</span> Your documents were submitted on {formatDate(verificationStatus.roleVerificationSubmittedAt)}. We'll notify you via email once the review is complete.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (roleVerificationStatus === 'approved') {
      return (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <span className="font-medium">Verification approved!</span> Your account was verified on {formatDate(verificationStatus.roleVerificationApprovedAt)}. You now have full access to all features.
              </p>
            </div>
          </div>
        </div>
      );
    } else if (roleVerificationStatus === 'rejected') {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-medium">Verification rejected.</span> Reason: {verificationStatus.roleVerificationRejectionReason}
              </p>
              <p className="text-sm text-red-700 mt-1">
                You can submit new documents below.
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

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

  if (!isEligible()) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="h-24 w-24 mx-auto mb-6 text-gray-400">
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Account Verification Not Required</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">Your account type doesn't require verification. Only founders and investors need to submit verification documents.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (verificationStatus.isRoleVerified) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="h-24 w-24 mx-auto mb-6 text-green-500">
          <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Account Already Verified</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">Your account has been successfully verified. You have full access to all features.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (verificationStatus.roleVerificationStatus === 'pending') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-6">Account Verification</h2>
        {renderStatusSection()}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">Verification in Progress</h3>
              <div className="mt-2 text-blue-700">
                <p>Your verification documents are currently being reviewed by our team. This process typically takes 1-3 business days.</p>
                <p className="mt-2">We'll notify you via email once the review is complete. Thank you for your patience.</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Account Verification</h1>
        <p className="text-gray-600 mt-2">Submit documents to verify your {user?.role} account</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {renderStatusSection()}
        
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {errors['form'] && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors['form']}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Verification required.</span> To access all features, please submit the following documents.
                {user?.role === 'founder' && " As a founder, you'll need to provide proof of business registration."}
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Document */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Document <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">Please upload a clear image of your government-issued ID card, passport, or driver's license.</p>
            <div className="flex items-center">
              <input
                type="file"
                name="idDocument"
                id="idDocument"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="idDocument"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mr-2"
              >
                {files.idDocument ? 'Change file' : 'Select file'}
              </label>
              {files.idDocument && (
                <span className="text-sm text-gray-600">{files.idDocument.name}</span>
              )}
            </div>
            {errors['idDocument'] && (
              <p className="mt-1 text-sm text-red-600">{errors['idDocument']}</p>
            )}
          </div>
          
          {/* Business Registration (for founders only) */}
          {user?.role === 'founder' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Registration <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Please upload your company registration document, business license, or certificate of incorporation.</p>
              <div className="flex items-center">
                <input
                  type="file"
                  name="businessRegistration"
                  id="businessRegistration"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="businessRegistration"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mr-2"
                >
                  {files.businessRegistration ? 'Change file' : 'Select file'}
                </label>
                {files.businessRegistration && (
                  <span className="text-sm text-gray-600">{files.businessRegistration.name}</span>
                )}
              </div>
              {errors['businessRegistration'] && (
                <p className="mt-1 text-sm text-red-600">{errors['businessRegistration']}</p>
              )}
            </div>
          )}
          
          {/* Proof of Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proof of Address <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">Please upload a recent utility bill, bank statement, or official correspondence showing your name and address (issued within the last 3 months).</p>
            <div className="flex items-center">
              <input
                type="file"
                name="proofOfAddress"
                id="proofOfAddress"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="proofOfAddress"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mr-2"
              >
                {files.proofOfAddress ? 'Change file' : 'Select file'}
              </label>
              {files.proofOfAddress && (
                <span className="text-sm text-gray-600">{files.proofOfAddress.name}</span>
              )}
            </div>
            {errors['proofOfAddress'] && (
              <p className="mt-1 text-sm text-red-600">{errors['proofOfAddress']}</p>
            )}
          </div>
          
          {/* Additional Documents (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Documents (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-2">Upload any additional documents that might support your verification (e.g., business card, professional credentials).</p>
            <div className="flex items-center">
              <input
                type="file"
                name="additionalDocuments"
                id="additionalDocuments"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
              <label
                htmlFor="additionalDocuments"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer mr-2"
              >
                Select files
              </label>
              {files.additionalDocuments.length > 0 && (
                <span className="text-sm text-gray-600">{files.additionalDocuments.length} file(s) selected</span>
              )}
            </div>
          </div>
          
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit for Verification'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Privacy Notice */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Privacy Notice</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>The information and documents you provide will be used solely for verification purposes and will be handled in accordance with our Privacy Policy.</p>
          <p>All uploaded documents are stored securely and are only accessible to authorized personnel responsible for verification.</p>
          <p>Your documents will be automatically deleted from our systems 30 days after your verification is completed or rejected.</p>
        </div>
      </div>
    </div>
  );
};

export default RequestVerificationPage;