import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export { default as HighValueUsers } from './HighValueUsers';
export { default as VipConfig } from './VipConfig';

export default function VipPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('vip.title')}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('vip.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <NavLink
              to="users"
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              {t('vip.tabs.users')}
            </NavLink>
            <NavLink
              to="config"
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              {t('vip.tabs.config')}
            </NavLink>
          </nav>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
