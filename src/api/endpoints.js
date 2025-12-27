export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Users
  USERS: {
    LIST: '/users',
    DETAIL: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },

  // Admin
  ADMIN: {
    USERS: '/admin/users',

    // ✅ KYC (relative to baseURL /admin/kyc)
    KYC: {
      LIST: 'kyc/submissions',
      DETAIL: (userId) => `kyc/submissions/${userId}`,
      REVIEW: (userId) => `kyc/submissions/${userId}/review`,
      VERIFY_DOCUMENT: (userId) => `kyc/documents/${userId}/verify`,
      STATS: '/stats',
    },
  },
};
