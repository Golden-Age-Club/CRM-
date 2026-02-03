import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";

export default function RiskHistory() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskHistory, setRiskHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRiskHistory();
  }, [searchTerm]);

  const fetchRiskHistory = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/risk/history?search=${searchTerm}`);
      setRiskHistory(response.data || []);
    } catch (error) {
      console.error("Failed to fetch risk history:", error);
      toast.error(t('risk.risk_history.messages.load_failed'));
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[severity] || colors.Low}`}>{t(`risk.levels.${severity}`, severity)}</span>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      restricted: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      frozen: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      investigating: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      resolved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || colors.active}`}>{t(`risk.status.${status}`, status)}</span>;
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('risk.risk_history.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_history.headers.username')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_history.headers.rule_triggered')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_history.headers.severity')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_history.headers.details')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_history.headers.timestamp')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_history.headers.status')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {riskHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{record.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.rule}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getSeverityBadge(record.severity)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">{record.details}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(record.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
