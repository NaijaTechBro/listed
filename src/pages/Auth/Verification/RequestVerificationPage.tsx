

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../../Dashboard/Sidebar';

// // Mock user data - replace with your actual user management
// const mockUser = { role: 'founder' };

// const RequestVerificationPage: React.FC = () => {
//   const navigate = useNavigate();
  
//   // UI state
//   const [step, setStep] = useState<number>(1);
//   const [idDocument, setIdDocument] = useState<File | null>(null);
//   const [businessRegistration, setBusinessRegistration] = useState<File | null>(null);
//   const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
//   const [additionalDocuments, setAdditionalDocuments] = useState<File[]>([]);
//   const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
//   const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
  
//   // Mock verification status
//   const [verificationStatus, setVerificationStatus] = useState<{
//     isRoleVerified: boolean,
//     roleVerificationStatus?: 'pending' | 'rejected' | null,
//     roleVerificationSubmittedAt?: string,
//     roleVerificationRejectionReason?: string
//   }>({
//     isRoleVerified: false,
//     roleVerificationStatus: null
//   });

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>, 
//     setter: React.Dispatch<React.SetStateAction<File | null>>
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       setter(e.target.files[0]);
      
//       // Clear any validation errors for this field
//       setLocalErrors(prev => {
//         const newErrors = {...prev};
//         delete newErrors[e.target.name];
//         return newErrors;
//       });
//     }
//   };

//   const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       if (filesArray.length <= 5) {
//         setAdditionalDocuments(filesArray);
        
//         // Clear any validation errors for this field
//         setLocalErrors(prev => {
//           const newErrors = {...prev};
//           delete newErrors[e.target.name];
//           return newErrors;
//         });
//       } else {
//         setLocalErrors(prev => ({
//           ...prev,
//           additionalDocuments: 'You can upload a maximum of 5 additional documents'
//         }));
//       }
//     }
//   };

//   // Remove additional file
//   const removeAdditionalFile = (index: number) => {
//     setAdditionalDocuments(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateStep = (): boolean => {
//     const errors: Record<string, string> = {};
    
//     if (step === 1) {
//       if (!idDocument) errors.idDocument = 'ID document is required';
//     } else if (step === 2) {
//       if (mockUser?.role === 'founder' && !businessRegistration) {
//         errors.businessRegistration = 'Business registration document is required';
//       }
//       if (!proofOfAddress) errors.proofOfAddress = 'Proof of address is required';
//     }
    
//     setLocalErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       setStep(prevStep => prevStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     setStep(prevStep => prevStep - 1);
//   };

//   const handleSubmit = async () => {
//     if (!validateStep()) return;
    
//     setLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Simulate successful submission
//       setSubmitSuccess(true);
//       setVerificationStatus({
//         isRoleVerified: false,
//         roleVerificationStatus: 'pending',
//         roleVerificationSubmittedAt: new Date().toISOString()
//       });
      
//       // Reset form
//       setIdDocument(null);
//       setBusinessRegistration(null);
//       setProofOfAddress(null);
//       setAdditionalDocuments([]);
//       setStep(1);
      
//     } catch (err) {
//       setError('An error occurred during submission. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Simulate checking status
//   const checkStatus = () => {
//     setVerificationStatus({
//       isRoleVerified: false,
//       roleVerificationStatus: null
//     });
//   };

//   // Clear error after 5 seconds
//   const clearError = () => {
//     setError(null);
//   };

//   // Progress indicators for the 3-step process
//   const ProgressSteps: React.FC = () => {
//     return (
//       <div className="flex items-center justify-center w-full mb-10">
//         <div className="w-full max-w-3xl flex items-center justify-between">
//           <div className="flex flex-col items-center">
//             <div className={`${step >= 1 ? 'bg-black' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mb-2`}>
//               <span className="text-sm">1</span>
//             </div>
//             <span className="text-xs text-gray-600">Personal ID</span>
//           </div>
          
//           <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-black' : 'bg-gray-300'}`}></div>
          
//           <div className="flex flex-col items-center">
//             <div className={`${step >= 2 ? 'bg-black' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mb-2`}>
//               <span className="text-sm">2</span>
//             </div>
//             <span className="text-xs text-gray-600">{mockUser?.role === 'founder' ? 'Business Documents' : 'Address Proof'}</span>
//           </div>
          
//           <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-black' : 'bg-gray-300'}`}></div>
          
