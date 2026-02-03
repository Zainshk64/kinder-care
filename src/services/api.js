// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',   // ← you'll change this
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add token automatically on every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Handle 401 globally, refresh token, etc. (we can add later)

export default api;