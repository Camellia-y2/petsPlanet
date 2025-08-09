import axios from 'axios';

// 创建axios实例
// 根据环境判断使用哪个baseURL
const isProduction = window.location.hostname !== 'localhost';
const isVercel = window.location.hostname.includes('vercel.app');

axios.defaults.baseURL = isProduction 
  ? (isVercel ? '' : '/petsPlanet')  // Vercel 环境使用空路径，其他生产环境使用相对路径
  : 'http://localhost:5173/petsPlanet'; // 开发环境

// 导出环境变量，供其他模块使用
export const envConfig = {
  isProduction,
  isVercel
};

// 请求拦截器
axios.interceptors.request.use((config) => {
    // 添加token到请求头
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('发送请求:', config.url, config.data || config.params);
    return config;
}, (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use((response) => {
    console.log('收到响应:', response.config.url, response.data);
    // 确保返回的数据格式一致
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    console.error('响应错误:', error);
    return Promise.reject(error);
});

export default axios;