// // import React, { useState, useRef, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useStartup } from '../../context/StartupContext';
// // import { Startup, FundingRound } from '../../types';

// // const CreateStartup: React.FC = () => {
// //   const navigate = useNavigate();
  
// //   // File input refs
// //   const logoInputRef = useRef<HTMLInputElement>(null);
  
// //   // Access startup context methods
// //   const { 
// //     createStartup,
// //     loading, 
// //     error, 
// //     clearStartupError,
// //     clearStartup
// //   } = useStartup();

// //   // Form sections management
// //   const [activeSection, setActiveSection] = useState<'basic' | 'location' | 'metrics' | 'social' | 'founders' | 'funding'>('basic');
// //   const sections = ['basic', 'location', 'metrics', 'social', 'founders', 'funding'];
  
// //   // Track section completion status
// //   const [sectionStatus, setSectionStatus] = useState<Record<string, boolean>>({
// //     basic: false,
// //     location: false,
// //     metrics: true, // Optional fields, so default to true
// //     social: true,  // Optional fields, so default to true
// //     founders: false,
// //     funding: true  // Optional fields, so default to true
// //   });
  
// //   // Revenue options matching the enum in Mongoose schema
// //   const revenueOptions = ['Pre-revenue', '$1K-$10K', '$10K-$100K', '$100K-$1M', '$1M-$10M', '$10M+', 'Undisclosed'];
  
// //   // File state for logo
// //   const [logoFile, setLogoFile] = useState<File | null>(null);
// //   const [logoPreview, setLogoPreview] = useState<string>('');
  
// //   // Initialize form data
// //   const [formData, setFormData] = useState<Omit<Startup, '_id' | 'createdBy' | 'isVerified' | 'createdAt' | 'updatedAt' | 'metrics.connections' | 'metrics.views'>>({
// //     name: '',
// //     logo: '',
// //     tagline: '',
// //     description: '',
// //     website: '',
// //     foundingDate: '',
// //     category: '',
// //     subCategory: '',
// //     country: '',
// //     city: '',
// //     stage: '',
// //     products: '',
// //     metrics: {
// //       fundingTotal: 0,
// //       employees: 1,
// //       connections: 0,
// //       views: 0,
// //       revenue: 'Undisclosed'
// //     },
// //     socialProfiles: {
// //       linkedin: '',
// //       twitter: '',
// //       facebook: '',
// //       instagram: ''
// //     },
// //     founders: [
// //       {
// //         name: '',
// //         role: '',
// //         linkedin: '',
// //         bio: ''
// //       }
// //     ],
// //     fundingRounds: []
// //   });

// //   // Form submission state
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
// //   // Global validation message
// //   const [showGlobalValidation, setShowGlobalValidation] = useState(false);
// //   const [incompleteTabsMessage, setIncompleteTabsMessage] = useState('');

// //   // Cleanup on unmount
// //   useEffect(() => {
// //     return () => {
// //       clearStartup();
// //       clearStartupError();
// //     };
// //   }, [clearStartup, clearStartupError]);

// //   // Handle logo file selection
// //   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const file = e.target.files[0];
// //       setLogoFile(file);
      
// //       // Create a preview URL
// //       const previewUrl = URL.createObjectURL(file);
// //       setLogoPreview(previewUrl);
      
// //       // Clear any logo validation errors
// //       if (validationErrors.logo) {
// //         setValidationErrors(prev => {
// //           const updated = {...prev};
// //           delete updated.logo;
// //           return updated;
// //         });
// //       }
// //     }
// //   };

// //   // Handle form field changes
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
    
// //     // Clear validation error for this field when changed
// //     if (validationErrors[name]) {
// //       setValidationErrors(prev => {
// //         const updated = {...prev};
// //         delete updated[name];
// //         return updated;
// //       });
// //     }
    
// //     // Handle nested properties
// //     if (name.includes('.')) {
// //       const [parent, child] = name.split('.');
      
// //       setFormData(prev => {
// //         // Create a safe copy of the nested object, defaulting to empty object if undefined
// //         const parentObject = prev[parent as keyof typeof prev] || {};
        
// //         // Type guard to ensure we're dealing with an object
// //         if (typeof parentObject === 'object' && parentObject !== null) {
// //           return {
// //             ...prev,
// //             [parent]: {
// //               ...parentObject,
// //               [child]: parent === 'metrics' ? 
// //                 (child === 'fundingTotal' || child === 'employees' ? 
// //                   Number(value) : value) : 
// //                 value
// //             }
// //           };
// //         }
// //         return prev;
// //       });
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // Founder change handler
// //   const handleFounderChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     const newFounders = [...formData.founders];
// //     newFounders[index] = {
// //       ...newFounders[index],
// //       [name]: value
// //     };
    
// //     setFormData(prev => ({
// //       ...prev,
// //       founders: newFounders
// //     }));
    
// //     // Clear validation errors for this field
// //     const errorKey = `founders[${index}].${name}`;
// //     if (validationErrors[errorKey]) {
// //       setValidationErrors(prev => {
// //         const updated = {...prev};
// //         delete updated[errorKey];
// //         return updated;
// //       });
// //     }
// //   };

// //   // Add new founder
// //   const addFounder = () => {
// //     setFormData(prev => ({
// //       ...prev,
// //       founders: [...prev.founders, { name: '', role: '', linkedin: '', bio: '' }]
// //     }));
// //   };

// //   // Remove founder
// //   const removeFounder = (index: number) => {
// //     if (formData.founders.length > 1) {
// //       const newFounders = [...formData.founders];
// //       newFounders.splice(index, 1);
      
// //       setFormData(prev => ({
// //         ...prev,
// //         founders: newFounders
// //       }));
// //     }
// //   };

// //   // Funding round handlers
// //   const handleFundingRoundChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     const newRounds = [...(formData.fundingRounds || [])];
    
// //     newRounds[index] = {
// //       ...newRounds[index],
// //       [name]: name === 'amount' || name === 'valuation' ? parseFloat(value) : value
// //     };
    
// //     setFormData(prev => ({
// //       ...prev,
// //       fundingRounds: newRounds
// //     }));
    
// //     // Clear validation errors
// //     const errorKey = `fundingRounds[${index}].${name}`;
// //     if (validationErrors[errorKey]) {
// //       setValidationErrors(prev => {
// //         const updated = {...prev};
// //         delete updated[errorKey];
// //         return updated;
// //       });
// //     }
// //   };

// //   // Add funding round
// //   const addFundingRound = () => {
// //     const newRound: FundingRound = {
// //       stage: '',
// //       date: '',
// //       amount: 0,
// //       valuation: 0,
// //       investors: [],
// //       notes: ''
// //     };
    
// //     setFormData(prev => ({
// //       ...prev,
// //       fundingRounds: [...(prev.fundingRounds || []), newRound]
// //     }));
// //   };

// //   // Remove funding round
// //   const removeFundingRound = (index: number) => {
// //     const newRounds = [...(formData.fundingRounds || [])];
// //     newRounds.splice(index, 1);
    
// //     setFormData(prev => ({
// //       ...prev,
// //       fundingRounds: newRounds
// //     }));
// //   };

// //   // Handle investors for funding rounds
// //   const handleInvestorsChange = (roundIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { value } = e.target;
// //     const investors = value.split(',').map(inv => inv.trim());
    
// //     const newRounds = [...(formData.fundingRounds || [])];
// //     newRounds[roundIndex] = {
// //       ...newRounds[roundIndex],
// //       investors: investors
// //     };
    
// //     setFormData(prev => ({
// //       ...prev,
// //       fundingRounds: newRounds
// //     }));
// //   };

// //   // Validate specific section
// //   const validateSection = (section: string): boolean => {
// //     const errors: Record<string, string> = {};
// //     let isValid = true;
    
// //     switch(section) {
// //       case 'basic':
// //         if (!formData.name) {
// //           errors.name = 'Startup name is required';
// //           isValid = false;
// //         }
// //         if (!formData.tagline) {
// //           errors.tagline = 'Tagline is required';
// //           isValid = false;
// //         }
// //         if (formData.tagline.length > 100) {
// //           errors.tagline = 'Tagline must be less than 100 characters';
// //           isValid = false;
// //         }
// //         if (!formData.description) {
// //           errors.description = 'Description is required';
// //           isValid = false;
// //         }
// //         if (formData.logo && !logoFile && !/^https?:\/\/.+/.test(formData.logo)) {
// //           errors.logo = 'Please enter a valid URL or upload an image';
// //           isValid = false;
// //         }
// //         if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
// //           errors.website = 'Please enter a valid URL';
// //           isValid = false;
// //         }
// //         if (!formData.category) {
// //           errors.category = 'Category is required';
// //           isValid = false;
// //         }
// //         if (!formData.stage) {
// //           errors.stage = 'Stage is required';
// //           isValid = false;
// //         }
// //         break;
        
