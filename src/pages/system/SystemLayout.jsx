import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Settings, Shield, FileText } from 'lucide-react';

export default function SystemLayout() {
  const { t } = useTranslation();

  const tabs = [
    { 
      id: 'settings', 
      label: t('system.settings', 'Settings'), 
      path: '/system',
      icon: Settings 
    },
    { 
      id: 'admins', 
      label: t('system.admins', 'Admin Management'), 
      path: '/system/admins',
      icon: Shield 
    },
    { 
      id: 'logs', 
      label: t('system.logs', 'Audit Logs'), 
      path: '/system/logs',
      icon: FileText 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('system.title', 'System Management')}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
            {t('system.subtitle', 'Configure settings and monitor activities')}
          </p>
        </div>
        <div className="hidden sm:block">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  end={tab.path === '/system'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                      isActive
                        ? "border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700/50"
                    }`
                  }
                >
                  <Icon size={18} />
                  {tab.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
