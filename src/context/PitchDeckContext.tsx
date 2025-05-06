import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

// Define interfaces
interface Slide {
  id: string;
  title: string;
  content: string;
  notes?: string;
  order: number;
  template?: string;
}

interface Deck {
  _id: string;
  title: string;
  sector: string;
  slides: Slide[];
  userId: string;
  createdAt: string;
  lastModified: string;
}

interface Template {
  _id: string;
  name: string;
  sector: string;
  description: string;
  slides: Slide[];
  isDefault: boolean;
}

interface AISuggestion {
  suggestions: string;
}

interface AIGeneratedDeck {
  slides: Slide[];
}

interface Example {
  _id: string;
  sector: string;
  slideType: string;
  content: string;
  companyName?: string;
  metrics?: Record<string, any>;
  tags?: string[];
}

interface PitchDeckState {
  decks: Deck[];
  currentDeck: Deck | null;
  templates: Template[];
  currentTemplate: Template | null;
  examples: string[];
  loading: boolean;
  error: string | null;
}

interface PitchDeckContextType extends PitchDeckState {
  // Deck operations
  getDecks: () => Promise<void>;
  getDeck: (id: string) => Promise<void>;
  createDeck: (deckData: { title: string; sector: string; slides: Slide[] }) => Promise<Deck>;
  updateDeck: (id: string, deckData: { title: string; sector: string; slides: Slide[] }) => Promise<Deck>;
  deleteDeck: (id: string) => Promise<void>;
  clearCurrentDeck: () => void;
  
  // Template operations
  getTemplates: (sector?: string) => Promise<void>;
  getTemplate: (id: string) => Promise<void>;
  createTemplate: (templateData: { 
    name: string;
    sector: string;
    description: string;
    slides: Slide[];
    isDefault: boolean;
  }) => Promise<Template>;
  
  // Example operations
  getExamples: (slideType: string, sector: string) => Promise<void>;
  createExample: (exampleData: {
    sector: string;
    slideType: string;
    content: string;
    companyName?: string;
    metrics?: Record<string, any>;
    tags?: string[];
  }) => Promise<Example>;
  
  // Export operations
  exportDeck: (deckId: string, format: 'pptx' | 'pdf' | 'html') => Promise<void>;
  
  // AI operations
  getSuggestions: (sector: string, slideType: string, currentContent?: string) => Promise<AISuggestion>;
  generateDeck: (
    sector: string, 
    companyName: string, 
    description?: string, 
    problemStatement?: string
  ) => Promise<AIGeneratedDeck>;
  
  // Error handling
  clearError: () => void;
}

// Create context
const PitchDeckContext = createContext<PitchDeckContextType | undefined>(undefined);

// Provider component
interface PitchDeckProviderProps {
  children: ReactNode;
}

