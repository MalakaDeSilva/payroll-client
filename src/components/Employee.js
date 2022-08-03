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
  Typography,
  Divider,
  Breadcrumb,
} from "antd";
import {
  LoadingOutlined,
  UserAddOutlined,
  EditOutlined,
  UserDeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AddUpdateEmployee from "./AddUpdateEmployee";

function Employee(props) {
  const [title, setTitle] = useState("New Employee");
  const [emp, setEmp] = useState({});
  const [action, setAction] = useState("ADD");
  const navigate = useNavigate();

  const { Title, Text } = Typography;

  const { employees, isEmpLoading, drawerVisible, employeeCount } =
    useStoreState((state) => state.employees);
  const { designations, isDesgLoading } = useStoreState(
    (state) => state.designations
  );
  const { verification } = useStoreState((state) => state.auth);

  const { getEmployeesThunk, deleteEmployeeThunk, actionDrawer } =
    useStoreActions((actions) => actions.employees);
  const { getDesignationsThunk } = useStoreActions(
    (actions) => actions.designations
  );
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

    getDesignationsThunk();
    getEmployeesThunk(); // eslint-disable-next-line
  }, [verification]);

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
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (data) => <Space size="middle">{getDesignation(data)}</Space>,
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
      render: (data) => (
        <Space size="middle">{new Date(data).toLocaleDateString()}</Space>
      ),
    },
    {
      title: "Salary (LKR)",
      dataIndex: "salary",
      key: "salary",
      render: (data) => <Space size="middle">{data.toFixed(2)}</Space>,
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => updateEmployee(record)}
          ></Button>
          <Button
            icon={<UserDeleteOutlined />}
            shape="circle"
            onClick={() => deleteEmployee(record)}
          ></Button>
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

  const toggleDrawer = () => {
    setEmp({
      employeeId: generateEmpId(),
    });
    setAction("ADD");
    setTitle("New Employee");
    actionDrawer();
  };

  const getDesignation = (code) => {
    let desg = "";
    if (!isDesgLoading) {
      designations.forEach((value, index) => {
        if (value["designationCode"] === code) {
          desg = value["designationName"];
        }
      });
    }

    return desg;
  };

  const updateEmployee = (emp) => {
    // useStoreActions((actions) => actions.employees.setEmployeeAction(emp));
    // setEmployeeAction(emp);
    setEmp(emp);
    setAction("UPDATE");
    setTitle("Update Employee");
    actionDrawer();
  };

  const deleteEmployee = (record) => {
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
            <Text strong>Do you want to delete {record.name}?</Text>
          </div>
          <br />
          <p>Employee record will be deleted from the system.</p>
        </>
      ),
      onOk: async () => {
        let result = await deleteEmployeeThunk(record._id);
        if (typeof result["data"]["deletedEmployee"] != "undefined") {
          message.success("Employee is removed.", 1.5);
        } else {
          message.error("An error occurred.");
        }

        closeModal();
      },
      onCancel: closeModal,
    });
  };

  const generateEmpId = () => {
    let newEmp = `PIC00${employeeCount + 1}`;

    return newEmp;
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
          <Link to="/employee">Employee</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <AddUpdateEmployee
        visible={drawerVisible}
        title={title}
        emp={emp}
        action={action}
        onClose={toggleDrawer}
      />
      <Card
        title="Employees"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New employee">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={toggleDrawer}
            >
              New employee
            </Button>
          </Tooltip>
        }
      >
        {isEmpLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default Employee;
