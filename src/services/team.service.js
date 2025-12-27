import apiClient from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Team Service
 * Handles all team-related API calls including invitations
 */

/**
 * Invite a new team member
 * @param {Object} inviteData - Invitation data
 * @param {string} inviteData.fullName - Full name of the person to invite
 * @param {string} inviteData.email - Email of the person to invite
 * @param {string} inviteData.role - Role to assign ('INVESTOR', 'TRADER', 'ADMIN')
 * @returns {Promise<Object>} Response data
 */
export const inviteTeamMember = async (inviteData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.ADMIN.INVITE, {
      fullName: inviteData.fullName,
      email: inviteData.email,
      role: inviteData.role
    });
    return response;
  } catch (error) {
    console.error('Invite team member error:', error);
    throw error;
  }
};

/**
 * Get team members list
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Response data containing team members list
 */
export const getTeamMembers = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.append(key, params[key]);
      }
    });

    const queryString = queryParams.toString();
    const url = `/team${queryString ? `?${queryString}` : ''}`;

    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Get team members error:', error);
    throw error;
  }
};