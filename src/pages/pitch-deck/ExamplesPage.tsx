// src/pages/Examples.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/pitch/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/pitch/card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/pitch/tab';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/pitch/select';
import { useAuth } from '../../context/AuthContext';
import { usePitchDeck } from '../../context/PitchDeckContext';
import { Loader2, Copy, ExternalLink } from 'lucide-react';

// Define interfaces aligned with the PitchDeckContext
interface Slide {
  id: string;
  title: string;
  content: string;
  notes?: string;
  order: number;
  template?: string;
}

interface Template {
  _id: string;
  name: string;
  sector: string;
  description: string;
  slides: Slide[];
  isDefault: boolean;
}

// Interface for our UI representation of templates
interface ExampleDeck {
  _id: string;
  title: string;
  sector: string;
  description: string;
  thumbnailUrl: string;
  slidesPreview: { title: string; content: string }[];
}

const ExamplesPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    getTemplates, 
    templates, 
    loading, 
    error, 
    createDeck,
    clearError 
  } = usePitchDeck();
  
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [activeDeck, setActiveDeck] = useState<ExampleDeck | null>(null);
  const [previewSlideIndex, setPreviewSlideIndex] = useState(0);
  const [exampleDecks, setExampleDecks] = useState<ExampleDeck[]>([]);
  const { isAuthenticated } = useAuth();
  
  const sectors = ['all', 'fintech', 'agritech', 'healthtech', 'edtech', 'ecommerce', 'cleantech', 'proptech', 'saas'];
  
  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Fetch templates when sector changes
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Pass undefined if 'all' is selected to get all templates
        await getTemplates(selectedSector !== 'all' ? selectedSector : undefined);
      } catch (error) {
        // Error handling is done in the context, so we don't need to handle it here
      }
    };
    
    fetchTemplates();
  }, [selectedSector, getTemplates]);

  // Transform templates to exampleDecks format when templates change
  useEffect(() => {
    if (templates && templates.length > 0) {
      // Map templates to our UI-friendly format
      const formattedDecks = templates.map((template: Template) => ({
        _id: template._id,
        title: template.name,
        sector: template.sector,
        description: template.description || 'No description available',
        thumbnailUrl: '', // Add default or empty value
        slidesPreview: template.slides.map(slide => ({
          title: slide.title,
          content: slide.content || slide.template || ''
        }))
      }));
      
      setExampleDecks(formattedDecks);
      
      // Set active deck if none selected yet or if currently selected deck is no longer available
      if (formattedDecks.length > 0 && (!activeDeck || !formattedDecks.some(deck => deck._id === activeDeck._id))) {
        setActiveDeck(formattedDecks[0]);
        setPreviewSlideIndex(0); // Reset slide index when setting a new active deck
      }
    } else {
      setExampleDecks([]);
      setActiveDeck(null);
    }
  }, [templates, activeDeck]);

  // Handle errors from context
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError(); // Clear the error after displaying it
    }
  }, [error, clearError]);
  
  const handleDeckSelect = (deck: ExampleDeck) => {
    setActiveDeck(deck);
    setPreviewSlideIndex(0); // Reset slide index when selecting a new deck
  };
  
  const handleUseTemplate = async (deckId: string) => {
    if (!isAuthenticated) {
      toast.info('Please login to use this template');
      navigate('/login');
      return;
    }
    
    try {
      // Find the template to clone
      const templateToClone = templates.find((template: Template) => template._id === deckId);
      
      if (!templateToClone) {
        toast.error('Template not found');
        return;
      }
      
      // Create a new deck based on the template using context's createDeck function
      const newDeck = await createDeck({
        title: `${templateToClone.name} Copy`,
        sector: templateToClone.sector,
        slides: templateToClone.slides
      });
      
      toast.success('Example deck cloned to your account');
      navigate(`/builder/${newDeck._id}`);
    } catch (error) {
      // Error handling is done in the context
      // Additional specific UI feedback can be added here if needed
      console.error('Error cloning template:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Example Pitch Decks</h1>
        <p className="text-gray-600">
          Browse successful African startup pitch decks across different sectors. 
          Use them as inspiration or as a starting point for your own pitch deck.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Filter by Sector</h2>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector.charAt(0).toUpperCase() + sector.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {exampleDecks.map((deck) => (
                <Card 
                  key={deck._id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${activeDeck?._id === deck._id ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}
                  onClick={() => handleDeckSelect(deck)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle>{deck.title}</CardTitle>
                    <CardDescription>
                      Sector: {deck.sector.charAt(0).toUpperCase() + deck.sector.slice(1)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{deck.description}</p>
                  </CardContent>
                </Card>
              ))}
              
              {exampleDecks.length === 0 && !loading && (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p>No example decks found for this sector.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="w-full lg:w-2/3">
          {activeDeck ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">{activeDeck.title}</h2>
                <p className="text-gray-600 mt-2">{activeDeck.description}</p>
                
                <div className="mt-4 flex gap-3">
                  <Button 
                    onClick={() => handleUseTemplate(activeDeck._id)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Use This Template
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Example
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Preview Slides</h3>
                
                {activeDeck.slidesPreview && activeDeck.slidesPreview.length > 0 ? (
                  <Tabs value={previewSlideIndex.toString()} onValueChange={(value) => setPreviewSlideIndex(parseInt(value))}>
                    <TabsList className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                      {activeDeck.slidesPreview.map((slide, index) => (
                        <TabsTrigger 
                          key={index} 
                          value={index.toString()}
                          className="text-xs px-2"
                        >
                          {slide.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    <div className="mt-4">
                      <div className="aspect-[16/9] bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                        <div 
                          className="prose max-w-none" 
                          dangerouslySetInnerHTML={{ __html: activeDeck.slidesPreview[previewSlideIndex].content }}
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium">{activeDeck.slidesPreview[previewSlideIndex].title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          This slide demonstrates how to effectively present your {activeDeck.slidesPreview[previewSlideIndex].title.toLowerCase()} section. 
                          You can use this as a template for your own pitch deck.
                        </p>
                      </div>
                    </div>
                  </Tabs>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                    <p>No slides available for preview</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <p>Select an example deck to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;