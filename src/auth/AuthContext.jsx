/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_ROLE, ROLE_PERMISSIONS } from "./roles";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Mocked auth state for now; later replace with real login + token/session.
  const [role, setRole] = useState(DEFAULT_ROLE);

  const value = useMemo(() => {
    const permissions = ROLE_PERMISSIONS[role] ?? [];
    return {
      role,
      permissions,
      setRole, // dev helper
      isAuthed: true, // placeholder
    };
  }, [role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

