import { create } from 'zustand';
import { getImages } from '../api/images';

export const useImageStore = create((set, get) => ({
  images: [],
  page: 1,
  loading: false,
  fetchMore: async () => {
    // 如果还在请求中，不再发起新的请求
    if (get().loading) return;
    
    set({ loading: true }); // 请求中
    
    try {
      const res = await getImages(get().page);
      
      // 更新状态
      set((state) => ({
        images: [...state.images, ...res.data],
        page: state.page + 1,
        loading: false
      }));
    } catch (error) {
      console.error('获取图片失败:', error);
      set({ loading: false });
    }
  }
}));