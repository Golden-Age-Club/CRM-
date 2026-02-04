import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import ActionsMenu from "../../components/ActionsMenu";

export default function GamesManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Providers State
  const [providers, setProviders] = useState([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchProviders(searchTerm);
  }, [searchTerm]);

  const fetchProviders = async (search = "") => {
    setProvidersLoading(true);
    try {
        const response = await api.get(`/api/admin/games/providers?search=${search}`);
        setProviders(response.providers);
    } catch (error) {
        console.error("Failed to fetch providers:", error);
        toast.error("Failed to load providers");
    } finally {
        setProvidersLoading(false);
    }
  };

  const handleToggleProvider = async (providerId, currentStatus) => {
    const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
    if(!window.confirm(`Are you sure you want to ${newStatus} this provider?`)) return;

    try {
        await api.post('/api/admin/games/providers/toggle', { providerId, status: newStatus });
        toast.success(`Provider ${newStatus} successfully`);
        fetchProviders(searchTerm);
    } catch (error) {
        toast.error("Failed to toggle provider");
    }
  };

  const getStatusBadge = (status, providerStatus) => {
    if (providerStatus === 0 || providerStatus === false) {
       return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 border border-gray-300">{t('bets.games.status.provider_frozen')}</span>;
    }
    return status === "enabled"
      ? <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{t('bets.games.status.enabled')}</span>
      : <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{t('bets.games.status.disabled')}</span>;
  };

  return (
    <div className="p-6">
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white pb-4">
            {t('bets.games.tabs.providers', 'Providers Management')}
        </h1>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('bets.games.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Provider Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">API Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Platform Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {providersLoading ? (
                    <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                ) : providers.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-4 text-center">No providers found</td></tr>
                ) : (
                    providers.map((provider) => (
                        <tr key={provider.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{provider.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{provider.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {provider.is_active ? (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                                ) : (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Inactive</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(provider.db_status, provider.is_active)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                                <ActionsMenu
                                    isOpen={openMenu === `prov-${provider.id}`}
                                    onToggle={() => setOpenMenu(openMenu === `prov-${provider.id}` ? null : `prov-${provider.id}`)}
                                    showIcons={false}
                                    actions={[
                                        {
                                            label: provider.db_status === 'enabled' ? 'Disable' : 'Enable',
                                            onClick: () => handleToggleProvider(provider.id, provider.db_status),
                                            className: provider.db_status === 'enabled' ? 'text-red-600' : 'text-green-600'
                                        }
                                    ]}
                                />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
}
