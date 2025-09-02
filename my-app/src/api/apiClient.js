import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 替换为你的后端地址
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;