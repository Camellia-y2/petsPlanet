import {
    useEffect,
    useState,
    memo,
} from 'react';
import {
    Tabbar,
} from 'react-vant';
import {
    WapHome,
    Friends,
    Chat,
    SmileComment,
    Bag,
} from '@react-vant/icons';
import {
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'
import styles from './mainLayout.module.css'

//菜单栏配置
const tabs = [
    { icon: <WapHome />, title: '首页', path: '/home'},
    { icon: <SmileComment />, title: '百科', path: '/encyclopedia'},
    { icon: <Bag />, title: '智能衣柜', path: '/smartimage'},
    { icon: <Chat />, title: 'AI助手', path: '/assistant'},
    { icon: <Friends />, title: '个人中心', path: '/profile'}
]

// 当应用中的其他状态（如数据加载状态、表单状态等）发生变化时，
// 如果路由没有变化，MainLayout 不需要重新渲染
const MainLayout = memo(() => {
    const [active, setActive] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const index = tabs.findIndex(
            tab => location.pathname.startsWith(tab.path)
        )
        setActive(index)
    }, [])
    return (
        <div className="flex flex-col h-screen"
            style={{paddingBottom: '50px'}}
        >
            <div className="flex-1">
                <Outlet />
            </div>
            {/* tabbar */}
            <Tabbar 
                value={active} 
                onChange={
                    (key) => { 
                        setActive(key)
                        navigate(tabs[key].path)
                    }
                }
            >
                {tabs.map((tab, index) => (
                    <Tabbar.Item 
                        className={`${styles.tabItem} theme-color font-f`}
                        key={index} 
                        icon={tab.icon}
                    > 
                        {tab.title}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
})

export default MainLayout
