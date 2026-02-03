import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { useTranslation } from 'react-i18next';
import { Search, Clock, Shield } from 'lucide-react';

export default function SystemLogs() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterAction, setFilterAction] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [page, filterAction]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = { page, limit: 20 };
      if (filterAction) params.action = filterAction;
      
      const response = await api.get('/api/admin/system/logs', { params });
      setLogs(response.logs);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error(t('system.logs.messages.load_failed'));
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action) => {
    if (action.includes('DELETE')) return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
    if (action.includes('CREATE')) return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
    if (action.includes('UPDATE')) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
    return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('system.logs.title')}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('system.logs.subtitle')}</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder={t('system.logs.filter_placeholder')}
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.logs.headers.time')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.logs.headers.admin')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.logs.headers.action')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.logs.headers.target')}</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('system.logs.headers.ip')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {t('system.logs.no_logs')}
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        {formatDate(log.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-blue-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {log.admin_id ? `${log.admin_id.first_name} ${log.admin_id.last_name}` : t('system.logs.unknown_user')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {log.target}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                      {log.ip_address || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {t('common.previous')}
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('common.page_info', { page, totalPages })}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {t('common.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
