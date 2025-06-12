import api from './axios';
import { AuthRequest, AuthResponse, User } from '../types';

export const authApi = {
  login: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData: AuthRequest): Promise<string> => {
    const response = await api.post<string>('/api/auth/register', userData);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/api/auth/me');
    return response.data;
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
  }
};