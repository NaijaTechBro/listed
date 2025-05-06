import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

// Define Profile interface based on the fields in profileController.js
interface ProfilePicture {
  public_id: string;
  url: string;
  secure_url?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  created_at?: Date;
}

interface Document {
  filename: string;
  path: string;
  originalName?: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt?: Date;
}

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'facebook' | 'instagram' | 'website' | 'other';
  url: string;
  display?: string;
}

interface Preferences {
  notifications?: {
    paymentNotifications?: boolean;
    invoiceReminders?: boolean;
    productUpdates?: boolean;
  };
  display?: {
    currencyFormat?: string;
    dateFormat?: string;
  };
  integrations?: {
    stripe?: {
      connected: boolean;
      accountId?: string;
    };
    quickbooks?: {
      connected: boolean;
      accountId?: string;
    };
  };
}

interface Profile {
  _id?: string;
  firstName: string;
  lastName: string;
  bio?: string;
  email?: string;
  phone?: string;
  homeAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  profilePicture?: ProfilePicture | null;
  resume?: Document | null;
  idDocument?: Document | null;
  proofOfAddress?: Document | null;
  businessRegistration?: Document | null;
  additionalDocuments?: Document[];
  socialLinks?: SocialLink[];
  jobTitle?: string;
  company?: string;
  location?: string;
  skills?: string[];
  preferences?: Preferences;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define profile state interface
interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

// Define context interface
interface ProfileContextType extends ProfileState {
  getProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  deleteProfilePicture: () => Promise<void>;
  uploadResume: (file: File) => Promise<void>;
  uploadDocument: (documentType: string, file: File) => Promise<void>;
  deleteDocument: (documentType: string) => Promise<void>;
  getPublicProfile: (userId: string) => Promise<Profile>;
  clearError: () => void;
}

// Create context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Provider component
interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profileState, setProfileState] = useState<ProfileState>({
    profile: null,
    loading: false,
    error: null
  });

  const { isAuthenticated } = useAuth();

  // Load user profile on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated]);

  // Get current user profile
  const getProfile = async () => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get('/profile/me');
      
      setProfileState({
        profile: response.data.data,
        loading: false,
        error: null
      });
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch profile'
      }));
    }
  };

  // Update profile
  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      const response = await api.put('/profile/update', profileData);
      
      setProfileState(prev => ({
        ...prev,
        profile: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Profile update failed'
      }));
      throw err;
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file: File) => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/profile/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setProfileState(prev => ({
        ...prev,
        profile: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to upload profile picture'
      }));
      throw err;
    }
  };

  // Delete profile picture
  const deleteProfilePicture = async () => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      const response = await api.delete('/profile/delete-picture');
      
      setProfileState(prev => ({
        ...prev,
        profile: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to delete profile picture'
      }));
      throw err;
    }
  };

  // Upload resume
  const uploadResume = async (file: File) => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await api.post('/profile/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setProfileState(prev => ({
        ...prev,
        profile: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to upload resume'
      }));
      throw err;
    }
  };

  // Upload document
  const uploadDocument = async (documentType: string, file: File) => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append(documentType, file);
      
      const response = await api.post('/profile/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setProfileState(prev => ({
        ...prev,
        profile: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || `Failed to upload ${documentType}`
      }));
      throw err;
    }
  };

  // Delete document
  const deleteDocument = async (documentType: string) => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      const response = await api.delete(`/profile/delete-document/${documentType}`);
      
      setProfileState(prev => ({
        ...prev,
        profile: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || `Failed to delete ${documentType}`
      }));
      throw err;
    }
  };

  // Get public profile
  const getPublicProfile = async (userId: string): Promise<Profile> => {
    try {
      setProfileState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get(`/profile/user/${userId}`);
      
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
      
      return response.data.data;
    } catch (err: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch public profile'
      }));
      throw err;
    }
  };

  // Clear error
  const clearError = useCallback(() => {
    setProfileState(prev => ({ ...prev, error: null }));
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        ...profileState,
        getProfile,
        updateProfile,
        uploadProfilePicture,
        deleteProfilePicture,
        uploadResume,
        uploadDocument,
        deleteDocument,
        getPublicProfile,
        clearError
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};