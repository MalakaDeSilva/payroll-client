import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Space, Card, Spin, Tooltip, Button, Select } from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";

import NewFixedCommission from "./NewFixedCommission";

function FixedCommissions(props) {
  let dataPayCycle = { payCycle: "2022JUN" };

  const { Option } = Select;

  const { commissions, isComLoading, drawerVisible } = useStoreState(
    (state) => state.fixedCommissions
  );
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const {
    getCommissionsByUserIdPayCycleThunk,
    getCommissionsByPayCycleThunk,
    actionDrawer,
  } = useStoreActions((actions) => actions.fixedCommissions);
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);

  const columns = [
    {
      title: "Commission",
      dataIndex: "commissionName",
      key: "commissionName",
    },
    {
      title: "Pay Cycle",
      dataIndex: "payCycle",
      key: "payCycle",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Employee",
      dataIndex: "employeeId",
      render: (text, record) => (
        <Space size="middle">{getEmployeeName(text)}</Space>
      ),
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

  useEffect(() => {
    getEmployeesThunk();
    getCommissionsByPayCycleThunk(dataPayCycle); // eslint-disable-next-line
  }, []);

  const getData = () => {
    let _commissions = [];
    commissions.forEach((commissions) => {
      commissions["key"] = commissions._id;
      _commissions.push(commissions);
    });

    return _commissions;
  };

  const handleChange = (value) => {
    let data = {
      payCycle: "2022JUN",
    };

    if (value === "all") {
      getCommissionsByPayCycleThunk(dataPayCycle);
    } else {
      data = { ...data, userId: value };
      getCommissionsByUserIdPayCycleThunk(data);
    }
  };

  const getEmployeeSelector = () => {
    return (
      <Select
        defaultValue="all"
        onChange={handleChange}
        style={{ width: 140, marginRight: "5px" }}
      >
        <Option value="all" key="all">
          All Employees
        </Option>
        {isEmpLoading
          ? ""
          : employees.map((element, index) => {
              return (
                <Option value={element.employeeId} key={element._id}>
                  {element.name}
                </Option>
              );
            })}
      </Select>
    );
  };

  const getEmployeeName = (empId) => {
    return isEmpLoading
      ? ""
      : employees.find((ele) => ele.employeeId === empId).name;
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const toggleDrawer = () => {
    actionDrawer();
  };

  return (
    <div>
      <NewFixedCommission visible={drawerVisible} onClose={toggleDrawer} />
      <Card
        title="Commissions"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <div>
            {getEmployeeSelector()}
            <Tooltip title="New employee">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={toggleDrawer}
              >
                New Commission
              </Button>
            </Tooltip>
          </div>
        }
      >
        {isComLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default FixedCommissions;