import axios from "./config";

// 获取图片列表
export const getImages = (page) => {
  return axios.get('/images', {
    params: {page}
  });
};