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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">System Management</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Configure system settings, manage maintenance, and monitor system health.
        </p>
      </div>

      {/* System Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">System Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Maintenance Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable maintenance mode for system updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Auto Backup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enable automatic daily backups</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoBackup}
                onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Email Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send system notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">User Registration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow new user registrations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.userRegistration}
                onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">Max Login Attempts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Maximum failed login attempts before account lockout</p>
            <input
              type="number"
              min="1"
              max="20"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              className="w-32 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">Session Timeout (minutes)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Time before user session expires</p>
            <input
              type="number"
              min="5"
              max="120"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="w-32 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* System Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">System Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">Clear Cache</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Clear application cache and temporary files</p>
            <button
              onClick={handleClearCache}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Cache
            </button>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">Run Backup</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manually trigger a system backup</p>
            <button
              onClick={handleRunBackup}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Run Backup
            </button>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">System Logs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">View system logs and error reports</p>
            <button
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Logs
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">System Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Version</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">v1.0.0</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">15 days</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">65%</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Storage</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">245GB / 500GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
