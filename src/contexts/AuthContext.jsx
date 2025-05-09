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
        const response = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        console.log("response.data setUser: ", response.data);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  // Hàm đăng nhập
  const login = async (credentials) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      if (response.status == 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
      }
    } catch (error) {
      console.log("error login: >>>>>", error);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
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
