import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import ActionsMenu from "../../components/ActionsMenu";

export default function BetRecords() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [bets, setBets] = useState([]);
  const [betsLoading, setBetsLoading] = useState(false);
  const [betsPage, setBetsPage] = useState(1);
  const [betsTotalPages, setBetsTotalPages] = useState(1);
  const [selectedBet, setSelectedBet] = useState(null);
  const [showBetDetails, setShowBetDetails] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchBets(betsPage, searchTerm);
  }, [betsPage, searchTerm]);

  const fetchBets = async (page = 1, search = "") => {
    setBetsLoading(true);
    try {
      const response = await api.get(`/api/admin/bets?page=${page}&limit=10&search=${search}`);
      setBets(response.bets);
      setBetsTotalPages(response.pages);
      setBetsPage(response.page);
    } catch (error) {
      console.error("Failed to fetch bets:", error);
      toast.error(t('bets.records.failed_load'));
    } finally {
      setBetsLoading(false);
    }
  };

  const handleViewBetDetails = (bet) => {
    setSelectedBet(bet);
    setShowBetDetails(true);
  };

  const getResultBadge = (result, winAmount = 0) => {
    if (result === 'win' && winAmount === 0) {
       return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{t('bets.records.status.loss')}</span>;
    }

    const colors = {
      win: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      loss: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      bet: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      refunded: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      pending: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    };
    
    // Try to get translation for result, fallback to uppercase result
    const translatedResult = t(`bets.records.status.${result}`, { defaultValue: result.toUpperCase() });
    
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[result] || colors.pending}`}>{translatedResult}</span>;
  };

  const formatOrderId = (id) => {
    if (!id || id.length <= 10) return id;
    return `${id.substring(0, 4)}...${id.substring(id.length - 4)}`;
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('bets.records.search_placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.order_id')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.user')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.game')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.amount')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.win')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.balance')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.result')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.records.headers.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {betsLoading ? (
                <tr><td colSpan="9" className="px-6 py-4 text-center text-gray-500">{t('bets.records.loading')}</td></tr>
            ) : bets.length === 0 ? (
                <tr><td colSpan="9" className="px-6 py-4 text-center text-gray-500">{t('bets.records.no_bets')}</td></tr>
            ) : (
              bets.map((bet) => (
                <tr key={bet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" title={bet.id}>{formatOrderId(bet.id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bet.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{bet.game}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${bet.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">${bet.win.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${bet.balanceAfter?.toLocaleString() || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getResultBadge(bet.result, bet.win)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(bet.date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                    <ActionsMenu
                      isOpen={openMenu === `bet-${bet.id}`}
                      onToggle={() => setOpenMenu(openMenu === `bet-${bet.id}` ? null : `bet-${bet.id}`)}
                      showIcons={false}
                      actions={[
                        { 
                          label: t('bets.records.actions.view_details'), 
                          onClick: () => handleViewBetDetails(bet)
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
      {/* Bets Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">{t('transaction_table.page_info', { page: betsPage, totalPages: betsTotalPages })}</div>
        <div className="space-x-2">
          <button disabled={betsPage === 1} onClick={() => setBetsPage(betsPage - 1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white">{t('transaction_table.prev')}</button>
          <button disabled={betsPage === betsTotalPages} onClick={() => setBetsPage(betsPage + 1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white">{t('transaction_table.next')}</button>
        </div>
      </div>

      {/* Bet Details Modal */}
      {showBetDetails && selectedBet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowBetDetails(false)}>
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('bets.details.title')}</h2>
                <button onClick={() => setShowBetDetails(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.order_id')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white break-all">{selectedBet.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.game_id')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedBet.game}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.user')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedBet.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.result')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedBet.result}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.amount')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${selectedBet.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.win_amount')}</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">${selectedBet.win}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.balance_after')}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${selectedBet.balanceAfter?.toLocaleString() || '-'}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('bets.details.date')}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(selectedBet.date).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* JSON Details */}
                  <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('bets.details.raw_info')}</p>
                      <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg text-xs font-mono overflow-x-auto border border-gray-800 shadow-inner max-h-60 custom-scrollbar">
                        {JSON.stringify(selectedBet.details || {}, null, 2)}
                      </pre>
                  </div>
                </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end">
                <button onClick={() => setShowBetDetails(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('bets.details.close')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
