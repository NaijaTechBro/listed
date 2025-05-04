import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { User } from '../types';

// Define verification state interface
export interface VerificationState {
  status: 'none' | 'pending' | 'approved' | 'rejected';
  isVerified: boolean;
  submittedAt: string | null;
  rejectionReason: string | null;
  reviewedAt: string | null;
  loading: boolean;
  error: string | null;
}

// Define document interface
interface VerificationDocument {
  filename: string;
  fileUrl: string;
  publicId: string;
  uploadedAt: string;
}

// Interface for verification details
export interface VerificationDetails {
  _id: string;
  user: User;
  status: 'pending' | 'approved' | 'rejected';
  idDocument: VerificationDocument;
  proofOfAddress: VerificationDocument;
  businessRegistration?: VerificationDocument;
  additionalDocuments?: VerificationDocument[];
  submittedAt: string;
  rejectionReason?: string;
  reviewedAt?: string;
  reviewedBy?: User;
}

// Define pagination interface for admin listing
interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

// Define context interface
interface VerificationContextType extends VerificationState {
  submitVerification: (formData: FormData) => Promise<void>;
  getVerificationStatus: () => Promise<void>;
  getVerificationById: (id: string) => Promise<VerificationDetails>;
  reviewVerification: (id: string, status: 'approved' | 'rejected', rejectionReason?: string) => Promise<void>;
  getAllVerifications: (
    page?: number, 
    limit?: number, 
    status?: string, 
    role?: string
  ) => Promise<{
    verifications: VerificationDetails[],
    pagination: Pagination
  }>;
  deleteVerification: (id: string) => Promise<void>;
  clearError: () => void;
}

// Create context
const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

// Provider component
interface VerificationProviderProps {
  children: ReactNode;
}

export const VerificationProvider: React.FC<VerificationProviderProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  const [verificationState, setVerificationState] = useState<VerificationState>({
    status: 'none',
    isVerified: false,
    submittedAt: null,
    rejectionReason: null,
    reviewedAt: null,
    loading: false,
    error: null
  });

  // Load verification status when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      getVerificationStatus();
    } else {
      // Reset verification state when user logs out
      setVerificationState({
        status: 'none',
        isVerified: false,
        submittedAt: null,
        rejectionReason: null,
        reviewedAt: null,
        loading: false,
        error: null
      });
    }
  }, [isAuthenticated, user]);

  // Submit verification documents
  const submitVerification = async (formData: FormData) => {
    try {
      setVerificationState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/verify/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setVerificationState({
        status: 'pending',
        isVerified: false,
        submittedAt: response.data.data.submittedAt,
        rejectionReason: null,
        reviewedAt: null,
        loading: false,
        error: null
      });
    } catch (err: any) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to submit verification documents'
      }));
      throw err;
    }
  };

  // Get verification status
  const getVerificationStatus = async () => {
    try {
      setVerificationState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get('/verify/status');
      const { data } = response.data;
      
      setVerificationState({
        status: data.verificationStatus || 'none',
        isVerified: data.isVerified || false,
        submittedAt: data.submittedAt || null,
        rejectionReason: data.rejectionReason || null,
        reviewedAt: data.reviewedAt || null,
        loading: false,
        error: null
      });
    } catch (err: any) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to get verification status'
      }));
    }
  };

  // Get verification details by ID
  const getVerificationById = async (id: string): Promise<VerificationDetails> => {
    try {
      setVerificationState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get(`/verify/${id}`);
      
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
      
      return response.data.data;
    } catch (err: any) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to get verification details'
      }));
      throw err;
    }
  };

  // Review verification (admin only)
  const reviewVerification = async (id: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    try {
      setVerificationState(prev => ({ ...prev, loading: true }));
      
      const requestData = {
        status,
        rejectionReason: status === 'rejected' ? rejectionReason : undefined
      };
      
      await api.put(`/verify/${id}/review`, requestData);
      
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to review verification'
      }));
      throw err;
    }
  };

  // Get all verifications (admin only)
  const getAllVerifications = async (
    page = 1,
    limit = 10,
    status?: string,
    role?: string
  ) => {
    try {
      setVerificationState(prev => ({ ...prev, loading: true }));
      
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      if (status) {
        queryParams.append('status', status);
      }
      
      if (role) {
        queryParams.append('role', role);
      }
      
      const response = await api.get(`/verify?${queryParams.toString()}`);
      
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
      
      return {
        verifications: response.data.data,
        pagination: response.data.pagination
      };
    } catch (err: any) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to get verifications'
      }));
      throw err;
    }
  };

  // Delete verification (admin only)
  const deleteVerification = async (id: string) => {
    try {
      setVerificationState(prev => ({ ...prev, loading: true }));
      
      await api.delete(`/verify/${id}`);
      
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setVerificationState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to delete verification'
      }));
      throw err;
    }
  };

  // Clear error
  const clearError = useCallback(() => {
    setVerificationState(prev => ({ ...prev, error: null }));
  }, []);

  return (
    <VerificationContext.Provider
      value={{
        ...verificationState,
        submitVerification,
        getVerificationStatus,
        getVerificationById,
        reviewVerification,
        getAllVerifications,
        deleteVerification,
        clearError
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

// Custom hook to use verification context
export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};