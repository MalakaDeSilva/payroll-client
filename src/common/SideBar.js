import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BankOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Employee from "../components/Employee";
import Commisions from "../components/Commisions";
import AddOns from "../components/AddOns";
import Designations from "../components/Designations";
import Overview from "./Overview";
import EmployeeSalary from "../components/EmployeeSalary";
import SalarySlips from "../components/SalarySlips";
import SalarySheet from "../components/SalarySheet";

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
                <Link to="/employee-salary">Empoloyee Salary</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/salary-slips">Payslips</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Content>
            <Routes>
              <Route exact path="/" element={<Overview />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/commissions" element={<Commisions />} />
              <Route path="/add-ons" element={<AddOns />} />
              <Route path="/designations" element={<Designations />} />
              <Route path="/employee-salary" element={<EmployeeSalary />} />
              <Route exact path="/salary-slips" element={<SalarySlips />} />
              <Route path="/salary-slips/salary-sheet/:empId/:payCycle" element={<SalarySheet />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default SideBar;