// //       case 'location':
// //         if (!formData.country) {
// //           errors.country = 'Country is required';
// //           isValid = false;
// //         }
// //         break;
        
// //       case 'social':
// //         Object.entries(formData.socialProfiles).forEach(([key, value]) => {
// //           if (value && !/^https?:\/\/.+/.test(value)) {
// //             errors[`socialProfiles.${key}`] = 'Please enter a valid URL';
// //             isValid = false;
// //           }
// //         });
// //         break;
        
// //       case 'founders':
// //         let hasValidFounder = false;
// //         formData.founders.forEach((founder, index) => {
// //           if (founder.name) {
// //             hasValidFounder = true;
// //           }
// //           if (founder.linkedin && !/^https?:\/\/.+/.test(founder.linkedin)) {
// //             errors[`founders[${index}].linkedin`] = 'Please enter a valid LinkedIn URL';
// //             isValid = false;
// //           }
// //         });
// //         if (!hasValidFounder) {
// //           errors['founders[0].name'] = 'At least one founder name is required';
// //           isValid = false;
// //         }
// //         break;
        
// //       case 'funding':
// //         formData.fundingRounds?.forEach((round, index) => {
// //           if (round.stage) {
// //             if (round.amount && round.amount < 0) {
// //               errors[`fundingRounds[${index}].amount`] = 'Amount cannot be negative';
// //               isValid = false;
// //             }
// //             if (round.valuation && round.valuation < 0) {
// //               errors[`fundingRounds[${index}].valuation`] = 'Valuation cannot be negative';
// //               isValid = false;
// //             }
// //           }
// //         });
// //         break;
// //     }
    
// //     // Update validation errors
// //     setValidationErrors(prev => ({
// //       ...prev,
// //       ...errors
// //     }));
    
// //     // Update section status
// //     setSectionStatus(prev => ({
// //       ...prev,
// //       [section]: isValid
// //     }));
    
// //     return isValid;
// //   };

// //   // Validate all sections
// //   const validateForm = (): boolean => {
// //     // Reset all section statuses to re-validate everything
// //     setShowGlobalValidation(true);
    
// //     const basicValid = validateSection('basic');
// //     const locationValid = validateSection('location');
// //     const metricsValid = validateSection('metrics');
// //     const socialValid = validateSection('social');
// //     const foundersValid = validateSection('founders');
// //     const fundingValid = validateSection('funding');
    
// //     // Create message about incomplete tabs
// //     const incompleteTabs = [];
// //     if (!basicValid) incompleteTabs.push('Basic Information');
// //     if (!locationValid) incompleteTabs.push('Location');
// //     if (!metricsValid) incompleteTabs.push('Metrics');
// //     if (!socialValid) incompleteTabs.push('Social Profiles');
// //     if (!foundersValid) incompleteTabs.push('Founders');
// //     if (!fundingValid) incompleteTabs.push('Funding');
    
// //     if (incompleteTabs.length > 0) {
// //       setIncompleteTabsMessage(`Please complete the required fields in the following tabs: ${incompleteTabs.join(', ')}`);
// //       return false;
// //     }
    
// //     return true;
// //   };

// //   // Next section handler
// //   const goToNextSection = () => {
// //     const currentSectionIndex = sections.indexOf(activeSection);
// //     if (currentSectionIndex < sections.length - 1) {
// //       if (validateSection(activeSection)) {
// //         setActiveSection(sections[currentSectionIndex + 1] as typeof activeSection);
// //       }
// //     }
// //   };

// //   // Previous section handler
// //   const goToPrevSection = () => {
// //     const currentSectionIndex = sections.indexOf(activeSection);
// //     if (currentSectionIndex > 0) {
// //       setActiveSection(sections[currentSectionIndex - 1] as typeof activeSection);
// //     }
// //   };

// //   // Form submission handler
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       return;
// //     }
    
// //     setIsSubmitting(true);
    
// //     try {
// //       // Create a FormData object for submission
// //       const startupFormData = new FormData();
      
// //       // Add the logo file if one was selected
// //       if (logoFile) {
// //         startupFormData.append('logo', logoFile);
// //       } else if (formData.logo) {
// //         // If no new file but URL exists, pass it in formData
// //         startupFormData.append('logoUrl', formData.logo);
// //       }
      
// //       // Append simple string fields
// //       startupFormData.append('name', formData.name);
// //       startupFormData.append('tagline', formData.tagline);
// //       startupFormData.append('description', formData.description);
// //       startupFormData.append('website', formData.website);
// //       startupFormData.append('foundingDate', formData.foundingDate);
// //       startupFormData.append('category', formData.category);
// //       startupFormData.append('subCategory', formData.subCategory);
// //       startupFormData.append('country', formData.country);
// //       startupFormData.append('city', formData.city);
// //       startupFormData.append('stage', formData.stage);
      
// //       // Append metrics as JSON string
// //       startupFormData.append('metrics', JSON.stringify({
// //         fundingTotal: Number(formData.metrics.fundingTotal),
// //         employees: Number(formData.metrics.employees),
// //         revenue: formData.metrics.revenue
// //       }));
      
// //       // Append socialProfiles as JSON string
// //       startupFormData.append('socialProfiles', JSON.stringify(formData.socialProfiles));
      
// //       // Append founders as JSON string
// //       startupFormData.append('founders', JSON.stringify(formData.founders));
      
// //       // Append fundingRounds as JSON string
// //       startupFormData.append('fundingRounds', JSON.stringify(formData.fundingRounds));
      
// //       const response = await createStartup(startupFormData);
// //       // Assuming the response contains the created startup with its ID
// //       const newStartupId = response?.data?._id;
// //       navigate(newStartupId ? `/startup-profile/${newStartupId}` : '/dashboard/my-startups');
// //     } catch (err) {
// //       console.error('Error submitting form:', err);
// //       // Error is handled by the context
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Navigation between form sections
// //   const navigateToSection = (section: typeof activeSection) => {
// //     setActiveSection(section);
// //   };

// //   // Categories for dropdown
// //   const categories = [
// //     'SaaS', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 
// //     'AI/ML', 'Blockchain', 'Cleantech', 'Hardware', 'Marketplaces',
// //     'Consumer Apps', 'Enterprise Software', 'IoT', 'Gaming', 'Travelling', 'Other'
// //   ];

// //   // Stages for dropdown
// //   const stages = [
// //     'Idea', 'MVP','Pre-seed', 'Seed', 'Series A', 'Series B', 
// //     'Series C', 'Series D+', 'Profitable', 'Acquired', 'IPO'
// //   ];

// //   // Funding round stages
// //   const fundingStages = [
// //     'Pre-seed', 'Seed', 'Series A', 'Series B', 
// //     'Series C', 'Series D', 'Series E+', 'Convertible Note', 
// //     'Angel', 'Grant', 'Crowdfunding', 'Other'
// //   ];

// //   // Trigger logo file input click
// //   const triggerLogoUpload = () => {
// //     if (logoInputRef.current) {
// //       logoInputRef.current.click();
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-8">
// //       {/* Progress indicator */}
// //       <div className="mb-6">
// //         <div className="flex flex-wrap gap-2">
// //           {sections.map((section) => (
// //             <button
// //               key={section}
// //               type="button"
// //               onClick={() => navigateToSection(section as typeof activeSection)}
// //               className={`px-4 py-2 rounded-md ${
// //                 activeSection === section 
// //                   ? 'bg-black text-white' 
// //                   : 'bg-gray-200 text-gray-700'
// //               } ${
// //                 sectionStatus[section] ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
// //               }`}
// //             >
// //               {section.charAt(0).toUpperCase() + section.slice(1)}
// //               {sectionStatus[section] ? ' ✓' : ' !'} 
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Display any API errors at the top */}
// //       {error && (
// //         <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-6">
// //           <p className="text-red-600">{error}</p>
// //         </div>
// //       )}
      
