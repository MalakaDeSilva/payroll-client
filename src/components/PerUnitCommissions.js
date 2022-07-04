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
  UserDeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import AddUpdatePerUnitCommission from "./AddUpdatePerUnitCommission";

function PerUnitCommissions(props) {
  const [title, setTitle] = useState("New Commission");
  const [commission, setCommission] = useState({});
  const [action, setAction] = useState("ADD");

  let dataPayCycle = { payCycle: "2022JUN" };

  const { Option } = Select;
  const { Title, Text } = Typography;

  const { puCommissions, isPUComLoading, drawerVisible } = useStoreState(
    (state) => state.perUnitCommissions
  );
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const {
    getCommissionsByUserIdPayCycleThunk,
    getCommissionsByPayCycleThunk,
    deleteCommissionsThunk,
    actionDrawer,
  } = useStoreActions((actions) => actions.perUnitCommissions);
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
      title: "Units",
      dataIndex: "units",
      key: "units",
    },
    {
      title: "Amount (Rs.)",
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
            icon={<UserDeleteOutlined />}
            shape="circle"
            onClick={() => deleteCommission(record)}
          ></Button>
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
    puCommissions.forEach((commission) => {
      commission["key"] = commission._id;
      _commissions.push(commission);
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
    return isEmpLoading || employees.length <= 0
      ? ""
      : employees.find((ele) => ele.employeeId === empId).name;
  };

  const updateCommission = (commission) => {
    // useStoreActions((actions) => actions.employees.setEmployeeAction(emp));
    // setEmployeeAction(emp);
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
      onOk: () => {
        deleteCommissionsThunk(record._id);
        message.success("Commission is removed.", 1.5);
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
      <AddUpdatePerUnitCommission
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
        {isPUComLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default PerUnitCommissions;
