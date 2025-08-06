// search模块
import axios from './config'

export const getSuggestList = (keyword) => {
    return axios.get(`/search?keyword=${keyword}`);
}

