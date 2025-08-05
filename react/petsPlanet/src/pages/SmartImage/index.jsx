import useTitle from '@/hooks/useTitle'
import { useRef, useState } from 'react'
import styles from './smartimage.module.css'
import { Loading } from 'react-vant'
import { Photograph } from '@react-vant/icons'
import { HomeO } from '@react-vant/icons'

const SmartImage = () => {
    useTitle('智能衣柜')
    const uploadPetRef = useRef(null)
    const uploadClothesRef = useRef(null)
    const uploadUrl = 'https://api.coze.cn/v1/files/upload'
    const patToken = import.meta.env.VITE_PAT_TOKEN
    const workflowUrl = 'https://api.coze.cn/v1/workflow/run'
    const workflow_id = '7533236076422512694'

    const [petPreview, setPetPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
    const [clothesPreview, setClothesPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
    const [imgUrl, setImgUrl] = useState('')
    const [status, setStatus] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    // 默认使用写实风格
    const style_en = "realistic"

    // 图片预览
    const updateImageData = (type) => {
        const input = type === "pet" ? uploadPetRef.current : uploadClothesRef.current
        if (!input || !input.files || input.files.length === 0) return
        const file = input.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            if (type === "pet") setPetPreview(e.target.result)
            else setClothesPreview(e.target.result)
        }
    }

    // 上传图片文件，支持宠物和衣服
    const uploadFile = async (type) => {
        const formData = new FormData()
        const input = type === "pet" ? uploadPetRef.current : uploadClothesRef.current
        if (!input || !input.files || input.files.length <= 0) return null
        formData.append('file', input.files[0])
        const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${patToken}`,
            },
            body: formData,
        })
        const ret = await res.json()
        if (ret.code !== 0) {
            setStatus(ret.msg)
            return null
        }
        return ret.data.id
    }

    const generate = async () => {
        setIsGenerating(true)
        setStatus("宠物图片上传中...")
        const pet_file_id = await uploadFile("pet")
        if (!pet_file_id) {
            setStatus("宠物图片上传失败")
            setIsGenerating(false)
            return
        }
        setStatus("衣服图片上传中...")
        const clothes_file_id = await uploadFile("clothes")
        if (!clothes_file_id) {
            setStatus("衣服图片上传失败")
            setIsGenerating(false)
            return
        }
        setStatus("图片上传成功，正在生成...")

        // 这里参数名和格式要和 workflow 对齐
        const parameters = {
            image_pet: { file_id: pet_file_id },
            image_clothes: { file_id: clothes_file_id },
            style: style_en
        }

        try {
            const res = await fetch(workflowUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${patToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workflow_id, parameters }),
            })
            const ret = await res.json()
            
            if (ret.code !== 0) {
                setStatus(ret.msg)
                setIsGenerating(false)
                return
            }
            
            const data = JSON.parse(ret.data)
            setImgUrl(data.data)
            setStatus('')
        } catch (e) {
            setStatus("图片生成失败！请重试。")
            console.error("生成失败：", e)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>智能衣柜</h1>
                <p className={styles.desc}>
                    为您的宠物打造专属时尚造型
                </p>
            </header>
            
            <div className={styles.input}>
                <div className={styles.fileBox}>
                    <div className={styles.title}>
                        <h3>宠物图片</h3>
                        <div className={styles.photoButton} onClick={() => uploadPetRef.current.click()}>
                            <Photograph className={styles.photoIcon} />
                        </div>
                    </div>
                    <input
                        ref={uploadPetRef}
                        type="file"
                        accept="image/*"
                        onChange={() => updateImageData("pet")}
                        className={styles.fileInput}
                    />
                    <img src={petPreview} alt="宠物图片预览" className={styles.preview} />
                </div>
                
                <div className={styles.fileBox}>
                    <div className={styles.title}>
                        <h3>衣服图片</h3>
                        <div className={styles.photoButton} onClick={() => uploadClothesRef.current.click()}>
                            <Photograph className={styles.photoIcon} />
                        </div>
                    </div>
                    <input
                        ref={uploadClothesRef}
                        type="file"
                        accept="image/*"
                        onChange={() => updateImageData("clothes")}
                        className={styles.fileInput}
                    />
                    <img src={clothesPreview} alt="衣服图片预览" className={styles.preview} />
                </div>
                
                <div className={styles.generate}>
                    <button 
                        className={styles.button} 
                        onClick={generate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? <Loading type="spinner" color="#fff" /> : ''} 
                        {isGenerating ? '生成中...' : '生成'}
                    </button>
                </div>
            </div>
            
            <div className={styles.output}>
                <div className={styles.generated}>
                    {imgUrl ? (
                        <img src={imgUrl} alt="生成效果预览" className={styles.resultImg} />
                    ) : status ? (
                        <div className={styles.status}>{status}</div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>上传图片并点击生成按钮</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SmartImage
