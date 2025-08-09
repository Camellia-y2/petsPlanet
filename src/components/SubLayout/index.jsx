import { Outlet } from 'react-router-dom'
import { memo } from 'react'

// 几乎不依赖任何 props，使用 memo 可以确保它只在真正需要时才重新渲染，
// 避免在父组件重新渲染时的不必要更新
const SubLayout = memo(() => {
  return (
    <>
      <Outlet />
    </>
  )
})

export default SubLayout
