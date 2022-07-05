import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Table,
  Space,
  Card,
  Spin,
  Tooltip,
  Button,
  Modal,
  Typography,
  Divider,
  message,
} from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import AddUpdateAddOn from "./AddUpdateAddOn";

function AddOns() {
  const [title, setTitle] = useState("New Add On");
  const [addOn, setAddOn] = useState({});
  const [action, setAction] = useState("ADD");

  const { Title, Text } = Typography;

  let data = { payCycle: "2022JUN" };
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const { addOns, isAddOnsLoading, drawerVisible } = useStoreState(
    (state) => state.addOns
  );
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  // eslint-disable-next-line
  const {
    getAddOnsByPayCycleThunk,
    actionDrawer,
    deleteAddOnThunk,
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
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => updateAddOn(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => deleteAddON(record)}
          ></Button>
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
    setAddOn({});
    setAction("ADD");
    setTitle("New Add On");
    actionDrawer();
  };

  const updateAddOn = (_addOn) => {
    setAddOn(_addOn);
    setAction("UPDATE");
    setTitle("Update Add On");
    actionDrawer();
  };

  const deleteAddON = (record) => {
    let modal = Modal.confirm();
    const closeModal = () => modal.destroy();
    modal.update({
      icon: "",
      title: (
        <>
          <Space style={{ width: "100%", justifyContent: "center" }}>
            <CloseCircleOutlined
              style={{
                fontSize: "70px",
                color: "#eed202",
                marginBottom: "15px",
              }}
            />
          </Space>
          <Title level={1} style={{ textAlign: "center", fontWeight: "light" }}>
            Are you sure?
          </Title>
          <Divider />
        </>
      ),
      content: (
        <>
          <div style={{ fontSize: "18px" }}>
            <Text strong>
              Do you want to delete add on for{" "}
              {getEmployeeName(record.employeeId)}?
            </Text>
          </div>
          <br />
          <p>Add On record will be deleted from the system.</p>
        </>
      ),
      onOk: () => {
        deleteAddOnThunk(record._id);
        message.success("Add On is removed.", 1.5);
        closeModal();
      },
      onCancel: closeModal,
    });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <AddUpdateAddOn
        visible={drawerVisible}
        title={title}
        addOn={addOn}
        action={action}
        onClose={toggleDrawer}
      />
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
