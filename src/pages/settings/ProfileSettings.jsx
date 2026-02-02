import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import api from '../../api/axios';

export default function ProfileSettings() {
  const { user, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    position: "",
    avatar: ""
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        position: user.title || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const payload = {
        ...profileForm
      };
      
      await api.put('/api/admin/auth/profile', payload);
      await refreshProfile();
      setMessage({ type: "success", content: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", content: error.response?.data?.message || "Failed to update profile." });
    } finally {
      setIsLoading(false);
    }
  };

  // Derived display values
  const userInitials = (profileForm.first_name && profileForm.last_name) 
    ? `${profileForm.first_name[0]}${profileForm.last_name[0]}`.toUpperCase() 
    : (profileForm.email?.[0] || "U").toUpperCase();

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
            Update your account's profile information and email address.
          </p>
        </div>
        <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
          {user?.role || 'Admin'}
        </span>
      </div>

      {/* Message Alert */}
      {message.content && (
        <div className={`mb-8 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.content}
        </div>
      )}

      <form onSubmit={handleProfileSubmit} className="space-y-10">
        {/* Profile Photo */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-4">Profile Photo</label>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden flex-shrink-0">
                {profileForm.avatar ? (
                  <img src={profileForm.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  userInitials
                )}
              </div>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md cursor-pointer transition-colors"
                title="Change Photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="flex-1 max-w-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click the camera icon to upload a new photo.
              </p>
            </div>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={profileForm.first_name}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={profileForm.last_name}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Your email is private</p>
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Contact number</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
          <textarea
            rows={5}
            name="bio"
            value={profileForm.bio}
            onChange={handleProfileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Brief description for your profile. Max 160 characters.</p>
        </div>

        {/* Location and Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={profileForm.location}
              onChange={handleProfileChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
           <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={profileForm.position}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Position is managed by administration</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button 
            type="button"
            onClick={() => {
                // Reset form to user data
                 if (user) {
                    setProfileForm({
                        first_name: user.first_name || "",
                        last_name: user.last_name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        location: user.location || "",
                        bio: user.bio || "",
                        position: user.title || "",
                        avatar: user.avatar || ""
                    });
                    setIsEditingAvatar(false);
                }
            }}
            className="px-6 py-3 text-base font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Reset
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
