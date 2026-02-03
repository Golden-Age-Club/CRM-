import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";

export default function RiskRules() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [riskRules, setRiskRules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRiskRules();
  }, [searchTerm]);

  const fetchRiskRules = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/risk/rules`);
      // Simple client-side search since endpoint might not support it yet, 
      // or if it does, we can pass query. The original code didn't use search param for rules but had a search input.
      // Let's filter locally for now to match original behavior if API ignores it, 
      // or assume API handles it if we passed it. The original code passed nothing.
      // Let's filter locally.
      let data = response.data || [];
      if (searchTerm) {
        data = data.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      setRiskRules(data);
    } catch (error) {
      console.error("Failed to fetch risk rules:", error);
      toast.error(t('risk.risk_rules.messages.load_failed'));
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

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('risk.risk_rules.search_placeholder')}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_rules.headers.rule_name')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_rules.headers.description')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_rules.headers.severity')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.risk_rules.headers.triggered_count')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {riskRules.map((rule) => (
                <tr key={rule._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{rule.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">{rule.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getSeverityBadge(rule.severity)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{rule.triggered_count || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