//           <div className="flex flex-col items-center">
//             <div className={`${step >= 3 ? 'bg-black' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mb-2`}>
//               <span className="text-sm">3</span>
//             </div>
//             <span className="text-xs text-gray-600">Review & Submit</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Field with error handling
//   interface FormFieldProps {
//     label: string;
//     name: string;
//     required?: boolean;
//     error?: string;
//     children: React.ReactNode;
//   }

//   const FormField: React.FC<FormFieldProps> = ({ 
//     label, 
//     required = false, 
//     error, 
//     children 
//   }) => {
//     return (
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         {children}
//         {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
//       </div>
//     );
//   };

//   // Simple alert component
//   interface AlertProps {
//     variant: 'success' | 'error';
//     className?: string;
//     onClose: () => void;
//     children: React.ReactNode;
//   }

//   const Alert: React.FC<AlertProps> = ({ variant, className, onClose, children }) => {
//     const bgColor = variant === 'success' ? 'bg-green-50' : 'bg-red-50';
//     const textColor = variant === 'success' ? 'text-green-800' : 'text-red-800';
//     const borderColor = variant === 'success' ? 'border-green-200' : 'border-red-200';
    
//     return (
//       <div className={`${bgColor} ${textColor} p-4 rounded-md border ${borderColor} ${className}`}>
//         <div className="flex justify-between items-center">
//           <div>{children}</div>
//           <button 
//             onClick={onClose} 
//             className={`${textColor} hover:opacity-75`}
//           >
//             ×
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Simple spinner component
//   interface SpinnerProps {
//     size?: 'sm' | 'md' | 'lg';
//     className?: string;
//   }

//   const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
//     const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8';
    
//     return (
//       <div className={`animate-spin rounded-full border-t-2 border-r-2 border-gray-900 ${sizeClass} ${className}`}></div>
//     );
//   };
  
//   // Render verification status UI blocks
//   const renderVerificationStatusUI = () => {
//     if (verificationStatus.isRoleVerified) {
//       return (
//         <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-green-800 shadow-md">
//           <div className="flex items-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-xl font-bold">Verified Account</h3>
//           </div>
//           <p className="mb-4">Your account has been fully verified. You have complete access to all platform features.</p>
//           <button 
//             onClick={() => navigate('/dashboard')} 
//             className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition duration-200"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       );
//     }

//     if (verificationStatus.roleVerificationStatus === 'pending') {
//       return (
//         <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-800 shadow-md">
//           <div className="flex items-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-xl font-bold">Verification In Progress</h3>
//           </div>
//           <p className="mb-2">Your verification request is currently being reviewed by our team. This process typically takes 1-3 business days.</p>
//           {verificationStatus.roleVerificationSubmittedAt && (
//             <p className="text-sm mb-4">
//               Submitted on: {new Date(verificationStatus.roleVerificationSubmittedAt).toLocaleDateString('en-US', { 
//                 year: 'numeric', 
//                 month: 'long', 
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//           )}
//           <button 
//             onClick={() => navigate('/dashboard')} 
//             className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium transition duration-200"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       );
//     }

//     if (verificationStatus.roleVerificationStatus === 'rejected') {
//       return (
//         <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-800 shadow-md">
//           <div className="flex items-center mb-4">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <h3 className="text-xl font-bold">Verification Rejected</h3>
//           </div>
//           <p className="mb-2">Your verification request was rejected for the following reason:</p>
//           <p className="font-medium p-3 bg-red-100 rounded mb-4 border-l-4 border-red-500">
//             {verificationStatus.roleVerificationRejectionReason || "Invalid documents provided. Please ensure all documents are clear and valid."}
//           </p>
//           <button 
//             onClick={() => checkStatus()}
//             className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium transition duration-200"
//           >
//             Submit New Verification Request
//           </button>
//         </div>
//       );
//     }

//     // Default verification form UI
//     return (
//       <>
//         <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Account Verification</h1>
        
//         <ProgressSteps />
        
//         <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
//           {error && (
//             <Alert variant="error" className="mb-4" onClose={clearError}>
//               {error}
//             </Alert>
//           )}
          
//           {submitSuccess && (
//             <Alert variant="success" className="mb-4" onClose={() => setSubmitSuccess(false)}>
//               Verification documents submitted successfully. Your verification is in progress.
//             </Alert>
//           )}
          
//           {step === 1 && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Identification</h2>
//               <p className="mb-6 text-gray-600">
//                 Please upload a clear image or PDF of your government-issued ID document. This helps us verify your identity.
//               </p>
              
