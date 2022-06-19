import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Space, Card, Spin, Tooltip, Button } from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";

import NewEmployee from "./newEmployee";

function Employee(props) {
  const { employees, isLoading, drawerVisible } = useStoreState(
    (state) => state
  );
  const { getEmployeesThunk, actionDrawer } = useStoreActions(
    (actions) => actions
  );

  useEffect(() => {
    getEmployeesThunk(); // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "NIC",
      dataIndex: "NIC",
      key: "NIC",
    },
    {
      title: "Designation",
      dataIndex: "employeeType",
      key: "employeeType",
      render: (data) => <Space size="middle">{getDesignation(data)}</Space>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {<EditOutlined />}
          {<UserDeleteOutlined />}
        </Space>
      ),
    },
  ];

  const getData = () => {
    let _employees = [];
    employees.forEach((employee) => {
      employee["key"] = employee._id;
      _employees.push(employee);
    });

    return _employees;
  };

  const getDesignation = (code) => {
    if (code === "1") return "CEO";
    else if (code === "2") return "Designer";
    else if (code === "3") return "Logo Designer";
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <NewEmployee visible={visible} onClose={() => setVisible(!visible)} />
      <Card
        title="Employees"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New employee">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => setVisible(!visible)}
            >
              New employee
            </Button>
          </Tooltip>
        }
      >
        {isLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default Employee;
