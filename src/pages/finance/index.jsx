import React from 'react';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import UserBalances from './UserBalances';
import DepositOrders from './DepositOrders';
import WithdrawalRequests from './WithdrawalRequests';

const FinancePage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const tabs = [
    { id: "balances", label: t('finance_page.tabs.balances'), path: "/finance/balances" },
    { id: "deposits", label: t('finance_page.tabs.deposits'), path: "/finance/deposits" },
    { id: "withdrawals", label: t('finance_page.tabs.withdrawals'), path: "/finance/withdrawals" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('finance_page.title')}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('finance_page.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) => `
                  px-6 py-3 text-sm font-medium border-b-2 transition-colors
                  ${isActive 
                    ? "border-blue-500 text-blue-600 dark:text-blue-400" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"}
                `}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6">
           <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
export { UserBalances, DepositOrders, WithdrawalRequests };