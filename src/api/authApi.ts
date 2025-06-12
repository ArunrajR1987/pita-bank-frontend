import axiosInstance from './axios';

export const authApi = {
  login: (credentials: { email: string; password: string }) => {
    return axiosInstance.post('/auth/login', credentials);
  },
  
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    return axiosInstance.post('/auth/register', userData);
  },
  
  get: (endpoint: string) => {
    return axiosInstance.get(`/auth${endpoint}`);
  },
  
  post: (endpoint: string, data: any) => {
    return axiosInstance.post(`/auth${endpoint}`, data);
  }
};