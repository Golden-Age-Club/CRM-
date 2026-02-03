import React from 'react';
import { useTranslation } from 'react-i18next';

const BalanceAdjustmentModal = ({ 
  isOpen, 
  onClose, 
  adjustUserId, 
  adjustAmount, 
  setAdjustAmount, 
  adjustReason, 
  setAdjustReason, 
  confirmAdjust, 
  setConfirmAdjust, 
  handleAdjustBalance 
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {confirmAdjust ? t('user_balances.adjust_modal.confirm_title') : t('user_balances.adjust_modal.title')}
        </h2>
        
        {!confirmAdjust ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{t('user_balances.adjust_modal.user_id')}: {adjustUserId}</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('user_balances.adjust_modal.amount')}</label>
              <input
                type="number"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
                placeholder={t('user_balances.adjust_modal.amount_placeholder')}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('user_balances.adjust_modal.reason')}</label>
              <textarea
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder={t('user_balances.adjust_modal.reason_placeholder')}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700">{t('user_balances.adjust_modal.cancel')}</button>
              <button 
                onClick={() => setConfirmAdjust(true)} 
                disabled={!adjustAmount || !adjustReason}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {t('user_balances.adjust_modal.next')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
               <p className="text-yellow-800 dark:text-yellow-200 font-medium">{t('user_balances.adjust_modal.warning')}</p>
            </div>
            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>{t('user_balances.adjust_modal.user_id')}:</strong> {adjustUserId}</p>
              <p><strong>{t('user_balances.adjust_modal.amount')}:</strong> <span className={Number(adjustAmount) > 0 ? "text-green-600" : "text-red-600"}>{adjustAmount}</span></p>
              <p><strong>{t('user_balances.adjust_modal.reason')}:</strong> {adjustReason}</p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setConfirmAdjust(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700">{t('user_balances.adjust_modal.back')}</button>
              <button onClick={handleAdjustBalance} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{t('user_balances.adjust_modal.confirm')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceAdjustmentModal;