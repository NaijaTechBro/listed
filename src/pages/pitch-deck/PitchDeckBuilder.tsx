// src/pages/PitchDeckBuilder.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import SlideEditor from '../../components/pitch-deck/SlideEditor';
import SectorSelector from '../../components/pitch-deck/SectorSelector';
import SlideNavigation from '../../components/pitch-deck/SlideNavigation';
import AIAssistant from '../../components/pitch-deck/AIAssistant';
import ExportOptions from '../../components/pitch-deck/ExportOptions';
import { Button } from '../../components/ui/pitch/button';
import { useAuth } from '../../context/AuthContext';
import { usePitchDeck } from '../../context/PitchDeckContext';
import { Loader2 } from 'lucide-react';

const DEFAULT_SECTORS = [
  'fintech', 'agritech', 'healthtech', 'edtech', 
  'ecommerce', 'cleantech', 'proptech', 'saas'
];

const DEFAULT_SLIDES = [
  { title: 'Cover Slide', key: 'cover' },
  { title: 'Problem', key: 'problem' },
  { title: 'Solution', key: 'solution' },
  { title: 'Market Opportunity', key: 'market' },
  { title: 'Product', key: 'product' },
  { title: 'Traction', key: 'traction' },
  { title: 'Business Model', key: 'business' },
  { title: 'Competition', key: 'competition' },
  { title: 'Team', key: 'team' },
  { title: 'Financials', key: 'financials' },
  { title: 'Funding Ask', key: 'funding' },
  { title: 'Contact', key: 'contact' }
];

interface Slide {
  id: string;
  title: string;
  content: string;
  notes?: string;
  order: number;
  template?: string;
}

const PitchDeckBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Use PitchDeckContext hooks
  const { 
    getDeck, 
    createDeck, 
    updateDeck, 
    currentDeck, 
    loading, 
    error,
    clearError,
    getSuggestions,
    getTemplate,
    currentTemplate
  } = usePitchDeck();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [sector, setSector] = useState('');
  const [saving, setSaving] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  // For creating a new deck
  const [newDeckData, setNewDeckData] = useState({
    title: 'Untitled Pitch Deck',
    sector: '',
    slides: DEFAULT_SLIDES.map((slide, index) => ({
      id: slide.key,
      title: slide.title,
      content: '',
      notes: '',
      order: index,
      template: `<div class="slide-content"><h2>${slide.title}</h2><p>Click to edit this slide</p></div>`
    }))
  });

  // Use a local state to track changes to the current deck
  const [localDeckData, setLocalDeckData] = useState<{
    _id: string;
    title: string;
    sector: string;
    slides: Slide[];
    userId?: string;
    createdAt?: string;
    lastModified?: string;
  } | null>(null);

  // Check authentication and redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to access this page');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
