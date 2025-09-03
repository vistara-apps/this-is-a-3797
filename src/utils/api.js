import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    
    // Add token to headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Make a GET request
 * @param {string} url - Request URL
 * @param {Object} params - Query parameters
 * @param {Object} config - Additional axios config
 * @returns {Promise<Object>} - Response data
 */
export const get = async (url, params = {}, config = {}) => {
  try {
    const response = await api.get(url, {
      params,
      ...config,
    });
    
    return response.data;
  } catch (error) {
    console.error('API GET error:', error);
    throw error;
  }
};

/**
 * Make a POST request
 * @param {string} url - Request URL
 * @param {Object} data - Request body
 * @param {Object} config - Additional axios config
 * @returns {Promise<Object>} - Response data
 */
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await api.post(url, data, config);
    
    return response.data;
  } catch (error) {
    console.error('API POST error:', error);
    throw error;
  }
};

/**
 * Make a PUT request
 * @param {string} url - Request URL
 * @param {Object} data - Request body
 * @param {Object} config - Additional axios config
 * @returns {Promise<Object>} - Response data
 */
export const put = async (url, data = {}, config = {}) => {
  try {
    const response = await api.put(url, data, config);
    
    return response.data;
  } catch (error) {
    console.error('API PUT error:', error);
    throw error;
  }
};

/**
 * Make a DELETE request
 * @param {string} url - Request URL
 * @param {Object} config - Additional axios config
 * @returns {Promise<Object>} - Response data
 */
export const del = async (url, config = {}) => {
  try {
    const response = await api.delete(url, config);
    
    return response.data;
  } catch (error) {
    console.error('API DELETE error:', error);
    throw error;
  }
};

export default api;
