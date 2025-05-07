import React, { useState, useRef } from 'react';
import { useProfile } from '../../../context/ProfileContext';

const ProfilePictureUploader: React.FC = () => {
  const { profile, uploadProfilePicture, deleteProfilePicture, loading } = useProfile();
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        await uploadProfilePicture(files[0]);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      try {
        await deleteProfilePicture();
      } catch (error) {
        console.error('Error deleting profile picture:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer mb-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleUploadClick}
      >
        {profile?.profilePicture ? (
          <>
            <img
              src={profile.profilePicture.url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={loading}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {profile?.profilePicture ? 'Change' : 'Upload'} Picture
        </button>

        {profile?.profilePicture && (
          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={loading}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-2 text-xs text-gray-500">Uploading...</div>
      )}
    </div>
  );
};

export default ProfilePictureUploader;