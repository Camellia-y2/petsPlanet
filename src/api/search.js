// search模块
import axios from './config'
import Mock from 'mockjs'

// 判断是否为生产环境
const isProduction = window.location.hostname !== 'localhost';

// 生成模拟搜索建议数据
const generateSuggestList = (keyword) => {
    // 生成0-9个随机建议
    const count = Mock.Random.integer(0, 9);
    const list = [];
    
    for (let i = 0; i < count; i++) {
        const randomTitle = Mock.Random.ctitle(2, 8);
        list.push(`${keyword}${randomTitle}`);
    }
    
    return list;
};

export const getSuggestList = async (keyword) => {
    if (isProduction) {
        // 在生产环境中使用模拟数据
        return {
            code: 0,
            data: generateSuggestList(keyword)
        };
    } else {
        // 在开发环境中使用API
        return axios.get(`/search?keyword=${keyword}`);
    }
}
