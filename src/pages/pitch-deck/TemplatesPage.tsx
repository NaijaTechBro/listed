// // src/pages/Templates.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Button } from '../../components/ui/pitch/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/pitch/card';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/pitch/select';
// import { useAuth } from '../../context/AuthContext';
// import { Loader2, Copy, Eye } from 'lucide-react';

// interface Template {
//   id: string;
//   title: string;
//   description: string;
//   sector: string;
//   thumbnailUrl: string;
//   slideCount: number;
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   popularity: number;
// }

// const TemplatesPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useUser();
//   const [loading, setLoading] = useState(true);
//   const [templates, setTemplates] = useState<Template[]>([]);
//   const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
//   const [selectedSector, setSelectedSector] = useState<string>('all');
//   const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
//   const [sortBy, setSortBy] = useState<string>('popularity');
  
//   const sectors = ['all', 'fintech', 'agritech', 'healthtech', 'edtech', 'ecommerce', 'cleantech', 'proptech', 'saas'];
//   const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
//   const sortOptions = [
//     { value: 'popularity', label: 'Most Popular' },
//     { value: 'newest', label: 'Newest First' },
//     { value: 'slideCount', label: 'Slide Count' }
//   ];
  
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('/api/templates');
//         setTemplates(response.data);
//       } catch (error) {
//         toast.error('Failed to load templates');
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchTemplates();
//   }, []);
  
//   useEffect(() => {
//     // Filter templates based on selected filters
//     let filtered = [...templates];
    
//     if (selectedSector !== 'all') {
//       filtered = filtered.filter(template => template.sector === selectedSector);
//     }
    
//     if (selectedDifficulty !== 'all') {
//       filtered = filtered.filter(template => template.difficulty === selectedDifficulty);
//     }
    
//     // Sort templates based on selected sort option
//     if (sortBy === 'popularity') {
//       filtered.sort((a, b) => b.popularity - a.popularity);
//     } else if (sortBy === 'newest') {
//       // For demonstration, we'll use the id as a proxy for creation date
//       filtered.sort((a, b) => b.id.localeCompare(a.id));
//     } else if (sortBy === 'slideCount') {
//       filtered.sort((a, b) => b.slideCount - a.slideCount);
//     }
    
//     setFilteredTemplates(filtered);
//   }, [templates, selectedSector, selectedDifficulty, sortBy]);
  
//   const handleUseTemplate = (templateId: string) => {
//     if (!user) {
//       toast.info('Please login to use this template');
//       navigate('/login');
//       return;
//     }
    
//     navigate(`/builder/new?template=${templateId}`);
//   };
  
//   const handlePreviewTemplate = (templateId: string) => {
//     navigate(`/templates/preview/${templateId}`);
//   };
  
//   const renderDifficultyBadge = (difficulty: string) => {
//     const colorMap = {
//       beginner: 'bg-green-100 text-green-800',
//       intermediate: 'bg-yellow-100 text-yellow-800',
//       advanced: 'bg-red-100 text-red-800'
//     };
    
//     return (
//       <span className={`text-xs px-2 py-1 rounded-full ${colorMap[difficulty as keyof typeof colorMap]}`}>
//         {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//       </span>
//     );
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Pitch Deck Templates</h1>
//         <p className="text-gray-600">
//           Choose from our library of professionally designed pitch deck templates tailored for African startups.
//           Each template includes slide structures and content suggestions to help you create a compelling pitch.
//         </p>
//       </div>
      
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-2">Sector</label>
//             <Select value={selectedSector} onValueChange={setSelectedSector}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a sector" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {sectors.map((sector) => (
//                     <SelectItem key={sector} value={sector}>
//                       {sector === 'all' ? 'All Sectors' : sector.charAt(0).toUpperCase() + sector.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2">Difficulty Level</label>
//             <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select difficulty" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {difficulties.map((difficulty) => (
//                     <SelectItem key={difficulty} value={difficulty}>
//                       {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2">Sort By</label>
//             <Select value={sortBy} onValueChange={setSortBy}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   {sortOptions.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>
      
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <Loader2 className="h-8 w-8 animate-spin" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTemplates.length > 0 ? (
//             filteredTemplates.map((template) => (
//               <Card key={template.id} className="overflow-hidden">
//                 <div className="aspect-[16/9] bg-gray-100 relative">
//                   {template.thumbnailUrl ? (
//                     <img 
//                       src={template.thumbnailUrl} 
//                       alt={template.title} 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                       <span className="text-gray-400">{template.title}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 <CardHeader>
//                   <div className="flex justify-between items-start">
//                     <CardTitle>{template.title}</CardTitle>
//                     {renderDifficultyBadge(template.difficulty)}
//                   </div>
//                 </CardHeader>
                
//                 <CardContent>
//                   <p className="text-gray-600 text-sm mb-2">{template.description}</p>
//                   <div className="flex items-center text-sm text-gray-500 space-x-4">
//                     <span>{template.slideCount} slides</span>
//                     <span>{template.sector.charAt(0).toUpperCase() + template.sector.slice(1)}</span>
//                   </div>
//                 </CardContent>
                
//                 <CardFooter className="flex justify-between">
//                   <Button variant="outline" size="sm" onClick={() => handlePreviewTemplate(template.id)}>
//                     <Eye className="h-4 w-4 mr-2" />
//                     Preview
//                   </Button>
//                   <Button size="sm" onClick={() => handleUseTemplate(template.id)}>
//                     <Copy className="h-4 w-4 mr-2" />
//                     Use Template
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))
//           ) : (
//             <div className="col-span-full text-center p-12 bg-gray-50 rounded-lg">
//               <p className="text-lg font-medium">No templates found</p>
//               <p className="text-gray-600 mt-2">Try adjusting your filters to see more results</p>
//             </div>
//           )}
//         </div>
//       )}
      
