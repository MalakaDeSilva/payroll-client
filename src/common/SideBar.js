import { Layout, Menu } from "antd";
import { FileOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Employee from "../components/Employee";
import Commisions from "../components/Commisions";
import AddOns from "../components/AddOns";
import Designations from "../components/Designations";
import Overview from "./Overview";

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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="">Overview</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
              <Menu.Item key="2">
                <Link to="employee">Employees</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="commissions">Commisions</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="add-ons">Add Ons</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="designations">Designations</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="6" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Content>
            <Routes>
              <Route path="" element={<Overview />} />
              <Route path="employee" element={<Employee />} />
              <Route path="commissions" element={<Commisions />} />
              <Route path="add-ons" element={<AddOns />} />
              <Route path="designations" element={<Designations />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default SideBar;
