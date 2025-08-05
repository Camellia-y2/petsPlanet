import './App.css'
import {
  Suspense,
  lazy,
} from 'react'
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import MainLayout from '@/components/MainLayout'
import SubLayout from '@/components/SubLayout'

const Home = lazy(() => import('@/pages/Home'))
const SearchPage = lazy(() => import('@/pages/SearchPage'))
const Encyclopedia = lazy(() => import('@/pages/Encyclopedia'))
const Assistant = lazy(() => import('@/pages/Assistant'))
const Profile = lazy(() => import('@/pages/Profile'))
const SmartImage = lazy(() => import('@/pages/SmartImage'))

function App() {

  return (
    <>
     <Suspense fallback={<div>loading</div>}>
     {/* 带有 tabBar 的layout */}
      <Routes>
        <Route  element={<MainLayout />}>
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