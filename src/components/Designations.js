import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Table,
  Space,
  Card,
  Spin,
  Tooltip,
  Button,
  Typography,
  Modal,
  Divider,
  message,
  Breadcrumb,
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

import AddUpdateDesignation from "./AddUpdateDesignation";

function Designations() {
  const [title, setTitle] = useState("New Designation");
  const [desg, setDesg] = useState({});
  const [action, setAction] = useState("ADD");
  const navigate = useNavigate();

  const { Title, Text } = Typography;

  const { designations, isDesgLoading, drawerVisible } = useStoreState(
    (state) => state.designations
  );
  const { verification } = useStoreState((state) => state.auth);

  const { getDesignationsThunk, deleteDesignationThunk, actionDrawer } =
    useStoreActions((actions) => actions.designations);
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
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => updateDesignation(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => deleteDesignation(record)}
          ></Button>
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
    setDesg({});
    setAction("ADD");
    setTitle("New Designation");
    actionDrawer();
  };

  const updateDesignation = (_desg) => {
    // useStoreActions((actions) => actions.employees.setEmployeeAction(emp));
    // setEmployeeAction(emp);
    setDesg(_desg);
    setAction("UPDATE");
    setTitle("Update Designation");
    actionDrawer();
  };

  const deleteDesignation = (record) => {
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
              Do you want to delete the designation {record.dessignationName}?
            </Text>
          </div>
          <br />
          <p>Designation record will be deleted from the system.</p>
        </>
      ),
      onOk: async () => {
        let result = await deleteDesignationThunk(record._id);
        if (typeof result["data"]["deletedDesignation"] != "undefined") {
          message.success("Designation is removed.", 1.5);
        } else {
          message.error("An error occured");
        }

        closeModal();
      },
      onCancel: closeModal,
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
          <Link to="/designations">Designations</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <AddUpdateDesignation
        visible={drawerVisible}
        title={title}
        desg={desg}
        action={action}
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
