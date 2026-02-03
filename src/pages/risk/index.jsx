import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export { default as AbnormalUsers } from './AbnormalUsers';
export { default as RiskRules } from './RiskRules';
export { default as RiskHistory } from './RiskHistory';

export default function RiskPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Risk Control</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Monitor abnormal users, view triggered risk rules, and apply restrictions.
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
              Abnormal Users
            </NavLink>
            <NavLink
              to="rules"
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              Risk Rules
            </NavLink>
            <NavLink
              to="history"
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`
              }
            >
              Risk History
            </NavLink>
          </nav>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
