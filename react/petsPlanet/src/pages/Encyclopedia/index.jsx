// 百科
import styles from './encyclopedia.module.css';
import HeaderBox from '@/components/HeaderBox';
import { Swiper, Image, Tabs } from 'react-vant';
import { generateTabData } from '@/utils/mockArticles'; 
import ArticleList from '@/components/ArticleList';
import useTitle from '@/hooks/useTitle';
import generatePetImages  from '@/utils/mockPetImages';

const tabs = ['推荐', '品种', '喂养', '健康', '日常', '其他'];

const Encyclopedia = () => {
  const petImages = generatePetImages(4);
  useTitle('百科');

  // 每次组件渲染都生成新的随机文章数据
  const tabData = generateTabData();

  return (
    <div>
      {/* 头部 */}
      <HeaderBox />

      {/* 宠物幻灯片 */}
      <div className={styles.swiper}>
        <Swiper autoplay={2000} loop>
          {petImages.map((item) => (
            <Swiper.Item key={item.id}>
              <Image src={item.url} alt={item.alt} width="100%" height={200} />
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* Tabs区 */}
      <Tabs>
        {tabs.map((tab, index) => (
          <Tabs.TabPane key={tab} title={tab}>
            {/* 传当前 tab 对应的数据 */}
            <ArticleList data={tabData[index]} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Encyclopedia;