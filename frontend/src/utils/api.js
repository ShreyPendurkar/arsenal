const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API] Making request to: ${url}`);
    
    const response = await fetch(url, config);
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('[API] Non-JSON response received. Content-Type:', contentType);
      console.error('[API] Response preview:', text.substring(0, 200));
      throw new Error('Server returned non-JSON response. Make sure the backend server is running on port 3001.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    console.log(`[API] Success response from ${endpoint}:`, { success: data.success, token: data.token ? data.token.substring(0, 30) + '...' : 'no token' });
    return data;
  } catch (error) {
    // If it's already our custom error, re-throw it
    if (error.message.includes('non-JSON') || error.message.includes('Server returned')) {
      throw error;
    }
    // Otherwise, it might be a network error or JSON parse error
    console.error('API request failed:', error);
    throw new Error(error.message || 'Network error. Please check if the backend server is running.');
  }
};

// Authentication API
export const authAPI = {
  register: async (username, password, role) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
    });
  },

  login: async (username, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me', {
      method: 'GET',
    });
  },
};

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    return apiRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  getAll: async () => {
    return apiRequest('/contacts', {
      method: 'GET',
    });
  },

  getById: async (id) => {
    return apiRequest(`/contacts/${id}`, {
      method: 'GET',
    });
  },
};

