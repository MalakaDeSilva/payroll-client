import React, { useEffect } from "react";
import {
  Drawer,
  Form,
  Col,
  Row,
  InputNumber,
  Select,
  Button,
  Space,
  Tooltip,
  message,
} from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";

import { getMonthYearFromPayCycle, getPayCycle } from "../util/Utils";

function NewAddOn(props) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const { visible, onClose, title, addOn, action } = props;

  const { addAddOnThunk, updateAddOnThunk, actionDrawer } = useStoreActions(
    (actions) => actions.addOns
  );
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);

  useEffect(() => {
    getEmployeesThunk(); // eslint-disable-next-line
  }, []);

  const toggleDrawer = () => {
    actionDrawer();
  };

  const onFinish = async (values) => {
    let payCycle = getPayCycle(values["year"], values["month"]);
    values["fromPayCycle"] = payCycle;

    if (action === "ADD") {
      let result = await addAddOnThunk(values);
      if (typeof result["data"]["createdAddOn"] != "undefined") {
        message.success("Add On added");
      } else {
        message.error("An error occurred");
      }
    } else if (action === "UPDATE") {
      values["_id"] = addOn["_id"];
      let result = await updateAddOnThunk(values);

      if (typeof result["data"]["updatedAddOn"] != "undefined") {
        message.success("Add On updated");
      } else {
        message.error("An error occurred");
      }
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

      if (addOn.payCycle === "" || typeof addOn.payCycle === "undefined") {
        _year = new Date().getFullYear();
        _month = new Date().getMonth().toString();
      } else {
        let _payCycle = getMonthYearFromPayCycle(addOn.payCycle);
        _year = _payCycle["year"];
        _month = _payCycle["month"];
      }

      form.setFieldsValue({
        employeeId: addOn.employeeId,
        year: _year,
        month: _month,
        fixedAllowance: addOn.fixedAllowance,
        increment: addOn.increment,
      });
    }
  };

  return (
    <div>
      <Drawer
        title={title}
        width={600}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        afterVisibleChange={onVisibilityChange}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          hideRequiredMark
        >
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
              <Form.Item
                name="fixedAllowance"
                label="Fixed Allowance"
                rules={[
                  { required: true, message: "Please enter Fixed Allowance" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Please enter Fixed Allowance"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="increment"
                label="Increment"
                rules={[{ required: true, message: "Please enter Increment" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Please enter Increment"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="bonus" label="Bonus">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Please enter bonus"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="reductions" label="Reductions">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Please enter reductions"
                />
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
    </div>
  );
}

export default NewAddOn;
