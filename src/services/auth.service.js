import apiClient from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';


export const login = async (credentials) => {
  try {

    const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
   
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    return response;
  } catch (error) {
    // Clear local storage even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    throw error;
  }
};

/**
 * Get current user info
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.AUTH.ME);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh token
 * @returns {Promise<Object>} New token data
 */
export const refreshToken = async () => {
  try {
    const response = await apiClient.post(ENDPOINTS.AUTH.REFRESH);
    return response;
  } catch (error) {
    throw error;
  }
};

