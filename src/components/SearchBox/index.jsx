import { memo, useEffect, useRef, useState, useMemo } from 'react';
import useSearchStore from '@/store/useSearchStore';
import { Input, Button } from 'react-vant';
import { ArrowLeft, Close, Search } from '@react-vant/icons';
import styles from './search.module.css';
import { debounce } from '@/utils/debounce';

const SearchBox = (props) => {
    const { onSearch, onClear, text, setText, setIsSending } = props;
    const queryRef = useRef(null);
    const suggestListRef = useRef(null);
    const inputRef = useRef(null);
    const { suggestList, setSuggestList } = useSearchStore();
    
    // 控制搜索建议的显示状态
    const [showSuggest, setShowSuggest] = useState(false);
    // 选中的建议项索引
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleTextChange = (value) => {
        setText(value);
        setShowSuggest(true);
    };

    const clearText = () => {
        setText('');
        onClear();
        setIsSending(false);
        setShowSuggest(false);
    };

    const handleSearch = () => {
        if (text.trim() === '') {
            return;
        }
        if (onSearch) {
            onSearch(text.trim());
        }
        setIsSending(true);
        setShowSuggest(false);
    };

    const handleBack = () => {
        setTimeout(() => {
            history.go(-1);
        }, 500);
    };

    const handleQuery = (text) => {
        console.log('debounce后', text);
        setText(text);
        if (!text.trim()) {
            setShowSuggest(false);
            return;
        }
        // 输入文字时立即触发搜索建议
        setSuggestList(text);
        setShowSuggest(true);
    };

    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 300);
    }, []);

    useEffect(() => {
        handleQueryDebounce(text);
    }, [text]);

    // 处理点击搜索建议项
    const handleSuggestItemClick = (item, index) => {
        setSelectedIndex(index);
        
        // 添加选中动效
        setTimeout(() => {
            // 不改变输入框内容，只传递被点击的项给父组件
            if (onSearch) {
                onSearch(item, true); // 传递第二个参数表示这是从建议项点击的
            }
            setShowSuggest(false);
        }, 200);
    };

    // 处理点击输入框
    const handleInputClick = () => {
        if (text.trim() !== '') {
            setShowSuggest(true);
        }
    };

    // 处理点击外部关闭搜索建议
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestListRef.current && 
                !suggestListRef.current.contains(event.target) &&
                inputRef.current && 
                !inputRef.current.contains(event.target)
            ) {
                setShowSuggest(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const suggestListStyle = {
        display: (showSuggest && text.trim() !== '') ? 'block' : 'none',
    };

    return (
        <>
            <div className={`flex ${styles.inputArea}`}>
                <ArrowLeft className={styles.ArrowLeft} onClick={handleBack} />
                <div 
                    ref={inputRef} 
                    className={styles.inputWrapper}
                    onClick={handleInputClick}
                >
                    <Input
                        value={text}
                        ref={queryRef}
                        prefix={
                            <Search
                                onClick={handleSearch}
                                className='cPointer'
                            />
                        }
                        suffix={
                            text.trim() !== '' && (
                                <Close
                                    onClick={clearText}
                                    className={`cPointer pos-relative ${styles.closeIcon}`}
                                />
                            )
                        }
                        onChange={handleTextChange}
                        placeholder='搜索笔记/文章/用户'
                        className={`${styles.input}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                </div>
                <Button
                    type="primary"
                    onClick={handleSearch}
                    className={styles.searchBtn}
                >
                    搜索
                </Button>
            </div>
            {/* 搜索建议 */}
            <div 
                ref={suggestListRef}
                className={styles.suggestList} 
                style={suggestListStyle}
            >
                {suggestList.map((item, index) => (
                    <div 
                        key={item} 
                        className={`${styles.suggestItem} ${selectedIndex === index ? styles.selected : ''}`}
                        onClick={() => handleSuggestItemClick(item, index)}
                    >
                        <div className={styles.suggestItemLeft}>
                            <Search className={styles.searchIcon}/>
                            <span dangerouslySetInnerHTML={{ 
                                __html: item.replace(
                                    new RegExp(text, 'gi'), 
                                    match => `<span class="${styles.highlight}">${match}</span>`
                                ) 
                            }} />
                        </div>
                        <span className={styles.arrowIcon}>↗</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default memo(SearchBox);
