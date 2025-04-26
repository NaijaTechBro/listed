import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { Startup, StartupFilter } from '../types';

// Define startups state interface
interface StartupsState {
  startups: Startup[];
  startup: Startup | null;
  loading: boolean;
  error: string | null;
  pagination: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  } | null;
  count: number;
  userStartups: Startup[]; // Added for user's startups
}

// Define context interface
interface StartupContextType extends StartupsState {
  getStartups: (filter?: StartupFilter, page?: number, limit?: number) => Promise<void>;
  getStartup: (id: string) => Promise<void>;
  createStartup: (startupData: FormData) => Promise<{ data: Startup }>;// Changed to FormData for file uploads
  updateStartup: (id: string, startupData: FormData) => Promise<void>; // Changed to FormData
  deleteStartup: (id: string) => Promise<void>;
  uploadGalleryImages: (id: string, images: File[]) => Promise<void>; // New function
  deleteGalleryImage: (startupId: string, imageId: string) => Promise<void>; // New function
  getStartupsByUser: () => Promise<void>; // New function
  getStartupsByUserId: (userId: string) => Promise<void>; // New function
  clearStartupError: () => void;
  clearStartup: () => void;
}

// Create context
const StartupContext = createContext<StartupContextType | undefined>(undefined);

// Provider component
interface StartupProviderProps {
  children: ReactNode;
}

