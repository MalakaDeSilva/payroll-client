import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

function SideBar(props) {
  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const { content } = props;

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["3"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
              <Menu.Item key="3">Users</Menu.Item>
              <Menu.Item key="4">Employees</Menu.Item>
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
          <Content>{content}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default SideBar;
