import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import ActionsMenu from "../../components/ActionsMenu";
import BalanceAdjustmentModal from "./components/BalanceAdjustmentModal";

const UserBalances = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustUserId, setAdjustUserId] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustReason, setAdjustReason] = useState("");
  const [confirmAdjust, setConfirmAdjust] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBalances(1, searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchBalances = async (pageNum = 1, search = "") => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/finance/balances?page=${pageNum}&limit=10&search=${search}`);
      setUsers(response.users);
      setTotalPages(response.pages);
      setPage(response.page);
    } catch (error) {
      console.error("Failed to fetch balances:", error);
      toast.error(t('user_balances.actions.failed_load'));
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustBalance = async () => {
    try {
      await api.post('/api/admin/finance/adjust-balance', {
        userId: adjustUserId,
        amount: adjustAmount,
        reason: adjustReason
      });
      toast.success(t('user_balances.actions.success_adjust'));
      setShowAdjustModal(false);
      setConfirmAdjust(false);
      setAdjustAmount("");
      setAdjustReason("");
      fetchBalances(page, searchTerm);
    } catch (error) {
      toast.error(error.response?.data?.message || t('user_balances.actions.failed_adjust'));
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('user_balances.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('user_balances.headers.user')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('user_balances.headers.available_balance')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('user_balances.headers.bonus_balance')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('user_balances.headers.total_balance')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('user_balances.headers.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">{t('transaction_table.loading')}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">{t('transaction_table.no_transactions')}</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-bold">
                    ${user.available?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 font-bold">
                    ${user.frozen?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-bold">
                    ${user.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                     <ActionsMenu
                        isOpen={openMenu === user.userId}
                        onToggle={() => setOpenMenu(openMenu === user.userId ? null : user.userId)}
                        showIcons={true}
                        actions={[
                          { 
                            label: t('user_balances.actions.adjust_balance'), 
                            icon: "edit",
                            onClick: () => {
                              setAdjustUserId(user.userId);
                              setShowAdjustModal(true);
                            }
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

       {/* Pagination */}
       <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          {t('transaction_table.page_info', { page, totalPages })}
        </div>
        <div className="space-x-2">
          <button 
            disabled={page === 1} 
            onClick={() => fetchBalances(page - 1, searchTerm)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          >
            {t('transaction_table.prev')}
          </button>
          <button 
            disabled={page === totalPages} 
            onClick={() => fetchBalances(page + 1, searchTerm)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          >
            {t('transaction_table.next')}
          </button>
        </div>
      </div>

      <BalanceAdjustmentModal
        isOpen={showAdjustModal}
        onClose={() => setShowAdjustModal(false)}
        adjustUserId={adjustUserId}
        adjustAmount={adjustAmount}
        setAdjustAmount={setAdjustAmount}
        adjustReason={adjustReason}
        setAdjustReason={setAdjustReason}
        confirmAdjust={confirmAdjust}
        setConfirmAdjust={setConfirmAdjust}
        handleAdjustBalance={handleAdjustBalance}
      />
    </div>
  );
};

export default UserBalances;