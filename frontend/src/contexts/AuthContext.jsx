import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/jwt';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.user);
          } else {
            removeToken();
          }
        } catch (error) {
          removeToken();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      if (response.success && response.token) {
        console.log('Login successful! JWT Token received:', response.token.substring(0, 50) + '...');
        setToken(response.token);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed: No token received' };
    } catch (error) {
      console.error('Login error:', error.message);
      return { success: false, message: error.message };
    }
  };

  const register = async (username, password, role) => {
    try {
      const response = await authAPI.register(username, password, role);
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
