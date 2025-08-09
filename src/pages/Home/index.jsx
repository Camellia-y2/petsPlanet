// 首页
import styles from './home.module.css'
import HeaderBox from '@/components/HeaderBox'
import useTitle from '@/hooks/useTitle'
import Waterfall from '@/components/Waterfall'
import { useEffect, useState } from 'react'
import { useImageStore } from '@/store/useImageStore'
import { Skeleton } from 'react-vant'

const Home = () => {
  useTitle('首页')
  const { loading, images, fetchMore } = useImageStore()
  const [pageLoading, setPageLoading] = useState(true)
  
  // 组件挂载时加载第一页数据
  useEffect(() => {
    const loadData = async () => {
      await fetchMore()
      setPageLoading(false)
    }
    loadData()
  }, [])
  
  return (
    <div className={styles.container}>
      {/* 头部 */}
      <HeaderBox />

      {/* 主体 */}
      <main className={styles.content}>
        {pageLoading ? (
          <div className={styles.skeletonContainer}>
            <Skeleton title row={3} />
            <Skeleton title row={3} />
            <Skeleton title row={3} />
            <Skeleton title row={3} />
          </div>
        ) : (
          <Waterfall images={images} fetchMore={fetchMore} loading={loading} className={styles.Waterfall}/>
        )}
      </main>
    </div>
  )
}

export default Home
