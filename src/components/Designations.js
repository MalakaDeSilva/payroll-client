import { useStoreState, useStoreActions } from "easy-peasy";
import { Table, Space, Card, Spin, Tooltip, Button } from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";

import AddUpdateDesignation from "./AddUpdateDesignation";

function Designations() {
  const { designations, isDesgLoading, drawerVisible } = useStoreState(
    (state) => state.designations
  );
  const { getDesignationsThunk, actionDrawer } = useStoreActions(
    (actions) => actions.designations
  );
  useEffect(() => {
    getDesignationsThunk(); // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Designation",
      dataIndex: "designationName",
      key: "designationName",
    },
    {
      title: "Designation Code",
      dataIndex: "designationCode",
      key: "designationCode",
    },
    {
      title: "Pay Scale (Rs.)",
      dataIndex: "salaryRange",
      key: "salaryRange",
      render: (text, record) => (
        <Space size="middle">
          {`${text.from.toFixed(2)} - ${text.to.toFixed(2)}`}
        </Space>
      ),
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

  const getData = () => {
    let _designations = [];
    designations.forEach((designation) => {
      designation["key"] = designation._id;
      _designations.push(designation);
    });

    return _designations;
  };

  const toggleDrawer = () => {
    actionDrawer();
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <AddUpdateDesignation
        title="New Designation"
        visible={drawerVisible}
        onClose={toggleDrawer}
      />
      <Card
        title="Designations"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New employee">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={toggleDrawer}
            >
              New Designation
            </Button>
          </Tooltip>
        }
      >
        {isDesgLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default Designations;