// Updated useEffect for loading deck in PitchDeckBuilder.tsx
useEffect(() => {
  const loadDeckOrTemplate = async () => {
    if (!isAuthenticated) return;

    // Clear any previous errors
    clearError();

    // Check if a template ID was provided in the query params
    const queryParams = new URLSearchParams(location.search);
    const templateId = queryParams.get('template');

    try {
      // Only load deck for valid IDs (not placeholders)
      if (id && id !== 'new' && id !== ':id') {
        // Load existing deck
        await getDeck(id);
      } else if (id === ':id' || !id) {
        // Handle the case where we have a route parameter placeholder
        // Redirect to the new deck page or dashboard
        navigate('/builder/new');
      } else if (templateId) {
        // Load template for creating a new deck
        await getTemplate(templateId);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      // Error handling is managed via the context error state
    }
  };

  loadDeckOrTemplate();
}, [id, isAuthenticated, getDeck, getTemplate, location.search, clearError, navigate]);

  // Update local state when currentDeck changes
  useEffect(() => {
    if (currentDeck) {
      setSector(currentDeck.sector);
      setLocalDeckData({...currentDeck});
    }
  }, [currentDeck]);

  // Set up template data if provided
  useEffect(() => {
    if (id === 'new' && currentTemplate) {
      const templateSlides = currentTemplate.slides.map(slide => ({
        ...slide,
        id: slide.id || slide.title.toLowerCase().replace(/\s+/g, '-'),
        notes: slide.notes || '',
        template: slide.template || ''
      }));
      
      setNewDeckData({
        title: 'New Deck from Template',
        sector: currentTemplate.sector,
        slides: templateSlides
      });
      
      setSector(currentTemplate.sector);
    }
  }, [currentTemplate, id]);

  // Handle errors from context
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSectorChange = async (newSector: string) => {
    setSector(newSector);
    
    // Update sector in current deck or new deck data
    if (id === 'new') {
      setNewDeckData(prev => ({
        ...prev,
        sector: newSector
      }));
    } else if (localDeckData) {
      // Fix: Check if localDeckData is not null before updating
      setLocalDeckData(prev => ({
        ...prev!,  // Use non-null assertion since we've checked it's not null
        sector: newSector
      }));
    }
    
    // Get AI suggestions based on sector change
    await fetchAISuggestions(newSector);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const updateSlide = (updatedContent: string) => {
    if (id === 'new') {
      // Update slide in new deck data
      const updatedSlides = [...newDeckData.slides];
      updatedSlides[currentSlideIndex] = {
        ...updatedSlides[currentSlideIndex],
        content: updatedContent
      };
      
      setNewDeckData(prev => ({
        ...prev,
        slides: updatedSlides
      }));
    } else if (localDeckData) {
      // Update slide in existing deck
      const updatedSlides = [...localDeckData.slides];
      updatedSlides[currentSlideIndex] = {
        ...updatedSlides[currentSlideIndex],
        content: updatedContent
      };
      
      setLocalDeckData(prev => ({
        ...prev!,  // Non-null assertion since we've checked it's not null
        slides: updatedSlides
      }));
    }
  };

  const saveDeck = async () => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to save a deck');
      navigate('/login');
      return;
    }
    
    try {
      setSaving(true);
      
      if (id === 'new') {
        // Create new deck
        const deckToCreate = {
          title: newDeckData.title,
          sector: sector || newDeckData.sector,
          slides: newDeckData.slides
        };
        
        const createdDeck = await createDeck(deckToCreate);
        navigate(`/builder/${createdDeck._id}`);
        toast.success('Pitch deck created successfully');
      } else if (localDeckData) {
        // Update existing deck
        const deckToUpdate = {
          title: localDeckData.title,
          sector: sector || localDeckData.sector,
          slides: localDeckData.slides
        };
        
        await updateDeck(localDeckData._id, deckToUpdate);
        toast.success('Pitch deck saved successfully');
      }
    } catch (error) {
      console.error('Failed to save pitch deck:', error);
      toast.error('Failed to save pitch deck');
    } finally {
      setSaving(false);
    }
  };

  const fetchAISuggestions = async (selectedSector?: string) => {
    const currentSector = selectedSector || sector;
    
    if (!currentSector) {
      toast.warning('Please select a sector first');
      return;
    }
    
    try {
      const currentSlide = localDeckData 
        ? localDeckData.slides[currentSlideIndex] 
        : newDeckData.slides[currentSlideIndex];
      
      const response = await getSuggestions(
        currentSector,
        currentSlide.id,
        currentSlide.content
      );
      
      setAiSuggestions(response.suggestions);
      setShowAIAssistant(true);
    } catch (error) {
      console.error('Failed to get AI suggestions:', error);
      toast.error('Failed to get AI suggestions');
    }
  };

  const applyAISuggestion = () => {
    updateSlide(aiSuggestions);
    setShowAIAssistant(false);
  };

  // Display loader while data is being fetched
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
        <p className="ml-2">Loading pitch deck...</p>
      </div>
    );
  }

  // Determine which deck data to use (new or existing)
  const deckData = id === 'new' ? {
    _id: 'new',
    title: newDeckData.title,
    slides: newDeckData.slides,
    sector: sector || newDeckData.sector
  } : localDeckData;

  // Display message if deck is not found
  if (!deckData && id !== 'new') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-gray-600">Deck not found or still loading...</p>
          <Button 
            className="mt-4" 
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text"
          value={deckData?.title || ''}
          onChange={(e) => {
            if (id === 'new') {
              setNewDeckData(prev => ({...prev, title: e.target.value}));
            } else if (localDeckData) {
              setLocalDeckData(prev => ({...prev!, title: e.target.value}));
            }
          }}
          className="text-2xl font-bold border-0 focus:ring-0 focus:border-b-2 focus:border-blue-500"
          placeholder="Deck Title"
        />
        <div className="flex space-x-2">
          <Button onClick={saveDeck} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Deck
          </Button>
          {/* Use the ExportOptions component when we have a valid deck */}
          {deckData && id !== 'new' && (
            <ExportOptions deckId={deckData._id} title={deckData.title} />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <SectorSelector 
            selectedSector={sector || deckData?.sector || ''} 
            sectors={DEFAULT_SECTORS}
            onChange={handleSectorChange} 
          />
          {deckData && (
            <SlideNavigation 
              slides={deckData.slides} 
              currentIndex={currentSlideIndex}
              onSlideSelect={handleSlideChange}
            />
          )}
          <Button 
            onClick={() => fetchAISuggestions()}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
          >
            Get AI Suggestions
          </Button>
        </div>
        
        <div className="col-span-12 md:col-span-9">
          {deckData && deckData.slides && deckData.slides.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">{deckData.slides[currentSlideIndex]?.title || 'Slide'}</h2>
              <SlideEditor 
                content={deckData.slides[currentSlideIndex]?.content || ''} 
                onChange={updateSlide}
                slideType={deckData.slides[currentSlideIndex]?.id || ''}
                sector={sector || deckData.sector || ''}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex justify-center items-center h-64">
              <p className="text-gray-500">No slides available. Select a template or create slides.</p>
            </div>
          )}
          
          {showAIAssistant && (
            <AIAssistant 
              suggestions={aiSuggestions}
              onApply={applyAISuggestion}
              onClose={() => setShowAIAssistant(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PitchDeckBuilder;