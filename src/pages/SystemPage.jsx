import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Server, 
  Shield, 
  Activity, 
  Database, 
  Save, 
  RefreshCw, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import api from '../utils/api'; // Use the configured axios instance
import { toast } from 'react-hot-toast';

const SystemPage = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    auto_backup: true,
    email_notifications: true,
    user_registration: true,
    max_login_attempts: 5,
    session_timeout: 60
  });

  const [systemInfo, setSystemInfo] = useState({
    version: '1.0.0',
    uptime: '0',
    server_status: 'online',
    database_status: 'connected',
    last_backup: null
  });

  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSystemData();
  }, []);

  const fetchSystemData = async () => {
    try {
      setIsLoading(true);
      const [settingsRes, infoRes, logsRes] = await Promise.all([
        api.get('/admin/system/settings'),
        api.get('/admin/system/info'),
        api.get('/admin/system/logs')
      ]);

      setSettings(settingsRes.data.data || settings);
      setSystemInfo(infoRes.data.data || systemInfo);
      setLogs(logsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching system data:', error);
      toast.error(t('system.logs.messages.load_failed') || 'Failed to load system data');
    } finally {
      setIsLoading(false);
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
      await api.put('/admin/system/settings', settings);
      toast.success(t('system.settings.saved_success'));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleSystemAction = async (action) => {
    try {
      switch (action) {
        case 'clear_cache':
          await api.post('/admin/system/clear-cache');
          toast.success(t('system.actions.cache_success'));
          break;
        case 'backup':
          await api.post('/admin/system/backup');
          toast.success(t('system.actions.backup_success'));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      toast.error(`Failed to perform ${action}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('system.title')}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('system.subtitle')}
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {t('system.settings.save')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.info.server_status')}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                {systemInfo.server_status === 'online' ? t('system.info.online') : systemInfo.server_status}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.info.database')}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                {systemInfo.database_status === 'connected' ? t('system.info.connected') : systemInfo.database_status}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.info.uptime')}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {Math.floor(systemInfo.uptime / 3600)}h {Math.floor((systemInfo.uptime % 3600) / 60)}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.info.version')}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">v{systemInfo.version}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Server className="w-5 h-5" />
              {t('system.settings.title')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{t('system.settings.maintenance.title')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.maintenance.desc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenance_mode}
                    onChange={(e) => handleSettingChange('maintenance_mode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{t('system.settings.backup.title')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.backup.desc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.auto_backup}
                    onChange={(e) => handleSettingChange('auto_backup', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{t('system.settings.email_notifications.title')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('system.settings.email_notifications.desc')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.email_notifications}
                    onChange={(e) => handleSettingChange('email_notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('system.settings.max_login.title')}
                  </label>
                  <input
                    type="number"
                    value={settings.max_login_attempts}
                    onChange={(e) => handleSettingChange('max_login_attempts', parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">{t('system.settings.max_login.desc')}</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('system.settings.session_timeout.title')}
                  </label>
                  <input
                    type="number"
                    value={settings.session_timeout}
                    onChange={(e) => handleSettingChange('session_timeout', parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">{t('system.settings.session_timeout.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logs Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              {t('system.logs.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{t('system.logs.headers.time')}</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{t('system.logs.headers.admin')}</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{t('system.logs.headers.action')}</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{t('system.logs.headers.target')}</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{t('system.logs.headers.ip')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <tr key={index} className="text-sm">
                        <td className="py-3 text-gray-600 dark:text-gray-300">
                          {new Date(log.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 font-medium text-gray-800 dark:text-white">
                          {log.adminId?.username || 'Unknown'}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded text-xs font-medium">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">
                          {log.target}
                        </td>
                        <td className="py-3 text-gray-500 dark:text-gray-400">
                          {log.ipAddress}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400">
                        {t('system.logs.no_logs')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Actions Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              {t('system.actions.title')}
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => handleSystemAction('clear_cache')}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{t('system.actions.clear_cache')}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('system.actions.cache_desc')}</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSystemAction('backup')}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{t('system.actions.run_backup')}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('system.actions.backup_desc')}</p>
                  </div>
                </div>
              </button>

              <button
                className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{t('system.actions.view_logs')}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('system.actions.logs_desc')}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPage;