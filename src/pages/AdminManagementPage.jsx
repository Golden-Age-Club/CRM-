import React from 'react';
import { useTranslation } from 'react-i18next';
import AdminManagement from './system/AdminManagement';

export default function AdminManagementPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t('admin_management.title')}
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
            {t('admin_management.subtitle')}
          </p>
        </div>
      </div>

      <AdminManagement />
    </div>
  );
}
