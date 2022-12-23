import React from 'react';
import { Layout, theme } from 'antd';
import './home.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import WorkShift from '../WorkShift/WorkShift';
import StartPage from '../StartPage/StartPage';
import { MenuAuth } from '../../components/Menu/MenuAuth';
import { MenuSidebar } from '../../components/Menu/MenuSidebar';
import { useSelector } from 'react-redux';
import { isAuthSelect } from '../../store/fetchAuthSlice';
const { Header, Content, Footer, Sider } = Layout;

export const Home: React.FC = () => {
  const isAuth = useSelector(isAuthSelect);
  const [collapsed, setCollapsed] = React.useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // if (!isAuth) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Layout className="root">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <MenuSidebar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <MenuAuth />
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/workshift" element={<WorkShift />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023 Created by Nevskij</Footer>
      </Layout>
    </Layout>
  );
};
