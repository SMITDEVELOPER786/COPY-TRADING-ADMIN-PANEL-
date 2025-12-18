const API_BASE_URL = 'http://localhost:5000/admin';

/**
 * API Client with error handling and interceptors
 */
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  /**
   * Get authorization token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('token');
  }

  /**
   * Set authorization token in localStorage
   */
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  /**
   * Build full URL
   */
  buildURL(endpoint) {
    return `${this.baseURL}${endpoint}`;
  }

  /**
   * Get default headers
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    let data;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      throw new Error('Failed to parse response');
    }

    if (!response.ok) {
      const error = new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      body,
      headers: customHeaders = {},
      ...fetchOptions
    } = options;

    const url = this.buildURL(endpoint);
    const headers = this.getHeaders(customHeaders);

    const config = {
      method,
      headers,
      ...fetchOptions,
    };

    if (body && method !== 'GET') {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request
   */
  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;

