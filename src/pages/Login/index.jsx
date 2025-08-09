import { useState } from 'react';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './login.module.css';
import logo2 from '@/assets/logo2.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 获取重定向路径，如果没有则默认为首页
  const from = location.state?.from || '/home';

  const handleLogin = async () => {
    if (!username || !password) {
      alert('请输入用户名和密码');
      return;
    }

    setLoading(true);
    try {
      console.log('开始登录，用户名:', username, '密码:', password);
      await login({ username, password });
      console.log('登录成功，准备跳转到:', from);
      // 登录成功后重定向到之前的页面
      navigate(from, { replace: true });
    } catch (error) {
      console.error('登录失败:', error);
      alert(error.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <img src={logo2} alt="毛孩星球" className={styles.logo} />
          <h1 className={styles.title}>毛孩星球</h1>
        </div>
        
        <div className={styles.formContainer}>
          <div className={styles.formItem}>
            <Input
              size="large"
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formItem}>
            <Input.Password
              size="large"
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              onPressEnter={handleLogin}
            />
          </div>
          <Button 
            type="primary" 
            block 
            size="large"
            onClick={handleLogin}
            loading={loading}
            className={styles.loginBtn}
          >
            登录
          </Button>
          <div className={styles.tips}>
            提示：用户名 admin，密码 123456
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;