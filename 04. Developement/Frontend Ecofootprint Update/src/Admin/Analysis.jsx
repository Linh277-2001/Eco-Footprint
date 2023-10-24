import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  HeartOutlined,
  FileWordOutlined,
  IdcardOutlined,
  PieChartOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, theme, Input } from 'antd';
const { Sider, Header } = Layout;
import logo from '../Home/assets/logo.png';

const options1 = {
    chart: {
      type: 'pie',
    },
    labels: ['Food', 'House', 'Trash', 'Fuel'],
    series: [10, 20, 45, 30],
    colors: ['#FF5733', '#33FF57', '#5733FF', '#FF3357'],
    legend: {
      position: 'bottom',
    },
  };

//Biểu đồ cột kép:
const data = [
    { date: '2023-08-01', newAccounts: 10, newPosts: 5 },
    { date: '2023-08-02', newAccounts: 15, newPosts: 8 },
    { date: '2023-08-03', newAccounts: 12, newPosts: 10 },
    { date: '2023-08-04', newAccounts: 20, newPosts: 14 },
    { date: '2023-08-05', newAccounts: 30, newPosts: 26 },
    { date: '2023-08-06', newAccounts: 17, newPosts: 7 },
    // ... Các ngày khác
  ];
  
  const dates = data.map(item => item.date);
  const newAccountsData = data.map(item => item.newAccounts);
  const newPostsData = data.map(item => item.newPosts);
  
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      title: {
        text: 'Counts',
      },
    },
  };
  
  const series2 = [
    { name: 'New Accounts', data: newAccountsData },
    { name: 'New Posts', data: newPostsData },
  ];
  
const App = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
 
   // Sử dụng useEffect để cập nhật thời gian mỗi giây
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'));
     }, 1000);
 
     return () => {
       clearInterval(interval);
     };
   }, []);
    //Bắt đầu form mẫu
    const {
        token: { colorBgContainer },
      } = theme.useToken();

  const iconList = [
    { icon: DashboardOutlined, label: 'Dashboard', path: '/admin' },
    { icon: IdcardOutlined, label: 'Account', path: '/admin/account' },
    { icon: AppstoreOutlined, label: 'Category', path: '/admin/category' },
    { icon: HeartOutlined, label: 'Activity', path: '/admin/activity' },
    { icon: PieChartOutlined, label: 'Analysis', path: '/admin/analysis' },
    { icon: FileWordOutlined, label: 'Article', path: '/admin/article' },
    { icon: LogoutOutlined, label: 'Logout', path: '/admin/logout' },
    ];
    

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
          <Menu theme="light" mode="inline" defaultSelectedKeys={['5']}>
            {iconList.map((item, index) => (
              <Menu.Item key={String(index + 1)} icon={React.createElement(item.icon)}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header
                style={{
                padding: 0,
                background: colorBgContainer,
                }}
            >
              <div style={{ textAlign: 'right', marginRight: '20px', fontSize: '18px' }}>
                {currentTime}
              </div>
          </Header>
            <div className='Content2'>
                <div className='chart-container'>
                    <div style={{ textAlign: 'center' }}>
                        <ReactApexChart options={options1} series={options1.series} type="pie" height={350} />
                        <h2>Pie Chart</h2>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ReactApexChart options={options} series={series2} type="bar" height={350} />
                        <h2>New Accounts vs New Posts</h2>
                    </div>
                </div>
            </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
