/**
 * API Endpoints
 * Centralized endpoint definitions
 */

export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Admin endpoints
  ADMIN: {
    USERS: '/admin/users',
    INVITE: '/invite',
    KYC_SUBMISSIONS: '/admin/kyc/submissions',
    KYC_REVIEW: (id) => `/admin/kyc/submissions/${id}/review`,
  },

  // User endpoints
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },

  // Add more endpoints as needed
};

