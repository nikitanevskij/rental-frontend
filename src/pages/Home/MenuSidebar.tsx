import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const MenuSidebar: React.FC = () => {
  const menuSideBar = [
    { item: 'Стартовая страница', key: '/', icon: UserOutlined },
    { item: 'Рабочая смена', key: '/workshift', icon: VideoCameraOutlined },
    { item: 'В разработке', key: '/dev', icon: UploadOutlined },
    { item: 'В разработке', key: '/dev1', icon: UserOutlined },
  ];
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/']}
      items={menuSideBar.map((item, index) => ({
        key: item.key,
        icon: React.createElement(item.icon),
        label: <Link to={item.key}>{item.item}</Link>,
      }))}
    />
  );
};
