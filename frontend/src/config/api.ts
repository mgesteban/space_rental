export const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  
  if (process.env.NODE_ENV === 'production') {
    // In production, API requests go through Nginx which handles the routing
    return `/api`;
  }
  
  // For local development, use the hostname of the machine
  return `http://${hostname}:5000/api`;
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ROOMS: '/rooms',
  BOOKINGS: '/bookings'
};
