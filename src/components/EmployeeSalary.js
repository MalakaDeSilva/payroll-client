import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Table,
  Space,
  Card,
  Spin,
  Button,
  Modal,
  Select,
  InputNumber,
  Col,
  Row,
  Tooltip,
  Form,
  Breadcrumb,
  message,
  Tag,
} from "antd";
import { LoadingOutlined, AuditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPayCycle } from "../util/Utils";

function EmployeeSalary(props) {
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  // eslint-disable-next-line
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const { designations, isDesgLoading } = useStoreState(
    (state) => state.designations
  );

  const { addSalaryThunk } = useStoreActions((actions) => actions.salaries);
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { getDesignationsThunk } = useStoreActions(
    (actions) => actions.designations
  );

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/permission-error");
    }
    getDesignationsThunk();
    getEmployeesThunk(); // eslint-disable-next-line
  }, []);

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
        <Space size="middle">
          {new Date(data).toLocaleDateString("en-US")}
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Tooltip title={"Generate Slip for " + record.name}>
          <Space size="middle">
            <Button
              icon={<AuditOutlined />}
              shape="circle"
              onClick={() => calcSalaryInfo(record.employeeId)}
            ></Button>
          </Space>
        </Tooltip>
      ),
    },
  ];

  const salColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (data) => <Space size="middle">{getDesignation(data)}</Space>,
    },
    {
      title: "Slip Generated",
      dataIndex: "generated",
      key: "generated",
      render: (data) => {
        if (data) {
          return <Tag color="green">Success</Tag>;
        } else if (data === "") {
          return <Tag color="grey">Pending</Tag>;
        } else {
          return <Tag color="red">Failed</Tag>;
        }
      },
    },
  ];

  /*   const getPaidStatus = (empId) => {
    let paidDOM = <Tag color="default">N/A</Tag>;

    if (!isSalariesLoading) {
      salaries.forEach((value, index) => {
        if (value["employeeId"] === empId) {
          if (value["paid"] === "pending") {
            paidDOM = <Tag color="default">Pending</Tag>;
          } else if (value["paid"] === "paid") {
            paidDOM = <Tag color="success">Paid</Tag>;
          } else if (value["paid"] === "cancelled") {
            paidDOM = <Tag color="error">Cancelled</Tag>;
          }
        }
      });
    }

    return paidDOM;
  };

  const getSalary = (empId) => {
    let salaryDOM = <Space size="middle">N/A</Space>;

    if (!isSalariesLoading) {
      salaries.forEach((value, index) => {
        if (value["employeeId"] === empId) {
          salaryDOM = (
            <Space size="middle">{value["grossSalary"].toFixed(2)}</Space>
          );
        }
      });
    }

    return salaryDOM;
  }; */

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

  const getData = () => {
    let _employees = [];
    employees.forEach((employee) => {
      employee["key"] = employee._id;
      _employees.push(employee);
    });

    return _employees;
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let _selected = [];
      selectedRows.forEach((e) => {
        e["key"] = e["_id"];
        e["generated"] = "";

        _selected.push(e);
      });

      setSelected(_selected);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const calcSalaryInfo = (empId) => {
    Modal.info({
      title: "Generate Salary Slip",
      icon: "",
      content: (
        <div style={{ marginTop: "10px" }}>
          <Form
            layout="vertical"
            onFinish={(values) => generateSalarySlip(values, empId)}
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
                      Generate
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

  const generateSalarySlip = async (_values, _empId) => {
    _values = {
      employeeId: _empId,
      payCycle: getPayCycle(_values["year"], _values["month"]),
      ..._values,
    };

    delete _values["year"];
    delete _values["month"];

    let result = await addSalaryThunk(_values);
    if (typeof result["data"]["createdSalary"] != "undefined") {
      message.success(`Salary slip generated.`);
    } else {
      message.error("An error occurred.");
    }
    Modal.destroyAll();
  };

  const generateMultiple = async (_values) => {
    let _payCycle = getPayCycle(_values["year"], _values["month"]);
    selected.forEach(async (e) => {
      _values = {
        employeeId: e["employeeId"],
        payCycle: _payCycle,
      };

      try {
        let result = await addSalaryThunk(_values);
        if (typeof result["data"]["error"] == "undefined") {
          e["generated"] = true;

          setSelected(
            selected.map((ele) => {
              if (ele._id === e._id) {
                ele["generated"] = true;
              }

              return ele;
            })
          );
        } else {
          e["generated"] = false;
          setSelected(
            selected.map((ele) => {
              if (ele._id === e._id) {
                ele["generated"] = false;
              }

              return ele;
            })
          );
        }
      } catch (ex) {
        e["generated"] = false;
        setSelected(
          selected.map((ele) => {
            if (ele._id === e._id) {
              ele["generated"] = false;
            }

            return ele;
          })
        );
      }
    });
  };

  const generateModal = (
    <Modal
      title={"Generate Salary Slips"}
      visible={visible}
      width={1000}
      onCancel={() => setVisible(false)}
      footer={[]}
    >
      <div>
        <Form layout="vertical" onFinish={(values) => generateMultiple(values)}>
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
            <Col span={5} offset={19} >
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Generate
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
        <div
          style={{
            height: "250",
            overflow: "auto",
          }}
        ></div>
        <Table
          columns={salColumns}
          dataSource={[...selected]}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 300,
          }}
        />
      </div>
    </Modal>
  );

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
          <Link to="/employee-salary">Employee Salary</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title="Salaries"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Button type="primary" onClick={() => setVisible(true)}>
            Generate Slips
          </Button>
        }
      >
        {generateModal}
        {isEmpLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={getData()}
          />
        )}
      </Card>
    </div>
  );
}

export default EmployeeSalary;
