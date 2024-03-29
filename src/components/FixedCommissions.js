import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Table,
  Space,
  Card,
  Spin,
  Tooltip,
  Button,
  Modal,
  message,
  Select,
  Typography,
  Divider,
} from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddUpdateFixedCommission from "./AddUpdateFixedCommission";

function FixedCommissions(props) {
  const [title, setTitle] = useState("New Commission");
  const [commission, setCommission] = useState({});
  const [action, setAction] = useState("ADD");
  const [filter, setFilter] = useState({
    userId: "all",
    payCycle: "all",
  });
  const navigate = useNavigate();

  const { Option } = Select;
  const { Title, Text } = Typography;

  const { commissions, isComLoading, drawerVisible, payCycles } = useStoreState(
    (state) => state.fixedCommissions
  );
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const { verification } = useStoreState((state) => state.auth);

  const { getCommissionsThunk, deleteCommissionsThunk, actionDrawer } =
    useStoreActions((actions) => actions.fixedCommissions);
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { verifyThunk } = useStoreActions((actions) => actions.auth);

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
      title: "Amount (LKR)",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => {
        return <Space size="middle">{text.toFixed(2)}</Space>;
      },
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
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => updateCommission(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => deleteCommission(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (Object.keys(verification).length === 0) {
      verifyThunk();
    }
    if (Object.keys(verification).length !== 0 && !verification["verified"]) {
      navigate("/permission-error", {
        state: { error: verification["reason"] },
      });
    }
    
    getEmployeesThunk();
    getCommissionsThunk(filter); // eslint-disable-next-line
  }, [navigate, getEmployeesThunk, getCommissionsThunk, filter, verification]);

  const getData = () => {
    let _commissions = [];
    commissions.forEach((commission) => {
      commission["key"] = commission._id;
      _commissions.push(commission);
    });

    return _commissions;
  };

  const handleChange = (value, _filter) => {
    if (_filter === "EMPLOYEEID") {
      if (typeof value === "undefined") {
        setFilter({ ...filter, userId: "all" });
      } else {
        setFilter({ ...filter, userId: value });
      }
    } else if (_filter === "PAYCYCLE") {
      if (typeof value === "undefined") {
        setFilter({ ...filter, payCycle: "all" });
      } else {
        setFilter({ ...filter, payCycle: value });
      }
    }
  };

  const getEmployeeSelector = () => {
    return (
      <Select
        placeholder={"Employee"}
        allowClear={true}
        onChange={(v) => handleChange(v, "EMPLOYEEID")}
        style={{ width: 140, marginRight: "5px" }}
      >
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

  const getPayCycleSelector = () => {
    return (
      <Select
        placeholder={"Pay Cycle"}
        allowClear={true}
        onChange={(v) => handleChange(v, "PAYCYCLE")}
        style={{ width: 140, marginRight: "5px" }}
      >
        {isComLoading
          ? ""
          : payCycles.map((element, index) => {
              return (
                <Option value={element} key={element}>
                  {element}
                </Option>
              );
            })}
      </Select>
    );
  };

  const getEmployeeName = (empId) => {
    return isEmpLoading || employees.length <= 0
      ? ""
      : employees.find((ele) => ele.employeeId === empId).name;
  };

  const updateCommission = (commission) => {
    setCommission(commission);
    setAction("UPDATE");
    setTitle("Update Commission");
    actionDrawer();
  };

  const deleteCommission = (record) => {
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
              Do you want to delete the commission for{" "}
              {getEmployeeName(record.employeeId)}?
            </Text>
          </div>
          <br />
          <p>Commission will be deleted from the system.</p>
        </>
      ),
      onOk: async () => {
        let result = await deleteCommissionsThunk(record._id);
        if (typeof result["data"]["deletedCommission"] != "undefined") {
          message.success("Commission is removed.", 1.5);
        } else {
          message.error("An error occurred.");
        }

        closeModal();
      },
      onCancel: closeModal,
    });
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const toggleDrawer = () => {
    actionDrawer();
    setAction("ADD");
    setTitle("New Commission");
    setCommission({});
  };

  return (
    <div>
      <AddUpdateFixedCommission
        visible={drawerVisible}
        title={title}
        comm={commission}
        action={action}
        onClose={toggleDrawer}
      />
      <Card
        title="Commissions"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <div>
            {getEmployeeSelector()}
            {getPayCycleSelector()}
            <Tooltip title="New Commission">
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