// //       {/* Global validation message */}
// //       {showGlobalValidation && incompleteTabsMessage && (
// //         <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-6">
// //           <p className="text-yellow-700">{incompleteTabsMessage}</p>
// //         </div>
// //       )}
      
// //       {/* Basic Information Section */}
// //       <div className={activeSection === 'basic' ? 'block' : 'hidden'}>
// //         <div className="border-b border-gray-200 pb-6">
// //           <h3 className="text-xl font-semibold mb-4 text-black">Basic Information</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Startup Name*
// //               </label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 required
// //                 className={`w-full px-4 py-3 border ${validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="Enter startup name"
// //               />
// //               {validationErrors.name && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Logo
// //               </label>
// //               <div className="flex items-start space-x-4">
// //                 <div className="flex-1">
// //                   {/* Hidden file input */}
// //                   <input
// //                     type="file"
// //                     ref={logoInputRef}
// //                     onChange={handleLogoChange}
// //                     accept="image/*"
// //                     className="hidden"
// //                   />
                  
// //                   {/* Custom file upload button */}
// //                   <button
// //                     type="button"
// //                     onClick={triggerLogoUpload}
// //                     className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg border border-gray-300 w-full flex items-center justify-center"
// //                   >
// //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
// //                       <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
// //                     </svg>
// //                     Upload Logo
// //                   </button>
                  
// //                   {/* Text input for URL (Alternative) */}
// //                   <div className="mt-2">
// //                     <input
// //                       type="url"
// //                       name="logo"
// //                       value={formData.logo}
// //                       onChange={handleChange}
// //                       className={`w-full px-4 py-3 border ${validationErrors.logo ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                       placeholder="Or enter logo URL: https://..."
// //                     />
// //                   </div>
// //                 </div>
                
// //                 {/* Logo preview */}
// //                 {logoPreview && (
// //                   <div className="w-16 h-16 overflow-hidden rounded-md border border-gray-300">
// //                     <img 
// //                       src={logoPreview} 
// //                       alt="Logo preview" 
// //                       className="w-full h-full object-cover" 
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //               {validationErrors.logo && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.logo}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Tagline* <span className="text-xs text-gray-500">(max 100 chars)</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 name="tagline"
// //                 value={formData.tagline}
// //                 onChange={handleChange}
// //                 required
// //                 maxLength={100}
// //                 className={`w-full px-4 py-3 border ${validationErrors.tagline ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="One-line description of your startup"
// //               />
// //               {validationErrors.tagline && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.tagline}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Website
// //               </label>
// //               <input
// //                 type="url"
// //                 name="website"
// //                 value={formData.website}
// //                 onChange={handleChange}
// //                 className={`w-full px-4 py-3 border ${validationErrors.website ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="https://..."
// //               />
// //               {validationErrors.website && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.website}</p>
// //               )}
// //             </div>
            
// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Description*
// //               </label>
// //               <textarea
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleChange}
// //                 required
// //                 rows={4}
// //                 className={`w-full px-4 py-3 border ${validationErrors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="Describe your startup in detail"
// //               />
// //               {validationErrors.description && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Category*
// //               </label>
// //               <select
// //                 name="category"
// //                 value={formData.category}
// //                 onChange={handleChange}
// //                 required
// //                 className={`w-full px-4 py-3 border ${validationErrors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //               >
// //                 <option value="">Select Category</option>
// //                 {categories.map(category => (
// //                   <option key={category} value={category}>{category}</option>
// //                 ))}
// //               </select>
// //               {validationErrors.category && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Sub-Category
// //               </label>
// //               <input
// //                 type="text"
// //                 name="subCategory"
// //                 value={formData.subCategory}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //                 placeholder="E.g., Marketing Automation, HR Tech"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Stage*
// //               </label>
// //               <select
// //                 name="stage"
// //                 value={formData.stage}
// //                 onChange={handleChange}
// //                 required
// //                 className={`w-full px-4 py-3 border ${validationErrors.stage ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200`}
// //               >
// //                 <option value="">Select Stage</option>
// //                 {stages.map(stage => (
// //                   <option key={stage} value={stage}>{stage}</option>
// //                 ))}
// //               </select>
// //               {validationErrors.stage && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors.stage}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Founding Date
// //               </label>
// //               <input
// //                 type="date"
// //                 name="foundingDate"
// //                 value={formData.foundingDate}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Products/Services
// //               </label>
// //               <textarea
// //                 name="products"
// //                 value={formData.products}
// //                 onChange={handleChange}
// //                 rows={3}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //                 placeholder="List your products or services"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Next Button */}
// //         <div className="flex justify-end mt-4">
// //           <button
// //             type="button"
// //             onClick={goToNextSection}
// //             className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
        
// //       {/* Location Section */}
// //       <div className={activeSection === 'location' ? 'block' : 'hidden'}>
// //         <div className="border-b border-gray-200 pb-6">
// //           <h3 className="text-xl font-semibold mb-4 text-black">Location</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Country*
// //               </label>
// //               <input
// //                 type="text"
// //                 name="country"
// //                 value={formData.country}
// //                 onChange={handleChange}
// //                 required
// //                 className={`w-full px-4 py-3 border ${validationErrors.country ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="Enter country"
// //                 />
                








// //                 {validationErrors.country && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors.country}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-2">
// //                       City
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="city"
// //                       value={formData.city}
// //                       onChange={handleChange}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //                       placeholder="Enter city"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //                 {/* Navigation Buttons */}
// //                 <div className="flex justify-between mt-4">
// //                 <button
// //                   type="button"
// //                   onClick={goToPrevSection}
// //                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
// //                 >
// //                   Previous
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={goToNextSection}
// //                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
// //                 >
// //                   Next
// //                 </button>
// //                 </div>
// //           </div>
        
        
// //                     {/* Metrics Section */} 
// //               <div className={activeSection === 'metrics' ? 'block' : 'hidden'}>
// //                 <div className="border-b border-gray-200 pb-6">
// //                   <h3 className="text-xl font-semibold mb-4 text-black">Metrics</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Total Funding
// //                       </label>
// //                       <input
// //                         type="number"
// //                         name="metrics.fundingTotal"
// //                         value={formData.metrics.fundingTotal}
// //                         onChange={handleChange}
// //                         className={`w-full px-4 py-3 border ${validationErrors['metrics.fundingTotal'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                         placeholder="Enter total funding raised"
// //                       />
// //                       {validationErrors['metrics.fundingTotal'] && (
// //                         <p className="mt-1 text-sm text-red-600">{validationErrors['metrics.fundingTotal']}</p>
// //                       )}
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Number of Employees
// //                       </label>
// //                       <input
// //                         type="number"
// //                         name="metrics.employees"
// //                         value={formData.metrics.employees}
// //                         onChange={handleChange}
// //                         min="0"
// //                         className={`w-full px-4 py-3 border ${validationErrors['metrics.employees'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                         placeholder="Enter number of employees"
// //                       />
// //                       {validationErrors['metrics.employees'] && (
// //                         <p className="mt-1 text-sm text-red-600">{validationErrors['metrics.employees']}</p>
// //                       )}
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-2">
// //                         Annual Revenue Range
// //                       </label>
// //                       <select
// //                         name="metrics.revenue"
// //                         value={formData.metrics.revenue}
// //                         onChange={handleChange}
// //                         className={`w-full px-4 py-3 border ${validationErrors['metrics.revenue'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                       >
// //                         {revenueOptions.map(range => (
// //                           <option key={range} value={range}>{range}</option>
// //                         ))}   
// //                       </select>
// //                       {validationErrors['metrics.revenue'] && (
// //                         <p className="mt-1 text-sm text-red-600">{validationErrors['metrics.revenue']}</p>
// //                       )}
// //                       </div>
// //                     </div>

// //                   </div>
// //                   {/* Navigation Buttons */}
// //                 <div className="flex justify-between mt-4">
// //                 <button
// //                   type="button"
// //                   onClick={goToPrevSection}
// //                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
// //                 >
// //                   Previous
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={goToNextSection}
// //                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
// //                 >
// //                   Next
// //                 </button>
// //                 </div>
// //                   </div>
              
