import React, { useState } from "react";
import { toast } from 'react-toastify';

export default function SystemPage() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    userRegistration: true,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // TODO: API call to save settings
    toast.success("System settings saved successfully!");
  };

  const handleClearCache = () => {
    // TODO: API call to clear cache
    toast.success("Cache cleared successfully!");
  };

  const handleRunBackup = () => {
    // TODO: API call to run backup
    toast.success("Backup started successfully!");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">System Management</h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
          Configure system settings, manage maintenance, and monitor system health.
        </p>
      </div>

      {/* System Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">System Settings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">Maintenance Mode</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Enable for updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 sm:after:h-5 sm:after:w-5"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">Auto Backup</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Daily backups</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 sm:after:h-5 sm:after:w-5"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">Email Notifications</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">System alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 sm:after:h-5 sm:after:w-5"></div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg gap-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base">User Registration</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Allow new users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={settings.userRegistration}
                onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 sm:after:h-5 sm:after:w-5"></div>
            </label>
          </div>

          <div className="sm:col-span-2 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Max Login Attempts</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Failed attempts before lockout</p>
            <input
              type="number"
              min="1"
              max="20"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              className="w-full sm:w-28 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Session Timeout (minutes)</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Session expiry time</p>
            <input
              type="number"
              min="5"
              max="120"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full sm:w-28 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base w-full sm:w-auto"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">System Actions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Clear Cache</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">Clear temporary files</p>
            <button
              onClick={handleClearCache}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
            >
              Clear Cache
            </button>
          </div>

          <div className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2 text-sm sm:text-base">Run Backup</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">Manual backup</p>
            <button
              onClick={handleRunBackup}
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm"
            >
              Run Backup
            </button>
          </div>

          <div className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg sm:col-span-2 lg:col-span-1">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2 text-sm sm:text-base">System Logs</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">View error logs</p>
            <button
              className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm"
            >
              View Logs
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">System Information</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Version</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">v1.0.0</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Uptime</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">15 days</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Memory</p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">65%</p>
          </div>
          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Storage</p>
            <p className="text-xs sm:text-base font-semibold text-gray-800 dark:text-white truncate">245GB / 500GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
