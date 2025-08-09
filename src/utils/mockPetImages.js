// 宠物图片生成器
import Mock from 'mockjs';

// 预定义的宠物图片URL数组（使用稳定的公共图片）
const PET_IMAGES = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 猫咪
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 狗狗
  'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 猫咪
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 狗狗
  'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 猫咪
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 狗狗
  'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80', // 猫咪
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80'  // 狗狗
];

const generatePetImages = (count = 1) => {
  // 创建一个数组，从预定义图片中随机选择
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    url: PET_IMAGES[Math.floor(Math.random() * PET_IMAGES.length)],
    alt: '宠物图片'
  }));
};

export default generatePetImages;