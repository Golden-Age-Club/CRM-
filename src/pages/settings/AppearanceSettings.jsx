import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function AppearanceSettings() {
  const { t } = useTranslation();
  const { theme, setLightTheme, setDarkTheme, setSystemTheme, isSystem } = useTheme();

  return (
    <div className="p-10">
      <div className="space-y-10">
        {/* Theme */}
        <div>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">{t('appearance.theme')}</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-6">{t('appearance.choose_theme')}</p>
          <div className="grid grid-cols-3 gap-6">
            <div className="relative">
              <input 
                type="radio" 
                name="theme" 
                id="light" 
                className="sr-only peer" 
                checked={theme === 'light'}
                onChange={setLightTheme}
              />
              <label htmlFor="light" className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <div className="w-16 h-12 bg-white border border-gray-300 rounded mb-3 shadow-sm"></div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t('appearance.light')}</span>
              </label>
            </div>
            <div className="relative">
              <input 
                type="radio" 
                name="theme" 
                id="dark" 
                className="sr-only peer" 
                checked={theme === 'dark'}
                onChange={setDarkTheme}
              />
              <label htmlFor="dark" className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <div className="w-16 h-12 bg-gray-900 border border-gray-700 rounded mb-3 shadow-sm"></div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t('appearance.dark')}</span>
              </label>
            </div>
            <div className="relative">
              <input 
                type="radio" 
                name="theme" 
                id="system" 
                className="sr-only peer" 
                checked={isSystem}
                onChange={setSystemTheme}
              />
              <label htmlFor="system" className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:peer-checked:bg-blue-900/20 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <div className="w-16 h-12 bg-gradient-to-r from-white to-gray-900 border border-gray-300 rounded mb-3 shadow-sm"></div>
                <span className="text-base font-medium text-gray-900 dark:text-white">{t('appearance.system')}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">{t('appearance.display')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.font_size')}</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option>{t('appearance.small')}</option>
                <option selected>{t('appearance.medium')}</option>
                <option>{t('appearance.large')}</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.sidebar_position')}</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option selected>{t('appearance.left')}</option>
                <option>{t('appearance.right')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
