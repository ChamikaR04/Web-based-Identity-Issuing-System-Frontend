// src/services/api.js
import axios from 'axios';

// YOUR BACKEND URL
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;