// //             {/* Social Profiles Section */}
// //       <div className={activeSection === 'social' ? 'block' : 'hidden'}>
// //         <div className="border-b border-gray-200 pb-6">
// //           <h3 className="text-xl font-semibold mb-4 text-black">Social Profiles</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 LinkedIn
// //               </label>
// //               <input
// //                 type="url"
// //                 name="socialProfiles.linkedin"
// //                 value={formData.socialProfiles.linkedin}
// //                 onChange={handleChange}
// //                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.linkedin'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="https://linkedin.com/company/..."
// //               />
// //               {validationErrors['socialProfiles.linkedin'] && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.linkedin']}</p>
// //               )}
// //             </div>  

// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Twitter
// //               </label>
// //               <input
// //                 type="url"
// //                 name="socialProfiles.twitter"
// //                 value={formData.socialProfiles.twitter}
// //                 onChange={handleChange}
// //                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.twitter'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="https://twitter.com/..."
// //               />
// //               {validationErrors['socialProfiles.twitter'] && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.twitter']}</p>
// //               )}
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Facebook
// //               </label>
// //               <input
// //                 type="url"
// //                 name="socialProfiles.facebook"
// //                 value={formData.socialProfiles.facebook}
// //                 onChange={handleChange}
// //                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.facebook'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="https://facebook.com/..."
// //               />
// //               {validationErrors['socialProfiles.facebook'] && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.facebook']}</p>
// //               )}
// //             </div>

// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Instagram
// //               </label>
// //               <input
// //                 type="url"
// //                 name="socialProfiles.instagram"
// //                 value={formData.socialProfiles.instagram}
// //                 onChange={handleChange}
// //                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.instagram'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                 placeholder="https://instagram.com/..."
// //               />
// //               {validationErrors['socialProfiles.instagram'] && (
// //                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.instagram']}</p>
// //               )}
// //             </div>
// //             </div>
// //             </div>
// //             {/* Navigation Buttons */}
// //             <div className="flex justify-between mt-4">
// //                 <button
// //                   type="button"
// //                   onClick={goToPrevSection}
// //                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
// //                 >
// //                   Previous
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={goToNextSection}
// //                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
// //                 >
// //                   Next
// //                 </button>
// //                 </div>
// //       </div>

        
// //         {/* Founders Section */}  
// //       <div className={activeSection === 'founders' ? 'block' : 'hidden'}>
// //         <div className="border-b border-gray-200 pb-6">
// //           <h3 className="text-xl font-semibold mb-4 text-black">Founders</h3>

// //           {formData.founders.map((founder, index) => (
// //             <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
// //                          <div className="flex justify-between items-center mb-4">
// //                            <h4 className="text-lg font-medium text-gray-800">Founder {index + 1}</h4>
// //                            {formData.founders.length > 1 && (
// //                               <button
// //                                 type="button"
// //                                 onClick={() => removeFounder(index)}
// //                                 className="text-red-500 hover:text-red-700 transition-colors duration-200"
// //                               >
// //                                 Remove
// //                               </button>
// //                             )}
// //                           </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Full Name*
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="name"
// //                   value={founder.name}
// //                   onChange={(e) => handleFounderChange(index, e)}
// //                   required
// //                   className={`w-full px-4 py-3 border ${validationErrors[`founders[${index}].name`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                   placeholder="Enter founder's name"
// //                 />
// //                 {validationErrors[`founders[${index}].name`] && (
// //                   <p className="mt-1 text-sm text-red-600">{validationErrors[`founders[${index}].name`]}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Role
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="role"
// //                   value={founder.role}
// //                   onChange={(e) => handleFounderChange(index, e)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //                   placeholder="CEO, CTO, etc."
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   LinkedIn
// //                 </label>
// //                 <input
// //                   type="url"
// //                   name="linkedin"
// //                   value={founder.linkedin}
// //                   onChange={(e) => handleFounderChange(index, e)}
// //                   className={`w-full px-4 py-3 border ${validationErrors[`founders[${index}].linkedin`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                   placeholder="https://linked.com/in/..."
// //                 />
// //                 {validationErrors[`founders[${index}].linkedin`] && (
// //                   <p className="mt-1 text-sm text-red-600">{validationErrors[`founders[${index}].linkedin`]}</p>
// //                 )}
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Bio
// //                 </label>
// //                 <textarea
// //                   name="bio"
// //                   value={founder.bio}
// //                   onChange={(e) => handleFounderChange(index, e)}
// //                   rows={3}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //                   placeholder="Short bio about the founder"
// //                 />
// //                 {validationErrors[`founders[${index}].bio`] && (
// //                   <p className="mt-1 text-sm text-red-600">{validationErrors[`founders[${index}].bio`]}</p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //           ))}
// //           <button
// //             type="button"
// //             onClick={addFounder}
// //             className="mt-4 flex items-center text-black hover:text-black transition-colors duration-200"
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
// //             </svg>
// //             Add Another Founder
// //           </button>
// //          </div>
// //          {/* Navigation Buttons */}
// //          <div className="flex justify-between mt-4">
// //                 <button
// //                   type="button"
// //                   onClick={goToPrevSection}
// //                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
// //                 >
// //                   Previous
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={goToNextSection}
// //                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
// //                 >
// //                   Next
// //                 </button>
// //                 </div>

      
// //        </div>

// //        {/* Funding Rounds Section */}
// //       <div className={activeSection === 'funding' ? 'block' : 'hidden'}>
// //         <div className="border-b border-gray-200 pb-6">
// //           <h3 className="text-xl font-semibold mb-4 text-black">Funding Rounds</h3>

// //           {formData.fundingRounds && formData.fundingRounds.map((round, index) => (
// //             <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
// //               <div className="flex justify-between items-center mb-4">
// //                 <h4 className="text-lg font-medium text-gray-800">Funding Round {index + 1}</h4>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeFundingRound(index)}
// //                     className="text-red-500 hover:text-red-700 transition-colors duration-200"
// //                   >
// //                     Remove
// //                   </button>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Stage *
// //                   </label>
// //                   <select
// //                     name="stage"
// //                     value={round.stage}
// //                     onChange={(e) => handleFundingRoundChange(index, e)}
// //                     required
// //                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].stage`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                   >
// //                     <option value="">Select Stage</option>
// //                     {fundingStages.map(stage => (
// //                       <option key={stage} value={stage}>{stage}</option>
// //                     ))}
// //                   </select>
// //                   {validationErrors[`fundingRounds[${index}].stage`] && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].stage`]}</p>
// //                   )}
// //                 </div>  

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     name="date"
// //                     value={round.date}
// //                     onChange={(e) => handleFundingRoundChange(index, e)}
// //                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].date`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                     placeholder="Enter date of funding round"
// //                   />
// //                   {validationErrors[`fundingRounds[${index}].date`] && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].date`]}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Amount Raised
// //                   </label>
// //                   <input
// //                     type="number"
// //                     name="amount"
// //                     value={round.amount}
// //                     onChange={(e) => handleFundingRoundChange(index, e)}
// //                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].amountRaised`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                     placeholder="Enter amount raised in this round"
// //                   />
// //                   {validationErrors[`fundingRounds[${index}].amountRaised`] && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].amountRaised`]}</p>
// //                   )}

// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Valuation (USD)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     name="valuation"
// //                     value={round.valuation || ''}
// //                     onChange={(e) => handleFundingRoundChange(index, e)}
// //                     min="0"
// //                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].valuation`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                     placeholder="Enter valuation in USD"
// //                   />
// //                   {validationErrors[`fundingRounds[${index}].valuation`] && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].valuation`]}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Investors
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="investors (comma separated)"
// //                     value={round.investors?.join(', ') || ''}
// //                     onChange={(e) => handleInvestorsChange(index, e)}
// //                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].investors`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
// //                     placeholder="List of investors"
// //                   />
// //                   {validationErrors[`fundingRounds[${index}].investors`] && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].investors`]}</p>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Notes
// //                   </label>
// //                   <textarea
// //                     name="notes"
// //                     value={round.notes || ''}
// //                     onChange={(e) => handleFundingRoundChange(index, e)}
// //                     rows={3}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
// //                     placeholder="Additional notes about the funding round"
// //                   />
// //                   {validationErrors[`fundingRounds[${index}].notes`] && (
// //                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].notes`]}</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //           <button
// //             type="button"
// //             onClick={addFundingRound}
// //             className="mt-4 flex items-center text-black hover:text-black transition-colors duration-200"
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
// //               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
// //             </svg>
// //             Add Funding Round
// //           </button>
// //         </div>

