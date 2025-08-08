// 宠物图片生成器
import Mock from 'mockjs';

const generatePetImages = (count = 1) => {
  return Mock.mock({
    [`list|${count}`]: [
      {
        id: '@increment',
        url: '@image("300x200", @color, #fff, pet)',
      }
    ]
  }).list;
};
export default generatePetImages;
