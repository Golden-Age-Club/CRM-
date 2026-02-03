import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import ActionsMenu from "../../components/ActionsMenu";

export default function HighValueUsers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newVipLevel, setNewVipLevel] = useState("");

  // Data State
  const [vipUsers, setVipUsers] = useState([]);
  const [vipTiers, setVipTiers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Tiers and Users on Mount
  useEffect(() => {
    fetchVipTiers();
  }, []);

  useEffect(() => {
    fetchVipUsers();
  }, [searchTerm]);

  const fetchVipTiers = async () => {
    try {
      const response = await api.get('/api/admin/vip/tiers');
      setVipTiers(response);
    } catch (error) {
      console.error("Failed to fetch VIP tiers:", error);
      toast.error(t('vip.users.messages.fetch_tiers_failed'));
    }
  };

  const fetchVipUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/vip/users?search=${searchTerm}`);
      setVipUsers(response);
    } catch (error) {
      console.error("Failed to fetch VIP users:", error);
      toast.error(t('vip.users.messages.fetch_users_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustVip = (user) => {
    setSelectedUser(user);
    // Find tier level based on name
    const tier = vipTiers.find(t => t.name === user.currentVip);
    setNewVipLevel(tier ? tier.level : user.vipLevel);
    setShowAdjustModal(true);
  };

  const handleSaveVipAdjustment = async () => {
    if (!selectedUser || !newVipLevel) return;

    try {
      await api.put(`/api/admin/users/${selectedUser.id}`, { vip_level: newVipLevel });
      
      const newTierName = vipTiers.find(t => t.level == newVipLevel)?.name || newVipLevel;
      toast.success(t('vip.users.messages.update_success', { username: selectedUser.username, tier: newTierName }));
      
      setShowAdjustModal(false);
      setSelectedUser(null);
      setNewVipLevel("");
      fetchVipUsers(); // Refresh list
    } catch (error) {
      console.error("Failed to update VIP level:", error);
      toast.error(t('vip.users.messages.update_failed'));
    }
  };

  const getVipBadge = (vipName) => {
    const tier = vipTiers.find(t => t.name === vipName);
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${tier?.color || 'bg-gray-100 text-gray-800'}`}>{vipName}</span>;
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('vip.users.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.user_id')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.username')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.vip_level')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.total_deposit')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.total_bets')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.last_activity')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('vip.users.headers.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {vipUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getVipBadge(user.currentVip)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${user.totalDeposit.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${user.totalBets.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.lastActivity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                  <ActionsMenu
                    isOpen={openMenu === `vip-${user.id}`}
                    onToggle={() => setOpenMenu(openMenu === `vip-${user.id}` ? null : `vip-${user.id}`)}
                    showIcons={false}
                    actions={[
                      { 
                        label: t('vip.users.actions.adjust_vip'), 
                        onClick: () => handleAdjustVip(user)
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIP Adjustment Modal */}
      {showAdjustModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('vip.users.modal.title')}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('vip.users.modal.user')}: <strong>{selectedUser.username}</strong></p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('vip.users.modal.current_vip')}: {getVipBadge(selectedUser.currentVip)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('vip.users.modal.new_vip_level')}</label>
                <select
                  value={newVipLevel}
                  onChange={(e) => setNewVipLevel(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                >
                  {vipTiers.map((tier) => (
                    <option key={tier.level} value={tier.level}>{tier.level}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAdjustModal(false);
                  setSelectedUser(null);
                  setNewVipLevel("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {t('vip.users.modal.cancel')}
              </button>
              <button
                onClick={handleSaveVipAdjustment}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                {t('vip.users.modal.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
