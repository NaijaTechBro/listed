import React, { createContext, useState, useContext, ReactNode } from 'react';
import api from '../services/api';
import { Investor, Startup, InvestorPortfolio, User, StartupFilter } from '../types';

// Define investor state interface
interface InvestorState {
  investors: Investor[];
  investor: Investor | null;
  portfolioCompanies: Startup[];
  founders: User[];
  loading: boolean;
  error: string | null;
}

// Define context interface
interface InvestorContextType extends InvestorState {
  createInvestorProfile: (investorData: Partial<Investor>) => Promise<Investor>;
  getInvestors: (filters?: any) => Promise<void>;
  getInvestor: (id: string) => Promise<void>;
  getMyInvestorProfile: () => Promise<void>;
  updateInvestorProfile: (id: string, investorData: Partial<Investor>) => Promise<void>;
  deleteInvestorProfile: (id: string) => Promise<void>;
  searchInvestors: (searchCriteria: InvestorSearchCriteria) => Promise<void>;
  addPortfolioCompany: (id: string, portfolioData: Partial<InvestorPortfolio>) => Promise<void>;
  updatePortfolioCompany: (id: string, portfolioId: string, portfolioData: Partial<InvestorPortfolio>) => Promise<void>;
  removePortfolioCompany: (id: string, portfolioId: string) => Promise<void>;
  investInStartup: (startupId: string, amount: number) => Promise<void>;
  getInvestorPortfolio: () => Promise<void>;
  getFounders: () => Promise<void>;
  clearError: () => void;
}

// Define search criteria interface
interface InvestorSearchCriteria {
  sectors?: string[];
  stages?: string[];
  countries?: string[];
  investmentMin?: number;
  investmentMax?: number;
  query?: string;
}

// Create context
const InvestorContext = createContext<InvestorContextType | undefined>(undefined);

// Provider component
interface InvestorProviderProps {
  children: ReactNode;
}

export const InvestorProvider: React.FC<InvestorProviderProps> = ({ children }) => {
  const [investorState, setInvestorState] = useState<InvestorState>({
    investors: [],
    investor: null,
    portfolioCompanies: [],
    founders: [],
    loading: false,
    error: null
  });

  // Create investor profile
  const createInvestorProfile = async (investorData: Partial<Investor>): Promise<Investor> => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/investors', investorData);
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));

      return response.data.data;
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to create investor profile'
      }));
      throw err;
    }
  };

  // Get all investors
  const getInvestors = async (filters?: StartupFilter) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      // Build query string from filters
      let queryStr = '';
      if (filters) {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (typeof value === 'object') {
              params.append(key, JSON.stringify(value));
            } else {
              params.append(key, String(value));
            }
          }
        });
        queryStr = params.toString() ? `?${params.toString()}` : '';
      }
      
      const response = await api.get(`/investors${queryStr}`);
      
      setInvestorState(prev => ({
        ...prev,
        investors: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch investors'
      }));
    }
  };

  // Get single investor
  const getInvestor = async (id: string) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get(`/investors/${id}`);
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch investor'
      }));
    }
  };

  // Get current user's investor profile
  const getMyInvestorProfile = async () => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get('/investors/me');
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch investor profile'
      }));
    }
  };

  // Update investor profile
  const updateInvestorProfile = async (id: string, investorData: Partial<Investor>) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.put(`/investors/${id}`, investorData);
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to update investor profile'
      }));
      throw err;
    }
  };

  // Delete investor profile
  const deleteInvestorProfile = async (id: string) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      await api.delete(`/investors/${id}`);
      
      setInvestorState(prev => ({
        ...prev,
        investor: null,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to delete investor profile'
      }));
      throw err;
    }
  };

  // Search investors
  const searchInvestors = async (searchCriteria: InvestorSearchCriteria) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/investors/search', searchCriteria);
      
      setInvestorState(prev => ({
        ...prev,
        investors: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to search investors'
      }));
    }
  };

  // Add portfolio company
  const addPortfolioCompany = async (id: string, portfolioData: Partial<InvestorPortfolio>) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.put(`/investors/${id}/portfolio`, portfolioData);
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to add portfolio company'
      }));
      throw err;
    }
  };

  // Update portfolio company
  const updatePortfolioCompany = async (id: string, portfolioId: string, portfolioData: Partial<InvestorPortfolio>) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.put(`/investors/${id}/portfolio/${portfolioId}`, portfolioData);
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to update portfolio company'
      }));
      throw err;
    }
  };

  // Remove portfolio company
  const removePortfolioCompany = async (id: string, portfolioId: string) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.delete(`/investors/${id}/portfolio/${portfolioId}`);
      
      setInvestorState(prev => ({
        ...prev,
        investor: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to remove portfolio company'
      }));
      throw err;
    }
  };

  // Invest in a startup
  const investInStartup = async (startupId: string, amount: number) => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      await api.post('/investors/invest', { startupId, amount });
      
      // Refresh portfolio after investing
      await getInvestorPortfolio();
      
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to invest in startup'
      }));
      throw err;
    }
  };

  // Get investor portfolio
  const getInvestorPortfolio = async () => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get('/investors/portfolio');
      
      setInvestorState(prev => ({
        ...prev,
        portfolioCompanies: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch portfolio'
      }));
    }
  };

  // Get all founders (admin only)
  const getFounders = async () => {
    try {
      setInvestorState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get('/investors/founders');
      
      setInvestorState(prev => ({
        ...prev,
        founders: response.data.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      setInvestorState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch founders'
      }));
    }
  };

  // Clear error
  const clearError = () => {
    setInvestorState(prev => ({ ...prev, error: null }));
  };

  return (
    <InvestorContext.Provider
      value={{
        ...investorState,
        createInvestorProfile,
        getInvestors,
        getInvestor,
        getMyInvestorProfile,
        updateInvestorProfile,
        deleteInvestorProfile,
        searchInvestors,
        addPortfolioCompany,
        updatePortfolioCompany,
        removePortfolioCompany,
        investInStartup,
        getInvestorPortfolio,
        getFounders,
        clearError
      }}
    >
      {children}
    </InvestorContext.Provider>
  );
};

// Custom hook to use investor context
export const useInvestor = () => {
  const context = useContext(InvestorContext);
  if (context === undefined) {
    throw new Error('useInvestor must be used within an InvestorProvider');
  }
  return context;
};