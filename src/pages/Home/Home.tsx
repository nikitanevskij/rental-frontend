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

  // if (!isAuth) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Layout className="root">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        // style={{ height: '100%' }}
      >
        <div className="logo" />
        <MenuSidebar />
      </Sider>
      <Layout className="block-rental">
        <Content style={{ margin: 16, padding: 24, background: 'white' }}>
          <Routes>
            <Route path="/" element={<WorkShift />} />
            <Route path="/workshift" element={<StartPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
