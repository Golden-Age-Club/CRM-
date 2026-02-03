import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PreferencesSettings() {
  const { currentLanguage, changeLanguage, t, languages } = useLanguage();

  return (
    <div className="p-12">
      <div className="space-y-12">
        {/* Language & Region */}
        <div>
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">{t('settings.language_region')}</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{t('settings.select_language')}</label>
              <select 
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{t('settings.time_zone')}</label>
              <select className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="est">{t('settings.time_zones.est')}</option>
                <option value="pst">{t('settings.time_zones.pst')}</option>
                <option value="cst">{t('settings.time_zones.cst')}</option>
                <option value="mst">{t('settings.time_zones.mst')}</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">{t('settings.date_format')}</label>
              <select className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="mm_dd_yyyy">{t('settings.formats.mm_dd_yyyy')}</option>
                <option value="dd_mm_yyyy">{t('settings.formats.dd_mm_yyyy')}</option>
                <option value="yyyy_mm_dd">{t('settings.formats.yyyy_mm_dd')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8">{t('settings.data_privacy')}</h2>
          <div className="space-y-6">
            <button className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('settings.download_data')}
            </button>
            <button className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 dark:bg-gray-700 dark:text-blue-300 dark:border-blue-700 dark:hover:bg-blue-900/20">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {t('settings.export_data')}
            </button>
            <button className="w-full flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {t('settings.delete_account')}
            </button>
            <p className="text-base text-gray-500 dark:text-gray-400">{t('settings.delete_warning')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