//               <FormField 
//                 label="ID Document (Passport, Driver's License, or National ID)" 
//                 name="idDocument"
//                 required={true}
//                 error={localErrors.idDocument}
//               >
//                 <input
//                   name="idDocument"
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={(e) => handleFileChange(e, setIdDocument)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
//                 />
//                 {idDocument && (
//                   <p className="mt-2 text-sm text-green-600">
//                     File selected: {idDocument.name}
//                   </p>
//                 )}
//               </FormField>
//             </div>
//           )}
          
//           {step === 2 && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6 text-gray-800">
//                 {mockUser?.role === 'founder' ? 'Business Documents' : 'Address Verification'}
//               </h2>
              
//               {mockUser?.role === 'founder' && (
//                 <FormField
//                   label="Business Registration Document"
//                   name="businessRegistration"
//                   required={true}
//                   error={localErrors.businessRegistration}
//                 >
//                   <input
//                     name="businessRegistration"
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={(e) => handleFileChange(e, setBusinessRegistration)}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
//                   />
//                   {businessRegistration && (
//                     <p className="mt-2 text-sm text-green-600">
//                       File selected: {businessRegistration.name}
//                     </p>
//                   )}
//                 </FormField>
//               )}
              
//               <FormField
//                 label="Proof of Address (Utility Bill, Bank Statement)"
//                 name="proofOfAddress"
//                 required={true}
//                 error={localErrors.proofOfAddress}
//               >
//                 <input
//                   name="proofOfAddress"
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={(e) => handleFileChange(e, setProofOfAddress)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
//                 />
//                 {proofOfAddress && (
//                   <p className="mt-2 text-sm text-green-600">
//                     File selected: {proofOfAddress.name}
//                   </p>
//                 )}
//               </FormField>
//             </div>
//           )}
          
//           {step === 3 && (
//             <div>
//               <h2 className="text-2xl font-bold mb-6 text-gray-800">Additional Documents & Review</h2>
              
//               <FormField
//                 label="Additional Supporting Documents (Optional, max 5 files)"
//                 name="additionalDocuments"
//                 error={localErrors.additionalDocuments}
//               >
//                 <input
//                   name="additionalDocuments"
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleMultipleFileChange}
//                   multiple
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
//                   disabled={additionalDocuments.length >= 5}
//                 />
                
//                 {additionalDocuments.length > 0 && (
//                   <div className="mt-2">
//                     <p className="text-sm text-green-600 mb-1">
//                       {additionalDocuments.length} file(s) selected:
//                     </p>
//                     <ul className="text-sm text-gray-600 list-disc ml-5">
//                       {additionalDocuments.map((file, index) => (
//                         <li key={index} className="flex justify-between items-center mt-1">
//                           <span>{file.name}</span>
//                           <button
//                             type="button"
//                             onClick={() => removeAdditionalFile(index)}
//                             className="text-red-500 hover:text-red-700 text-sm"
//                           >
//                             Remove
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </FormField>
              
//               <div className="bg-gray-50 p-5 rounded-md text-sm text-gray-700 border border-gray-200 mb-6">
//                 <h3 className="font-medium mb-2">Documents Review:</h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-center">
//                     <span className={`w-5 h-5 rounded-full ${idDocument ? 'bg-green-500' : 'bg-red-500'} mr-2 flex items-center justify-center text-white text-xs`}>
//                       {idDocument ? '✓' : '×'}
//                     </span>
//                     ID Document: {idDocument ? idDocument.name : 'Missing'}
//                   </li>
                  
//                   {mockUser?.role === 'founder' && (
//                     <li className="flex items-center">
//                       <span className={`w-5 h-5 rounded-full ${businessRegistration ? 'bg-green-500' : 'bg-red-500'} mr-2 flex items-center justify-center text-white text-xs`}>
//                         {businessRegistration ? '✓' : '×'}
//                       </span>
//                       Business Registration: {businessRegistration ? businessRegistration.name : 'Missing'}
//                     </li>
//                   )}
                  
//                   <li className="flex items-center">
//                     <span className={`w-5 h-5 rounded-full ${proofOfAddress ? 'bg-green-500' : 'bg-red-500'} mr-2 flex items-center justify-center text-white text-xs`}>
//                       {proofOfAddress ? '✓' : '×'}
//                     </span>
//                     Proof of Address: {proofOfAddress ? proofOfAddress.name : 'Missing'}
//                   </li>
                  
//                   <li className="flex items-center">
//                     <span className={`w-5 h-5 rounded-full ${additionalDocuments.length ? 'bg-gray-500' : 'bg-gray-300'} mr-2 flex items-center justify-center text-white text-xs`}>
//                       {additionalDocuments.length ? '✓' : '-'}
//                     </span>
//                     Additional Documents: {additionalDocuments.length ? `${additionalDocuments.length} file(s)` : 'None (Optional)'}
//                   </li>
//                 </ul>
                
//                 <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
//                   <p className="font-medium">Important Notice:</p>
//                   <p>By submitting these documents, you confirm that all information provided is accurate and authentic. Submission of fraudulent documents may result in permanent account suspension.</p>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 border border-gray-200 mb-6">
//             <p><strong>Note:</strong> We accept PDF, JPG, JPEG, and PNG files only. Maximum file size is 10MB per file.</p>
//           </div>
          
//           <div className="flex justify-between pt-4">
//             {step > 1 ? (
//               <button
//                 onClick={handlePrevious}
//                 className="py-3 px-6 rounded-md font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition duration-200"
//               >
//                 Previous
//               </button>
//             ) : (
//               <div></div>
//             )}

//             {step < 3 ? (
//               <button
//                 onClick={handleNext}
//                 className="py-3 px-6 rounded-md font-medium text-white bg-black hover:bg-gray-800 transition duration-200"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className={`py-3 px-6 rounded-md font-medium text-white ${
//                   loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
//                 } transition duration-200`}
//               >
//                 {loading ? (
//                   <>
//                     <Spinner size="sm" className="mr-2" />
//                     Submitting...
//                   </>
//                 ) : 'Submit Verification'}
//               </button>
//             )}
//           </div>
//         </div>
//       </>
//     );
//   };

//   // Special status pages - full page view without sidebar layout
//   if (verificationStatus.isRoleVerified || verificationStatus.roleVerificationStatus === 'pending' || verificationStatus.roleVerificationStatus === 'rejected') {
//     return (
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex-shrink-0">
//           <Sidebar />
//         </div>
        
//         {/* Main content */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="max-w-2xl mx-auto mt-12 px-4">
//             {renderVerificationStatusUI()}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Default verification form layout
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex-shrink-0">
//         <Sidebar />
//       </div>
      
//       {/* Main content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-4xl mx-auto px-4 py-12">
//           {renderVerificationStatusUI()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestVerificationPage;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Dashboard/Startup/Sidebar';
import AlertMessage from '../../../components/Errors/AlertMessage';
import { useVerification } from '../../../context/VerificationContext';
import { useAuth } from '../../../context/AuthContext';

const RequestVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get verification context functions and state
  const {
    status,
    isVerified,
    submittedAt,
    rejectionReason,
    loading,
    error,
    submitVerification,
    getVerificationStatus,
  } = useVerification();
  
  // UI state
  const [step, setStep] = useState<number>(1);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [businessRegistration, setBusinessRegistration] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [additionalDocuments, setAdditionalDocuments] = useState<File[]>([]);
  // Removed unused submitSuccess state
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState<{
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  } | null>(null);

  // Fetch verification status on component mount
  useEffect(() => {
    getVerificationStatus();
  }, []);

  // Handle API errors
  useEffect(() => {
    if (error) {
      setAlertMessage({
        type: 'error',
        message: error
      });
    }
  }, [error]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
      
      // Clear any validation errors for this field
      setLocalErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length <= 5) {
        setAdditionalDocuments(filesArray);
        
        // Clear any validation errors for this field
        setLocalErrors(prev => {
          const newErrors = {...prev};
          delete newErrors[e.target.name];
          return newErrors;
        });
      } else {
        setLocalErrors(prev => ({
          ...prev,
          additionalDocuments: 'You can upload a maximum of 5 additional documents'
        }));
      }
    }
  };

  // Remove additional file
  const removeAdditionalFile = (index: number) => {
    setAdditionalDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (step === 1) {
      if (!idDocument) errors.idDocument = 'ID document is required';
    } else if (step === 2) {
      if (user?.role === 'founder' && !businessRegistration) {
        errors.businessRegistration = 'Business registration document is required';
      }
      if (!proofOfAddress) errors.proofOfAddress = 'Proof of address is required';
    }
    
    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    try {
      // Create form data and append all files
      const formData = new FormData();
      if (idDocument) {
        formData.append('idDocument', idDocument);
      }
      if (proofOfAddress) {
        formData.append('proofOfAddress', proofOfAddress);
      }
      if (user?.role === 'founder' && businessRegistration) {
        formData.append('businessRegistration', businessRegistration);
      }
      
      // Append additional documents if any
      if (additionalDocuments.length > 0) {
        additionalDocuments.forEach(doc => {
          formData.append('additionalDocuments', doc);
        });
      }
      
      // Submit verification documents using context function
      await submitVerification(formData);
      
      // Show success message
      setAlertMessage({
        type: 'success',
        message: 'Verification documents submitted successfully. Your verification is in progress.'
      });
      
      // Reset form
      setIdDocument(null);
      setBusinessRegistration(null);
      setProofOfAddress(null);
      setAdditionalDocuments([]);
      setStep(1);
      
      // Refresh verification status
      getVerificationStatus();
      
    } catch (err: any) {
      setAlertMessage({
        type: 'error',
        message: err.response?.data?.message || 'An error occurred during submission. Please try again.'
      });
    }
  };

  // Progress indicators for the 3-step process
  const ProgressSteps: React.FC = () => {
    return (
      <div className="flex items-center justify-center w-full mb-10">
        <div className="w-full max-w-3xl flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`${step >= 1 ? 'bg-black' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mb-2`}>
              <span className="text-sm">1</span>
            </div>
            <span className="text-xs text-gray-600">Personal ID</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-black' : 'bg-gray-300'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`${step >= 2 ? 'bg-black' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mb-2`}>
              <span className="text-sm">2</span>
            </div>
            <span className="text-xs text-gray-600">{user?.role === 'founder' ? 'Business Documents' : 'Address Proof'}</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-black' : 'bg-gray-300'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`${step >= 3 ? 'bg-black' : 'bg-gray-300'} text-white rounded-full w-10 h-10 flex items-center justify-center mb-2`}>
              <span className="text-sm">3</span>
            </div>
            <span className="text-xs text-gray-600">Review & Submit</span>
          </div>
        </div>
      </div>
    );
  };

  // Field with error handling
  interface FormFieldProps {
    label: string;
    name: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
  }

  const FormField: React.FC<FormFieldProps> = ({ 
    label, 
    required = false, 
    error, 
    children 
  }) => {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  // Simple spinner component
  interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }

  const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8';
    
    return (
      <div className={`animate-spin rounded-full border-t-2 border-r-2 border-gray-900 ${sizeClass} ${className}`}></div>
    );
  };
  
  // Render verification status UI blocks
  const renderVerificationStatusUI = () => {
    if (isVerified) {
      return (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-green-800 shadow-md">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold">Verified Account</h3>
          </div>
          <p className="mb-4">Your account has been fully verified. You have complete access to all platform features.</p>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-800 shadow-md">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold">Verification In Progress</h3>
          </div>
          <p className="mb-2">Your verification request is currently being reviewed by our team. This process typically takes 1-3 business days.</p>
          {submittedAt && (
            <p className="text-sm mb-4">
              Submitted on: {new Date(submittedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium transition duration-200"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-800 shadow-md">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold">Verification Rejected</h3>
          </div>
          <p className="mb-2">Your verification request was rejected for the following reason:</p>
          <p className="font-medium p-3 bg-red-100 rounded mb-4 border-l-4 border-red-500">
            {rejectionReason || "Invalid documents provided. Please ensure all documents are clear and valid."}
          </p>
          <button 
            onClick={() => getVerificationStatus()}
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium transition duration-200"
          >
            Submit New Verification Request
          </button>
        </div>
      );
    }

    // Default verification form UI
    return (
      <>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Account Verification</h1>
        
        <ProgressSteps />
        
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          {alertMessage && (
            <div className="mb-4">
              <AlertMessage type={alertMessage.type} message={alertMessage.message} />
            </div>
          )}
          
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Identification</h2>
              <p className="mb-6 text-gray-600">
                Please upload a clear image or PDF of your government-issued ID document. This helps us verify your identity.
              </p>
              
              <FormField 
                label="ID Document (Passport, Driver's License, or National ID)" 
                name="idDocument"
                required={true}
                error={localErrors.idDocument}
              >
                <input
                  name="idDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setIdDocument)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
                {idDocument && (
                  <p className="mt-2 text-sm text-green-600">
                    File selected: {idDocument.name}
                  </p>
                )}
              </FormField>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {user?.role === 'founder' ? 'Business Documents' : 'Address Verification'}
              </h2>
              
              {user?.role === 'founder' && (
                <FormField
                  label="Business Registration Document"
                  name="businessRegistration"
                  required={true}
                  error={localErrors.businessRegistration}
                >
                  <input
                    name="businessRegistration"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setBusinessRegistration)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                  />
                  {businessRegistration && (
                    <p className="mt-2 text-sm text-green-600">
                      File selected: {businessRegistration.name}
                    </p>
                  )}
                </FormField>
              )}
              
              <FormField
                label="Proof of Address (Utility Bill, Bank Statement)"
                name="proofOfAddress"
                required={true}
                error={localErrors.proofOfAddress}
              >
                <input
                  name="proofOfAddress"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setProofOfAddress)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
                {proofOfAddress && (
                  <p className="mt-2 text-sm text-green-600">
                    File selected: {proofOfAddress.name}
                  </p>
                )}
              </FormField>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Additional Documents & Review</h2>
              
              <FormField
                label="Additional Supporting Documents (Optional, max 5 files)"
                name="additionalDocuments"
                error={localErrors.additionalDocuments}
              >
                <input
                  name="additionalDocuments"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleMultipleFileChange}
                  multiple
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                  disabled={additionalDocuments.length >= 5}
                />
                
                {additionalDocuments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600 mb-1">
                      {additionalDocuments.length} file(s) selected:
                    </p>
                    <ul className="text-sm text-gray-600 list-disc ml-5">
                      {additionalDocuments.map((file, index) => (
                        <li key={index} className="flex justify-between items-center mt-1">
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAdditionalFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FormField>
              
              <div className="bg-gray-50 p-5 rounded-md text-sm text-gray-700 border border-gray-200 mb-6">
                <h3 className="font-medium mb-2">Documents Review:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className={`w-5 h-5 rounded-full ${idDocument ? 'bg-green-500' : 'bg-red-500'} mr-2 flex items-center justify-center text-white text-xs`}>
                      {idDocument ? '✓' : '×'}
                    </span>
                    ID Document: {idDocument ? idDocument.name : 'Missing'}
                  </li>
                  
                  {user?.role === 'founder' && (
                    <li className="flex items-center">
                      <span className={`w-5 h-5 rounded-full ${businessRegistration ? 'bg-green-500' : 'bg-red-500'} mr-2 flex items-center justify-center text-white text-xs`}>
                        {businessRegistration ? '✓' : '×'}
                      </span>
                      Business Registration: {businessRegistration ? businessRegistration.name : 'Missing'}
                    </li>
                  )}
                  
                  <li className="flex items-center">
                    <span className={`w-5 h-5 rounded-full ${proofOfAddress ? 'bg-green-500' : 'bg-red-500'} mr-2 flex items-center justify-center text-white text-xs`}>
                      {proofOfAddress ? '✓' : '×'}
                    </span>
                    Proof of Address: {proofOfAddress ? proofOfAddress.name : 'Missing'}
                  </li>
                  
                  <li className="flex items-center">
                    <span className={`w-5 h-5 rounded-full ${additionalDocuments.length ? 'bg-gray-500' : 'bg-gray-300'} mr-2 flex items-center justify-center text-white text-xs`}>
                      {additionalDocuments.length ? '✓' : '-'}
                    </span>
                    Additional Documents: {additionalDocuments.length ? `${additionalDocuments.length} file(s)` : 'None (Optional)'}
                  </li>
                </ul>
                
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800">
                  <p className="font-medium">Important Notice:</p>
                  <p>By submitting these documents, you confirm that all information provided is accurate and authentic. Submission of fraudulent documents may result in permanent account suspension.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 border border-gray-200 mb-6">
            <p><strong>Note:</strong> We accept PDF, JPG, JPEG, and PNG files only. Maximum file size is 10MB per file.</p>
          </div>
          
          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <button
                onClick={handlePrevious}
                className="py-3 px-6 rounded-md font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="py-3 px-6 rounded-md font-medium text-white bg-black hover:bg-gray-800 transition duration-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`py-3 px-6 rounded-md font-medium text-white ${
                  loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
                } transition duration-200 flex items-center`}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    <span>Submitting...</span>
                  </>
                ) : 'Submit Verification'}
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  // Default verification form layout
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {renderVerificationStatusUI()}
        </div>
      </div>
    </div>
  );
};

export default RequestVerificationPage;