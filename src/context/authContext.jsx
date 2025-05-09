import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) setCurrentUser(user);
  }, []);

  const register = ({ username, email, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'User already exists' };
    }
    const newUser = { id: Date.now(), username, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', 'dummy-token');
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, error: 'Invalid credentials' };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'dummy-token');
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
