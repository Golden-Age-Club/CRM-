import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function NotAuthorized() {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('errors.403.title')}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t('errors.403.message')}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        {t('errors.403.back_home')}
      </Link>
    </div>
  );
}
