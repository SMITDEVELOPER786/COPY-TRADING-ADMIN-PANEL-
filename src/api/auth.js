import apiClient from './client';

/**
 * Authentication API endpoints
 */

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Response data containing token and user info
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    
    // Store token if provided
    if (response.token || response.data?.token) {
      const token = response.token || response.data.token;
      apiClient.setAuthToken(token);
    }

    return response;
  } catch (error) {
    // Re-throw with user-friendly message
    if (error.status === 401) {
      throw new Error('Invalid email or password');
    } else if (error.status === 403) {
      throw new Error('Access denied. Please contact administrator.');
    } else if (error.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.message) {
      throw error;
    } else {
      throw new Error('Login failed. Please try again.');
    }
  }
};

/**
 * Logout user
 */
export const logout = () => {
  apiClient.setAuthToken(null);
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
};

/**
 * Get current user info
 */
export const getCurrentUser = async () => {
  try {
    return await apiClient.get('/auth/me');
  } catch (error) {
    throw error;
  }
};
