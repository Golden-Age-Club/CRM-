import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("details");
  const { user, refreshProfile } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    location: "",
    bio: ""
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || ""
      });
    }
  }, [user]);

  const profileData = {
    name: user?.name || user?.first_name || "Admin User",
    title: user?.title || "Administrator",
    email: user?.email || "admin@example.com",
    phone: user?.phone || "Not provided",
    location: user?.location || "Not provided",
    joinDate: user?.joinDate || "Recently",
    avatar: (user?.name || user?.first_name || "AU").substring(0, 2).toUpperCase(),
    verified: user?.verified || false,
    bio: user?.bio || "No bio available.",
    first_name: user?.first_name || "",
    last_name: user?.last_name || ""
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      await api.put('/api/admin/auth/profile', profileForm);
      await refreshProfile();
      setMessage({ type: "success", content: t('profile_page.success_profile') });
    } catch (error) {
      setMessage({ type: "error", content: error.response?.data?.message || t('profile_page.failed_profile') });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: "error", content: t('profile_page.password_mismatch') });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      await api.put('/api/admin/auth/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setMessage({ type: "success", content: t('profile_page.success_password') });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setMessage({ type: "error", content: error.response?.data?.message || t('profile_page.failed_password') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="space-y-10">
          {/* Breadcrumb */}
          <nav className="flex text-base text-gray-500 dark:text-gray-400">
            <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300">{t('profile_page.home')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{t('profile_page.title')}</span>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('profile_page.title')}</h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                {t('profile_page.subtitle')}
              </p>
            </div>
          </div>

          {/* Message Alert */}
          {message.content && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.content}
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-10">
            <div className="flex items-start space-x-10">
              {/* Avatar */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold">
                  {profileData.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-5 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
                  <div className="flex space-x-2">
                    {profileData.verified && (
                      <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                        {t('profile_page.verified')}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-5">{profileData.title}</p>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-7 leading-relaxed">{profileData.bio}</p>
                
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profileData.email}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {profileData.phone}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {profileData.location}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v4m-4-8a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    {t('profile_page.joined')} {profileData.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                {[
                  { id: "details", label: t('profile_page.tabs.details') },
                  { id: "security", label: t('profile_page.tabs.security') },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-4 text-base font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-10">
              {activeTab === "details" && (
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Personal Information */}
                    <div className="lg:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('profile_page.personal_info')}</h3>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.first_name')}</label>
                            <input
                              type="text"
                              name="first_name"
                              value={profileForm.first_name}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.last_name')}</label>
                            <input
                              type="text"
                              name="last_name"
                              value={profileForm.last_name}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.email')}</label>
                          <input
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.phone')}</label>
                                <input
                                type="text"
                                name="phone"
                                value={profileForm.phone}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.location')}</label>
                                <input
                                type="text"
                                name="location"
                                value={profileForm.location}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            </div>
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.bio')}</label>
                          <textarea
                            rows={5}
                            name="bio"
                            value={profileForm.bio}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('profile_page.bio_hint')}</p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50"
                            >
                                {isLoading ? t('profile_page.saving') : t('profile_page.save_changes')}
                            </button>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('profile_page.recent_activity')}</h3>
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900 dark:text-white">Completed project review</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900 dark:text-white">Updated profile information</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-medium text-gray-900 dark:text-white">Joined new team</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {activeTab === "security" && (
                <div className="max-w-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('profile_page.change_password')}</h3>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.current_password')}</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.new_password')}</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile_page.confirm_password')}</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50"
                      >
                        {isLoading ? t('profile_page.updating') : t('profile_page.update_password')}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}