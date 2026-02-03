import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineShield } from "react-icons/md";
import { LuPalette } from "react-icons/lu";
import { SlGlobe } from "react-icons/sl";
import { Outlet, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation();

  const sidebarItems = [
    { id: "profile", label: t('settings.profile'), icon: <FaRegUser />, path: "/settings" },
    { id: "notifications", label: t('settings.notifications'), icon: <IoMdNotificationsOutline />, path: "/settings/notifications" },
    { id: "security", label: t('settings.security'), icon: <MdOutlineShield />, path: "/settings/security" },
    { id: "appearance", label: t('settings.appearance'), icon: <LuPalette />, path: "/settings/appearance" },
    { id: "preferences", label: t('settings.preferences'), icon: <SlGlobe />, path: "/settings/preferences" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="space-y-10">
          {/* Breadcrumb */}
          <nav className="flex text-base text-gray-500 dark:text-gray-400">
            <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300">{t('settings.home')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{t('settings.title')}</span>
          </nav>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.title')}</h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              {t('settings.description')}
            </p>
          </div>

          {/* Settings Layout */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <nav className="p-4">
                  {sidebarItems.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      end={item.path === "/settings"}
                      className={({ isActive }) =>
                        `w-full flex items-center px-5 py-3 text-base font-medium rounded-lg transition-colors mb-1 ${
                          isActive
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`
                      }
                    >
                      <span className="mr-4 text-xl">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
