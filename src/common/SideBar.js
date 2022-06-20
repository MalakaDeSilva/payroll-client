import { Layout, Menu } from "antd";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Employee from "../components/Employee";
import Commisions from "../components/Commisions";

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
              <Menu.Item key="4">
                <Link to="employee">Employees</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="commissions">Commisions</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="add-ons">Add Ons</Link>
              </Menu.Item>
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
              <Route path="commissions" element={<Commisions />} />
              <Route path="add-ons" element={<AddOns />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default SideBar;
