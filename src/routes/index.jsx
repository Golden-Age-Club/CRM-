import React from 'react';
import { useRoutes, Outlet, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../components/Layouts/MainLayout';

// Components
import ProtectedRoute from './ProtectedRoute';

// Pages
import DashboardOverview from '../pages/DashboardOverview';
import NotAuthorized from '../pages/NotAuthorized';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import UsersPage from '../pages/UsersPage';
import UserDetailsPage from '../pages/UserDetailsPage';
import BetsPage, { BetRecords, GamesManagement } from '../pages/bets';
import RiskPage, { AbnormalUsers, RiskRules, RiskHistory } from '../pages/risk';
import FinancePage, { UserBalances, DepositOrders, WithdrawalRequests } from '../pages/finance';
import SystemLayout from '../pages/system/SystemLayout';
import SystemSettings from '../pages/system/SystemSettings';
import AdminManagement from '../pages/system/AdminManagement';
import SystemLogs from '../pages/system/SystemLogs';
import VipPage, { HighValueUsers, VipConfig } from '../pages/vip';
import { ReportsLayout, Dashboard } from '../pages/reports';
import { PromotionsLayout, PromotionsList, UserBonuses } from '../pages/promotions';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import ProfileSettings from '../pages/settings/ProfileSettings';
import NotificationsSettings from '../pages/settings/NotificationsSettings';
import SecuritySettings from '../pages/settings/SecuritySettings';
import AppearanceSettings from '../pages/settings/AppearanceSettings';
import PreferencesSettings from '../pages/settings/PreferencesSettings';
import AdminManagementPage from '../pages/AdminManagementPage';

// Layout Wrapper Component
const LayoutWrapper = () => (
  <ProtectedRoute>
    <MainLayout>
      <Outlet />
    </MainLayout>
  </ProtectedRoute>
);

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/auth/sign-in',
      element: <SignIn />,
    },
    {
      path: '/403',
      element: <NotAuthorized />,
    },
    {
      path: '/users/:id',
      element: (
        <ProtectedRoute requiredPermission="users">
          <UserDetailsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/',
      element: <LayoutWrapper />,
      children: [
        {
          path: '',
          element: (
            <ProtectedRoute requiredPermission="dashboard">
              <DashboardOverview />
            </ProtectedRoute>
          ),
        },
        {
          path: 'users',
          element: (
            <ProtectedRoute requiredPermission="users">
              <UsersPage />
            </ProtectedRoute>
          ),
        },

        {
          path: 'finance',
          element: (
            <ProtectedRoute requiredPermission="finance">
              <FinancePage />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <Navigate to="balances" replace />,
            },
            {
              path: 'balances',
              element: <UserBalances />,
            },
            {
              path: 'deposits',
              element: <DepositOrders />,
            },
            {
              path: 'withdrawals',
              element: <WithdrawalRequests />,
            },
          ],
        },
        {
          path: 'bets',
          element: (
            <ProtectedRoute requiredPermission="bets">
              <BetsPage />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <Navigate to="records" replace />,
            },
            {
              path: 'records',
              element: <BetRecords />,
            },
            {
              path: 'games',
              element: <GamesManagement />,
            },
          ],
        },
        {
          path: 'vip',
          element: (
            <ProtectedRoute requiredPermission="vip">
              <VipPage />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <Navigate to="users" replace />,
            },
            {
              path: 'users',
              element: <HighValueUsers />,
            },
            {
              path: 'config',
              element: <VipConfig />,
            },
          ],
        },
        {
          path: 'risk',
          element: (
            <ProtectedRoute requiredPermission="risk">
              <RiskPage />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <Navigate to="users" replace />,
            },
            {
              path: 'users',
              element: <AbnormalUsers />,
            },
            {
              path: 'rules',
              element: <RiskRules />,
            },
            {
              path: 'history',
              element: <RiskHistory />,
            },
          ],
        },
        {
          path: 'promotions',
          element: (
            <ProtectedRoute requiredPermission="promotions">
              <PromotionsLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <PromotionsList />,
            },
            {
              path: 'user-bonuses',
              element: <UserBonuses />,
            },
          ],
        },
        {
          path: 'reports',
          element: (
            <ProtectedRoute requiredPermission="reports">
              <ReportsLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <Dashboard />,
            },
          ],
        },
        {
          path: 'system',
          element: (
            <ProtectedRoute requiredPermission="system">
              <SystemLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              path: '',
              element: <SystemSettings />,
            },
            {
              path: 'admins',
              element: <AdminManagement />,
            },
            {
              path: 'logs',
              element: <SystemLogs />,
            },
          ],
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
          children: [
            {
              path: '',
              element: <ProfileSettings />,
            },
            {
              path: 'notifications',
              element: <NotificationsSettings />,
            },
            {
              path: 'security',
              element: <SecuritySettings />,
            },
            {
              path: 'appearance',
              element: <AppearanceSettings />,
            },
            {
              path: 'preferences',
              element: <PreferencesSettings />,
            },
          ],
        },
        {
          path: 'admin-management',
          element: (
            <ProtectedRoute requiredPermission="system">
              <AdminManagementPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return routes;
}
