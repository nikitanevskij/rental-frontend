import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const MenuAuth: React.FC = () => {
  const menuHeader = [
    { item: 'Регистрация', key: '/register', icon: UserOutlined },
    { item: 'Авторизация', key: '/workshift', icon: VideoCameraOutlined },
    { item: 'Выход', key: '/dev', icon: UploadOutlined },
  ];
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['/']}
      items={menuHeader.map((item, index) => ({
        key: item.key,
        icon: React.createElement(item.icon),
        label: <Link to={item.key}>{item.item}</Link>,
      }))}
      style={{ justifyContent: 'flex-end' }}
    />
  );
};
