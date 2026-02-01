import React from "react";
import "./App.css";
import AppRoutes from "./routes";
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}
