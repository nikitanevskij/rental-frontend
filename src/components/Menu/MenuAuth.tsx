import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { logout } from '../../store/fetchAuthSlice';
import { useAppDispatch } from '../../store/store';

export const MenuAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const menuHeader = [
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
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['/']}
      items={menuHeader.map((item, index) => ({
        key: item.key,
        icon: React.createElement(item.icon),
        label: item.item,
      }))}
      style={{ justifyContent: 'flex-end' }}
      onClick={(item) => onClick(item.key)}
    />
  );
};
