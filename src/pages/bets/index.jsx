import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export { default as BetRecords } from './BetRecords';
export { default as GamesManagement } from './GamesManagement';

export default function BetsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('bets.title')}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('bets.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <NavLink
              to="records"
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              {t('bets.tabs.records')}
            </NavLink>
            <NavLink
              to="games"
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              {t('bets.tabs.games')}
            </NavLink>
          </nav>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
