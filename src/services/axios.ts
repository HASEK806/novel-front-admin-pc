import axios from 'axios';
import { message } from 'antd';

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.REACT_APP_ENV || 'http://localhost:3000/api', // 使用环境变量配置后端地址
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code !== 200) {
      message.error(data.message || '请求失败');
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    message.error(error.response?.data?.message || '网络异常');
    return Promise.reject(error);
  }
);

export default request;
