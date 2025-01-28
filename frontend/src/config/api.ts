export const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production, API requests go through Nginx which handles the routing
    return `/api`;
  }
  
  // For local development, use localhost
  return `http://localhost:5000/api`;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ROOMS: '/rooms',
  BOOKINGS: '/bookings'
};