// //         <div className='flex justify-between pt-6'>
// //           <button
// //             type="button"
// //             onClick={() =>  navigate(-1)}
// //             className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
// //           >
// //             Cancel
// //           </button>
// //           {/* <button
// //             type="submit"
// //             disabled={isSubmitting || loading}
// //             className={`bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300 ${isSubmitting || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// //           >
// //             {(isSubmitting || loading) ? (
// //               <>
// //                 <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
// //                 <span>{isEditing ? 'Updating...' : 'Creating...'}</span>

// //               </>
// //             ) : (
// //               <span>{isEditing ? 'Update Startup' : 'List Startup'}</span>
// //             )}
// //           </button>  */}
// //         </div>
// //       </div>
// //       </form>
// //   );
// // };

// // export default CreateStartup;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useStartup } from '../../context/StartupContext';
// import { Startup, FundingRound } from '../../types';

// const StartupForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const isEditing = !!id;
  
//   // File input refs
//   const logoInputRef = useRef<HTMLInputElement>(null);
  
//   // Access startup context methods
//   const { 
//     createStartup, 
//     updateStartup, 
//     getStartup, 
//     startup, 
//     loading, 
//     error, 
//     clearStartupError,
//     clearStartup 
//   } = useStartup();

//   // Form sections management
//   const [activeSection, setActiveSection] = useState<'basic' | 'location' | 'metrics' | 'social' | 'founders' | 'funding'>('basic');
//   const sections = ['basic', 'location', 'metrics', 'social', 'founders', 'funding'];
  
//   // Track section completion status
//   const [sectionStatus, setSectionStatus] = useState<Record<string, boolean>>({
//     basic: false,
//     location: false,
//     metrics: true, // Optional fields, so default to true
//     social: true,  // Optional fields, so default to true
//     founders: false,
//     funding: true  // Optional fields, so default to true
//   });
  
//   // Revenue options matching the enum in Mongoose schema
//   const revenueOptions = ['Pre-revenue', '$1K-$10K', '$10K-$100K', '$100K-$1M', '$1M-$10M', '$10M+', 'Undisclosed'];
  
//   // File state for logo
//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [logoPreview, setLogoPreview] = useState<string>('');
  
//   // Initialize form data
//   const [formData, setFormData] = useState<Omit<Startup, '_id' | 'createdBy' | 'isVerified' | 'createdAt' | 'updatedAt' | 'metrics.connections' | 'metrics.views'>>({
//     name: '',
//     logo: '',
//     tagline: '',
//     description: '',
//     website: '',
//     foundingDate: '',
//     category: '',
//     subCategory: '',
//     country: '',
//     city: '',
//     stage: '',
//     products: '',
//     metrics: {
//       fundingTotal: 0,
//       employees: 1,
//       connections: 0,
//       views: 0,
//       revenue: 'Undisclosed'
//     },
//     socialProfiles: {
//       linkedin: '',
//       twitter: '',
//       facebook: '',
//       instagram: ''
//     },
//     founders: [
//       {
//         name: '',
//         role: '',
//         linkedin: '',
//         bio: ''
//       }
//     ],
//     fundingRounds: []
//   });

//   // Form submission state
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
//   // Global validation message
//   const [showGlobalValidation, setShowGlobalValidation] = useState(false);
//   const [incompleteTabsMessage, setIncompleteTabsMessage] = useState('');

//   // Load existing startup data if editing
//   useEffect(() => {
//     if (isEditing && id) {
//       getStartup(id);
//     }
    
//     // Cleanup function
//     return () => {
//       clearStartup();
//       clearStartupError();
//     };
//   }, [isEditing, id, getStartup, clearStartup, clearStartupError]);

//   // Populate form when startup data loads
//   useEffect(() => {
//     if (startup && isEditing) {
//       setFormData({
//         name: startup.name || '',
//         logo: startup.logo || '',
//         tagline: startup.tagline || '',
//         description: startup.description || '',
//         website: startup.website || '',
//         foundingDate: startup.foundingDate || '',
//         category: startup.category || '',
//         subCategory: startup.subCategory || '',
//         country: startup.country || '',
//         city: startup.city || '',
//         stage: startup.stage || '',
//         products: startup.products || '',
//         metrics: {
//           fundingTotal: startup.metrics?.fundingTotal || 0,
//           employees: startup.metrics?.employees || 1,
//           connections: startup.metrics?.connections || 0,
//           views: startup.metrics?.views || 0,
//           revenue: startup.metrics?.revenue || 'Undisclosed'
//         },
//         socialProfiles: {
//           linkedin: startup.socialProfiles?.linkedin || '',
//           twitter: startup.socialProfiles?.twitter || '',
//           facebook: startup.socialProfiles?.facebook || '',
//           instagram: startup.socialProfiles?.instagram || ''
//         },
//         founders: startup.founders && startup.founders.length > 0 
//           ? startup.founders.map(founder => ({
//               name: founder.name || '',
//               role: founder.role || '',
//               linkedin: founder.linkedin || '',
//               bio: founder.bio || ''
//             }))
//           : [{ name: '', role: '', linkedin: '', bio: '' }],
//         fundingRounds: startup.fundingRounds || []
//       });
      
//       // Set logo preview if exists
//       if (startup.logo) {
//         setLogoPreview(startup.logo);
//       }
      
//       // Check initial section completion
//       validateSection('basic');
//       validateSection('location');
//       validateSection('founders');
//     }
//   }, [startup, isEditing]);

//   // Handle logo file selection
//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setLogoFile(file);
      
//       // Create a preview URL
//       const previewUrl = URL.createObjectURL(file);
//       setLogoPreview(previewUrl);
      
//       // Clear any logo validation errors
//       if (validationErrors.logo) {
//         setValidationErrors(prev => {
//           const updated = {...prev};
//           delete updated.logo;
//           return updated;
//         });
//       }
//     }
//   };

//   // Fixed handleChange function to properly handle nested properties
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
    
//     // Clear validation error for this field when changed
//     if (validationErrors[name]) {
//       setValidationErrors(prev => {
//         const updated = {...prev};
//         delete updated[name];
//         return updated;
//       });
//     }
    
//     // Handle nested properties
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
      
//       setFormData(prev => {
//         // Create a safe copy of the nested object, defaulting to empty object if undefined
//         const parentObject = prev[parent as keyof typeof prev] || {};
        
//         // Type guard to ensure we're dealing with an object
//         if (typeof parentObject === 'object' && parentObject !== null) {
//           return {
//             ...prev,
//             [parent]: {
//               ...parentObject,
//               [child]: parent === 'metrics' ? 
//                 (child === 'fundingTotal' || child === 'employees' ? 
//                   Number(value) : value) : 
//                 value
//             }
//           };
//         }
//         return prev;
//       });
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // Founder change handler
//   const handleFounderChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     const newFounders = [...formData.founders];
//     newFounders[index] = {
//       ...newFounders[index],
//       [name]: value
//     };
    
//     setFormData(prev => ({
//       ...prev,
//       founders: newFounders
//     }));
    
//     // Clear validation errors for this field
//     const errorKey = `founders[${index}].${name}`;
//     if (validationErrors[errorKey]) {
//       setValidationErrors(prev => {
//         const updated = {...prev};
//         delete updated[errorKey];
//         return updated;
//       });
//     }
//   };

//   // Add new founder
//   const addFounder = () => {
//     setFormData(prev => ({
//       ...prev,
//       founders: [...prev.founders, { name: '', role: '', linkedin: '', bio: '' }]
//     }));
//   };

//   // Remove founder
//   const removeFounder = (index: number) => {
//     if (formData.founders.length > 1) {
//       const newFounders = [...formData.founders];
//       newFounders.splice(index, 1);
      
//       setFormData(prev => ({
//         ...prev,
//         founders: newFounders
//       }));
//     }
//   };

//   // Funding round handlers
//   const handleFundingRoundChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     const newRounds = [...(formData.fundingRounds || [])];
    
//     newRounds[index] = {
//       ...newRounds[index],
//       [name]: name === 'amount' || name === 'valuation' ? parseFloat(value) : value
//     };
    
//     setFormData(prev => ({
//       ...prev,
//       fundingRounds: newRounds
//     }));
    
//     // Clear validation errors
//     const errorKey = `fundingRounds[${index}].${name}`;
//     if (validationErrors[errorKey]) {
//       setValidationErrors(prev => {
//         const updated = {...prev};
//         delete updated[errorKey];
//         return updated;
//       });
//     }
//   };

