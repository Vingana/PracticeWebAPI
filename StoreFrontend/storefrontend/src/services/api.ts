import axios from 'axios';
export const api = axios.create({
    baseURL: 'https://localhost:7226/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
