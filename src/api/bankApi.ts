import axiosInstance from './axios';

export const bankApi = {
  get: (endpoint: string) => {
    return axiosInstance.get(`/bank${endpoint}`);
  },
  
  post: (endpoint: string, data: any) => {
    return axiosInstance.post(`/bank${endpoint}`, data);
  },
  
  put: (endpoint: string, data: any) => {
    return axiosInstance.put(`/bank${endpoint}`, data);
  },
  
  delete: (endpoint: string) => {
    return axiosInstance.delete(`/bank${endpoint}`);
  }
};