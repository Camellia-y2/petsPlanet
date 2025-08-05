// 搜索页
import useTitle from '@/hooks/useTitle'
import { 
    useState,
    useEffect
} from 'react'
import SearchBox from '@/components/SearchBox'
import styles from './searchPage.module.css'
import { 
    ArrowUp,
    ArrowDown,
    DeleteO,
} from '@react-vant/icons'
import HotTopics from '@/components/HotTopics'
import useSearchStore from '@/store/useSearchStore'
const SearchPage = () => {
    useTitle('搜索')
    const [text, setText] = useState(''); // 搜索文本
    const [isSending, setIsSending] = useState(false); // 是否正在搜索
    const [searchHistory, setSearchHistory] = useState([]); // 搜索历史
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true) // 控制展开/收起
    const [selectedSuggest, setSelectedSuggest] = useState(null); // 存储当前选中的搜索建议项
    
    // 使用搜索全局状态
    const { suggestList, setSuggestList, hotList, setHotList } = useSearchStore();

    // 从 localStorage 加载搜索历史
    useEffect(() => {
        const history = localStorage.getItem('searchHistory')
        if (history) {
            try {
                setSearchHistory(JSON.parse(history))
            } catch (e) {
                setSearchHistory([])
            }
        }
    }, [])

    // 保存搜索历史到 localStorage
    useEffect(() => {
        if (searchHistory.length > 0) {
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        } else {
            localStorage.removeItem('searchHistory') // 搜索历史为空时清除
        }
    }, [searchHistory])
    
    // 加载热门搜索
    useEffect(() => {
        setHotList();
    }, []);
    
    // 处理搜索
    const handleSearch = (searchText, fromSuggest = false) => {
        if(searchText.trim() === ''){
            return;
        }
        
        // 如果是从搜索建议点击的，设置选中的建议项
        if (fromSuggest) {
            setSelectedSuggest(searchText);
        } else {
            setSelectedSuggest(null);
            setText(searchText);
        }
        
        // 更新搜索历史
        setSearchHistory([
            searchText,
            ...searchHistory.filter(i => i !== searchText) // 重复的搜索记录要删掉
        ]);
        
        // 如果不是从搜索建议点击的，才调用API获取搜索建议
        if (!fromSuggest) {
            setSuggestList(searchText);
        }
        
        setIsSending(true);
    }
    
    // 处理历史项点击
    const handleHistoryClick = (item) => {
        // 点击搜索历史后显示到搜索框
        setText(item);
        setSearchHistory([
            item,
            ...searchHistory.filter(i => i !== item) // 重复的搜索记录要删掉
        ]);
        
        // 调用API获取搜索建议
        setSuggestList(item);
        
        setIsSending(true);
    }
    
    return (
        <>
            {/* 搜索栏 */}
            <SearchBox 
                text={text} 
                setText={setText} 
                isSending={isSending}
                setIsSending={setIsSending}
                onSearch={handleSearch} 
                onClear={() => setIsSending(false)} 
            />

            {/* 内容区域 */}
            {!isSending ? (
                <>
                    {/* 搜索历史 */}
                    <div className={`${styles.searchHistoryBlock} ${styles.contentBlock}`}>
                        <div className='flex'>
                            <p className={styles.searchHistoryTitle}>搜索历史</p>
                            {isHistoryExpanded ? (
                                <ArrowUp
                                    className={`${styles.arrowUp} pos-relative`}
                                    onClick={() => setIsHistoryExpanded(false)}
                                />
                            ) : (
                                <ArrowDown
                                    className={`${styles.arrowDown} pos-relative`}
                                    onClick={() => setIsHistoryExpanded(true)}
                                />
                            )}
                            <DeleteO  
                                className={`${styles.delete} pos-relative`} 
                                onClick={() => setSearchHistory([])}
                            />
                        </div>
                        {isHistoryExpanded && (
                            <ul className={`flex fs-28 wrap`}>
                                {searchHistory.map((item, index) => (
                                    <li 
                                        key={index} 
                                        onClick={() => handleHistoryClick(item)} 
                                        className={styles.searchHistoryItem}
                                    >
                                    {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* 星球热点 */}
                    <div className={`${styles.hotTopicsBlock} ${!isHistoryExpanded ? styles.noMarginTop : ''}`}>
                        <HotTopics />
                    </div>
                </>
            ) : (
                <div className={styles.searchResultBlock}>
                    <p className={styles.searchResultTitle}>你搜索的内容是："{selectedSuggest || text}"</p>
                    {selectedSuggest ? (
                        // 如果是从搜索建议点击的，只显示选中的那一项
                        <ul className={styles.searchResultList}>
                            <li className={styles.searchResultItem}>
                                {selectedSuggest}
                            </li>
                        </ul>
                    ) : (
                        // 否则显示所有搜索结果
                        suggestList && suggestList.length > 0 ? (
                            <ul className={styles.searchResultList}>
                                {suggestList.map((item, index) => (
                                    <li key={index} className={styles.searchResultItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.noResult}>没有找到相关结果</p>
                        )
                    )}
                </div>
            )}
        </>
    )
}

export default SearchPage