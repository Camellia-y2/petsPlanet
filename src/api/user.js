import axios from './config'
import { envConfig } from './config'
import Mock from 'mockjs'

// 生成JWT令牌的模拟函数
const generateMockToken = (user) => {
    return 'mock_jwt_token_' + JSON.stringify(user);
};

// getUser: 获取当前用户的信息。
export const getUser = () => {
    if (envConfig.isVercel || envConfig.isProduction) {
        // 在Vercel环境中返回模拟数据
        return Promise.resolve({
            code: 0,
            data: {
                id: "001",
                username: "admin"
            }
        });
    }
    return axios.get('/user');
}

// doLogin: 执行登录操作，向服务器提交用户名和密码，并返回登录结果
export const doLogin = (data) => {
    console.log('api/user.js: 发送登录请求, 数据:', data);
    
    if (envConfig.isVercel || envConfig.isProduction) {
        // 在Vercel环境中模拟登录逻辑
        console.log('在Vercel环境中使用模拟登录');
        
        // 模拟登录验证
        if (data.username === 'admin' && data.password === '123456') {
            const token = generateMockToken({
                id: "001",
                username: "admin"
            });
            
            return Promise.resolve({
                code: 0,
                token: token,
                data: {
                    id: "001",
                    username: "admin"
                }
            });
        } else {
            return Promise.resolve({
                code: 1,
                msg: "用户名或密码错误"
            });
        }
    }
    
    // 在开发环境中使用API
    return axios.post('/login', data);
}
