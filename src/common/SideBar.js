import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BankOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useStoreActions } from "easy-peasy";

function SideBar(props) {
  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { logOutThunk } = useStoreActions((actions) => actions.auth);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="">Overview</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
            <Menu.Item key="2">
              <Link to="/employee">Employees</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/commissions">Commisions</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/add-ons">Add Ons</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/designations">Designations</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<BankOutlined />} title="Payroll">
            <Menu.Item key="6">
              <Link to="/employee-salary">Employee Salary</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/salary-slips">Payslips</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            title=""
            style={{
              position: "absolute",
              bottom: "48px",
              zIndex: 1,
            }}
            key="8"
            icon={<LogoutOutlined />}
            onClick={(e) => {
              logOutThunk();
              navigate("/login");
            }}
          >
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SideBar;
