// 首页
import styles from './home.module.css'
import HeaderBox from '@/components/HeaderBox'
import useTitle from '@/hooks/useTitle'
import Waterfall from '@/components/Waterfall'
import { useEffect } from 'react'
import { useImageStore } from '@/store/useImageStore'

const Home = () => {
  useTitle('首页')
  const { loading, images, fetchMore } = useImageStore()
  
  // 组件挂载时加载第一页数据
  useEffect(() => {
    fetchMore()
  }, [])
  
  return (
    <div className={styles.container}>
      {/* 头部 */}
      <HeaderBox />

      {/* 主体 */}
      <main className={styles.content}>
        <Waterfall images={images} fetchMore={fetchMore} loading={loading} className={styles.Waterfall}/>
      </main>
    </div>
  )
}

export default Home
