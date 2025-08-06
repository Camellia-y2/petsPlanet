// search 全局状态共享
import {
    create
} from 'zustand'
import {
    getSuggestList,
    getHotList
} from '@/api/search'

const useSearchStore = create((set,get) => {
    // get 读操作
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    return {
        searchHistory,
        suggestList: [], // 返回list
        setSuggestList: async(keyword)=>{
            const res = await getSuggestList(keyword);
            set({
                suggestList: res.data
            })
        }
    }
})

export default useSearchStore