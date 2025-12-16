import apiClient from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

/**
 * User Service
 * Handles all user-related API calls
 */

/**
 * Get users list with filters
 * @param {Object} params - Query parameters
 * @param {string} params.role - User role (e.g., 'INVESTOR', 'TRADER', 'ADMIN')
 * @param {boolean} params.all - Get all users (default: false)
 * @returns {Promise<Object>} Response data containing users list
 */
export const getUsers = async (params = {}) => {
  try {
    const { role, all = false, ...otherParams } = params;
    
    // Build query string
    const queryParams = new URLSearchParams();
    if (role) queryParams.append('role', role);
    if (all) queryParams.append('all', 'true');
    
    // Add any other query parameters
    Object.keys(otherParams).forEach(key => {
      if (otherParams[key] !== undefined && otherParams[key] !== null) {
        queryParams.append(key, otherParams[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = `${ENDPOINTS.USERS.LIST}${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

/**
 * Get user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User data
 */
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(ENDPOINTS.USERS.DETAIL(id));
    return response;
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
};


