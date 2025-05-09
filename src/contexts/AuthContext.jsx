"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as authLogin, logout as authLogout, isAuthenticated } from "@/lib/auth";
import api from "@/config/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm lấy thông tin user
  const fetchUserInfo = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data);
      console.log('data user: ', data)
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra và lấy thông tin user khi component mount
  useEffect(() => {
    if (isAuthenticated()) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  // Hàm đăng nhập
  const login = async (credentials) => {
    const data = await authLogin(credentials);
    await fetchUserInfo(); // Lấy thông tin user sau khi đăng nhập
    return data;
  };

  // Hàm đăng xuất
  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    fetchUserInfo,
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
