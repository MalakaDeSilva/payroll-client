import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Space, Card, Spin, Tooltip, Button } from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";

import AddUpdateAddOn from "./AddUpdateAddOn";

function AddOns() {
  let data = { payCycle: "2022JUN" };
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const { addOns, isAddOnsLoading, drawerVisible } = useStoreState(
    (state) => state.addOns
  );
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  // eslint-disable-next-line
  const {
    getAddOnsByEmpIdThunk,
    getAddOnsByEmpIdPayCycleThunk,
    getAddOnsByPayCycleThunk,
    actionDrawer,
  } = useStoreActions((actions) => actions.addOns);

  useEffect(() => {
    getAddOnsByPayCycleThunk(data);
    getEmployeesThunk(); // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "employeeId",
      render: (text, record) => {
        return <Space size="middle">{getEmployeeName(text)}</Space>;
      },
    },
    {
      title: "From Pay Cycle",
      dataIndex: "fromPayCycle",
      key: "fromPayCycle",
    },
    {
      title: "Allowance (Rs.)",
      dataIndex: "fixedAllowance",
      key: "fixedAllowance",
      render: (text, record) => {
        return <Space size="middle">{text.toFixed(2)}</Space>;
      },
    },
    {
      title: "Increment (Rs.)",
      dataIndex: "increment",
      key: "increment",
      render: (text, record) => {
        return <Space size="middle">{text.toFixed(2)}</Space>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} shape="circle"></Button>
          <Button icon={<UserDeleteOutlined />} shape="circle"></Button>
        </Space>
      ),
    },
  ];

  const getEmployeeName = (empId) => {
    return isEmpLoading || employees.length <= 0
      ? ""
      : employees.find((ele) => ele.employeeId === empId).name;
  };

  const getData = () => {
    let _addOns = [];
    addOns.forEach((addOn) => {
      addOn["key"] = addOn._id;
      _addOns.push(addOn);
    });

    return _addOns;
  };

  const toggleDrawer = () => {
    actionDrawer();
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <AddUpdateAddOn visible={drawerVisible} onClose={toggleDrawer} />
      <Card
        title="Add Ons"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Add On">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={toggleDrawer}
            >
              New Add On
            </Button>
          </Tooltip>
        }
      >
        {isAddOnsLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default AddOns;
