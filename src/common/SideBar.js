import { Layout, Menu } from "antd";
import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Employee from "../components/Employee";

function SideBar(props) {
  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["3"]} mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
              <Menu.Item key="3">Users</Menu.Item>
              <Menu.Item key="4">
                <Link to="employee">Employees</Link>
              </Menu.Item>

              <Menu.Item key="5">Accounts</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Content>
            <Routes>
              <Route path="employee" element={<Employee />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default SideBar;
