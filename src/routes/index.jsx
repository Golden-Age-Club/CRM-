import React from 'react';
import { useRoutes, Outlet } from 'react-router-dom';

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
import BetsPage from '../pages/BetsPage';
import FinancePage from '../pages/FinancePage';
import PromotionsPage from '../pages/PromotionsPage';
import ReportsPage from '../pages/ReportsPage';
import RiskPage from '../pages/RiskPage';
import SystemPage from '../pages/SystemPage';
import VipPage from '../pages/VipPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import AdminManagementPage from '../pages/AdminManagementPage';

// Layout Wrapper Component
const LayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
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
        },
        {
          path: 'bets',
          element: (
            <ProtectedRoute requiredPermission="bets">
              <BetsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'vip',
          element: (
            <ProtectedRoute requiredPermission="vip">
              <VipPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'risk',
          element: (
            <ProtectedRoute requiredPermission="risk">
              <RiskPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'promotions',
          element: (
            <ProtectedRoute requiredPermission="promotions">
              <PromotionsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'reports',
          element: (
            <ProtectedRoute requiredPermission="reports">
              <ReportsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'system',
          element: (
            <ProtectedRoute requiredPermission="system">
              <SystemPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: <ProfilePage />,
        },
        {
          path: 'settings',
          element: <SettingsPage />,
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
