import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import './registration.scss';
import { useAppDispatch } from '../../store/store';
import { fetchRegister, isAuthSelect } from '../../store/fetchAuthSlice';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Title } = Typography;
  const isAuth = useSelector(isAuthSelect);

  // const [notification, setNotification] = React.useState({ message: '', type: 'danger' });

  const onFinish = async (values: any) => {
    // setNotification({ message: '', type: 'danger' });
    const { user } = values;
    const registerUserData = await dispatch(fetchRegister(user));
    //@ts-ignore
    if (!registerUserData.payload.token) {
      return alert('Не удалось зарегистрироваться!');
    }
    //@ts-ignore
    if ('token' in registerUserData.payload) {
      //@ts-ignore
      window.localStorage.setItem('token', registerUserData.payload.token);
    } else {
      alert('Не удалось зарегестрироваться!');
    }

    // setNotification({ message: 'Успешная регистранция', type: 'success' });
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="root">
      <div className="registration-form">
        <Title level={4} className="registration-form__title">
          Регистрация
        </Title>
        <Form name="registration" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name={['user', 'fullName']}
            initialValue="victor"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            initialValue="mysite@app.js"
            rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name={['user', 'password']}
            initialValue="123456"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="registration-form__button">
              Register
            </Button>
            Or <Link to="/login">login now! </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
