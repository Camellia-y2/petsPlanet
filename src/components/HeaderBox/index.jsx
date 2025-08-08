// 头部组件
import styles from './headerBox.module.css'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Search,WapNav } from '@react-vant/icons'
import UtilityPopup from '@/components/UtilityPopup'
import { useState, useEffect, useRef } from 'react'

const HeaderBox = () => {
    const navigate = useNavigate(); // 使用 useNavigate 钩子
    const [showUtilityPopup, setShowUtilityPopup] = useState(false) // 展示功能弹窗
    const popupRef = useRef(null) // 获取弹窗元素

    // 点击空白处关闭弹窗
    const handleClickOutside = (e) => {
        // 如果弹窗显示且点击目标不在弹窗内
        if (showUtilityPopup && popupRef.current && !popupRef.current.contains(e.target)) {
            setShowUtilityPopup(false)
        }
    }

    useEffect(() => {
        // 全局点击事件监听
        document.addEventListener('mousedown', handleClickOutside)
        // 组件卸载时移除事件监听，避免内存泄漏
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showUtilityPopup]) 

    return (
        <>
            {/* 头部 */}
            <header className={`${styles.header} theme-color`}>
                {/* logo */}
                <div className={styles.headerLeft}>
                    <div className='logo-box'>
                        <img className='logo' src={logo} alt="logo" />
                    </div>
                </div>
                {/* 图标导航 */}
                <div className={styles.headerRight}>
                    <Search 
                        className={styles.searchIcon} 
                        onClick={()=>{
                            setTimeout(()=>{
                                navigate('/search');
                            },500);
                        }}
                    />
                    <WapNav  className={styles.wapNavIcon} onClick={()=>{
                        if(!showUtilityPopup){
                            setShowUtilityPopup(true)
                        }else{
                            setShowUtilityPopup(false)
                        }
                    }}/>
                </div>
            </header>
            {/* 弹窗 */}
            {
                showUtilityPopup && (
                    <div ref={popupRef}>
                        <UtilityPopup />
                    </div>
                )
            }
        </>
    )
}

export default HeaderBox;
