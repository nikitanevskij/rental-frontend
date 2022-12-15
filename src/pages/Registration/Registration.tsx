import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import './registration.scss';

export const Registration: React.FC = () => {
  const { Title } = Typography;
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="root">
      <div className="registration-form">
        <Title level={4} className="registration-form__title">
          Регистрация
        </Title>
        <Form name="registration" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name={['user', 'name']}
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name={['user', 'password']}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