//   // Add funding round
//   const addFundingRound = () => {
//     const newRound: FundingRound = {
//       stage: '',
//       date: '',
//       amount: 0,
//       valuation: 0,
//       investors: [],
//       notes: ''
//     };
    
//     setFormData(prev => ({
//       ...prev,
//       fundingRounds: [...(prev.fundingRounds || []), newRound]
//     }));
//   };

//   // Remove funding round
//   const removeFundingRound = (index: number) => {
//     const newRounds = [...(formData.fundingRounds || [])];
//     newRounds.splice(index, 1);
    
//     setFormData(prev => ({
//       ...prev,
//       fundingRounds: newRounds
//     }));
//   };

//   // Handle investors for funding rounds
//   const handleInvestorsChange = (roundIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     const investors = value.split(',').map(inv => inv.trim());
    
//     const newRounds = [...(formData.fundingRounds || [])];
//     newRounds[roundIndex] = {
//       ...newRounds[roundIndex],
//       investors: investors
//     };
    
//     setFormData(prev => ({
//       ...prev,
//       fundingRounds: newRounds
//     }));
//   };

//   // Validate specific section
//   const validateSection = (section: string): boolean => {
//     const errors: Record<string, string> = {};
//     let isValid = true;
    
//     switch(section) {
//       case 'basic':
//         if (!formData.name) {
//           errors.name = 'Startup name is required';
//           isValid = false;
//         }
//         if (!formData.tagline) {
//           errors.tagline = 'Tagline is required';
//           isValid = false;
//         }
//         if (formData.tagline.length > 100) {
//           errors.tagline = 'Tagline must be less than 100 characters';
//           isValid = false;
//         }
//         if (!formData.description) {
//           errors.description = 'Description is required';
//           isValid = false;
//         }
//         if (formData.logo && !logoFile && !/^https?:\/\/.+/.test(formData.logo)) {
//           errors.logo = 'Please enter a valid URL or upload an image';
//           isValid = false;
//         }
//         if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
//           errors.website = 'Please enter a valid URL';
//           isValid = false;
//         }
//         if (!formData.category) {
//           errors.category = 'Category is required';
//           isValid = false;
//         }
//         if (!formData.stage) {
//           errors.stage = 'Stage is required';
//           isValid = false;
//         }
//         break;
        
//       case 'location':
//         if (!formData.country) {
//           errors.country = 'Country is required';
//           isValid = false;
//         }
//         break;
        
//       case 'social':
//         Object.entries(formData.socialProfiles).forEach(([key, value]) => {
//           if (value && !/^https?:\/\/.+/.test(value)) {
//             errors[`socialProfiles.${key}`] = 'Please enter a valid URL';
//             isValid = false;
//           }
//         });
//         break;
        
//       case 'founders':
//         let hasValidFounder = false;
//         formData.founders.forEach((founder, index) => {
//           if (founder.name) {
//             hasValidFounder = true;
//           }
//           if (founder.linkedin && !/^https?:\/\/.+/.test(founder.linkedin)) {
//             errors[`founders[${index}].linkedin`] = 'Please enter a valid LinkedIn URL';
//             isValid = false;
//           }
//         });
//         if (!hasValidFounder) {
//           errors['founders[0].name'] = 'At least one founder name is required';
//           isValid = false;
//         }
//         break;
        
//       case 'funding':
//         formData.fundingRounds?.forEach((round, index) => {
//           if (round.stage) {
//             if (round.amount && round.amount < 0) {
//               errors[`fundingRounds[${index}].amount`] = 'Amount cannot be negative';
//               isValid = false;
//             }
//             if (round.valuation && round.valuation < 0) {
//               errors[`fundingRounds[${index}].valuation`] = 'Valuation cannot be negative';
//               isValid = false;
//             }
//           }
//         });
//         break;
//     }
    
//     // Update validation errors
//     setValidationErrors(prev => ({
//       ...prev,
//       ...errors
//     }));
    
//     // Update section status
//     setSectionStatus(prev => ({
//       ...prev,
//       [section]: isValid
//     }));
    
//     return isValid;
//   };

//   // Validate all sections
//   const validateForm = (): boolean => {
//     // Reset all section statuses to re-validate everything
//     setShowGlobalValidation(true);
    
//     const basicValid = validateSection('basic');
//     const locationValid = validateSection('location');
//     const metricsValid = validateSection('metrics');
//     const socialValid = validateSection('social');
//     const foundersValid = validateSection('founders');
//     const fundingValid = validateSection('funding');
    
//     // Create message about incomplete tabs
//     const incompleteTabs = [];
//     if (!basicValid) incompleteTabs.push('Basic Information');
//     if (!locationValid) incompleteTabs.push('Location');
//     if (!metricsValid) incompleteTabs.push('Metrics');
//     if (!socialValid) incompleteTabs.push('Social Profiles');
//     if (!foundersValid) incompleteTabs.push('Founders');
//     if (!fundingValid) incompleteTabs.push('Funding');
    
//     if (incompleteTabs.length > 0) {
//       setIncompleteTabsMessage(`Please complete the required fields in the following tabs: ${incompleteTabs.join(', ')}`);
//       return false;
//     }
    
//     return true;
//   };

//   // Next section handler
//   const goToNextSection = () => {
//     const currentSectionIndex = sections.indexOf(activeSection);
//     if (currentSectionIndex < sections.length - 1) {
//       if (validateSection(activeSection)) {
//         setActiveSection(sections[currentSectionIndex + 1] as typeof activeSection);
//       }
//     }
//   };

//   // Previous section handler
//   const goToPrevSection = () => {
//     const currentSectionIndex = sections.indexOf(activeSection);
//     if (currentSectionIndex > 0) {
//       setActiveSection(sections[currentSectionIndex - 1] as typeof activeSection);
//     }
//   };

//   // Form submission handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // Create a FormData object for submission
//       const startupFormData = new FormData();
      
//       // Add the logo file if one was selected
//       if (logoFile) {
//         startupFormData.append('logo', logoFile);
//       } else if (formData.logo) {
//         // If no new file but URL exists, pass it in formData
//         startupFormData.append('logoUrl', formData.logo);
//       }
      
//       // Append simple string fields
//       startupFormData.append('name', formData.name);
//       startupFormData.append('tagline', formData.tagline);
//       startupFormData.append('description', formData.description);
//       startupFormData.append('website', formData.website);
//       startupFormData.append('foundingDate', formData.foundingDate);
//       startupFormData.append('category', formData.category);
//       startupFormData.append('subCategory', formData.subCategory);
//       startupFormData.append('country', formData.country);
//       startupFormData.append('city', formData.city);
//       startupFormData.append('stage', formData.stage);
      
//       // Append metrics as JSON string
//       startupFormData.append('metrics', JSON.stringify({
//         fundingTotal: Number(formData.metrics.fundingTotal),
//         employees: Number(formData.metrics.employees),
//         revenue: formData.metrics.revenue
//       }));
      
//       // Append socialProfiles as JSON string
//       startupFormData.append('socialProfiles', JSON.stringify(formData.socialProfiles));
      
//       // Append founders as JSON string
//       startupFormData.append('founders', JSON.stringify(formData.founders));
      
//       // Append fundingRounds as JSON string
//       startupFormData.append('fundingRounds', JSON.stringify(formData.fundingRounds));
      
//       if (isEditing && id) {
//         await updateStartup(id, startupFormData);
//         navigate(`/startup-profile/${id}`);
//       } else {
//         const response = await createStartup(startupFormData);
//         // Assuming the response contains the created startup with its ID
//         const newStartupId = response?.data?._id;
//         navigate(newStartupId ? `/startup-profile/${newStartupId}` : '/dashboard/my-startups');
//       }
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       // Error is handled by the context
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Navigation between form sections
//   const navigateToSection = (section: typeof activeSection) => {
//     setActiveSection(section);
//   };

//   // Categories for dropdown
//   const categories = [
//     'SaaS', 'Fintech', 'Healthtech', 'Edtech', 'E-commerce', 
//     'AI/ML', 'Blockchain', 'Cleantech', 'Hardware', 'Marketplaces',
//     'Consumer Apps', 'Enterprise Software', 'IoT', 'Gaming', 'Other'
//   ];

//   // Stages for dropdown
//   const stages = [
//     'Idea', 'MVP','Pre-seed', 'Seed', 'Series A', 'Series B', 
//     'Series C', 'Series D+', 'Profitable', 'Acquired', 'IPO'
//   ];

