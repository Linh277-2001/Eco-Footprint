import React, { useState, useEffect } from 'react';
import moment from 'moment';
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
import { Layout, Menu, Image, theme,Table, Button, Modal, Form, Input, Space  } from 'antd';
const { Sider, Header } = Layout;
const { Search } = Input;
import logo from '../Home/assets/logo.png';

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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();
  
    const columns = [
      {
        title: 'Username',
        dataIndex: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Actions',
        render: (text, record) => (
          <Space>
            <Button type="primary" onClick={() => showEditModal(record)}>
              Edit
            </Button>
            <Button type="primary" onClick={() => handleDelete(record)}>
              Delete
            </Button>
            <Button type="primary" danger>
              Block
              </Button>
          </Space>
        ),
      },
    ];
  
    const data = [
      { key: '1', username: 'user1', email: 'user1@example.com' },
      { key: '2', username: 'user2', email: 'user2@example.com' },
      // Add more user data...
    ];
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const showEditModal = (record) => {
      setEditingUser(record);
      form.setFieldsValue({
        username: record.username,
        email: record.email,
      });
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      form.validateFields().then((values) => {
        console.log('Received values of form: ', values);
        if (editingUser) {
          // Perform edit logic here
          console.log('Editing user:', editingUser);
        } else {
          // Perform add logic here
          console.log('Adding user:', values);
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
      });
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    };
  
    const handleDelete = (record) => {
      // Handle delete logic here
      console.log('Delete user:', record);
    };

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
          <Menu theme="light" mode="inline" defaultSelectedKeys={['2']}>
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
            <div className="Content2">
                <div className="chart-container">
                <div>
      <Button type="primary" onClick={showModal} style={{marginTop:'20px', marginBottom:'10px',marginRight:'20%'}}>
        Add User
      </Button>
      <Search placeholder="Search" style={{ width: 200 , marginTop:'20px', marginBottom:'10px' }} />
      <Table
        columns={columns}
        dataSource={data}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter an email' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
                </div>
            </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
