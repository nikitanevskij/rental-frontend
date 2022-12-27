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
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ height: '100%' }}
      >
        <div className="logo" />
        <MenuSidebar />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
          <MenuAuth />
        </Header> */}
        <Content style={{ margin: ' 16px ', minHeight: 'max-content' }}>
          <div style={{ padding: 24, height: '100%', background: colorBgContainer }}>
            <Routes>
              <Route path="/" element={<WorkShift />} />
              <Route path="/workshift" element={<StartPage />} />
            </Routes>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>©2023 Created by Nevskij</Footer> */}
      </Layout>
    </Layout>
  );
};

// import React from 'react';
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Layout, Menu, theme } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// const items: MenuProps['items'] = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   AppstoreOutlined,
//   TeamOutlined,
//   ShopOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }));

// export const Home: React.FC = () => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   return (
//     <Layout hasSider>
//       <Sider
//         collapsed={true}
//         style={{
//           overflow: 'auto',
//           height: '100vh',
//           position: 'fixed',
//           left: 0,
//           top: 0,
//           bottom: 0,
//         }}
//       >
//         <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
//       </Sider>
//       <Layout style={{ marginLeft: 80 }}>
//         <Header style={{ padding: 0, background: colorBgContainer }} />
//         <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
//           <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
//             <p>long content</p>
//             {
//               // indicates very long content
//               Array.from({ length: 100 }, (_, index) => (
//                 <React.Fragment key={index}>
//                   {index % 20 === 0 && index ? 'more' : '...'}
//                   <br />
//                 </React.Fragment>
//               ))
//             }
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//       </Layout>
//     </Layout>
//   );
// };