//   // Funding round stages
//   const fundingStages = [
//     'Pre-seed', 'Seed', 'Series A', 'Series B', 
//     'Series C', 'Series D', 'Series E+', 'Convertible Note', 
//     'Angel', 'Grant', 'Crowdfunding', 'Other'
//   ];

//   // Trigger logo file input click
//   const triggerLogoUpload = () => {
//     if (logoInputRef.current) {
//       logoInputRef.current.click();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/* Progress indicator */}
//       <div className="mb-6">
//         {/* <h2 className="text-xl font-bold mb-4">Startup Form</h2> */}
//         <div className="flex flex-wrap gap-2">
//           {sections.map((section) => (
//             <button
//               key={section}
//               type="button"
//               onClick={() => navigateToSection(section as typeof activeSection)}
//               className={`px-4 py-2 rounded-md ${
//                 activeSection === section 
//                   ? 'bg-black text-white' 
//                   : 'bg-gray-200 text-gray-700'
//               } ${
//                 sectionStatus[section] ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
//               }`}
//             >
//               {section.charAt(0).toUpperCase() + section.slice(1)}
//               {sectionStatus[section] ? ' ✓' : ' !'} 
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Display any API errors at the top */}
//       {error && (
//         <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-6">
//           <p className="text-red-600">{error}</p>
//         </div>
//       )}
      
//       {/* Global validation message */}
//       {showGlobalValidation && incompleteTabsMessage && (
//         <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-6">
//           <p className="text-yellow-700">{incompleteTabsMessage}</p>
//         </div>
//       )}
      
//       {/* Basic Information Section */}
//       <div className={activeSection === 'basic' ? 'block' : 'hidden'}>
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold mb-4 text-black">Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Startup Name*
//               </label>
//               <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className={`w-full px-4 py-3 border ${validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//           placeholder="Enter startup name"
//               />
//               {validationErrors.name && (
//           <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Logo
//               </label>
//               <div className="flex items-start space-x-4">
//           <div className="flex-1">
//             {/* Hidden file input */}
//             <input
//               type="file"
//               ref={logoInputRef}
//               onChange={handleLogoChange}
//               accept="image/*"
//               className="hidden"
//             />
            
//             {/* Custom file upload button */}
//             <button
//               type="button"
//               onClick={triggerLogoUpload}
//               className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg border border-gray-300 w-full flex items-center justify-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
//               </svg>
//               Upload Logo
//             </button>
            
//             {/* Text input for URL (Alternative) */}
//             <div className="mt-2">
//               <input
//                 type="url"
//                 name="logo"
//                 value={formData.logo}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 border ${validationErrors.logo ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                 placeholder="Or enter logo URL: https://..."
//               />
//             </div>
//           </div>
          
//           {/* Logo preview */}
//           {logoPreview && (
//             <div className="w-16 h-16 overflow-hidden rounded-md border border-gray-300">
//               <img 
//                 src={logoPreview} 
//                 alt="Logo preview" 
//                 className="w-full h-full object-cover" 
//               />
//             </div>
//           )}
//               </div>
//               {validationErrors.logo && (
//           <p className="mt-1 text-sm text-red-600">{validationErrors.logo}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Tagline* <span className="text-xs text-gray-500">(max 100 chars)</span>
//               </label>
//               <input
//           type="text"
//           name="tagline"
//           value={formData.tagline}
//           onChange={handleChange}
//           required
//           maxLength={100}
//           className={`w-full px-4 py-3 border ${validationErrors.tagline ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//           placeholder="One-line description of your startup"
//               />
//               {validationErrors.tagline && (
//           <p className="mt-1 text-sm text-red-600">{validationErrors.tagline}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Website
//               </label>
//               <input
//           type="url"
//           name="website"
//           value={formData.website}
//           onChange={handleChange}
//           className={`w-full px-4 py-3 border ${validationErrors.website ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//           placeholder="https://..."
//               />
//               {validationErrors.website && (
//           <p className="mt-1 text-sm text-red-600">{validationErrors.website}</p>
//               )}
//             </div>
            
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Description*
//               </label>
//               <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           rows={4}
//           className={`w-full px-4 py-3 border ${validationErrors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//           placeholder="Describe your startup in detail"
//               />
//               {validationErrors.description && (
//           <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Category*
//               </label>
//               <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//           className={`w-full px-4 py-3 border ${validationErrors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//               >
//           <option value="">Select Category</option>
//           {categories.map(category => (
//             <option key={category} value={category}>{category}</option>
//           ))}
//               </select>
//               {validationErrors.category && (
//           <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Sub-Category
//               </label>
//               <input
//           type="text"
//           name="subCategory"
//           value={formData.subCategory}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//           placeholder="E.g., Marketing Automation, HR Tech"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Stage*
//               </label>
//               <select
//           name="stage"
//           value={formData.stage}
//           onChange={handleChange}
//           required
//           className={`w-full px-4 py-3 border ${validationErrors.stage ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200`}
//           >
//             <option value="">Select Stage</option>
//            {stages.map(stage => (
//               <option key={stage} value={stage}>{stage}</option>
//                ))}
//           </select>
//              {validationErrors.stage && (
//                <p className="mt-1 text-sm text-red-600">{validationErrors.stage}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Founding Date
//               </label>
//               <input
//           type="date"
//           name="foundingDate"
//           value={formData.foundingDate}
//           onChange={handleChange}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//           Products/Services
//               </label>
//               <textarea
//           name="products"
//           value={formData.products}
//           onChange={handleChange}
//           rows={3}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//           placeholder="List your products or services"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Next Button */}
//         <div className="flex justify-end mt-4">
//           <button
//             type="button"
//             onClick={goToNextSection}
//             className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
//           >
//             Next
//           </button>
//         </div>
//       </div>
        
