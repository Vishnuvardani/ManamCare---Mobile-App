import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Base URL configuration
const getBaseURL = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/api';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api';
  } else {
    return 'http://192.168.143.45:5000/api';
  }
};

const BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    const message = 
      error?.response?.data?.message ||
      error.message ||
      'Network error. Please check your connection.';
    
    return Promise.reject(new Error(message));
  }
);

export const registerUser = async (data: {
  name: string; age: number; gender: string;
  dob: string; email: string; phone: string; password: string;
}) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post('/auth/login', data);
    
    // Store token and user data
    if (res.data.token) {
      await AsyncStorage.setItem('authToken', res.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(res.data.user));
    }
    
    return res.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    // First try to get from stored user data
    const storedUser = await AsyncStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log('Using stored user data:', userData);
      return userData;
    }
    
    // Fallback to API call
    const res = await api.get('/auth/profile');
    return res.data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    
    // Try stored data as fallback
    const storedUser = await AsyncStorage.getItem('userData');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    
    throw error;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getResources = async () => {
  try {
    const res = await api.get('/resources');
    return res.data;
  } catch (error) {
    console.error('Resources fetch error:', error);
    throw error;
  }
};