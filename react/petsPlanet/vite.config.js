import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock', // mock文件存放的目录
      localEnabled: true, // 开发环境启用
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

