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

/**
 * Update user status
 * @param {string} id - User ID
 * @param {string} status - Status to set ('Active', 'Deactivate', 'Delete')
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserStatus = async (id, status) => {
  try {
    // Map status to API fields
    let updateData = {};
    
    if (status === 'Delete') {
      // Freeze the account
      updateData.isFrozen = true;
    } else if (status === 'Deactivate') {
      // Set KYC status to PENDING
      updateData.kycStatus = 'PENDING';
      updateData.isFrozen = false;
    } else if (status === 'Active') {
      // Activate the account
      updateData.kycStatus = 'APPROVED';
      updateData.isFrozen = false;
    }
    
    const response = await apiClient.put(ENDPOINTS.USERS.UPDATE(id), updateData);
    return response;
  } catch (error) {
    console.error('Update user status error:', error);
    throw error;
  }
};

/**
 * Submit KYC review
 * @param {string} userId - User ID
 * @param {Object} reviewData - Review data
 * @param {string} reviewData.status - Review status ('APPROVED', 'REJECTED', 'PENDING')
 * @param {string} reviewData.adminNotes - Admin notes/comment
 * @returns {Promise<Object>} Review response
 */
export const submitKycReview = async (userId, reviewData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.ADMIN.KYC_REVIEW(userId), reviewData);
    return response;
  } catch (error) {
    console.error('Submit KYC review error:', error);
    throw error;
  }
};


