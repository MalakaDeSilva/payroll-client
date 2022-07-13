import React, { useEffect } from "react";
import {
  Drawer,
  Form,
  Col,
  Row,
  Input,
  InputNumber,
  Button,
  Space,
  Select,
  Tooltip,
} from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import { getPayCycle, getMonthYearFromPayCycle } from "../util/Utils";

function NewPerUnitCommission(props) {
  const [form] = Form.useForm();

  const { visible, onClose, title, comm, action } = props;

  const { addCommissionsThunk, updateCommissionsThunk, actionDrawer } =
    useStoreActions((actions) => actions.perUnitCommissions);
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
    let payCycle = getPayCycle(values["year"], values["month"]);
    values["payCycle"] = payCycle;

    if (action === "ADD") {
      addCommissionsThunk(values);
    } else if (action === "UPDATE") {
      values["_id"] = comm["_id"];
      updateCommissionsThunk(values);
    }
    toggleDrawer();
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

  const onVisibilityChange = (visible) => {
    if (visible) {
      let _year, _month;

      if (comm.payCycle === "" || typeof comm.payCycle === "undefined") {
        _year = new Date().getFullYear();
        _month = new Date().getMonth().toString();
      } else {
        let _payCycle = getMonthYearFromPayCycle(comm.payCycle);
        _year = _payCycle["year"];
        _month = _payCycle["month"];
      }

      form.setFieldsValue({
        name: comm.commissionName,
        employeeId: comm.employeeId,
        amount: comm.amount,
        year: _year,
        month: _month,
        units: comm.units,
      });
    }
  };

  return (
    <Drawer
      title={title}
      width={400}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      afterVisibleChange={onVisibilityChange}
    >
      <Form layout="vertical" onFinish={onFinish} form={form} hideRequiredMark>
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
          <Col span={17}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: "Please enter Amount." }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Please enter Amount"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="units"
              label="Units"
              initialValue={1}
              rules={[
                { required: true, message: "Please enter amount of Units." },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ paddingLeft: "8px", paddingBottom: "5px" }}>
          <Tooltip
            placement="top"
            title="If no value is given, current pay cycle will be selected."
          >
            Pay Cycle *
          </Tooltip>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="year" label={"Year"}>
              <InputNumber
                placeholder="Please enter Pay Cycle"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="month" label={"Month"}>
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
                  {action === "ADD" ? "Submit" : "Update"}
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

export default NewPerUnitCommission;
