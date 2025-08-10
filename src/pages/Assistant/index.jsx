// AI智能助手
import { chat } from '@/llm';
import { Toast, Loading, Dialog } from 'react-vant';
import { useState, useRef, useEffect } from 'react';
import useTitle from '@/hooks/useTitle';
import styles from './assistant.module.css'
import { UserO, Smile, GuideO, DeleteO } from '@react-vant/icons'
import { BackTop } from '@react-vant/icons';
import { useNavigate } from 'react-router-dom';
import formatMarkdownToText from '@/utils/formatMarkdown';

// 本地存储键名
const CHAT_HISTORY_KEY = 'petsPlanet_chat_history';

// 默认消息
const DEFAULT_MESSAGES = [
    {
        id: 1,
        role: 'user',
        content: '你好'
    },
    {
        id: 2,
        role: 'assistant',
        content: '你好，我是你的AI宠物助手！我可以回答你关于宠物的各种问题，比如喂养、训练、健康护理等。有什么我能帮到你的吗？'
    }
];

const Assistant = () => {
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    
    useTitle('AI宠物助手');
    
    // 回到顶部功能
    const [showBackTop, setShowBackTop] = useState(false);
    
    // 监听滚动事件，控制回到顶部按钮的显示和隐藏
    useEffect(() => {
        const handleScroll = () => {
            // 当页面滚动超过300px时显示回到顶部按钮
            setShowBackTop(window.scrollY > 300);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // 回到顶部的处理函数
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // 从本地存储加载聊天记录，如果没有则使用默认消息
    const [messages, setMessages] = useState(() => {
        try {
            const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
            return savedMessages ? JSON.parse(savedMessages) : DEFAULT_MESSAGES;
        } catch (error) {
            console.error('加载聊天记录失败:', error);
            return DEFAULT_MESSAGES;
        }
    });
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    
    // 自动滚动到最新消息
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // 当消息更新时，保存到本地存储并滚动到底部
    useEffect(() => {
        // 保存聊天记录到本地存储
        try {
            localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error('保存聊天记录失败:', error);
        }
        
        // 滚动到底部
        scrollToBottom();
    }, [messages]);
    
    // 生成唯一ID
    const generateId = () => {
        return Date.now() + Math.floor(Math.random() * 1000);
    };

    const handleSubmit = async () => {
        if(text.trim() === ''){
            Toast({
                message: '请输入问题',
                icon: <Smile />,
                position: 'top',
            });
            return;
        }
        
        setIsSending(true);
        const userMessage = text;
        setText('');
        
        // 添加用户消息
        const userMsg = {
            id: generateId(),
            role: 'user',
            content: userMessage
        };
        
        setMessages((prev) => [...prev, userMsg]);
        
        try {
            // 发送请求获取AI回复
            const newMessage = await chat([{
                role: 'user',
                content: userMessage
            }]);
            
            // 添加AI回复
            const aiMsg = {
                id: generateId(),
                ...newMessage.data
            };
            
            // 确保内容是字符串
            if (aiMsg.content && typeof aiMsg.content !== 'string') {
                aiMsg.content = String(aiMsg.content);
            }
            
            setMessages((prev) => [...prev, aiMsg]);
            
            // 如果是错误响应，显示提示
            if (newMessage.code !== 0) {
                Toast({
                    message: '请求失败，使用了备用回复',
                    position: 'top',
                });
            }
        } catch (error) {
            console.error('聊天请求失败:', error);
            
            // 添加错误消息作为AI回复
            const errorMsg = {
                id: generateId(),
                role: 'assistant',
                content: '抱歉，服务暂时不可用，请稍后再试。'
            };
            
            setMessages((prev) => [...prev, errorMsg]);
            
            Toast({
                message: '发送失败，请重试',
                position: 'top',
            });
        } finally {
            setIsSending(false);
        }
    };
    
    // 处理按键事件
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    
    // 处理清除聊天记录
    const handleClearMessages = () => {
        setMessages(DEFAULT_MESSAGES);
        setShowClearModal(false);
    };

    return (
        <div className={`${styles.container}`}>
            <BackTop onClick={scrollToTop} className={styles.backTop}/>
            <header className={styles.header}>
                <h1>AI 宠物助手</h1>
                <p className={styles.desc}>
                    您的宠物好伙伴
                </p>
            </header>
            
            {/* 清除按钮 */}
            <div className={styles.clearButtonContainer}>
                <button 
                    className={styles.clearButton}
                    onClick={() => setShowClearModal(true)}
                >
                    <DeleteO /> 
                </button>
            </div>
            <div className={styles.messagesContainer}>
                <div className={styles.messages}>
                    {messages.map((item, index) => (
                        <div 
                            key={index} 
                            className={styles.messageWrapper}
                            style={{
                                justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            {item.role !== 'user' && (
                                <div className={`${styles.avatar} ${styles.assistantAvatar}`}>
                                    <span className={styles.aiText}>AI</span>
                                </div>
                            )}
                            
                            <div 
                                className={
                                    item.role === 'user' ? styles.messageRight : styles.messageLeft
                                }
                            >
                                <span className={styles.messageContent}>
                                    {item.role === 'assistant' 
                                        ? formatMarkdownToText(item.content)
                                        : item.content
                                    }
                                </span>
                            </div>
                            
                            {item.role === 'user' && (
                                <div className={`${styles.avatar} ${styles.userAvatar}`}>
                                    <UserO />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {isSending && (
                        <div className={styles.messageWrapper} style={{ justifyContent: 'flex-start' }}>
                            <div className={`${styles.avatar} ${styles.assistantAvatar}`}>
                                <span className={styles.aiText}>AI</span>
                            </div>
                            <div className={styles.messageLeft}>
                                <div className={styles.loadingContainer}>
                                    <Loading type='spinner' color='#ff9a76' size='18px' />
                                    <span className={styles.loadingText}>思考中...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>
                
                <div className={styles.inputArea}>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.inputField}
                        placeholder="输入你的问题..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <div className={styles.sendButton} onClick={handleSubmit}>
                        <GuideO />
                    </div>
                </div>
            </div>
            
            {/* 清除记录确认模态框 */}
            <Dialog
                visible={showClearModal}
                title="确认清除"
                showCancelButton
                onCancel={() => setShowClearModal(false)}
                onConfirm={handleClearMessages}
            >
                <p className={styles.modalContent}>确定要清除所有聊天记录吗？</p>
            </Dialog>
        </div>
    );
};

export default Assistant;