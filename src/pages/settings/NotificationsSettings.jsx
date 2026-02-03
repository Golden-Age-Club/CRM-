import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotificationsSettings() {
  const { t } = useTranslation();
  return (
    <div className="p-10">
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">{t('notifications.title')}</h2>
      
      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">{t('notifications.email_notifications')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('notifications.email_desc')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white">{t('notifications.push_notifications')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('notifications.push_desc')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

      </div>
    </div>
  );
}
