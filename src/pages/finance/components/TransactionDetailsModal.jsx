import React from 'react';
import { FaMoneyBillWave, FaTimes, FaUser, FaWallet, FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TransactionDetailsModal = ({ selectedTx, onClose, getStatusBadge }) => {
  const { t } = useTranslation();

  if (!selectedTx) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(t('transaction_details.copy_clipboard'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${selectedTx.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              <FaMoneyBillWave className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('transaction_details.title')}</h2>
              <p className="text-sm text-gray-500">{t('transaction_details.id')}: {selectedTx.orderId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* Main Status Card */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-100 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('transaction_details.total_amount')}</p>
              <div className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {selectedTx.amount} <span className="text-lg text-gray-500 font-medium">{selectedTx.currency}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getStatusBadge(selectedTx.status)}
              <span className="text-xs text-gray-400">{new Date(selectedTx.date).toLocaleString()}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* User Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FaUser className="text-gray-400" /> {t('transaction_details.user_info')}
              </h3>
              <div className="group">
                <label className="text-xs text-gray-500 uppercase font-medium">{t('transaction_details.username')}</label>
                <p className="font-medium text-gray-900 dark:text-gray-200">{selectedTx.username}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FaWallet className="text-gray-400" /> {t('transaction_details.payment_details')}
              </h3>

              {selectedTx.paymentAddress && (
                <div>
                  <label className="text-xs text-gray-500 uppercase font-medium mb-1 block">{t('transaction_details.payment_address')}</label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                    <code className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all flex-1">{selectedTx.paymentAddress}</code>
                    <button onClick={() => copyToClipboard(selectedTx.paymentAddress)} className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title={t('transaction_details.copy_address')}>
                      <FaCopy />
                    </button>
                  </div>
                </div>
              )}

              {selectedTx.walletAddress && (
                <div>
                  <label className="text-xs text-gray-500 uppercase font-medium mb-1 block">{t('transaction_details.wallet_address')}</label>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                    <code className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all flex-1">{selectedTx.walletAddress}</code>
                    <button onClick={() => copyToClipboard(selectedTx.walletAddress)} className="p-1 text-gray-400 hover:text-blue-500 transition-colors" title={t('transaction_details.copy_address')}>
                      <FaCopy />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Raw Data */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors list-none select-none">
                <span className="transform transition-transform group-open:rotate-90">▶</span>
                {t('transaction_details.technical_details')}
              </summary>

              {selectedTx.paymentRecordId && (
                <div className="mt-4 mb-2">
                  <Link
                    to={`/system/webhooks?search=${selectedTx.orderId}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-md"
                  >
                    <FaCopy className="text-[10px]" /> VIEW RAW WEBHOOK LOG
                  </Link>
                </div>
              )}

              <div className="mt-3 relative animate-in fade-in slide-in-from-top-2 duration-200">
                <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs font-mono overflow-x-auto border border-gray-800 shadow-inner max-h-60 custom-scrollbar">
                  {JSON.stringify(selectedTx.details || {}, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            {t('transaction_details.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;