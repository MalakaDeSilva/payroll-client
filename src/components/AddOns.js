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
  Breadcrumb,
  Form,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AddUpdateAddOn from "./AddUpdateAddOn";
import { getPayCycle } from "../util/Utils";

function AddOns() {
  const [title, setTitle] = useState("New Add On");
  const [addOn, setAddOn] = useState({});
  const [action, setAction] = useState("ADD");
  const navigate = useNavigate();

  const { Title, Text } = Typography;
  const { Option } = Select;

  let data = { payCycle: getPayCycle() };
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const { addOns, isAddOnsLoading, drawerVisible } = useStoreState(
    (state) => state.addOns
  );
  const { verification } = useStoreState((state) => state.auth);

  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  // eslint-disable-next-line
  const { getAddOnsByPayCycleThunk, actionDrawer, deleteAddOnThunk } =
    useStoreActions((actions) => actions.addOns);
  const { verifyThunk } = useStoreActions((actions) => actions.auth);

  useEffect(() => {
    if (Object.keys(verification).length === 0) {
      verifyThunk();
    }
    if (Object.keys(verification).length !== 0 && !verification["verified"]) {
      navigate("/permission-error", {
        state: { error: verification["reason"] },
      });
    }

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
      title: "Allowance (LKR)",
      dataIndex: "fixedAllowance",
      key: "fixedAllowance",
      render: (text, record) => {
        return <Space size="middle">{text.toFixed(2)}</Space>;
      },
    },
    {
      title: "Increment (LKR)",
      dataIndex: "increment",
      key: "increment",
      render: (text, record) => {
        return <Space size="middle">{text.toFixed(2)}</Space>;
      },
    },
    {
      title: "Bonus (LKR)",
      dataIndex: "bonus",
      key: "bonus",
      render: (text, record) => {
        return <Space size="middle">{text.toFixed(2)}</Space>;
      },
    },
    {
      title: "Reductions (LKR)",
      dataIndex: "reductions",
      key: "reductions",
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
      onOk: async () => {
        let result = await deleteAddOnThunk(record._id);
        if (typeof result["data"]["deletedAddOn"] != "undefined") {
          message.success("Add On is removed.", 1.5);
        } else {
          message.error("An error occurred");
        }

        closeModal();
      },
      onCancel: closeModal,
    });
  };

  const setPayCycleFilter = () => {
    Modal.info({
      title: "Set Pay Cycle",
      icon: "",
      content: (
        <div style={{ marginTop: "10px" }}>
          <Form
            layout="vertical"
            onFinish={(values) => {
              let _payCycle = {
                payCycle: getPayCycle(values.year, values.month.toString()),
              };
              getAddOnsByPayCycleThunk(_payCycle);
              Modal.destroyAll();
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="year"
                  label="Year"
                  initialValue={new Date().getFullYear()}
                >
                  <InputNumber style={{ width: "100%" }}></InputNumber>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="month"
                  label="Month"
                  initialValue={new Date().getMonth().toString()}
                >
                  <Select style={{ width: "100%" }}>
                    <Option value="0">January</Option>
                    <Option value="1">February</Option>
                    <Option value="2">March</Option>
                    <Option value="3">April</Option>
                    <Option value="4">May</Option>
                    <Option value="5">June</Option>
                    <Option value="6">July</Option>
                    <Option value="7">August</Option>
                    <Option value="8">September</Option>
                    <Option value="9">October</Option>
                    <Option value="10">November</Option>
                    <Option value="11">December</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Select
                    </Button>
                    <Button
                      type="default"
                      htmlType="button"
                      onClick={() => Modal.destroyAll()}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ),
      okButtonProps: { style: { display: "none" } },
    });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div>
      <Breadcrumb
        style={{
          display: "flex",
          justifyContent: "start",
          margin: "20px 40px",
        }}
      >
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/add-ons">Add Ons</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
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
          <div>
            <Button onClick={setPayCycleFilter} style={{ marginRight: "5px" }}>
              Pay Cycle
            </Button>
            <Tooltip title="New Add On">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={toggleDrawer}
              >
                New Add On
              </Button>
            </Tooltip>
          </div>
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