export const PitchDeckProvider: React.FC<PitchDeckProviderProps> = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  const [pitchDeckState, setPitchDeckState] = useState<PitchDeckState>({
    decks: [],
    currentDeck: null,
    templates: [],
    currentTemplate: null,
    examples: [],
    loading: false,
    error: null
  });

  // Clear decks when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setPitchDeckState({
        decks: [],
        currentDeck: null,
        templates: [],
        currentTemplate: null,
        examples: [],
        loading: false,
        error: null
      });
    }
  }, [isAuthenticated]);

  // Memoize functions to prevent re-creation on every render
  // Deck operations
  const getDecks = useCallback(async () => {
    try {
      // Prevent multiple simultaneous requests
      if (pitchDeckState.loading) return;
      
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      // Updated route to match backend
      const response = await api.get('/decks/getall');
      
      setPitchDeckState(prev => ({
        ...prev,
        decks: response.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      console.error("Error fetching decks:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error fetching decks'
      }));
    }
  }, [pitchDeckState.loading]);

// Updated getDeck function in PitchDeckContext
const getDeck = useCallback(async (id: string) => {
  // Skip the API call for invalid or placeholder IDs
  if (!id || id === 'undefined' || id === 'new' || id === ':id') {
    console.info("Skipping API call for ID:", id);
    // Clear current deck for 'new' route or placeholder parameters
    setPitchDeckState(prev => ({
      ...prev,
      currentDeck: null,
      // Don't set error state for route params - this is expected behavior
    }));
    return;
  }
  
  try {
    // Prevent multiple simultaneous requests for the same deck
    if (pitchDeckState.loading) return;
    
    setPitchDeckState(prev => ({ ...prev, loading: true }));
    
    // Updated route to match backend
    const response = await api.get(`/decks/getOne/${id}`);
    
    setPitchDeckState(prev => ({
      ...prev,
      currentDeck: response.data,
      loading: false,
      error: null
    }));
  } catch (err: any) {
    console.error(`Error fetching deck ${id}:`, err);
    setPitchDeckState(prev => ({
      ...prev,
      loading: false,
      error: err.response?.data?.message || 'Error fetching deck'
    }));
  }
}, [pitchDeckState.loading]);

  const createDeck = useCallback(async (deckData: { title: string; sector: string; slides: Slide[] }) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      // Updated route to match backend
      const response = await api.post('/decks/create', deckData);
      
      setPitchDeckState(prev => ({
        ...prev,
        decks: [...prev.decks, response.data],
        currentDeck: response.data,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error("Error creating deck:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error creating deck'
      }));
      throw err;
    }
  }, []);

  const updateDeck = useCallback(async (id: string, deckData: { title: string; sector: string; slides: Slide[] }) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      // Updated route to match backend
      const response = await api.put(`/decks/update/${id}`, deckData);
      
      setPitchDeckState(prev => ({
        ...prev,
        decks: prev.decks.map(deck => 
          deck._id === id ? response.data : deck
        ),
        currentDeck: response.data,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error(`Error updating deck ${id}:`, err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error updating deck'
      }));
      throw err;
    }
  }, []);

  const deleteDeck = useCallback(async (id: string) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      // Updated route to match backend
      await api.delete(`/decks/delete/${id}`);
      
      setPitchDeckState(prev => ({
        ...prev,
        decks: prev.decks.filter(deck => deck._id !== id),
        currentDeck: prev.currentDeck?._id === id ? null : prev.currentDeck,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      console.error(`Error deleting deck ${id}:`, err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error deleting deck'
      }));
    }
  }, []);

  const clearCurrentDeck = useCallback(() => {
    setPitchDeckState(prev => ({
      ...prev,
      currentDeck: null
    }));
  }, []);

  // AI operations
  const getSuggestions = useCallback(async (sector: string, slideType: string, currentContent?: string) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/ai/suggest', {
        sector,
        slideType,
        currentContent
      });
      
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error("Error getting AI suggestions:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error getting AI suggestions'
      }));
      throw err;
    }
  }, []);

  const generateDeck = useCallback(async (
    sector: string, 
    companyName: string, 
    description?: string, 
    problemStatement?: string
  ) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/ai/generate-deck', {
        sector,
        companyName,
        description,
        problemStatement
      });
      
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error("Error generating AI deck:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error generating AI deck'
      }));
      throw err;
    }
  }, []);

  // Template operations
  const getTemplates = useCallback(async (sector?: string) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const url = sector ? `/templates?sector=${sector}` : '/templates';
      const response = await api.get(url);
      
      setPitchDeckState(prev => ({
        ...prev,
        templates: response.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      console.error("Error fetching templates:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error fetching templates'
      }));
    }
  }, []);

  const getTemplate = useCallback(async (id: string) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get(`/templates/${id}`);
      
      setPitchDeckState(prev => ({
        ...prev,
        currentTemplate: response.data,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      console.error(`Error fetching template ${id}:`, err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error fetching template'
      }));
    }
  }, []);

  const createTemplate = useCallback(async (templateData: { 
    name: string;
    sector: string;
    description: string;
    slides: Slide[];
    isDefault: boolean;
  }) => {
    try {
      // Check if user is admin
      if (userRole !== 'admin') {
        throw new Error('Not authorized to create templates');
      }
      
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/templates/', templateData);
      
      setPitchDeckState(prev => ({
        ...prev,
        templates: [...prev.templates, response.data],
        currentTemplate: response.data,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error("Error creating template:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || err.message || 'Error creating template'
      }));
      throw err;
    }
  }, [userRole]);

  // Example operations
  const getExamples = useCallback(async (slideType: string, sector: string) => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const response = await api.get(`/examples?slideType=${slideType}&sector=${sector}`);
      
      setPitchDeckState(prev => ({
        ...prev,
        examples: response.data.examples,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      console.error("Error fetching examples:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error fetching examples'
      }));
    }
  }, []);

  const createExample = useCallback(async (exampleData: {
    sector: string;
    slideType: string;
    content: string;
    companyName?: string;
    metrics?: Record<string, any>;
    tags?: string[];
  }) => {
    try {
      // Check if user is admin
      if (userRole !== 'admin') {
        throw new Error('Not authorized to create examples');
      }
      
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      const response = await api.post('/examples/', exampleData);
      
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
      
      return response.data;
    } catch (err: any) {
      console.error("Error creating example:", err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || err.message || 'Error creating example'
      }));
      throw err;
    }
  }, [userRole]);

  // Export operations
  const exportDeck = useCallback(async (deckId: string, format: 'pptx' | 'pdf' | 'html') => {
    try {
      setPitchDeckState(prev => ({ ...prev, loading: true }));
      
      // Using a different approach for file download
      const response = await api.post('/export/', {
        deckId,
        format
      }, {
        responseType: 'blob' // Important for file downloads
      });
      
      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get deck title for the filename
      const deck = pitchDeckState.decks.find(d => d._id === deckId);
      const filename = `${deck?.title || 'pitchdeck'}.${format}`;
      link.setAttribute('download', filename);
      
      // Append to html page
      document.body.appendChild(link);
      link.click();
      
      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: null
      }));
    } catch (err: any) {
      console.error(`Error exporting deck ${deckId}:`, err);
      setPitchDeckState(prev => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Error exporting deck'
      }));
    }
  }, [pitchDeckState.decks]);

  // Error handling
  const clearError = useCallback(() => {
    setPitchDeckState(prev => ({ ...prev, error: null }));
  }, []);

  // Context value memoization to prevent unnecessary re-renders
  const contextValue = {
    ...pitchDeckState,
    // Deck operations
    getDecks,
    getDeck,
    createDeck,
    updateDeck,
    deleteDeck,
    clearCurrentDeck,
    // Template operations
    getTemplates,
    getTemplate,
    createTemplate,
    // Example operations
    getExamples,
    createExample,
    // Export operations
    exportDeck,
    // AI operations
    getSuggestions,
    generateDeck,
    // Error handling
    clearError
  };

  return (
    <PitchDeckContext.Provider value={contextValue}>
      {children}
    </PitchDeckContext.Provider>
  );
};

// Custom hook to use pitch deck context
export const usePitchDeck = () => {
  const context = useContext(PitchDeckContext);
  if (context === undefined) {
    throw new Error('usePitchDeck must be used within a PitchDeckProvider');
  }
  return context;
};