import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Space, Card } from "antd";
import React, { useEffect } from "react";

function Employee(props) {
  const { employees, isLoading } = useStoreState((state) => state);
  const { getEmployeesThunk } = useStoreActions((actions) => actions);

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
      render: (data) => (
        <Space size="middle">
          <b>{getDesignation(data)}</b>
        </Space>
      ),
    },
  ];

  const getDesignation = (code) => {
    if (code === "1") return "CEO";
    else if (code === "2") return "Designer";
    else if (code === "3") return "Logo Designer";
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Card title="Employees">
          <Table columns={columns} dataSource={employees} />
        </Card>
      )}
    </div>
  );
}

export default Employee;
