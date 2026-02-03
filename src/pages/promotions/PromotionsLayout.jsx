import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PromotionsLayout() {
  const { t } = useTranslation();

  const tabs = [
    { id: 'list', label: t('promotions.layout.tabs.management'), path: '/promotions' },
    { id: 'bonuses', label: t('promotions.layout.tabs.bonuses'), path: '/promotions/user-bonuses' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('promotions.layout.title')}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('promotions.layout.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              end={tab.path === '/promotions'}
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
