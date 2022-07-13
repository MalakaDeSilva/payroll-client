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
} from "antd";
import {
  LoadingOutlined,
  AuditOutlined,
  FormOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { getPayCycle } from "../util/Utils";
import { Link } from "react-router-dom";

function SalarySlips(props) {
  let date = new Date();

  const { Option } = Select;

  // eslint-disable-next-line
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);
  const { salaries, isSalariesLoading } = useStoreState(
    (state) => state.salaries
  );

  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { getSalariesByPayCycleThunk, updateSalaryThunk } = useStoreActions(
    (actions) => actions.salaries
  );

  useEffect(() => {
    getSalariesByPayCycleThunk({
      payCycle: getPayCycle(date.getFullYear(), date.getMonth().toString()),
    });
    getEmployeesThunk(); // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (data) => getEmployeeName(data),
    },
    {
      title: "Pay Cycle",
      dataIndex: "payCycle",
      key: "payCycle",
    },
    {
      title: "Basic Salary (LKR)",
      dataIndex: "basic",
      key: "basic",
      render: (data) => <Space size="middle">{data.toFixed(2)}</Space>,
    },
    {
      title: "Gross Salary (LKR)",
      dataIndex: "grossSalary",
      key: "grossSalary",
      render: (data) => <Space size="middle">{data.toFixed(2)}</Space>,
    },
    {
      title: "Net Salary (LKR)",
      dataIndex: "netSalary",
      key: "netSalary",
      render: (data) => <Space size="middle">{data.toFixed(2)}</Space>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Space size="middle">
            <Tooltip title={"View Slip"}>
              <Space size="middle">
                <Link
                  to={
                    "salary-sheet/" + record.employeeId + "/" + record.payCycle
                  }
                >
                  <Button icon={<AuditOutlined />} shape="circle"></Button>
                </Link>
              </Space>
            </Tooltip>
            <Tooltip title={"Update Slip"}>
              <Space size="middle">
                <Button
                  icon={<FormOutlined />}
                  shape="circle"
                  onClick={() => calcSalaryInfo(record.employeeId, record._id)}
                ></Button>
              </Space>
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  const getData = () => {
    let _salaries = [];
    salaries.forEach((salary) => {
      salary["key"] = salary._id;
      _salaries.push(salary);
    });

    return _salaries;
  };

  const getEmployeeName = (empId) => {
    return isEmpLoading || employees.length <= 0
      ? ""
      : employees.find((ele) => ele.employeeId === empId).name;
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
              getSalariesByPayCycleThunk(_payCycle);
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

  const calcSalaryInfo = (empId, id) => {
    Modal.info({
      title: "Update Salary Slip",
      icon: "",
      content: (
        <div style={{ marginTop: "10px" }}>
          <Form
            layout="vertical"
            onFinish={(values) => updateSalarySlip(values, empId, id)}
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
                      Update
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

  const updateSalarySlip = (_values, _empId, _id) => {
    _values = {
      _id: _id,
      employeeId: _empId,
      payCycle: getPayCycle(_values["year"], _values["month"]),
      ..._values,
    };

    delete _values["year"];
    delete _values["month"];

    updateSalaryThunk(_values);
    Modal.destroyAll();
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
          <Link to="/salary-slips">Payslips</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card
        title="Payslips"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={<Button onClick={setPayCycleFilter}>Pay Cycle</Button>}
      >
        {isSalariesLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Table columns={columns} dataSource={getData()} />
        )}
      </Card>
    </div>
  );
}

export default SalarySlips;
