import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/Layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardOverview from "./pages/DashboardOverview";
import NotAuthorized from "./pages/NotAuthorized";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import {
  BetsPage,
  FinancePage,
  PromotionsPage,
  ReportsPage,
  RiskPage,
  SystemPage,
  UsersPage,
  VipPage,
} from "./pages/Placeholders";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/403" element={<NotAuthorized />} />

      <Route
        path="/"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="dashboard">
              <DashboardOverview />
            </ProtectedRoute>
          </MainLayout>
        }
      />

      <Route
        path="/users"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="users">
              <UsersPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/finance"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="finance">
              <FinancePage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/bets"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="bets">
              <BetsPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/vip"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="vip">
              <VipPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/risk"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="risk">
              <RiskPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/promotions"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="promotions">
              <PromotionsPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="reports">
              <ReportsPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/system"
        element={
          <MainLayout>
            <ProtectedRoute requiredPermission="system">
              <SystemPage />
            </ProtectedRoute>
          </MainLayout>
        }
      />

      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  );
}
