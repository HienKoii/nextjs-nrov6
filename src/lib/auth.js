import api from "./axios";

export const login = async (credentials) => {
  try {
    const { data } = await api.post("/api/auth/login", credentials);
    
    // Lưu token vào localStorage
    localStorage.setItem("token", data.token);
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post("/api/auth/register", userData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserInfo = async () => {
  try {
    const { data } = await api.get("/api/auth/me");
    return data;
  } catch (error) {
    throw error;
  }
}; 