import { create } from 'zustand';
import { getImages } from '../api/images';

export const useImageStore = create((set, get) => ({
  images: [],
  page: 1,
  loading: false,
  fetchMore: async (isRefresh = false) => {
    // 如果还在请求中，不再发起新的请求
    if (get().loading && !isRefresh) return;
    
    set({ loading: true }); // 请求中
    
    try {
      // 如果是刷新操作，重置页码为1
      const currentPage = isRefresh ? 1 : get().page;
      const res = await getImages(currentPage);
      
      // 更新状态
      set((state) => ({
        // 如果是刷新，替换图片数组；否则追加
        images: isRefresh ? [...res.data] : [...state.images, ...res.data],
        // 更新页码
        page: isRefresh ? 2 : state.page + 1,
        loading: false
      }));
    } catch (error) {
      console.error('获取图片失败:', error);
      set({ loading: false });
    }
  }
}));
