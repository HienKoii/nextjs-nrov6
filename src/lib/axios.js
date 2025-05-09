import axios from "axios";

// Tạo instance axios với config mặc định
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý request
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Xử lý refresh token ở đây nếu cần
    return Promise.reject(error);
  }
);

export default api;
