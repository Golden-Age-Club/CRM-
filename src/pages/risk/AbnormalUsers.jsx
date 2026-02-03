import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import ActionsMenu from "../../components/ActionsMenu";

export default function AbnormalUsers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [abnormalUsers, setAbnormalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  
  // Action Modal State
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionReason, setActionReason] = useState("");

  useEffect(() => {
    fetchAbnormalUsers();
  }, [searchTerm]);

  const fetchAbnormalUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/risk/users?search=${searchTerm}`);
      setAbnormalUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch abnormal users:", error);
      toast.error(t('risk.abnormal_users.messages.load_failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowActionModal(true);
  };

  const handleSaveAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      await api.post('/api/admin/risk/action', {
        userId: selectedUser.id,
        actionType: actionType,
        reason: actionReason
      });

      toast.success(t('risk.abnormal_users.modal.success', { action: actionType, username: selectedUser.username }));
      setShowActionModal(false);
      setSelectedUser(null);
      setActionType("");
      setActionReason("");
      
      // Refresh list
      fetchAbnormalUsers();
    } catch (error) {
      console.error("Failed to apply action:", error);
      toast.error(error.response?.data?.message || t('risk.abnormal_users.modal.fail'));
    }
  };

  const getRiskBadge = (risk) => {
    const colors = {
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[risk] || colors.Low}`}>{t(`risk.levels.${risk}`, risk)}</span>;
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
          placeholder={t('risk.abnormal_users.search_placeholder')}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.user_id')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.username')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.risk_level')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.risk_reasons')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.win_rate')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('risk.abnormal_users.headers.actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {abnormalUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">{t('risk.abnormal_users.no_users')}</td>
                </tr>
              ) : (
                abnormalUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getRiskBadge(user.riskLevel)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                      <div className="space-y-1">
                        {user.riskReasons && user.riskReasons.map((reason, idx) => (
                          <div key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {reason}
                          </div>
                        ))}
                        {(!user.riskReasons || user.riskReasons.length === 0) && (
                          <span className="text-xs text-gray-400">{t('risk.abnormal_users.no_reasons')}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.winRate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                      <ActionsMenu
                        isOpen={openMenu === `risk-${user.id}`}
                        onToggle={() => setOpenMenu(openMenu === `risk-${user.id}` ? null : `risk-${user.id}`)}
                        showIcons={false}
                        actions={[
                          { 
                            label: t('risk.abnormal_users.actions.freeze'), 
                            onClick: () => handleUserAction(user, "freeze"),
                            danger: true
                          },
                          { 
                            label: t('risk.abnormal_users.actions.restrict'), 
                            onClick: () => handleUserAction(user, "restrict"),
                            danger: true
                          },
                          { 
                            label: t('risk.abnormal_users.actions.unfreeze'), 
                            onClick: () => handleUserAction(user, "unfreeze"),
                            danger: false
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
              {t('risk.abnormal_users.modal.title', { action: actionType.replace('_', ' ') })}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('risk.abnormal_users.modal.user')}: <strong>{selectedUser.username}</strong></p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('risk.abnormal_users.modal.risk_level')}: {getRiskBadge(selectedUser.riskLevel)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('risk.abnormal_users.modal.reason_label')}</label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={t('risk.abnormal_users.modal.reason_placeholder')}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {t('risk.abnormal_users.modal.warning')}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedUser(null);
                  setActionType("");
                  setActionReason("");
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSaveAction}
                disabled={!actionReason.trim()}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed capitalize"
              >
                {actionType.replace('_', ' ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
