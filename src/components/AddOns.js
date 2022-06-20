import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Space, Card, Spin, Tooltip, Button } from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";

import NewAddOn from "./NewAddOn";

function AddOns() {
  let data = { empId: "GOLUWA" };
  const { employees, isEmpLoading, drawerVisible } = useStoreState(
    (state) => state.employees
  );
  const { addOns, isAddOnsLoading } = useStoreState((state) => state.addOns);
  const { getEmployeesThunk, actionDrawer } = useStoreActions(
    (actions) => actions.employees
  );
  // eslint-disable-next-line
  const { getAddOnsByEmpIdThunk, getAddOnsByEmpIdPayCycleThunk } =
    useStoreActions((actions) => actions.addOns);

  useEffect(() => {
    getAddOnsByEmpIdThunk(data);
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
      title: "Allowance (Rs.)",
      dataIndex: "fixedAllowance",
      key: "fixedAllowance",
    },
    {
      title: "From Pay Cycle",
      dataIndex: "fromPayCycle",
      key: "fromPayCycle",
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

  const getEmployeeName = (empId) => {
    return isEmpLoading
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
      <NewAddOn visible={drawerVisible} onClose={toggleDrawer} />
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