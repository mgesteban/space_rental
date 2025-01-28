import { API_ENDPOINTS } from '../config/api';
import { LoginCredentials, RegisterCredentials } from '../types/auth';
import axiosInstance from './axios';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, credentials);
    return response.data;
  },
};
