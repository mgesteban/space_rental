import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import { LoginCredentials, RegisterCredentials } from '../types/auth';

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
};
