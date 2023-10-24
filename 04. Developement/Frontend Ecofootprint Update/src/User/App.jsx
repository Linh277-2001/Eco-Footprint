import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  RadarChartOutlined,
  BarChartOutlined,
  SettingOutlined,
  FileWordOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Button } from 'antd';
const { Sider } = Layout;
import logo from '../Home/assets/logo.png';
import './App.css';
import ProfilePage from './ProfilePage'

const App = () => {
  const navigate=useNavigate();
  const iconList = [
    { icon: UserOutlined, label: 'My Profile', path: '/user' },
    { icon: RadarChartOutlined, label: 'My Activity', path: '/user/activity' },
    { icon: CalendarOutlined, label: 'My Diary', path: '/user/diary' },
    { icon: BarChartOutlined, label: 'My Chart', path: '/user/chart' },
    { icon: SettingOutlined, label: 'Setting', path: '/user/setting' },
    { icon: FileWordOutlined, label: 'Article', path: '/user/article' },
  ];
  const handleClickLogout=(event)=>{
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Link to="/">
            <Image width="90%" preview={false} src={logo} />
          </Link>
          <div className="demo-logo-vertical" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            {iconList.map((item, index) => (
              <Menu.Item key={String(index + 1)} icon={React.createElement(item.icon)} 
              onClick={(index)=>{if(index==6){localStorage.removeItem("token")}}}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
        <div className="Content2">
            <div className="chart-container">
              <Button style={{position: "fixed", top:"5%", right:"5%"}} onClick={handleClickLogout}>Log out</Button>
              <ProfilePage/>
            </div>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
