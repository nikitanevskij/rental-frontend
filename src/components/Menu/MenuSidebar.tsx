import React from 'react';
import { UploadOutlined, FileDoneOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const MenuSidebar: React.FC = () => {
  const menuSideBar = [
    { item: 'Стартовая страница', key: '/', icon: FileDoneOutlined },
    { item: 'Рабочая смена', key: '/workshift', icon: BarChartOutlined },
    { item: 'В разработке', key: '/dev', icon: UploadOutlined },
    { item: 'В разработке', key: '/dev1', icon: UploadOutlined },
  ];
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/workshift']}
      items={menuSideBar.map((item, index) => ({
        key: item.key,
        icon: React.createElement(item.icon),
        label: <Link to={item.key}>{item.item}</Link>,
      }))}
    />
  );
};
