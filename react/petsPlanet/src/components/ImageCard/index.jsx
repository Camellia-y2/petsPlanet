import { useState } from 'react';
import { LikeO } from '@react-vant/icons';
import styles from './imageCard.module.css';

const ImageCard = ({ url, title, username, avatar, likes, height }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={styles.card}>
      <div 
        className={styles.imageContainer} 
        style={{ height: `${height}px` }}
      >
        {(!imageLoaded || imageError) && (
          <div className={styles.placeholder}>
            {imageError ? '图片加载失败' : '加载中...'}
          </div>
        )}
        <img
          src={url}
          alt={title}
          className={styles.image}
          style={{ 
            opacity: imageLoaded && !imageError ? 1 : 0,
            height: `${height}px`
          }}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.userInfo}>
          <img src={avatar} alt={username} className={styles.avatar} />
          <span className={styles.username}>{username}</span>
          <div className={styles.likes}>
            <LikeO className={styles.likeIcon} />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;