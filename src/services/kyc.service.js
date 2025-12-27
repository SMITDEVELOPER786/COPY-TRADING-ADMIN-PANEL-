import apiClient from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Get all KYC submissions (supports filters & pagination)
 */
export const getKycSubmissions = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${ENDPOINTS.ADMIN.KYC.LIST}${query ? `?${query}` : ''}`;

    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error('Get KYC submissions error:', error);
    throw error;
  }
};

/**
 * Get single KYC submission by user ID
 */
export const getKycSubmissionByUser = async (userId) => {
  try {
    const response = await apiClient.get(
      ENDPOINTS.ADMIN.KYC.DETAIL(userId)
    );
    return response;
  } catch (error) {
    console.error('Get KYC submission error:', error);
    throw error;
  }
};

/**
 * Review / Approve / Reject KYC
 */
export const reviewKycSubmission = async (userId, data) => {
  try {
    const response = await apiClient.post(
      ENDPOINTS.ADMIN.KYC.REVIEW(userId),
      data
    );
    return response;
  } catch (error) {
    console.error('Review KYC error:', error);
    throw error;
  }
};

/**
 * Verify individual document
 */
export const verifyKycDocument = async (userId, data) => {
  try {
    const response = await apiClient.post(
      ENDPOINTS.ADMIN.KYC.VERIFY_DOCUMENT(userId),
      data
    );
    return response;
  } catch (error) {
    console.error('Verify document error:', error);
    throw error;
  }
};

/**
 * Get KYC statistics
 */
export const getKycStats = async () => {
  try {
    const response = await apiClient.get(
      ENDPOINTS.ADMIN.KYC.STATS
    );
    return response;
  } catch (error) {
    console.error('Get KYC stats error:', error);
    throw error;
  }
};