//             {/* Location Section */}
//           <div className={activeSection === 'location' ? 'block' : 'hidden'}>
//             <div className="border-b border-gray-200 pb-6">
//               <h3 className="text-xl font-semibold mb-4 text-black">Location</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Country*
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                     className={`w-full px-4 py-3 border ${validationErrors.country ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                     placeholder="Enter country"
//                   />
//                   {validationErrors.country && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors.country}</p>
//                   )}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                       placeholder="Enter city"
//                     />
//                   </div>
//                 </div>
//               </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={goToPrevSection}
//                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
//                 >
//                   Previous
//                 </button>

//                 <button
//                   type="button"
//                   onClick={goToNextSection}
//                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
//                 >
//                   Next
//                 </button>
//                 </div>
//           </div>
        
        
//                     {/* Metrics Section */} 
//               <div className={activeSection === 'metrics' ? 'block' : 'hidden'}>
//                 <div className="border-b border-gray-200 pb-6">
//                   <h3 className="text-xl font-semibold mb-4 text-black">Metrics</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Total Funding
//                       </label>
//                       <input
//                         type="number"
//                         name="metrics.fundingTotal"
//                         value={formData.metrics.fundingTotal}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border ${validationErrors['metrics.fundingTotal'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                         placeholder="Enter total funding raised"
//                       />
//                       {validationErrors['metrics.fundingTotal'] && (
//                         <p className="mt-1 text-sm text-red-600">{validationErrors['metrics.fundingTotal']}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Number of Employees
//                       </label>
//                       <input
//                         type="number"
//                         name="metrics.employees"
//                         value={formData.metrics.employees}
//                         onChange={handleChange}
//                         min="0"
//                         className={`w-full px-4 py-3 border ${validationErrors['metrics.employees'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                         placeholder="Enter number of employees"
//                       />
//                       {validationErrors['metrics.employees'] && (
//                         <p className="mt-1 text-sm text-red-600">{validationErrors['metrics.employees']}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Annual Revenue Range
//                       </label>
//                       <select
//                         name="metrics.revenue"
//                         value={formData.metrics.revenue}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border ${validationErrors['metrics.revenue'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                       >
//                         {revenueOptions.map(range => (
//                           <option key={range} value={range}>{range}</option>
//                         ))}   
//                       </select>
//                       {validationErrors['metrics.revenue'] && (
//                         <p className="mt-1 text-sm text-red-600">{validationErrors['metrics.revenue']}</p>
//                       )}
//                       </div>
//                     </div>

//                   </div>
//                   {/* Navigation Buttons */}
//                 <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={goToPrevSection}
//                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
//                 >
//                   Previous
//                 </button>

//                 <button
//                   type="button"
//                   onClick={goToNextSection}
//                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
//                 >
//                   Next
//                 </button>
//                 </div>
//                   </div>
              
//             {/* Social Profiles Section */}
//       <div className={activeSection === 'social' ? 'block' : 'hidden'}>
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold mb-4 text-black">Social Profiles</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 LinkedIn
//               </label>
//               <input
//                 type="url"
//                 name="socialProfiles.linkedin"
//                 value={formData.socialProfiles.linkedin}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.linkedin'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                 placeholder="https://linkedin.com/company/..."
//               />
//               {validationErrors['socialProfiles.linkedin'] && (
//                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.linkedin']}</p>
//               )}
//             </div>  

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Twitter
//               </label>
//               <input
//                 type="url"
//                 name="socialProfiles.twitter"
//                 value={formData.socialProfiles.twitter}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.twitter'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                 placeholder="https://twitter.com/..."
//               />
//               {validationErrors['socialProfiles.twitter'] && (
//                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.twitter']}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Facebook
//               </label>
//               <input
//                 type="url"
//                 name="socialProfiles.facebook"
//                 value={formData.socialProfiles.facebook}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.facebook'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                 placeholder="https://facebook.com/..."
//               />
//               {validationErrors['socialProfiles.facebook'] && (
//                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.facebook']}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Instagram
//               </label>
//               <input
//                 type="url"
//                 name="socialProfiles.instagram"
//                 value={formData.socialProfiles.instagram}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 border ${validationErrors['socialProfiles.instagram'] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                 placeholder="https://instagram.com/..."
//               />
//               {validationErrors['socialProfiles.instagram'] && (
//                 <p className="mt-1 text-sm text-red-600">{validationErrors['socialProfiles.instagram']}</p>
//               )}
//             </div>
//             </div>
//             </div>
//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={goToPrevSection}
//                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
//                 >
//                   Previous
//                 </button>

//                 <button
//                   type="button"
//                   onClick={goToNextSection}
//                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
//                 >
//                   Next
//                 </button>
//                 </div>
//       </div>

        
//         {/* Founders Section */}  
//       <div className={activeSection === 'founders' ? 'block' : 'hidden'}>
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold mb-4 text-black">Founders</h3>

//           {formData.founders.map((founder, index) => (
//             <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
//                          <div className="flex justify-between items-center mb-4">
//                            <h4 className="text-lg font-medium text-gray-800">Founder {index + 1}</h4>
//                            {formData.founders.length > 1 && (
//                               <button
//                                 type="button"
//                                 onClick={() => removeFounder(index)}
//                                 className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                               >
//                                 Remove
//                               </button>
//                             )}
//                           </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name*
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={founder.name}
//                   onChange={(e) => handleFounderChange(index, e)}
//                   required
//                   className={`w-full px-4 py-3 border ${validationErrors[`founders[${index}].name`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                   placeholder="Enter founder's name"
//                 />
//                 {validationErrors[`founders[${index}].name`] && (
//                   <p className="mt-1 text-sm text-red-600">{validationErrors[`founders[${index}].name`]}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Role
//                 </label>
//                 <input
//                   type="text"
//                   name="role"
//                   value={founder.role}
//                   onChange={(e) => handleFounderChange(index, e)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                   placeholder="CEO, CTO, etc."
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   LinkedIn
//                 </label>
//                 <input
//                   type="url"
//                   name="linkedin"
//                   value={founder.linkedin}
//                   onChange={(e) => handleFounderChange(index, e)}
//                   className={`w-full px-4 py-3 border ${validationErrors[`founders[${index}].linkedin`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                   placeholder="https://linked.com/in/..."
//                 />
//                 {validationErrors[`founders[${index}].linkedin`] && (
//                   <p className="mt-1 text-sm text-red-600">{validationErrors[`founders[${index}].linkedin`]}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   name="bio"
//                   value={founder.bio}
//                   onChange={(e) => handleFounderChange(index, e)}
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                   placeholder="Short bio about the founder"
//                 />
//                 {validationErrors[`founders[${index}].bio`] && (
//                   <p className="mt-1 text-sm text-red-600">{validationErrors[`founders[${index}].bio`]}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//           ))}
//           <button
//             type="button"
//             onClick={addFounder}
//             className="mt-4 flex items-center text-black hover:text-black transition-colors duration-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Add Another Founder
//           </button>
//          </div>
//          {/* Navigation Buttons */}
//          <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={goToPrevSection}
//                   className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
//                 >
//                   Previous
//                 </button>

//                 <button
//                   type="button"
//                   onClick={goToNextSection}
//                   className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300"
//                 >
//                   Next
//                 </button>
//                 </div>

      
//        </div>

//        {/* Funding Rounds Section */}
//       <div className={activeSection === 'funding' ? 'block' : 'hidden'}>
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-xl font-semibold mb-4 text-black">Funding Rounds</h3>

//           {formData.fundingRounds && formData.fundingRounds.map((round, index) => (
//             <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="text-lg font-medium text-gray-800">Funding Round {index + 1}</h4>
//                   <button
//                     type="button"
//                     onClick={() => removeFundingRound(index)}
//                     className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                   >
//                     Remove
//                   </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Stage *
//                   </label>
//                   <select
//                     name="stage"
//                     value={round.stage}
//                     onChange={(e) => handleFundingRoundChange(index, e)}
//                     required
//                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].stage`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                   >
//                     <option value="">Select Stage</option>
//                     {fundingStages.map(stage => (
//                       <option key={stage} value={stage}>{stage}</option>
//                     ))}
//                   </select>
//                   {validationErrors[`fundingRounds[${index}].stage`] && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].stage`]}</p>
//                   )}
//                 </div>  

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={round.date}
//                     onChange={(e) => handleFundingRoundChange(index, e)}
//                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].date`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                     placeholder="Enter date of funding round"
//                   />
//                   {validationErrors[`fundingRounds[${index}].date`] && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].date`]}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Amount Raised
//                   </label>
//                   <input
//                     type="number"
//                     name="amount"
//                     value={round.amount}
//                     onChange={(e) => handleFundingRoundChange(index, e)}
//                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].amountRaised`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                     placeholder="Enter amount raised in this round"
//                   />
//                   {validationErrors[`fundingRounds[${index}].amountRaised`] && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].amountRaised`]}</p>
//                   )}

//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Valuation (USD)
//                   </label>
//                   <input
//                     type="number"
//                     name="valuation"
//                     value={round.valuation || ''}
//                     onChange={(e) => handleFundingRoundChange(index, e)}
//                     min="0"
//                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].valuation`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                     placeholder="Enter valuation in USD"
//                   />
//                   {validationErrors[`fundingRounds[${index}].valuation`] && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].valuation`]}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Investors
//                   </label>
//                   <input
//                     type="text"
//                     name="investors (comma separated)"
//                     value={round.investors?.join(', ') || ''}
//                     onChange={(e) => handleInvestorsChange(index, e)}
//                     className={`w-full px-4 py-3 border ${validationErrors[`fundingRounds[${index}].investors`] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
//                     placeholder="List of investors"
//                   />
//                   {validationErrors[`fundingRounds[${index}].investors`] && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].investors`]}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Notes
//                   </label>
//                   <textarea
//                     name="notes"
//                     value={round.notes || ''}
//                     onChange={(e) => handleFundingRoundChange(index, e)}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
//                     placeholder="Additional notes about the funding round"
//                   />
//                   {validationErrors[`fundingRounds[${index}].notes`] && (
//                     <p className="mt-1 text-sm text-red-600">{validationErrors[`fundingRounds[${index}].notes`]}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addFundingRound}
//             className="mt-4 flex items-center text-black hover:text-black transition-colors duration-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Add Funding Round
//           </button>
//         </div>

//         <div className='flex justify-between pt-6'>
//           <button
//             type="button"
//             onClick={() =>  navigate(-1)}
//             className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={isSubmitting || loading}
//             className={`bg-black text-white px-6 py-3 rounded-lg hover:bg-black transition-all duration-300 ${isSubmitting || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {(isSubmitting || loading) ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
//                 <span>{isEditing ? 'Updating...' : 'Creating...'}</span>

//               </>
//             ) : (
//               <span>{isEditing ? 'Update Startup' : 'List Startup'}</span>
//             )}
//           </button> 
//         </div>
//       </div>
//       </form>
//   );
// };

// export default StartupForm;