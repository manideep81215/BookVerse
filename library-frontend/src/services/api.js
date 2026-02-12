import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isLoginRequest = requestUrl.includes('/users/login');

    if (isLoginRequest && error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  getAllUsers: () => api.get('/users'),
  register: (userData) => api.post('/users', userData),
  login: (credentials) => api.post('/users/login', credentials),
  updateName: (id, name) => api.put(`/users/${id}/name`, { name }),
};

export const bookAPI = {
  getAllBooks: () => api.get('/books'),
  getBookById: (id) => api.get(`/books/${id}`),
  createBook: (bookData) => api.post('/books', bookData),
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export const issueAPI = {
  issueBook: ({ userId, bookId }) => api.post('/borrows', { userId, bookId }),
  returnBook: (borrowId) => api.put(`/borrows/return/${borrowId}`),
  getAllBorrows: () => api.get('/borrows'),
  // Backward-compatible alias for older UI code paths
  getAllIssues: () => api.get('/borrows'),
  getMyBorrows: (userId) =>
    api.get('/borrows').then((res) => ({
      ...res,
      data: Array.isArray(res.data) ? res.data.filter((b) => b.user?.id === userId) : [],
    })),
  // Backward-compatible alias for older UI code paths
  getMyIssues: (userId) =>
    api.get('/borrows').then((res) => ({
      ...res,
      data: Array.isArray(res.data) ? res.data.filter((b) => b.user?.id === userId) : [],
    })),
};

export default api;
