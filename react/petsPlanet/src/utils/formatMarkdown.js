/**
 * 将 Markdown 格式的文本转换为普通文本
 * @param {string} markdown - Markdown 格式的文本
 * @returns {string} 转换后的普通文本
 */
export const formatMarkdownToText = (markdown) => {
    if (!markdown) return '';
    
    // 处理标题
    let text = markdown
        .replace(/#{1,6}\s+([^\n]+)/g, '$1\n')
        
        // 处理粗体
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        
        // 处理斜体
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        
        // 处理列表
        .replace(/^\s*[-*+]\s+/gm, '• ')
        .replace(/^\s*\d+\.\s+/gm, '• ')
        
        // 处理代码块
        .replace(/```[\s\S]*?```/g, (match) => {
            return match
                .replace(/```(?:\w+)?\n/g, '')
                .replace(/```/g, '')
                .trim();
        })
        
        // 处理行内代码
        .replace(/`([^`]+)`/g, '$1')
        
        // 处理链接
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        
        // 处理图片
        .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '[图片: $1]')
        
        // 处理引用
        .replace(/^\s*>\s+/gm, '')
        
        // 处理水平线
        .replace(/^-{3,}|^_{3,}|^\*{3,}/gm, '\n———\n')
        
        // 处理段落 - 确保段落之间有空行
        .replace(/\n{2,}/g, '\n\n');
    
    return text;
};

export default formatMarkdownToText;