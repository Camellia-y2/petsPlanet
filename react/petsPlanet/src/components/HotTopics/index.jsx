// 宠物热门搜索组件
import { useState } from 'react'
import styles from './hotTopics.module.css'
import { Fire } from '@react-vant/icons'

const HotTopics = () => {
    // 模拟宠物热门搜索数据
    const [hotTopics] = useState([
        { id: 1, title: '猫咪饮食注意事项', heat: 25498 },
        { id: 2, title: '如何训练狗狗上厕所？', heat: 3547 },
        { id: 3, title: '宠物猫常见疾病预防', heat: 3000 },
        { id: 4, title: '适合新手养的宠物推荐', heat: 2500 },
        { id: 5, title: '猫咪绝育的最佳时间', heat: 298 }
    ]);

    return (
        <div className={styles.hotTopicsContainer}>
            <div className={styles.hotTopicsTitle}><Fire className={styles.FireIcon}/>宠物热搜</div>
            <ul className={styles.hotTopicsList}>
                {hotTopics.map((topic, index) => (
                    <li key={topic.id} className={styles.hotTopicItem}>
                        <span className={styles.topicRank}>{index + 1}</span>
                        <span className={styles.topicTitle}>{topic.title}</span>
                        <span className={styles.topicHeat}>{topic.heat}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HotTopics