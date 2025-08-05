import axios from 'axios';

// 创建axios实例
axios.defaults.baseURL = 'http://localhost:5173/petPlanet'

// 请求拦截器
axios.interceptors.request.use((config) => {
    // token
    return config
})
// 响应拦截
axios.interceptors.response.use((data) => {
    return data.data
})

export default axios