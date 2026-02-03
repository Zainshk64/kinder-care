// services/auth.js
import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)   // adjust endpoint if it's different (e.g. /login, /api/auth/signin)
    return response.data
  } catch (err) {
    throw err.response?.data || {
      success: false,
      message: 'Network error or server unreachable'
    }
  }
}