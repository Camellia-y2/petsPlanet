import Mock from 'mockjs';
import jwt from 'jsonwebtoken';

// 加盐
const secret = '!&124coddefgg';

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


// JWT 生成函数
const generateToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: 86400 }); // 24小时过期
  } catch (error) {
    console.error('Token 生成错误:', error);
    return null;
  }
};

// 模拟API接口
export default [
  { 
    url: '/petsPlanet/login', // 路径
    method: 'post', // 请求方式
    timeout: 2000, // 请求耗时
    response: (req, res) => { // 响应数据
        const { username, password } = req.body // 解构赋值 拿到数据
        if(username !== "admin" || password !== "123456"){
            return {
                code: 1,
                msg: "用户名或密码错误"
            }
        }
        try {
            // 生成token 颁发令牌
            const token = generateToken({
                id: "001",
                username: "admin"
            });
            
            // 确保 token 格式正确
            const tokenStr = 'mock_jwt_token_' + JSON.stringify({id: "001", username: "admin"});
            
            console.log('mock token:', tokenStr);
            
            // 确保返回格式与 useUserStore.js 中期望的一致
            return {
                code: 0,
                token: tokenStr,
                data: {
                    id: "001",
                    username: "admin"
                }
            };
        } catch (error) {
            console.error('登录响应生成错误:', error);
            return {
                code: 1,
                msg: "服务器内部错误"
            };
        }
    }
  } ,
  {
    url: '/petsPlanet/images',
    method: 'get',
    response: ({ query }) => {
      const page = Number(query.page) || 1;
      return {
        code: 0,
        data: generatePetImages(page),
      };
    }
  },
  {
    url: '/petsPlanet/search',
    method: 'get',
    timeout: 1000,
    response:(req, res)=>{
        const keyword = req.query.keyword;
        let num = Math.floor(Math.random() * 10); //生成0-9的随机数
        let list = [];
        for(let i = 0; i < num; i++) {
            const randomData = Mock.mock({
                title: '@ctitle'
            }) //Mock.mock 返回一个对象
            console.log(randomData)
            list.push(`${keyword}${randomData.title}`)
        }
        return {
            code: 0,
            data: list
        }
    }
  }
];