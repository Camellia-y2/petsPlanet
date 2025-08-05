import styles from './waterfall.module.css';
import { Loading } from 'react-vant';
import { useEffect, useRef, useState } from 'react';
import ImageCard from '../ImageCard';

const Waterfall = (props) => {
  const loader = useRef(null);
  const { loading, fetchMore, images } = props;

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

  return (
    <>
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
    </>
  );
};

export default Waterfall;