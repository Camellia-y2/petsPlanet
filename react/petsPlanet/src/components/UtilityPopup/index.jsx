// 右上角弹窗
import styles from './utilityPopup.module.css'
import { Switch, Divider } from 'react-vant'
import { Arrow} from '@react-vant/icons';
import { useState } from 'react';
import useThemeStore from '@/store/themeStore';

const UtilityPopup = () => {
    const { isDark, toggleDark } = useThemeStore();
    const [isLogin, setIsLogin] = useState(false); // 登录状态
    
    // 处理深色模式切换
    const handleThemeToggle = () => {
        toggleDark();
    };
    
    return (
        <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
            {/* 设置 */}
            <div className={styles.setting}>
                <div className={styles.Title}>
                    设置
                </div>
                <div className={styles.Item}>
                    个人中心
                </div>
                <div className={styles.Item}>
                    登录
                </div>
            </div>
            <Divider className={styles.divider}/>
            {/* 访问方式 */}
            <div className={styles.access}>
                <div className={styles.Title}>
                    访问方式
                </div>
                <div className={styles.Item}>
                    添加到桌面
                </div>
                <div className={styles.Item}>
                    打开小窗模式
                </div>
            </div>
            <Divider className={styles.divider}/>
            {/* cells */}
            <div className={styles.cells}>
                <div className={styles.Item}>
                    业务合作 <Arrow />
                </div>
                <div className={styles.Item}>
                    创作中心 <Arrow />
                </div>
            </div>
            <Divider className={styles.divider}/>
             <div className={styles.cells}>
                <div className={styles.Title}>
                    帮助与客服
                </div>
                <div className={styles.Item}>
                    联系客服 <Arrow />
                </div>
                <div className={styles.Item}>
                    隐私、协议 <Arrow />
                </div>
                <div className={styles.Item}>
                    关于毛孩星球 <Arrow />
                </div>
            </div>
        </div>
    )
}
export default UtilityPopup