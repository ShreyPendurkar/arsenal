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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
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

