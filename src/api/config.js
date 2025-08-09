import axios from 'axios';

// 创建axios实例
// 根据环境判断使用哪个baseURL
const isProduction = window.location.hostname !== 'localhost';
axios.defaults.baseURL = isProduction 
  ? '/petsPlanet'  // 生产环境使用相对路径
  : 'http://localhost:5173/petsPlanet'; // 开发环境

// 请求拦截器
axios.interceptors.request.use((config) => {
    // token
    return config
})
// 响应拦截
axios.interceptors.response.use((data) => {
    // 确保返回的数据格式一致
    if (data && data.data) {
        return data.data;
    }
    return data;
})

export default axios
