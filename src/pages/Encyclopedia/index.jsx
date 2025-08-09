// 百科
import styles from './encyclopedia.module.css';
import HeaderBox from '@/components/HeaderBox';
import { Swiper, Image, Tabs, Skeleton } from 'react-vant';
import { generateTabData } from '@/utils/mockArticles'; 
import ArticleList from '@/components/ArticleList';
import useTitle from '@/hooks/useTitle';
import generatePetImages  from '@/utils/mockPetImages';
import { useState, useEffect } from 'react';

const tabs = ['推荐', '品种', '喂养', '健康', '日常', '其他'];

const Encyclopedia = () => {
  const [loading, setLoading] = useState(true);
  const [petImages, setPetImages] = useState([]);
  const [tabData, setTabData] = useState([]);
  
  useTitle('百科');

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setPetImages(generatePetImages(4));
      setTabData(generateTabData());
      setLoading(false);
    }, 1000); // 模拟1秒的加载时间
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* 头部 */}
      <HeaderBox />

      {/* 宠物幻灯片 */}
      <div className={styles.swiper}>
        {loading ? (
          <Skeleton title row={0} style={{ height: '200px' }} />
        ) : (
          <Swiper autoplay={2000} loop>
            {petImages.map((item) => (
              <Swiper.Item key={item.id}>
                <Image src={item.url} alt={item.alt} width="100%" height={200} />
              </Swiper.Item>
            ))}
          </Swiper>
        )}
      </div>

      {/* Tabs区 */}
      {loading ? (
        <div className={styles.skeletonContainer}>
          <Skeleton title row={2} />
          <Skeleton title row={2} />
          <Skeleton title row={2} />
        </div>
      ) : (
        <Tabs>
          {tabs.map((tab, index) => (
            <Tabs.TabPane key={tab} title={tab}>
              {/* 传当前 tab 对应的数据 */}
              <ArticleList data={tabData[index]} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Encyclopedia;