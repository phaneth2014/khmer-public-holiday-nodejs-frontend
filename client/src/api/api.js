import axios from "axios";

const baseURL = import.meta.env.VITE_APP_URL;

const api = axios.create({
  baseURL: baseURL, // Every request made with apiClient starts with this URL
  timeout: 5000,                       // If a request takes longer than 5 seconds, it will time out
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {api, baseURL};