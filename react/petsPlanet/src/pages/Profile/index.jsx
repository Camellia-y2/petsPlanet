// 个人中心
import styles from './profile.module.css';
import useTitle from '@/hooks/useTitle';
import { ActionSheet } from 'react-vant';
import { useState, useEffect } from 'react';
import { generateAvatar } from '@/llm';
import {
  FaUserCircle,
  FaReceipt,
  FaCommentDots,
  FaDog, 
  FaPaw, 
  FaBone, 
  FaHeartbeat,
} from 'react-icons/fa';
import avatar from '@/assets/avatar/avatar1.jpg'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '米妮',
    level: '5级',
    slogan: '赚钱养妮妮',
    avatar
  })
  // 我的日常
  const [myDay, setMyDay] = useState([
    {
      icon: <FaUserCircle size={26} />,
      name: '我的档案',
    },
    {
      icon: <FaReceipt size={26} />,
      name: '电子宠物证',
    }
  ]);
  // 我的宠物
  const [myPet, setMyPet] = useState([
    {
      icon: <FaDog size={26} />,
      name: '宠物档案',
    },
    {
      icon: <FaPaw size={26} />,
      name: '成长日记',
    },
    {
      icon:  <FaBone size={26} />,
      name: '喂养日记'
    },
    {
      icon: <FaHeartbeat size={26} />,
      name: '健康监测'
    }
  ]);
  // 其他
  const [other, setOther] = useState([
    {
      icon: <FaUserCircle size={26} />,
      name: '商家信息',
    },
    {
      icon: <FaCommentDots size={26} />,
      name: '意见反馈',
    },
  ])
  const [showActionSheet, setShowActionSheet] = useState(false)
  const actions = [
    {
      name: 'AI上传头像',
      color: '#ee0a24',
      type: 1
    },
    {
      name: '上传头像',
      color: '#123123',
      type: 2
    }
  ]

  useTitle('个人中心')
  
  const handleAction = async (e) => {
    if(e.type===1){
      //AI生成头像
      const text = `
        昵称：${userInfo.nickname}
        签名：${userInfo.slogan}
      `;
      const newAvatar = await generateAvatar(text);
    }else if(e.type===2){
      //图片上传

    }
  }
  return (
    <div className={`${styles.container} font-f`}>
      {/* 头部信息 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <img src={userInfo.avatar} alt="头像" className={styles.avatar} onClick={() => setShowActionSheet(true)} />
          <h1 className={styles.headerTitle}>昵称：{userInfo.nickname}</h1>
          <p className={styles.headerSubtitle}>签名：{userInfo.slogan}</p>
          <p className={styles.headerLevel}>等级：铲屎官{userInfo.level}</p>
        </div>
      </header>

      <main className={styles.main}>
        {/* 我的日常 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>我的日常</h2>
          <div className={styles.iconGrid}>
            {myDay.map((item, index) => (
              <div className={styles.iconItem} key={index}>
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 我的宠物 */}
        <section className={styles.section}>
        <h2 className={styles.sectionTitle}>我的宠物</h2>
        <div className={styles.iconGrid}>
            {myPet.map((item, index) => (
              <div className={styles.iconItem} key={index}>
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
        </div>
        </section>

        {/* 其他 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>其他</h2>
          <div className={styles.iconGrid}>
            {other.map((item, index) => (
              <div className={styles.iconItem} key={index}>
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ActionSheet
        visible={showActionSheet}
        actions={actions}
        cancelText="取消"
        onCancel={() => setShowActionSheet(false)}
        onSelect={(e) => handleAction(e)}
      />
    </div>
  );
};

export default Profile;