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
import { getPayCycle } from "../util/Utils";

function NewPerUnitCommission(props) {
  const [form] = Form.useForm();

  const { visible, onClose, title, comm, action } = props;

  const {
    addCommissionsThunk,
    updateCommissionsThunk,
    actionDrawer,
  } = useStoreActions((actions) => actions.perUnitCommissions);
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
      form.setFieldsValue({
        name: comm.commissionName,
        employeeId: comm.employeeId,
        amount: comm.amount,
        payCycle:
          comm.payCycle === "" || typeof comm.payCycle === "undefined"
            ? getPayCycle()
            : comm.payCycle,
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
              rules={[
                { required: true, message: "Please enter amount of Units." },
              ]}
            >
              <InputNumber min={1} defaultValue={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
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
