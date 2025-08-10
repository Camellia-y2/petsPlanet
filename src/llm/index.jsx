const DEEPSEEK_CHAT_API_URL = 'https://api.deepseek.com/chat/completions';

// 聊天 chat
export const chat = async (
    messages,
    api_url = DEEPSEEK_CHAT_API_URL,
    api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
    model = 'deepseek-chat'
) => {
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${api_key}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages,
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