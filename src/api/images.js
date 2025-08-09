import axios from "./config";
import Mock from 'mockjs';

// 宠物类型列表
const petTypes = ['猫咪', '狗狗', '英国短毛猫', '泰迪', '土狗', '折耳猫', '布偶猫', '拉布拉多', '哈士奇'];

// 宠物活动描述
const petActivities = [
  '在阳光下慵懒地晒太阳',
  '玩耍时的可爱瞬间',
  '好奇地探索新玩具',
  '安静地睡觉的样子',
  '与主人互动的温馨时刻',
  '吃零食时满足的表情真是好可爱呀',
  '洗澡后蓬松的样子',
  '在窗边看风景认认真真的亚子好可爱',
  '与其他宠物一起玩耍',
  '做鬼脸的搞笑瞬间'
];

// 用户名列表
const usernames = [
  '喵星人', '汪星球', '兔兔控', '宠物达人', 
  '毛孩子妈妈', '铲屎官', '爪爪控', 
  '萌宠爱好者', '毛茸茸', '宠物摄影师'
];

// 生成随机宠物图片数据
const generatePetImages = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => {
    // 随机生成200-350之间的高度，限制最高长度
    const height = Mock.Random.integer(200, 350);
    const petType = Mock.Random.pick(petTypes);
    const activity = Mock.Random.pick(petActivities);
    
    return {
      id: `${page}-${i}`,
      height: height,
      url: Mock.Random.image(`300x${height}`, Mock.Random.color(), '#fff', 'pet'),
      title: `${petType}${activity}`,
      username: Mock.Random.pick(usernames),
      avatar: Mock.Random.image('100x100', Mock.Random.color(), '#fff', 'avatar'),
      likes: Mock.Random.integer(0, 999)
    };
  });
};

// 判断是否为生产环境
const isProduction = window.location.hostname !== 'localhost';

// 获取图片列表
export const getImages = async (page) => {
  if (isProduction) {
    // 在生产环境中使用模拟数据
    return {
      code: 0,
      data: generatePetImages(page)
    };
  } else {
    // 在开发环境中使用API
    return axios.get('/images', {
      params: {page}
    });
  }
};
