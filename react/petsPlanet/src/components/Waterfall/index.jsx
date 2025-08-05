import styles from './waterfall.module.css';
import { Loading, PullRefresh } from 'react-vant';
import { useEffect, useRef, useState } from 'react';
import ImageCard from '../ImageCard';
import { BackTop } from '@react-vant/icons';

const Waterfall = (props) => {
  const loader = useRef(null);
  const { loading, fetchMore, images } = props;
  const [refreshing, setRefreshing] = useState(false);

  // 新增状态管理两列图片和高度
  const [columns, setColumns] = useState([[], []]);
  const [columnHeights, setColumnHeights] = useState([0, 0]);

  // 动态分配图片到高度较小的列
  useEffect(() => {
    if (!images.length) return;

    const newColumns = [[], []];
    const newHeights = [0, 0];

    images.forEach(img => {
      // 选择当前高度较小的列
      const targetColumn = newHeights[0] <= newHeights[1] ? 0 : 1;
      newColumns[targetColumn].push(img);
      
      // 累加图片高度（使用预设的height属性）
      newHeights[targetColumn] += img.height;
    });

    setColumns(newColumns);
    setColumnHeights(newHeights);
  }, [images]);

  // 使用IntersectionObserver监听滚动加载
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore();
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [fetchMore]);

  // 处理下拉刷新
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // 这里调用刷新数据的函数，如果props中没有提供刷新函数，则使用fetchMore
      if (props.onRefresh) {
        await props.onRefresh();
      } else {
        await fetchMore(true); // 传入true表示这是刷新操作
      }
    } finally {
      setRefreshing(false);
    }
  };
  
  // 回到顶部功能
  const [showBackTop, setShowBackTop] = useState(false);
  
  // 监听滚动事件，控制回到顶部按钮的显示和隐藏
  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过300px时显示回到顶部按钮
      setShowBackTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 回到顶部的处理函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <PullRefresh
        successText="刷新成功"
        pullingText="下拉即可刷新..."
        loosingText="释放立即刷新..."
        loadingText="加载中..."
        onRefresh={onRefresh}
        refreshing={refreshing}
      >
        <div className={styles.wrapper}>
          <div className={styles.column}>
            {
              columns[0].map(img => (
                <ImageCard key={img.id} {...img}/>
              ))
            }
          </div>
          <div className={styles.column}>
            {
              columns[1].map(img => (
                <ImageCard key={img.id} {...img}/>
              ))
            }
          </div>
        </div>
        <div ref={loader} className={styles.loader}>
          {loading ? <Loading type="ball" /> : '加载完成'}
        </div>
      </PullRefresh>
      
      <BackTop onClick={scrollToTop} className={styles.backTop}/>
    </>
  );
};

export default Waterfall;