export const StartupProvider: React.FC<StartupProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  const [startupsState, setStartupsState] = useState<StartupsState>({
    startups: [],
    startup: null,
    loading: false,
    error: null,
    pagination: null,
    count: 0,
    userStartups: [], // Initialize user's startups
  });

  // Load startups on mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getStartups();
      getStartupsByUser(); // Also load user's startups
    }
  }, [isAuthenticated]);

  
  const buildQueryString = (filter?: StartupFilter, page?: number, limit?: number): string => {
    const params = new URLSearchParams();
    
    if (filter) {
      if (filter.category) params.append('category', filter.category);
      if (filter.country) params.append('country', filter.country);
      if (filter.stage) params.append('stage', filter.stage);
      
      // This is correct - using 'search' parameter
      if (filter.searchTerm) params.append('search', filter.searchTerm);
      
      // Use the correct format for range queries
      if (filter.fundingRange) {
        if (filter.fundingRange.min !== undefined) 
          params.append('metrics.fundingTotal[gte]', filter.fundingRange.min.toString());
        if (filter.fundingRange.max !== undefined) 
          params.append('metrics.fundingTotal[lte]', filter.fundingRange.max.toString());
      }
      
      if (filter.employeeCount) {
        if (filter.employeeCount.min !== undefined) 
          params.append('metrics.employees[gte]', filter.employeeCount.min.toString());
        if (filter.employeeCount.max !== undefined) 
          params.append('metrics.employees[lte]', filter.employeeCount.max.toString());
      }
    }
    
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    
    return params.toString();
  };


  // Get all startups with optional filtering
  const getStartups = useCallback(async (filter?: StartupFilter, page?: number, limit?: number) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));
      
      const queryString = buildQueryString(filter, page, limit);
      const url = `/startups/getstartups${queryString ? `?${queryString}` : ''}`;
      
      console.log('Fetching startups with URL:', url); // Add logging for debugging
      
      const response = await api.get(url);
      
      setStartupsState(prev => ({
        ...prev,
        startups: response.data.data,
        pagination: response.data.pagination || null,
        count: response.data.count || 0,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error('Error fetching startups:', err); // Add error logging
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch startups'
      }));
      throw err;
    }
  }, []);

  // Get single startup
  const getStartup = useCallback(async (id: string) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get(`/startups/getstartup/${id}`);
      
      setStartupsState(prev => ({
        ...prev,
        startup: response.data.data,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch startup'
      }));
      throw err;
    }
  }, []);

  // Create new startup - updated to use FormData for file upload
  const createStartup = useCallback(async (startupData: FormData) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/startups/create', startupData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setStartupsState(prev => ({
        ...prev,
        startups: [...prev.startups, response.data.data],
        startup: response.data.data,
        userStartups: [...prev.userStartups, response.data.data], // Update user startups as well
        loading: false,
        error: null
      }));
      
      return response;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to create startup'
      }));
      throw err;
    }
  }, []);

  // Update startup - updated to use FormData for file upload
  const updateStartup = useCallback(async (id: string, startupData: FormData) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));
      
      const response = await api.put(`/startups/updatestartup/${id}`, startupData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const updatedStartup = response.data.data;
      
      setStartupsState(prev => ({
        ...prev,
        startups: prev.startups.map(startup =>
          startup._id === id ? updatedStartup : startup
        ),
        userStartups: prev.userStartups.map(startup =>
          startup._id === id ? updatedStartup : startup
        ),
        startup: updatedStartup,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to update startup'
      }));
      throw err;
    }
  }, []);

  // Delete startup
  const deleteStartup = useCallback(async (id: string) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));
      
      await api.delete(`/startups/deletestartup/${id}`);
      
      setStartupsState(prev => ({
        ...prev,
        startups: prev.startups.filter(startup => startup._id !== id),
        userStartups: prev.userStartups.filter(startup => startup._id !== id),
        startup: prev.startup?._id === id ? null : prev.startup,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to delete startup'
      }));
      throw err;
    }
  }, []);

  // Upload gallery images - new function
  const uploadGalleryImages = useCallback(async (id: string, images: File[]) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));

      const formData = new FormData();
      images.forEach(image => {
        formData.append('gallery', image);
      });

      const response = await api.post(`/startups/upload/${id}/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const updatedStartup = response.data.data;

      setStartupsState(prev => ({
        ...prev,
        startups: prev.startups.map(startup =>
          startup._id === id ? updatedStartup : startup
        ),
        userStartups: prev.userStartups.map(startup =>
          startup._id === id ? updatedStartup : startup
        ),
        startup: updatedStartup,
        loading: false,
        error: null
      }));

      return response.data;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to upload gallery images'
      }));
      throw err;
    }
  }, []);

  // Delete gallery image - new function
  const deleteGalleryImage = useCallback(async (startupId: string, imageId: string) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));

      const response = await api.delete(`/startups/delete/${startupId}/gallery/${imageId}`);

      const updatedStartup = response.data.data;

      setStartupsState(prev => ({
        ...prev,
        startups: prev.startups.map(startup =>
          startup._id === startupId ? updatedStartup : startup
        ),
        userStartups: prev.userStartups.map(startup =>
          startup._id === startupId ? updatedStartup : startup
        ),
        startup: updatedStartup,
        loading: false,
        error: null
      }));

      return response.data;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to delete gallery image'
      }));
      throw err;
    }
  }, []);

  // Get startups by logged-in user - new function
  const getStartupsByUser = useCallback(async () => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));

      const response = await api.get('/startups/user/me');

      setStartupsState(prev => ({
        ...prev,
        userStartups: response.data.data,
        loading: false,
        error: null
      }));

      return response.data;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch your startups'
      }));
      throw err;
    }
  }, []);

  // Get startups by specific user ID - new function
  const getStartupsByUserId = useCallback(async (userId: string) => {
    try {
      setStartupsState(prev => ({ ...prev, loading: true }));

      const response = await api.get(`/startups/user/${userId}`);

      setStartupsState(prev => ({
        ...prev,
        startups: response.data.data, // Store in main startups array
        count: response.data.count || 0,
        loading: false,
        error: null
      }));

      return response.data;
    } catch (err: any) {
      setStartupsState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch startups for this user'
      }));
      throw err;
    }
  }, []);

  // Clear error
  const clearStartupError = useCallback(() => {
    setStartupsState(prev => ({ ...prev, error: null }));
  }, []);

  // Clear current startup
  const clearStartup = useCallback(() => {
    setStartupsState(prev => ({ ...prev, startup: null }));
  }, []);

  return (
    <StartupContext.Provider
      value={{
        ...startupsState,
        getStartups,
        getStartup,
        createStartup,
        updateStartup,
        deleteStartup,
        uploadGalleryImages,
        deleteGalleryImage,
        getStartupsByUser,
        getStartupsByUserId,
        clearStartupError,  
        clearStartup
      }}
    >
      {children}
    </StartupContext.Provider>
  );
};

// Custom hook to use startup context
export const useStartup = () => {
  const context = useContext(StartupContext);
  if (context === undefined) {
    throw new Error('useStartup must be used within a StartupProvider');
  }
  return context;
};