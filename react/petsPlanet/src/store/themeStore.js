// 主题存储（已移除深色模式功能）
import { create } from 'zustand';

const useThemeStore = create(() => ({
  isDark: false, // 保留属性以避免引用错误
}));

export default useThemeStore;
