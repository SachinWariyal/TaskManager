// frontend/src/services/api.js
import axios from 'axios';

const API_URL = '/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

// Task services
export const taskService = {
  createTask: (taskData) => api.post('/tasks', taskData),
  getAllTasks: () => api.get('/tasks'),
  getTask: (taskId) => api.get(`/tasks/${taskId}`),
  updateTask: (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData),
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
  exportToExcel: () => api.get('/tasks/export/excel', { responseType: 'blob' }),
  importTasks: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/tasks/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;