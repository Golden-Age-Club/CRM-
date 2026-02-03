import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import api from "../../api/axios";
import ActionsMenu from "../../components/ActionsMenu";

export default function GamesManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(false);
  const [gamesPage, setGamesPage] = useState(1);
  const [gamesTotalPages, setGamesTotalPages] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchGames(gamesPage, searchTerm);
  }, [gamesPage, searchTerm]);

  const fetchGames = async (page = 1, search = "") => {
    setGamesLoading(true);
    try {
      const response = await api.get(`/api/admin/games?page=${page}&limit=10&search=${search}`);
      setGames(response.games);
      setGamesTotalPages(response.total_pages);
      setGamesPage(response.page);
    } catch (error) {
      console.error("Failed to fetch games:", error);
      toast.error(t('bets.games.failed_load'));
    } finally {
      setGamesLoading(false);
    }
  };

  const handleToggleGame = async (gameId, currentStatus) => {
    const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
    const statusText = newStatus === 'disabled' ? t('bets.games.actions.disable').toLowerCase() : t('bets.games.actions.enable').toLowerCase();
    
    if(!window.confirm(t('bets.games.actions.confirm_toggle', { status: statusText }))) return;

    try {
      await api.post('/api/admin/games/toggle', { gameId, status: newStatus });
      toast.success(t('bets.games.actions.success_toggle', { status: statusText }));
      fetchGames(gamesPage, searchTerm);
    } catch (error) {
      toast.error(t('bets.games.actions.failed_toggle'));
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.games.headers.provider_id')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.games.headers.game_name')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.games.headers.status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.games.headers.total_bets')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.games.headers.rtp')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">{t('bets.games.headers.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {gamesLoading ? (
                <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">{t('bets.games.loading')}</td></tr>
            ) : games.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-4 text-center text-gray-500">{t('bets.games.no_games')}</td></tr>
            ) : (
              games.map((game) => (
                <tr key={game.game_id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{game.provider_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{game.name || game.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(game.local_status, game.provider_status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${game.stats?.total_bets?.toLocaleString() || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{game.stats?.rtp || 0}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                    <ActionsMenu
                      isOpen={openMenu === `game-${game.game_id}`}
                      onToggle={() => setOpenMenu(openMenu === `game-${game.game_id}` ? null : `game-${game.game_id}`)}
                      showIcons={false}
                      actions={[
                        { 
                          label: (game.local_status === "enabled" || game.local_status === undefined) ? t('bets.games.actions.disable') : t('bets.games.actions.enable'), 
                          onClick: () => handleToggleGame(game.game_id, game.local_status || 'enabled'),
                          danger: (game.local_status === "enabled" || game.local_status === undefined),
                          disabled: game.provider_status === 0 || game.provider_status === false // Cannot enable if provider is frozen
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
       {/* Games Pagination */}
       <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">{t('transaction_table.page_info', { page: gamesPage, totalPages: gamesTotalPages })}</div>
        <div className="space-x-2">
          <button disabled={gamesPage === 1} onClick={() => setGamesPage(gamesPage - 1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white">{t('transaction_table.prev')}</button>
          <button disabled={gamesPage === gamesTotalPages} onClick={() => setGamesPage(gamesPage + 1)} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white">{t('transaction_table.next')}</button>
        </div>
      </div>
    </div>
  );
}
