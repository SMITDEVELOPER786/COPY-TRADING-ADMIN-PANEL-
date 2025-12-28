import apiClient from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Invite a new team member
 */
export const inviteTeamMember = async (inviteData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.ADMIN.INVITE, {
      fullName: inviteData.fullName,
      email: inviteData.email,
      role: inviteData.role,
      subject: inviteData.subject || 'Invitation to Join Team', // required
      message: inviteData.message || `Hello ${inviteData.fullName}, you are invited to join our team!`, // required
    });
    return response;
  } catch (error) {
    console.error('Invite team member error:', error);
    throw error;
  }
};
