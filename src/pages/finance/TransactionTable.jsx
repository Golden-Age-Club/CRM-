import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import { FaSearch, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import TransactionDetailsModal from "./components/TransactionDetailsModal";

const TransactionTable = ({ type }) => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTx, setSelectedTx] = useState(null); // For details modal

  useEffect(() => {
    fetchTransactions(1, searchTerm);
  }, [type, searchTerm]);

  const fetchTransactions = async (pageNum = 1, search = "") => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/finance/transactions?type=${type}&page=${pageNum}&limit=50&search=${search}`);
      setTransactions(response.transactions);
      setTotalPages(response.pages);
      setPage(response.page);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      toast.error(t('transaction_table.actions.failed_load'));
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    const confirmMsg = status === 'completed'
      ? t('transaction_table.actions.confirm_approve')
      : t('transaction_table.actions.confirm_reject');

    if (!window.confirm(confirmMsg)) return;
    try {
      await api.put(`/api/admin/finance/withdrawals/${id}`, { status }); // 'completed' or 'failed' (rejected)
      const successMsg = status === 'completed'
        ? t('transaction_table.actions.success_approve')
        : t('transaction_table.actions.success_reject');
      toast.success(successMsg);
      fetchTransactions(page, searchTerm);
    } catch (error) {
      toast.error(t('transaction_table.actions.failed_update'));
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      expired: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || colors.expired}`}>{t(`transaction_table.status.${status}`, status.toUpperCase())}</span>;
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('transaction_table.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.order_id')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.user')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.amount')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.currency')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t('transaction_table.headers.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">{t('transaction_table.loading')}</td></tr>
            ) : transactions.length === 0 ? (
              <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">{t('transaction_table.no_transactions')}</td></tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setSelectedTx(tx)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {tx.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {tx.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {tx.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" onClick={(e) => e.stopPropagation()}>
                    {type === 'withdrawal' && tx.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button onClick={() => handleAction(tx.id, 'completed')} className="text-green-600 hover:text-green-800" title={t('transaction_table.actions.approve')}><FaCheck /></button>
                        <button onClick={() => handleAction(tx.id, 'failed')} className="text-red-600 hover:text-red-800" title={t('transaction_table.actions.reject')}><FaTimes /></button>
                        <button onClick={() => setSelectedTx(tx)} className="text-blue-600 hover:text-blue-800" title={t('transaction_table.actions.view')}><FaEye /></button>
                      </div>
                    ) : (
                      <button onClick={() => setSelectedTx(tx)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1"><FaEye /> {t('transaction_table.actions.view')}</button>
                    )}
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
            onClick={() => fetchTransactions(page - 1, searchTerm)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          >
            {t('transaction_table.prev')}
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => fetchTransactions(page + 1, searchTerm)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white"
          >
            {t('transaction_table.next')}
          </button>
        </div>
      </div>

      <TransactionDetailsModal
        selectedTx={selectedTx}
        onClose={() => setSelectedTx(null)}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default TransactionTable;