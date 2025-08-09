import './App.css'
import {
  Suspense,
  lazy
} from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { Spin } from "antd";
import MainLayout from '@/components/MainLayout'
import SubLayout from '@/components/SubLayout'
import { useUserStore } from '@/store/useUserStore'
import { useEffect } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const Encyclopedia = lazy(() => import('@/pages/Encyclopedia'))
const Assistant = lazy(() => import('@/pages/Assistant'))
const Profile = lazy(() => import('@/pages/Profile'))
const SmartImage = lazy(() => import('@/pages/SmartImage'))
const Login = lazy(() => import('@/pages/Login'))

// 需要登录才能访问的路由
const protectedRoutes = ['/profile', '/assistant', '/smartimage'];

// 路由守卫组件
const ProtectedRoute = ({ children }) => {
  const { isLogin } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin && protectedRoutes.includes(location.pathname)) {
      // 如果未登录且访问的是受保护的路由，重定向到登录页面
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isLogin, location, navigate]);

  return children;
};

function App() {
  return (
    <>
     <Suspense fallback={
      <Spin 
        style={{ height:'100vh', display:'flex', alignItems: 'center', justifyContent:'center'}} />
      }>
      <Routes>
        {/* 登录页面 - 不带TabBar */}
        <Route path='/login' element={<Login />} />
        
        {/* 带有 tabBar 的layout */}
        <Route element={
          // 所有使用 MainLayout 的路由（包括首页、百科、个人中心、AI助手和智能衣柜）都会经过路由守卫的检查。
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/assistant' element={<Assistant />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/encyclopedia' element={<Encyclopedia />} />
          <Route path='/smartimage' element={<SmartImage />} />
        </Route>
     
        {/* 不带有 tabBar 的layout */}
        <Route element={<SubLayout />}>
          <Route path='/search' element={<SearchPage />} />
        </Route>
       </Routes>
     </Suspense>
    </>
  )
}

export default App
