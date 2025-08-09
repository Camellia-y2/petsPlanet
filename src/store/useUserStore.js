import {
    create
} from 'zustand'
import { doLogin } from '../api/user'

// 使用Zustand创建了一个名为useUserStore的全局状态存储器，
// 用于管理用户的登录状态和信息。
export const useUserStore = create((set) => ({
    user: null, // 用户信息
    isLogin: false, // 是否登录

    // 异步函数，接收用户名和密码，调用doLogin进行登录，并设置用户信息和登录状态。
    login: async({username="", password=""}) => {
         try {
            console.log('useUserStore: 开始登录请求');
            const response = await doLogin({ username, password });
            console.log('useUserStore: 登录响应:', response);
            
            if (response.code === 1) {
                console.log('登录失败:', response.msg);
                throw new Error(response.msg || '登录失败');
            }
            
            const { token, data: user } = response;
            console.log('登录成功, 用户信息:', user);
            
            // 保存token到本地存储
            localStorage.setItem('token', token);
            
            // 更新状态
            set({ user, isLogin: true });

        } catch (error) {
            console.log('登录过程中出错:', error);
            throw error; // 抛出错误，让组件能捕获
        }
    },
    
    logout: () => {
        localStorage.removeItem('token');
        set({
            user: null,
            isLogin: false
        });
        console.log('已退出登录');
    }
}))
