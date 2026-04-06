import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_LOCAL !='production' ? import.meta.env.VITE_APP_URL : import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: baseUrl, // Every request made with apiClient starts with this URL
  timeout: 5000,                       // If a request takes longer than 5 seconds, it will time out
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {api, baseUrl};