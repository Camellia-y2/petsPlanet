// src/components/ArticleList.jsx
import { Divider } from 'react-vant';
import { EyeO, LikeO } from '@react-vant/icons';
import styles from './articleList.module.css'; // 可选：添加样式

const ArticleList = ({ data = [] }) => {
  if (data.length === 0) {
    return <div className={styles.empty}>暂无文章</div>;
  }

  return (
    <div className={styles.articleList}>
      {
        data.map((article, index) => (
        <div key={index} className={styles.articleItem}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.title}>{article.title}</div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.desc}>{article.desc}</p>
              <div className={styles.imageContainer}>
                {/* 占位图，始终保持固定尺寸 */}
                <div className={styles.placeholder}></div>
                <img 
                  src={article.img} 
                  alt="封面" 
                  className={`${styles.cover} loading`} 
                  loading="lazy" 
                  onLoad={(e) => e.target.classList.remove('loading')}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" fill="%23999">加载失败</text></svg>';
                  }}
                />
              </div>
            </div>
            <div className={styles.cardFooter}>
              <p className={styles.footer}>
                {article.author}&nbsp;&nbsp;
                {article.timeAgo}&nbsp;&nbsp;
                <EyeO style={{ fontSize: '16px' }} />&nbsp;{article.viewCount}&nbsp;&nbsp;
                <LikeO style={{ fontSize: '16px' }} />&nbsp;点赞
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
