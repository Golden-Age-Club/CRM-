import React from "react";
import "./App.css";
import "./styles/theme.css";
import "./styles/dark-theme.css";
import AppRoutes from "./routes";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const AppContent = () => {
  const { actualTheme } = useTheme();
  
  return (
    <>
      <AppRoutes />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme={actualTheme} 
      />
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
