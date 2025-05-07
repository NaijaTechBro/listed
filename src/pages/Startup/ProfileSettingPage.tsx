import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useAuth } from '../../context/AuthContext';

const ProfileSettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { profile, loading, updateProfile, getProfile, uploadResume } = useProfile();
  const { updatePassword } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    visible: boolean;
  }>({
    type: 'success',
    message: '',
    visible: false
  });
  
  const [formData, setFormData] = useState({






    
    // Contact information
    email: '',
    homeAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Account information
    firstName: '',
    lastName: '',
    bio: '',
    phone: '',
    jobTitle: '',
    company: '',
    
    // Social links
    socialLinks: [] as Array<{platform: string, url: string}>,
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Preferences
    notifications: {
      paymentNotifications: true,
      invoiceReminders: true,
      productUpdates: false
    },
    display: {
      currencyFormat: 'USD ($)',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  // Load profile data when component mounts
  useEffect(() => {
    getProfile();
  }, []);

  // Update formData when profile data is loaded
  useEffect(() => {
    if (profile) {
      setFormData(prevState => ({
        ...prevState,
        email: profile.email || '',
        homeAddress: profile.homeAddress || '',
        city: profile.city || '',
        state: profile.state || '',
        postalCode: profile.postalCode || '',
        country: profile.country || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
        jobTitle: profile.jobTitle || '',
        company: profile.company || '',
        socialLinks: profile.socialLinks || [],
        // Keep security fields empty
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        // Set preferences if they exist
        notifications: {
          paymentNotifications: profile.preferences?.notifications?.paymentNotifications ?? true,
          invoiceReminders: profile.preferences?.notifications?.invoiceReminders ?? true,
          productUpdates: profile.preferences?.notifications?.productUpdates ?? false
        },
        display: {
          currencyFormat: profile.preferences?.display?.currencyFormat || 'USD ($)',
          dateFormat: profile.preferences?.display?.dateFormat || 'MM/DD/YYYY'
        }
      }));
    }
  }, [profile]);

  // Show notification for 5 seconds then hide it
  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message,
      visible: true
    });
  };

  // Fixed handleChange function with proper type checking
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  
  // Handle nested properties
  if (name.includes('.')) {
    const [parent, child] = name.split('.');
    
    setFormData(prev => {
      // Type guard to ensure we're working with an object
      if (
        parent === 'notifications' || 
        parent === 'display'
      ) {
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
      // Fallback for unknown parent keys (shouldn't happen with typed fields)
      return prev;
    });
  } else {
    // Non-nested properties work as before
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};


  // Fixed handleCheckboxChange with proper type checking
const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, checked } = e.target;
  
  if (name.includes('.')) {
    const [parent, child] = name.split('.');
    
    setFormData(prev => {
      // Handle just the known parent types that contain boolean fields
      if (parent === 'notifications') {
        return {
          ...prev,
          notifications: {
            ...prev.notifications,
            [child]: checked
          }
        };
      }
      // Add other object types as needed
      return prev;
    });
  } else {
    // Direct boolean properties if any (not shown in your example)
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  }
};
  const handleSocialLinkChange = (platform: string, value: string) => {
    const updatedLinks = [...formData.socialLinks];
    const existingLink = updatedLinks.find(link => link.platform === platform);
    
    if (existingLink) {
      existingLink.url = value;
    } else {
      updatedLinks.push({ platform, url: value });
    }
    
    setFormData(prev => ({
      ...prev,
      socialLinks: updatedLinks
    }));
  };

  const handleResumeUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      await uploadResume(file);
      showNotification('success', 'Resume uploaded successfully');
    } catch (err) {
      showNotification('error', 'Failed to upload resume');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        email: formData.email,
        homeAddress: formData.homeAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      });
      showNotification('success', 'Contact information updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to update contact information');
    }
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const socialLinksData = [
        { platform: 'twitter' as const, url: formData.socialLinks.find(link => link.platform === 'twitter')?.url || '' },
        { platform: 'instagram' as const, url: formData.socialLinks.find(link => link.platform === 'instagram')?.url || '' },
        { platform: 'linkedin' as const, url: formData.socialLinks.find(link => link.platform === 'linkedin')?.url || '' }
      ].filter(link => link.url);
      
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        phone: formData.phone,
        jobTitle: formData.jobTitle,
        company: formData.company,
        socialLinks: socialLinksData
      });
      showNotification('success', 'Account information updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to update account information');
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      showNotification('error', 'New password and confirmation do not match');
      return;
    }
    
    try {
      await updatePassword(formData.currentPassword, formData.newPassword);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      showNotification('success', 'Password updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to update password');
    }
  };

  const handlePreferenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        preferences: {
          notifications: {
            paymentNotifications: formData.notifications.paymentNotifications,
            invoiceReminders: formData.notifications.invoiceReminders,
            productUpdates: formData.notifications.productUpdates
          },
          display: {
            currencyFormat: formData.display.currencyFormat,
            dateFormat: formData.display.dateFormat
          }
        }
      });
      showNotification('success', 'Preferences updated successfully');
    } catch (err) {
      showNotification('error', 'Failed to update preferences');
    }
  };

  if (loading && !profile) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Get social link values with fallbacks
  const getSocialLink = (platform: string) => {
    const link = formData.socialLinks.find(l => l.platform === platform);
    return link ? link.url : '';
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1">
        {/* Notification Toast */}
        {notification.visible && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md flex items-center space-x-2 ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
            'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {notification.type === 'success' ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <AlertCircle size={20} className="text-red-500" />
            )}
            <span>{notification.message}</span>
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6 text-gray-900">Account Settings</h1>

          {/* Tabs */}
          <div className="flex mb-8 gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded font-medium ${
                activeTab === 'overview' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`px-6 py-3 rounded font-medium ${
                activeTab === 'account' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 rounded font-medium ${
                activeTab === 'security' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('preference')}
              className={`px-6 py-3 rounded font-medium ${
                activeTab === 'preference' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Preference
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <form onSubmit={handleContactSubmit} className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h2>
              <p className="text-gray-600 mb-6">
                Provide your legal name, home address and work mail.
              </p>

              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    placeholder="Home Address"
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div className="w-1/2 relative">
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 appearance-none"
                    >
    <option value="">State</option>
    <option value="Abia">Abia</option>
    <option value="Adamawa">Adamawa</option>
    <option value="Akwa Ibom">Akwa Ibom</option>
    <option value="Anambra">Anambra</option>
    <option value="Bauchi">Bauchi</option>
    <option value="Bayelsa">Bayelsa</option>
    <option value="Benue">Benue</option>
    <option value="Borno">Borno</option>
    <option value="Cross River">Cross River</option>
    <option value="Delta">Delta</option>
    <option value="Ebonyi">Ebonyi</option>
    <option value="Edo">Edo</option>
    <option value="Ekiti">Ekiti</option>
    <option value="Enugu">Enugu</option>
    <option value="FCT">Federal Capital Territory</option>
    <option value="Gombe">Gombe</option>
    <option value="Imo">Imo</option>
    <option value="Jigawa">Jigawa</option>
    <option value="Kaduna">Kaduna</option>
    <option value="Kano">Kano</option>
    <option value="Katsina">Katsina</option>
    <option value="Kebbi">Kebbi</option>
    <option value="Kogi">Kogi</option>
    <option value="Kwara">Kwara</option>
    <option value="Lagos">Lagos</option>
    <option value="Nasarawa">Nasarawa</option>
    <option value="Niger">Niger</option>
    <option value="Ogun">Ogun</option>
    <option value="Ondo">Ondo</option>
    <option value="Osun">Osun</option>
    <option value="Oyo">Oyo</option>
    <option value="Plateau">Plateau</option>
    <option value="Rivers">Rivers</option>
    <option value="Sokoto">Sokoto</option>
    <option value="Taraba">Taraba</option>
    <option value="Yobe">Yobe</option>
    <option value="Zamfara">Zamfara</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div className="w-1/2 relative">
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 appearance-none"
                    >
                      <option value="">Country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-700 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'account' && (
            <form onSubmit={handleAccountSubmit} className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Account Information</h2>
              <p className="text-gray-600 mb-6">
                Update your profile information visible to potential partners and investors.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm text-gray-600 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Social Links</label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Twitter</span>
                      <input
                        type="text"
                        value={getSocialLink('twitter')}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        className="flex-1 p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">Instagram</span>
                      <input
                        type="text"
                        value={getSocialLink('instagram')}
                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        className="flex-1 p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-gray-600">LinkedIn</span>
                      <input
                        type="text"
                        value={getSocialLink('linkedin')}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        className="flex-1 p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Upload Resume</label>
                  <div 
                    className="border border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-50"
                    onClick={handleResumeUpload}
                  >
                    <p className="text-gray-500 mb-2">
                      {profile?.resume ? 'Update your current resume' : 'Drag and drop your resume here or click to browse'}
                    </p>
                    <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                      Browse Files
                    </button>
                    {profile?.resume && (
                      <p className="mt-2 text-sm text-green-600">
                        Current resume: {profile.resume.originalName || profile.resume.filename}
                      </p>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden" 
                    />
                  </div>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-700 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Security Settings</h2>
              <p className="text-gray-600 mb-6">
                Update your password and security preferences.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  />
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium text-gray-800 mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center mb-4">
                    <input 
                      type="checkbox" 
                      id="twoFactor" 
                      className="mr-2" 
                      // Note: This would need additional implementation for 2FA
                    />
                    <label htmlFor="twoFactor" className="text-gray-700">Enable Two-Factor Authentication</label>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Adding an extra layer of security to your account can help protect your sensitive financial information.
                  </p>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-700 transition-colors"
                    disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                  >
                    {loading ? 'Updating...' : 'Update Security Settings'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'preference' && (
            <form onSubmit={handlePreferenceSubmit} className="bg-white rounded-lg shadow-sm p-6 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Preferences</h2>
              <p className="text-gray-600 mb-6">
                Customize your platform experience.
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Payment Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates when payments are processed</p>
                      </div>
                      <input 
                        type="checkbox" 
                        name="notifications.paymentNotifications" 
                        checked={formData.notifications.paymentNotifications} 
                        onChange={handleCheckboxChange} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Invoice Reminders</p>
                        <p className="text-sm text-gray-500">Get reminders about upcoming invoice due dates</p>
                      </div>
                      <input 
                        type="checkbox" 
                        name="notifications.invoiceReminders" 
                        checked={formData.notifications.invoiceReminders} 
                        onChange={handleCheckboxChange} 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700">Product Updates</p>
                        <p className="text-sm text-gray-500">Stay informed about new features and improvements</p>
                      </div>
                      <input 
                        type="checkbox" 
                        name="notifications.productUpdates" 
                        checked={formData.notifications.productUpdates} 
                        onChange={handleCheckboxChange} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3">Display</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Currency Display</label>
                      <select 
                        name="display.currencyFormat"
                        value={formData.display.currencyFormat}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 appearance-none"
                      >
                        <option value="USD ($)">USD ($)</option>
                        <option value="EUR (€)">EUR (€)</option>
                        <option value="GBP (£)">GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Date Format</label>
                      <select 
                        name="display.dateFormat"
                        value={formData.display.dateFormat}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:border-gray-400 appearance-none"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3">Integrations</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">S</span>
                        </div>
                        <div>
                          <p className="font-medium">Stripe</p>
                          <p className="text-sm text-gray-500">
                            {profile?.preferences?.integrations?.stripe?.connected ? 'Connected' : 'Not connected'}
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="text-sm text-blue-600"
                        // Note: Integration connection/disconnection would need additional implementation
                      >
                        {profile?.preferences?.integrations?.stripe?.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">Q</span>
                         </div>
                         <div>
                           <p className="font-medium">QuickBooks</p>
                           <p className="text-sm text-gray-500">
                             {profile?.preferences?.integrations?.quickbooks?.connected ? 'Connected' : 'Not connected'}
                           </p>
                         </div>
                       </div>
                       <button 
                        type="button" 
                        className="text-sm text-blue-600"
                        // Note: Integration connection/disconnection would need additional implementation
                      >
                        {profile?.preferences?.integrations?.quickbooks?.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-700 transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Preferences'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingPage;






