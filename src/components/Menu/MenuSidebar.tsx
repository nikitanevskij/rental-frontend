import React from 'react';
import {
  UploadOutlined,
  FileDoneOutlined,
  BarChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/fetchAuthSlice';

export const MenuSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const menuSideBar = [
    { item: 'Рабочая смена', key: '/', icon: FileDoneOutlined },
    { item: 'Закрытые заказы', key: '/workshift', icon: BarChartOutlined },
    { item: 'Удаленные заказы', key: '/dev', icon: UploadOutlined },
    { item: 'Все заказы', key: '/dev1', icon: UploadOutlined },
    { item: 'Профиль', key: 'profile', icon: UserOutlined },
    { item: 'Выход', key: 'logOut', icon: LogoutOutlined },
  ];
  const logOut = () => {
    if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  const routeMyAccount = () => {};

  const onClick = (key: any) => {
    if (key === 'profile') {
      console.log('profile');
      routeMyAccount();
    }
    if (key === 'logOut') {
      console.log('logOut');
      logOut();
    }
  };
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
      onClick={(item) => onClick(item.key)}
    />
  );
};
