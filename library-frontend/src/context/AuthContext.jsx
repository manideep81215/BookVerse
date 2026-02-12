import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const loggedInUser = response.data;

      const token = `user-${loggedInUser.id}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      toast.success(`Welcome back, ${loggedInUser.name}!`);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'STUDENT',
      };

      const response = await authAPI.register(payload);
      const createdUser = response.data;

      const token = `user-${createdUser.id}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(createdUser));
      setUser(createdUser);

      toast.success('Registration successful!');
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateCurrentUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
  };

  const isAdmin = () => user?.role === 'ADMIN' || user?.role === 'LIBRARIAN';

  const isStudent = () => user?.role === 'STUDENT' || !isAdmin();

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateCurrentUser,
    isAdmin,
    isStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
