import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Button } from "antd";
import {
  DashboardOutlined,
  HeartOutlined,
  FileWordOutlined,
  IdcardOutlined,
  PieChartOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, theme } from "antd";
const { Sider, Header } = Layout;
import logo from "../Home/assets/logo.png";
import Dashboard from "./Dashboard";

const App = () => {
  const navigate=useNavigate();
  const [currentTime, setCurrentTime] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleClickLogout = (event) => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const iconList = [
    { icon: DashboardOutlined, label: "Dashboard", path: "/admin" },
    { icon: IdcardOutlined, label: "Account", path: "/admin/account" },
    { icon: AppstoreOutlined, label: "Category", path: "/admin/category" },
    { icon: HeartOutlined, label: "Activity", path: "/admin/activity" },
    { icon: PieChartOutlined, label: "Analysis", path: "/admin/analysis" },
    { icon: FileWordOutlined, label: "Article", path: "/admin/article" },
  ];
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            {iconList.map((item, index) => (
              <Menu.Item
                key={String(index + 1)}
                icon={React.createElement(item.icon)}
              >
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
            <div
              style={{
                textAlign: "right",
                marginRight: "20px",
                fontSize: "18px",
              }}
            >
              {currentTime}
            </div>
          </Header>
          <div className="Content2">
            <div className="chart-container">
              <Button danger
                style={{ position: "fixed", bottom: "5%", right: "5%" }}
                onClick={handleClickLogout}
              >
                Log out
              </Button>
              <Dashboard />
            </div>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
