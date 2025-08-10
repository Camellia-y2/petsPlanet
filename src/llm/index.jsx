import OpenAI from 'openai';

const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';
const OPENAI_GPT_CHAT_API_URL = 'https://api.agicto.cn/v1';

// 创建OpenAI实例
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_GPT4O_API_KEY,
    baseURL: OPENAI_GPT_CHAT_API_URL,
    dangerouslyAllowBrowser: true // 允许在浏览器环境中运行
});

// 聊天 chat - 支持多种模型
export const chat = async (
    messages,
    modelType = 'openai', // 默认使用OpenAI
    api_url = DEEPSEEK_CHAT_API_URL,
    api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
    model = 'deepseek-chat'
) => {
    try {
        // 尝试使用OpenAI API
        if (modelType === 'openai') {
            try {
                console.log('使用OpenAI模型...');
                const completion = await openai.chat.completions.create({
                    messages: messages.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    model: 'gpt-4o-mini', // 使用OpenAI模型
                });
                
                console.log('OpenAI响应:', completion);
                
                return {
                    code: 0,
                    data: {
                        role: 'assistant',
                        content: completion.choices[0].message.content
                    }
                };
            } catch (openaiError) {
                console.log('OpenAI请求失败，尝试使用DeepSeek...');
                modelType = 'deepseek';
            }
        }
        
        // 使用DeepSeek API
        if (modelType === 'deepseek') {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${api_key}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model,
                    messages: messages.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    stream: false
                })
            });
            
            if (!response.ok) {
                // 处理不同的HTTP错误状态码
                if (response.status === 402) {
                    return {
                        code: 1,
                        data: {
                            role: 'assistant',
                            content: '抱歉，API密钥需要付费或已过期，请联系管理员更新API密钥。'
                        }
                    };
                }
                
                const errorData = await response.json().catch(() => ({}));
                return {
                    code: 1,
                    data: {
                        role: 'assistant',
                        content: `请求失败 (${response.status}): ${errorData.error?.message || '未知错误'}`
                    }
                };
            }
            
            const data = await response.json();
            return {
                code: 0,
                data: {
                    role: 'assistant',
                    content: data.choices[0].message.content
                }
            };
        }
    } catch (error) {
        console.error('API请求错误:', error);
        return {
            code: 1,
            data: {
                role: 'assistant',
                content: '网络请求失败，请检查您的网络连接或稍后再试。'
            }
        };
    }
}

// AI生成头像
export const generateAvatar = async (text) => {
    // 设计prompt
    const prompt = `
        你是一位卡通动画设计师，需要为用户设计头像，主打奶龙风格。
        用户的信息是${text}
        要求有个性，有设计感。
    `
}