//       <div className="mt-12 bg-blue-50 rounded-lg p-6">
//         <h2 className="text-xl font-bold mb-2">Need a Custom Template?</h2>
//         <p className="mb-4">
//           Our team of experts can create a custom pitch deck template tailored specifically for your African startup's needs.
//         </p>
//         <Button>Request Custom Template</Button>
//       </div>
//     </div>
//   );
// };

// export default TemplatesPage;





// src/pages/Templates.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/pitch/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/pitch/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/pitch/select';
import { useAuth } from '../../context/AuthContext';
import { usePitchDeck } from '../../context/PitchDeckContext';
import { Loader2, Copy, Eye } from 'lucide-react';

interface Template {
  _id: string;
  name: string;
  description: string;
  sector: string;
  slides: any[];
  isDefault: boolean;
  // Additional UI properties we'll calculate
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  popularity?: number;
  thumbnailUrl?: string;
}

const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { templates, getTemplates, loading, error } = usePitchDeck();
  
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  
  const sectors = ['all', 'fintech', 'agritech', 'healthtech', 'edtech', 'ecommerce', 'cleantech', 'proptech', 'saas'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'slideCount', label: 'Slide Count' }
  ];
  
  useEffect(() => {
    // Fetch templates using the context method
    const fetchTemplates = async () => {
      try {
        await getTemplates();
      } catch (error) {
        toast.error('Failed to load templates');
        console.error(error);
      }
    };
    
    fetchTemplates();
  }, [getTemplates]);
  
  // Display error from context if it exists
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  // Transform templates to add UI properties
  const processedTemplates = templates.map(template => {
    // Calculate difficulty based on number of slides or complexity
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
    if (template.slides.length > 10) {
      difficulty = 'intermediate';
    }
    if (template.slides.length > 15) {
      difficulty = 'advanced';
    }
    
    // For demo, use random number for popularity
    const popularity = Math.floor(Math.random() * 100);
    
    return {
      ...template,
      difficulty,
      popularity,
      // We could generate a thumbnail based on the template content
      thumbnailUrl: undefined
    };
  });
  
  useEffect(() => {
    // Filter templates based on selected filters
    let filtered = [...processedTemplates];
    
    if (selectedSector !== 'all') {
      filtered = filtered.filter(template => template.sector === selectedSector);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(template => template.difficulty === selectedDifficulty);
    }
    
    // Sort templates based on selected sort option
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === 'newest') {
      // For demonstration, we'll use the id as a proxy for creation date
      filtered.sort((a, b) => b._id.localeCompare(a._id));
    } else if (sortBy === 'slideCount') {
      filtered.sort((a, b) => b.slides.length - a.slides.length);
    }
    
    setFilteredTemplates(filtered);
  }, [processedTemplates, selectedSector, selectedDifficulty, sortBy]);
  
  const handleUseTemplate = (templateId: string) => {
    if (!isAuthenticated) {
      toast.info('Please login to use this template');
      navigate('/login');
      return;
    }
    
    navigate(`/builder/new?template=${templateId}`);
  };
  
  const handlePreviewTemplate = (templateId: string) => {
    navigate(`/templates/preview/${templateId}`);
  };
  
  const renderDifficultyBadge = (difficulty: string) => {
    const colorMap = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colorMap[difficulty as keyof typeof colorMap]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pitch Deck Templates</h1>
        <p className="text-gray-600">
          Choose from our library of professionally designed pitch deck templates tailored for African startups.
          Each template includes slide structures and content suggestions to help you create a compelling pitch.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sector</label>
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
          
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Card key={template._id} className="overflow-hidden">
                <div className="aspect-[16/9] bg-gray-100 relative">
                  {template.thumbnailUrl ? (
                    <img 
                      src={template.thumbnailUrl} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">{template.name}</span>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{template.name}</CardTitle>
                    {template.difficulty && renderDifficultyBadge(template.difficulty)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{template.slides.length} slides</span>
                    <span>{template.sector.charAt(0).toUpperCase() + template.sector.slice(1)}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handlePreviewTemplate(template._id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleUseTemplate(template._id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center p-12 bg-gray-50 rounded-lg">
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-gray-600 mt-2">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Need a Custom Template?</h2>
        <p className="mb-4">
          Our team of experts can create a custom pitch deck template tailored specifically for your African startup's needs.
        </p>
        <Button>Request Custom Template</Button>
      </div>
    </div>
  );
};

export default TemplatesPage;