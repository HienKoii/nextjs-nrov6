"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/login`, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (credentials) => {
    try {
      const response = await axios.post(`/api/${process.env.NEXT_PUBLIC_API_PREFIX}/auth/register`, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
