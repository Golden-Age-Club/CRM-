import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { useTranslation } from 'react-i18next';
import { Save, RefreshCw, Database, AlertTriangle } from 'lucide-react';

export default function SystemSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/system/settings');
      // Transform array to object for easier handling
      const settingsMap = {};
      response.forEach(s => {
        settingsMap[s.key] = s.value;
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error(t('system.settings.messages.load_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await api.put('/api/admin/system/settings', settings);
      toast.success(t('system.settings.messages.saved'));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(t('system.settings.messages.save_failed'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('system.settings.title')}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('system.settings.subtitle')}
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {t('common.save')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maintenance Mode */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg h-fit">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{t('system.settings.maintenance.title')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.maintenance.desc')}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode || false}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Auto Backup */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg h-fit">
              <Database size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{t('system.settings.backup.title')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.backup.desc')}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoBackup || false}
              onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{t('system.settings.email_notifications.title')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.email_notifications.desc')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications || false}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* User Registration */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{t('system.settings.registration.title')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.registration.desc')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.userRegistration || false}
              onChange={(e) => handleSettingChange('userRegistration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Numeric Settings */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('system.settings.max_login.title')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t('system.settings.max_login.desc')}</p>
          <input
            type="number"
            min="1"
            max="20"
            value={settings.maxLoginAttempts || 5}
            onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
            className="w-full sm:w-32 rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('system.settings.session_timeout.title')}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{t('system.settings.session_timeout.desc')}</p>
          <input
            type="number"
            min="5"
            max="120"
            value={settings.sessionTimeout || 30}
            onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
            className="w-full sm:w-32 rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
