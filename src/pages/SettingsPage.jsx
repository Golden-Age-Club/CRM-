import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineShield } from "react-icons/md";
import { LuPalette } from "react-icons/lu";
import { SlGlobe } from "react-icons/sl";
import { useTheme } from "../contexts/ThemeContext";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { theme, setLightTheme, setDarkTheme, setSystemTheme, isSystem } = useTheme();

  const profileData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    bio: "Product designer and developer",
    website: "https://johndoe.com",
    location: "San Francisco, CA",
    company: "TechCorp Inc.",
    position: "Senior Product Designer",
    twitter: "sarahjohnson",
    github: "sarahjohnson",
    linkedin: "sarah-johnson"
  };

  const sidebarItems = [
    { id: "profile", label: "Profile", icon: <FaRegUser /> },
    { id: "notifications", label: "Notifications", icon: <IoMdNotificationsOutline /> },
    { id: "security", label: "Security", icon: <MdOutlineShield /> },
    { id: "appearance", label: "Appearance", icon: <LuPalette /> },
    { id: "preferences", label: "Preferences", icon: <SlGlobe /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="space-y-10">
          {/* Breadcrumb */}
          <nav className="flex text-base text-gray-500 dark:text-gray-400">
            <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">Settings</span>
          </nav>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences.
            </p>
          </div>

          {/* Settings Layout */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <nav className="p-4">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-5 py-3 text-base font-medium rounded-lg transition-colors mb-1 ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="mr-4 text-xl">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Profile Section */}
                {activeSection === "profile" && (
                  <div className="p-10">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                        <p className="text-base text-gray-600 dark:text-gray-400 mt-2">
                          Update your account's profile information and email address.
                        </p>
                      </div>
                      <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                        Public
                      </span>
                    </div>

                    <div className="space-y-10">
                      {/* Profile Photo */}
                      <div>
                        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-4">Profile Photo</label>
                        <div className="flex items-center space-x-6">
                          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold">
                            JD
                          </div>
                          <div className="flex space-x-4">
                            <button className="px-6 py-3 text-base font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700">
                              Change Photo
                            </button>
                            <button className="px-6 py-3 text-base font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                          <input
                            type="text"
                            defaultValue={profileData.firstName}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                          <input
                            type="text"
                            defaultValue={profileData.lastName}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Email and Username */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                          <input
                            type="email"
                            defaultValue={profileData.email}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Your email is private</p>
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                          <input
                            type="text"
                            defaultValue={profileData.username}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This will be your public username</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                        <textarea
                          rows={5}
                          defaultValue={profileData.bio}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Brief description for your profile. Max 160 characters.</p>
                      </div>

                      {/* Website and Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                          <input
                            type="url"
                            defaultValue={profileData.website}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                          <input
                            type="text"
                            defaultValue={profileData.location}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Company and Position */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                          <input
                            type="text"
                            defaultValue={profileData.company}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                          <input
                            type="text"
                            defaultValue={profileData.position}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="flex justify-end space-x-4 pt-6">
                        <button className="px-6 py-3 text-base font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                          Cancel
                        </button>
                        <button className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                          Save Changes
                        </button>
                      </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Social Links</h3>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            Twitter
                          </label>
                          <input
                            type="text"
                            defaultValue={profileData.twitter}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </label>
                          <input
                            type="text"
                            defaultValue={profileData.github}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </label>
                          <input
                            type="text"
                            defaultValue={profileData.linkedin}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>

                      {/* Save Button for Social Links */}
                      <div className="flex justify-end space-x-4 pt-6">
                        <button className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Section */}
                {activeSection === "notifications" && (
                  <div className="p-10">
                    <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Email Notifications</h2>
                    
                    <div className="space-y-8">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Push Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications on your devices</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Weekly Digest */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Weekly Digest</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get a weekly summary of activity</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Product Updates */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Product Updates</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">News about product and feature updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Activity Notifications</h2>
                      
                      <div className="space-y-8">
                        {/* Comments on Posts */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Comments on Posts</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notify when someone comments on your post</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        {/* Mentions & Replies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">Mentions & Replies</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notify when someone mentions or replies to you</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Section */}
                {activeSection === "security" && (
                  <div className="p-12">
                    <div className="space-y-12">
                      {/* Password Section */}
                      <div>
                        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Password</h2>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Current Password</label>
                            <input
                              type="password"
                              placeholder="Enter current password"
                              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">New Password</label>
                            <input
                              type="password"
                              placeholder="Enter new password"
                              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <p className="text-base text-gray-500 dark:text-gray-400 mt-3">Must be at least 8 characters</p>
                          </div>
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Confirm New Password</label>
                            <input
                              type="password"
                              placeholder="Confirm new password"
                              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <button className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Two-Factor Authentication</h2>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enable Two-Factor Authentication</h3>
                            <p className="text-base text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      {/* Session Management */}
                      <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Session Management</h2>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Session Timeout</label>
                            <select className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <option>30 minutes</option>
                              <option>1 hour</option>
                              <option>2 hours</option>
                              <option>4 hours</option>
                            </select>
                            <p className="text-base text-gray-500 dark:text-gray-400 mt-3">Auto logout after period of inactivity</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Login Alerts</h3>
                              <p className="text-base text-gray-500 dark:text-gray-400">Get notified of new login attempts</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-6 pt-8">
                          <button className="px-8 py-4 text-lg font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                            Cancel
                          </button>
                          <button className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Section */}
                {activeSection === "appearance" && (
                  <div className="p-10">
                    <div className="space-y-10">
                      {/* Theme */}
                      <div>
                        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Theme</h2>
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-6">Choose your theme</p>
                        <div className="grid grid-cols-3 gap-6">
                          <div className="relative">
                            <input 
                              type="radio" 
                              name="theme" 
                              id="light" 
                              className="sr-only peer" 
                              checked={theme === 'light'}
                              onChange={setLightTheme}
                            />
                            <label htmlFor="light" className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                              <div className="w-16 h-12 bg-white border border-gray-300 rounded mb-3 shadow-sm"></div>
                              <span className="text-base font-medium text-gray-900 dark:text-white">Light</span>
                            </label>
                          </div>
                          <div className="relative">
                            <input 
                              type="radio" 
                              name="theme" 
                              id="dark" 
                              className="sr-only peer" 
                              checked={theme === 'dark'}
                              onChange={setDarkTheme}
                            />
                            <label htmlFor="dark" className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                              <div className="w-16 h-12 bg-gray-900 border border-gray-700 rounded mb-3 shadow-sm"></div>
                              <span className="text-base font-medium text-gray-900 dark:text-white">Dark</span>
                            </label>
                          </div>
                          <div className="relative">
                            <input 
                              type="radio" 
                              name="theme" 
                              id="system" 
                              className="sr-only peer" 
                              checked={isSystem}
                              onChange={setSystemTheme}
                            />
                            <label htmlFor="system" className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                              <div className="w-16 h-12 bg-gradient-to-r from-white to-gray-900 border border-gray-300 rounded mb-3 shadow-sm"></div>
                              <span className="text-base font-medium text-gray-900 dark:text-white">System</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Display */}
                      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Display</h2>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <option>Small</option>
                              <option selected>Medium</option>
                              <option>Large</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Sidebar Position</label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <option selected>Left</option>
                              <option>Right</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Section */}
                {activeSection === "preferences" && (
                  <div className="p-12">
                    <div className="space-y-12">
                      {/* Language & Region */}
                      <div>
                        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Language & Region</h2>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Language</label>
                            <select className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <option selected>English</option>
                              <option>Spanish</option>
                              <option>French</option>
                              <option>German</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Time Zone</label>
                            <select className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <option selected>Eastern Standard Time (EST)</option>
                              <option>Pacific Standard Time (PST)</option>
                              <option>Central Standard Time (CST)</option>
                              <option>Mountain Standard Time (MST)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Date Format</label>
                            <select className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <option selected>MM/DD/YYYY</option>
                              <option>DD/MM/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Data & Privacy */}
                      <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
                        <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">Data & Privacy</h2>
                        <div className="space-y-6">
                          <button className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Your Data
                          </button>
                          <button className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/20">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            Export Account Data
                          </button>
                          <button className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete Account
                          </button>
                          <p className="text-base text-gray-500 dark:text-gray-400">Permanently delete your account and all associated data.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions Sidebar */}
                {activeSection === "profile" && (
                  <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Quick Actions</h3>
                    <div className="space-y-6">
                      <button className="w-full flex items-center px-8 py-4 text-lg font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Documents
                      </button>
                      <button className="w-full flex items-center px-8 py-4 text-lg font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 1h5v5H4V1zm0 8h5v5H4V9zm8-8h5v5h-5V1z" />
                        </svg>
                        Manage Notifications
                      </button>
                      <button className="w-full flex items-center px-8 py-4 text-lg font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        <svg className="w-6 h-6 mr-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Privacy Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}