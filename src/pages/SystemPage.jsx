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
import { toast } from 'react-toastify';

// Modal to view raw payload
const PayloadModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Webhook Payload</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Trash2 className="h-6 w-6" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
            <pre className="text-sm font-mono leading-relaxed text-blue-600 dark:text-blue-400 overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(data, null, 2));
              toast.success('Payload copied to clipboard');
            }}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          >
            Copy JSON
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const SystemPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'webhooks'
  const [isLoading, setIsLoading] = useState(true);
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

  // Payment Logs State
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loadingWebhooks, setLoadingWebhooks] = useState(false);
  const [webhookPage, setWebhookPage] = useState(1);
  const [totalWebhookPages, setTotalWebhookPages] = useState(1);
  const [selectedPayload, setSelectedPayload] = useState(null);

  useEffect(() => {
    fetchSystemData();
  }, []);

  useEffect(() => {
    if (activeTab === 'webhooks') {
      fetchPaymentLogs();
    }
  }, [activeTab, webhookPage]);

  const fetchSystemData = async () => {
    try {
      setIsLoading(true);
      const [settingsRes, infoRes, logsRes] = await Promise.all([
        api.get('/api/admin/system/settings'),
        api.get('/api/admin/system/info'),
        api.get('/api/admin/system/logs')
      ]);

      setSettings(settingsRes.data || settings);
      setSystemInfo(infoRes.data || systemInfo);
      setLogs(logsRes.data || []);
    } catch (error) {
      console.error('Error fetching system data:', error);
      toast.error('Failed to load system data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPaymentLogs = async () => {
    try {
      setLoadingWebhooks(true);
      const res = await api.get(`/api/admin/payment-logs?page=${webhookPage}&limit=20`);
      if (res.logs) {
        setPaymentLogs(res.logs);
        setTotalWebhookPages(res.pages);
      }
    } catch (error) {
      console.error('Failed to fetch payment logs:', error);
      toast.error('Failed to load webhook logs');
    } finally {
      setLoadingWebhooks(false);
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
      await api.put('/api/admin/system/settings', settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const handleSystemAction = async (action) => {
    try {
      await api.post(`/api/admin/system/${action}`);
      toast.success('Action executed successfully');
      fetchSystemData();
    } catch (error) {
      toast.error('Action failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'duplicate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'ignored': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('system.title')}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('system.subtitle')}
          </p>
        </div>
        {activeTab === 'settings' && (
          <button
            onClick={handleSaveSettings}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {t('system.settings.save')}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('system.settings.title')}
          {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'webhooks' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Webhook Logs
          {activeTab === 'webhooks' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
        </button>
      </div>

      {activeTab === 'settings' ? (
        <>
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
        </>
      ) : (
        /* Webhook Logs View */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">CCPayment Webhook Logs</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Audit trail of all incoming payment notifications</p>
            </div>
            <button
              onClick={fetchPaymentLogs}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors flex items-center gap-2"
              disabled={loadingWebhooks}
            >
              <RefreshCw className={`w-5 h-5 ${loadingWebhooks ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50 dark:bg-gray-900/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {loadingWebhooks ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan="6" className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div></td>
                    </tr>
                  ))
                ) : paymentLogs.length > 0 ? (
                  paymentLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group">
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                          {log.merchant_order_id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                          {log.webhook_type.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(log.processed_status)} shadow-sm`}>
                          {log.processed_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {log.ip_address}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedPayload(log.payload)}
                          className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-semibold underline decoration-2 underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          View JSON
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <Database className="w-12 h-12 text-gray-300" />
                        <p className="text-lg">No webhook logs found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalWebhookPages > 1 && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-2 bg-gray-50/50 dark:bg-gray-900/50">
              {Array.from({ length: totalWebhookPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setWebhookPage(p)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${webhookPage === p ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <PayloadModal
        isOpen={!!selectedPayload}
        onClose={() => setSelectedPayload(null)}
        data={selectedPayload}
      />
    </div>
  );
};

export default SystemPage;