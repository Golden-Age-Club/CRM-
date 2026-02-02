import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { getCookie, setCookie, removeCookie } from '../api/cookies';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie('access_token');
      if (token) {
        try {
          // Verify token and get user profile
          const userData = await api.get('/api/admin/auth/me');
          setUser(userData);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          removeCookie('access_token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Listen for unauthorized events (401) from axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/admin/auth/login', { email, password });
      const { token, ...userData } = response;
      
      setCookie('access_token', token, 12/24); // 12 hours (same as backend)
      setUser(userData);
      
      // Navigate to dashboard or return url
      navigate('/', { replace: true });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    removeCookie('access_token');
    setUser(null);
    navigate('/auth/sign-in');
  };

  const value = {
    user,
    role: user?.role || 'guest',
    permissions: user?.permissions || [],
    isAuthed: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
