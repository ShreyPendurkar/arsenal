import React, { createContext, useContext, useState } from 'react';
import { getToken, setToken, removeToken } from '../utils/jwt';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = getToken();
    return token
      ? { username: localStorage.getItem('username'), role: localStorage.getItem('role') }
      : null;
  });

  const login = (username, role) => {
    setToken(`${username}-${role}-jwt`);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    setUser({ username, role });
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
