# 毛孩星球

毛孩星球是一款面向宠物爱好者的移动端应用，提供宠物百科知识、AI智能助手、智能图像处理等功能，帮助用户更好地了解和照顾自己的宠物。

## 技术栈

- **React全家桶**
  - **React 组件开发**
    - 组件封装
    - 第三方组件库 (React Vant)
    - 受控和非受控组件
    - Hooks 编程与自定义Hooks
  - **React-Router-dom**
    - 路由守卫
    - 路由懒加载
    - SPA单页应用
  - **Zustand** 状态管理
- **Mock.js** 接口模拟
- **Axios** 网络请求拦截和代理
- **Module CSS** 模块化样式
- **Vite** 构建工具
- **性能优化**
  - 防抖节流
  - useCallback、useMemo等Hooks优化
- **移动端适配**
  - lib-flexible 移动端适配方案
  - postcss-pxtorem 单位自动转换
  - 禁止缩放 user-scalable=no
- **LLM 人工智能**
  - 智能对话
  - AI生成图像
  - 宠物特征识别

## 项目架构

```
src/
├── api/                # API接口
├── assets/             # 静态资源
├── components/         # 公共组件
│   ├── ArticleList/    # 文章列表组件
│   ├── HeaderBox/      # 头部组件
│   ├── HotTopics/      # 热门话题组件
│   ├── ImageCard/      # 图片卡片组件
│   ├── MainLayout/     # 主布局组件(带TabBar)
│   ├── SearchBox/      # 搜索框组件
│   ├── SubLayout/      # 子布局组件(不带TabBar)
│   ├── UtilityPopup/   # 工具弹窗组件
│   └── Waterfall/      # 瀑布流组件
├── hooks/              # 自定义Hooks
├── llm/                # AI模型相关
├── pages/              # 页面组件
│   ├── Assistant/      # AI助手页面
│   ├── Encyclopedia/   # 宠物百科页面
│   ├── Home/           # 首页
│   ├── Profile/        # 个人中心页面
│   ├── SearchPage/     # 搜索页面
│   └── SmartImage/     # 智能衣柜页面
├── store/              # 状态管理
└── utils/              # 工具函数
```

## 开发前的准备

### 安装的包
```bash
# 核心依赖
pnpm install react react-router-dom zustand axios react-vant @react-vant/icons lib-flexible

# 开发依赖
pnpm i vite-plugin-mock mockjs postcss-pxtorem -D
```

### 项目配置
- **Vite配置**
  - alias 路径别名配置
  - mock 数据模拟
  - .env.local 环境变量
- **移动端适配**
  - lib-flexible 设置 1rem = 屏幕宽度/10
  - postcss-pxtorem 自动将px转换为rem
  - 设计稿基于750px (iPhone4标准尺寸)
- **CSS预处理**
  - index.css 重置样式
  - App.css 全局通用样式
  - module.css 模块化样式

## 功能模块

### 1. 首页
- 图片瀑布流展示
  - 两列布局，高度自适应
  - 基于IntersectionObserver的无限滚动加载
  - 图片懒加载优化
- 下拉刷新功能
- 回到顶部功能

### 2. 宠物百科
- 宠物知识分类浏览
- 详细的宠物品种、习性、护理知识
- 搜索功能（带防抖优化）

### 3. AI助手
- 智能问答系统
- 宠物相关问题咨询
- 个性化宠物护理建议
- 流式输出优化用户体验

### 4. 智能图像
- 宠物图片智能处理
- AI生成宠物特定场景图片
- 图片分享和社交功能

### 5. 个人中心
- 用户信息管理
- 收藏内容管理
- 历史记录查看

### 6. 登录
- 用户登录

## 项目亮点与难点

### 1. 移动端适配
- lib-flexible + postcss-pxtorem 实现自动单位转换
- 设计稿完美还原，适配各种屏幕尺寸
- 禁止缩放，优化移动端体验

### 2. 瀑布流实现
- 动态高度计算，优化两列布局
- IntersectionObserver实现高效滚动加载
- 图片懒加载减少资源消耗

### 3. 前端智能化
- 封装通用chat函数，支持多种LLM模型
- AI图像生成功能
  - 优化prompt设计
  - 宠物特征提取
- 工作流自动化处理

### 4. 性能优化
- React.memo减少不必要的渲染
- useCallback和useMemo优化函数和计算
- 路由懒加载减少首屏加载时间
- 骨架屏提升用户等待体验

### 5. 用户体验优化
- 搜索建议与防抖结合
- 下拉刷新和无限滚动
- 图片加载状态提示
- SPA单页应用体验

## 项目遇到的问题及解决方案

### 1. 瀑布流布局不均衡问题
- **问题**：两列高度差异大，导致一侧出现大量空白
- **解决方案**：动态计算列高度，将新图片添加到高度较小的列中

### 2. 图片加载性能问题
- **问题**：大量图片同时加载导致性能下降
- **解决方案**：实现图片懒加载，只在进入视口时加载图片

### 3. 状态管理闭包陷阱
- **问题**：在同一事件中多次更新状态导致数据覆盖
- **解决方案**：使用函数式更新和Zustand的状态管理避免闭包问题

### 4. 移动端适配问题
- **问题**：不同设备上显示效果不一致
- **解决方案**：使用lib-flexible和postcss-pxtorem实现自动适配

## 安装与运行

### 安装依赖
```bash
# 使用pnpm
pnpm install

# 或使用npm
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
pnpm build
# 或
npm run build
```

### 预览生产版本
```bash
pnpm preview
# 或
npm run preview
```

## 项目部署

本项目使用Vercel进行部署，实现了自动化CI/CD流程。

### Vercel部署步骤

1. **创建Vercel账号**
   - 访问 [Vercel官网](https://vercel.com) 注册账号
   - 可以使用GitHub、GitLab或Bitbucket账号直接登录

2. **导入项目**
   - 在Vercel控制台点击"Import Project"
   - 选择"Import Git Repository"并连接到您的代码仓库
   - 选择包含本项目的仓库

3. **配置部署选项**
   - **框架预设**: 选择Vite
   - **构建命令**: `npm run build` 或 `pnpm build`
   - **输出目录**: `dist`
   - **环境变量**: 添加必要的环境变量(如API密钥等)

4. **部署项目**
   - 点击"Deploy"按钮开始部署
   - Vercel会自动构建并部署应用

### 自动部署

Vercel提供了与Git仓库的集成，实现了以下自动化流程：

- **自动预览部署**: 每个Pull Request都会生成一个预览URL
- **自动生产部署**: 当代码合并到主分支时自动部署到生产环境
- **回滚功能**: 可以快速回滚到之前的部署版本

### 自定义域名

1. 在Vercel项目设置中添加自定义域名
2. 按照Vercel提供的说明配置DNS记录
3. 等待DNS生效后，您的应用将通过自定义域名访问

### 性能优化

Vercel提供了多项性能优化功能：

- **全球CDN**: 内容分发到全球边缘节点
- **自动HTTPS**: 所有站点自动启用HTTPS
- **图像优化**: 自动优化图像加载性能

## 未来计划

- [ ] 添加用户社区文章功能，增强用户互动
- [ ] 集成更多AI功能，如宠物行为分析
- [ ] 优化图像处理算法，提供更多智能图像功能
- [ ] 增加宠物健康记录和提醒功能
- [ ] 支持多语言