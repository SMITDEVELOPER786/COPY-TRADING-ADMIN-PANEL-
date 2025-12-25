import axios from 'axios';

// Base URL for API
const API_BASE_URL = 'https://backend.greentrutle.com/admin';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
  withCredentials: false, // Set to true if server requires credentials
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log request for debugging
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log response for debugging
    console.log('API Response:', response);
    console.log('Response Data:', response.data);
    console.log('Response Status:', response.status);
    
    // Return the data, or the full response if data is empty
    return response.data !== undefined ? response.data : response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      // Handle specific status codes
      if (status === 401) {
        return Promise.reject(new Error(data?.message || data?.error || 'Unauthorized. Please check your credentials.'));
      } else if (status === 403) {
        return Promise.reject(new Error(data?.message || data?.error || 'Access forbidden.'));
      } else if (status >= 500) {
        return Promise.reject(new Error(data?.message || data?.error || 'Server error. Please try again later.'));
      }
      
      const message = data?.message || data?.error || `Request failed with status ${status}`;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response (network error, CORS issue, etc.)
      console.error('Request error:', error.request);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(new Error(error.message || 'An unexpected error occurred'));
    }
  }
);

export default apiClient;

