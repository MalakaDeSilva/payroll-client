import React, { useEffect } from "react";
import {
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Button,
  Space,
  Select,
  Tooltip,
} from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

function NewFixedCommission(props) {
  const { visible, onClose } = props;

  const { getCommissionsByPayCycleThunk, addCommissionsThunk, actionDrawer } =
    useStoreActions((actions) => actions.fixedCommissions);
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);

  const { Option } = Select;

  useEffect(() => {
    getEmployeesThunk(); // eslint-disable-next-line
  }, []);

  const toggleDrawer = () => {
    actionDrawer();
  };

  const onFinish = (values) => {
    addCommissionsThunk(values);
    toggleDrawer();
    setTimeout(() => {
      getCommissionsByPayCycleThunk();
    }, 5000);
  };

  const getEmployeeSeletor = () => {
    if (!isEmpLoading) {
      return employees.map((value, index) => {
        return (
          <Option value={value.employeeId} key={value._id}>
            {value.name}
          </Option>
        );
      });
    } else {
      return "";
    }
  };

  const getPayCycle = () => {
    let d = new Date();

    const monthCodes = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OVT",
      "NOV",
      "DEC",
    ];

    const year = d.getFullYear();

    let code = year + monthCodes[d.getMonth()];
    return code;
  };

  return (
    <Drawer
      title="New Commission"
      width={400}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" onFinish={onFinish} hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Commission"
              rules={[{ required: true, message: "Please enter Commission." }]}
            >
              <Input placeholder="Please enter Commission" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="employeeId"
              label="Employee"
              rules={[{ required: true, message: "Please select Employee." }]}
            >
              <Select placeholder="Please select Employee">
                {/* <Option value="all" key="all">
                  All Employees
                </Option> */}
                {getEmployeeSeletor()}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: "Please enter Amount." }]}
            >
              <Input placeholder="Please enter Amount" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="payCycle"
              label={
                <Tooltip
                  placement="top"
                  title="If no value is given, current pay cycle will be selected."
                >
                  Pay Cycle *
                </Tooltip>
              }
              rules={[{ required: true, message: "Please enter Pay Cycle" }]}
              initialValue={getPayCycle()}
            >
              <Input placeholder="Please enter Pay Cycle" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={toggleDrawer}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default NewFixedCommission;
