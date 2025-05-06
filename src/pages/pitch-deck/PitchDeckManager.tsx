// import React, { useEffect, useState } from 'react';
// import { usePitchDeck } from '../../context/PitchDeckContext';

// const PitchDeckManager: React.FC = () => {
//   const {
//     decks,
//     currentDeck,
//     loading,
//     error,
//     getDecks,
//     getDeck,
//     createDeck,
//     updateDeck,
//     deleteDeck,
//     clearCurrentDeck
//   } = usePitchDeck();

//   const [formData, setFormData] = useState({
//     title: '',
//     sector: '',
//     slides: []
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [selectedDeckId, setSelectedDeckId] = useState(null);

//   // Load decks on component mount
//   useEffect(() => {
//     getDecks();
//   }, [getDecks]);

//   // Set form data when editing a deck
//   useEffect(() => {
//     if (currentDeck && editMode) {
//       setFormData({
//         title: currentDeck.title,
//         sector: currentDeck.sector,
//         slides: currentDeck.slides
//       });
//     }
//   }, [currentDeck, editMode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectDeck = async (id) => {
//     setSelectedDeckId(id);
//     await getDeck(id);
//   };

//   const handleCreateSlide = () => {
//     const newSlide = {
//       id: Date.now().toString(),
//       title: 'New Slide',
//       content: '',
//       order: formData.slides.length
//     };

//     setFormData(prev => ({
//       ...prev,
//       slides: [...prev.slides, newSlide]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       if (editMode && selectedDeckId) {
//         await updateDeck(selectedDeckId, formData);
//         setEditMode(false);
//       } else {
//         await createDeck(formData);
//       }
      
//       // Reset form
//       setFormData({
//         title: '',
//         sector: '',
//         slides: []
//       });
      
//       // Refresh decks list
//       getDecks();
//     } catch (err) {
//       console.error("Form submission error:", err);
//     }
//   };

//   const handleEditDeck = (id) => {
//     setEditMode(true);
//     handleSelectDeck(id);
//   };

//   const handleDeleteDeck = async (id) => {
//     if (window.confirm('Are you sure you want to delete this deck?')) {
//       await deleteDeck(id);
//       if (selectedDeckId === id) {
//         setSelectedDeckId(null);
//         clearCurrentDeck();
//       }
//     }
//   };

//   const handleCancel = () => {
//     setEditMode(false);
//     setFormData({
//       title: '',
//       sector: '',
//       slides: []
//     });
//     clearCurrentDeck();
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Pitch Deck Manager</h1>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Decks List */}
//         <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Your Decks</h2>
          
//           {loading ? (
//             <p>Loading decks...</p>
//           ) : decks.length === 0 ? (
//             <p>No decks yet. Create your first deck!</p>
//           ) : (
//             <ul className="space-y-2">
//               {decks.map(deck => (
//                 <li 
//                   key={deck._id} 
//                   className={`p-3 border rounded hover:bg-gray-100 flex justify-between items-center ${
//                     selectedDeckId === deck._id ? 'bg-blue-50 border-blue-300' : ''
//                   }`}
//                 >
//                   <div 
//                     className="cursor-pointer flex-grow"
//                     onClick={() => handleSelectDeck(deck._id)}
//                   >
//                     <h3 className="font-medium">{deck.title}</h3>
//                     <p className="text-sm text-gray-600">{deck.sector}</p>
//                     <p className="text-xs text-gray-500">
//                       Last modified: {new Date(deck.lastModified).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => handleEditDeck(deck._id)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       onClick={() => handleDeleteDeck(deck._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
        
//         {/* Deck Form */}
//         <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">
//             {editMode ? 'Edit Deck' : 'Create New Deck'}
//           </h2>
          
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sector">
//                 Sector
//               </label>
//               <select
//                 id="sector"
//                 name="sector"
//                 value={formData.sector}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               >
//                 <option value="">Select a sector</option>
//                 <option value="Technology">Technology</option>
//                 <option value="Healthcare">Healthcare</option>
//                 <option value="Finance">Finance</option>
//                 <option value="Education">Education</option>
//                 <option value="Retail">Retail</option>
//                 <option value="Manufacturing">Manufacturing</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Slides
//               </label>
//               {formData.slides.length === 0 ? (
//                 <p className="text-gray-500 mb-2">No slides yet. Add a slide to get started.</p>
//               ) : (
//                 <ul className="space-y-2 mb-4">
//                   {formData.slides.map((slide, index) => (
//                     <li key={slide.id} className="p-2 border rounded">
//                       <span className="font-medium">{index + 1}. {slide.title}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
              
//               <button
//                 type="button"
//                 onClick={handleCreateSlide}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded text-sm"
//               >
//                 + Add Slide
//               </button>
//             </div>
            
//             <div className="flex items-center justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className={`${
//                   editMode 
//                     ? 'bg-yellow-500 hover:bg-yellow-600' 
//                     : 'bg-blue-500 hover:bg-blue-600'
//                 } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : editMode ? 'Update Deck' : 'Create Deck'}
//               </button>
//             </div>
//           </form>
//         </div>
        
//         {/* Deck Viewer */}
//         {currentDeck && !editMode && (
//           <div className="md:col-span-3 bg-white p-4 rounded-lg shadow mt-6">
//             <h2 className="text-xl font-semibold mb-4">
//               {currentDeck.title}
//               <span className="ml-2 text-sm font-normal text-gray-500">
//                 ({currentDeck.sector})
//               </span>
//             </h2>
            
//             <div className="border rounded p-4">
//               <h3 className="font-medium mb-3">Slides</h3>
//               {currentDeck.slides.length === 0 ? (
//                 <p>No slides in this deck.</p>
//               ) : (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {currentDeck.slides.map((slide, index) => (
//                     <div key={slide.id} className="border rounded p-3 bg-gray-50">
//                       <p className="font-medium">{index + 1}. {slide.title}</p>
//                       <p className="text-sm text-gray-600 truncate">
//                         {slide.content || 'No content'}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PitchDeckManager;